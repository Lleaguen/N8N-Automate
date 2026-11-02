import anthropic
import os
import json
from dotenv import load_dotenv
import n8n_client

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = f"""Sos un asistente experto en automatizaciones con n8n.
El usuario te va a describir en lenguaje natural qué automatización quiere crear o modificar,
y vos tenés que crear o modificar el workflow directamente en n8n.

== CONTEXTO DEL ENTORNO ==
- Backend Python corriendo en: http://127.0.0.1:8000
- URL del sheet de Pendientes (Shipments): {os.getenv("PENDIENTES_URL", "no configurada")}
- URL del sheet de PSS: {os.getenv("PSS_URL", "no configurada aún")}

== CONTEXTO DEL NEGOCIO: TRACKEO PSS ==

PSS = Piezas Sin Shipment. Productos físicos en el hub sin número de shipment.
Shipments Pendientes = órdenes pendientes que podrían corresponder a esas piezas.

ESTRUCTURA DEL SHEET DE PENDIENTES:
Columnas A-R: id, Fecha Inhub, Dia, Sem, Carrier LM, Carrier LM2, Hub Status, TMS Status,
Respuesta, $, Sin Manifestar, Recupero, Fecha Recupero, Descripciones, Motivo de Recupero,
Flujo, Observaciones, Cierre

ESTRUCTURA DEL SHEET DE PSS:
Columnas A-K: SHIPMENT, Codigo, Semana, Fecha, Salida a Jaula, Mes, Descripcion, Marca,
Observacion, Imagen, Corroboracion de Datos

CRITERIOS DE MATCHING:
1. DESCRIPCIÓN: palabras clave ignorando stopwords, sinónimos, por categoría
2. MARCA: determinante cuando descripción es ambigua
3. FECHA: misma semana o hasta 2 semanas atrás; diferencia máxima 2 días entre Fecha Inhub y Fecha PSS
4. PRECIO >$65.000: coincidencia mínima 85-100%. PRECIO ≤$65.000: mínimo 60% por categoría

== HERRAMIENTAS DISPONIBLES ==
Tenés acceso a: list_workflows, create_workflow, update_workflow, activate_workflow,
execute_workflow, run_trackeo

Para ejecutar el trackeo PSS usá run_trackeo directamente — no hace falta crear un workflow.

== CÓMO CONSTRUIR WORKFLOWS EN N8N ==

Estructura de nodo:
{{
  "id": "id-unico", "name": "Nombre", "type": "tipo",
  "typeVersion": 1, "position": [x, y], "parameters": {{...}}
}}

Conexiones:
{{"Nodo Origen": {{"main": [[{{"node": "Nodo Destino", "type": "main", "index": 0}}]]}}}}

TIPOS DE NODOS:
- Webhook trigger: n8n-nodes-base.webhook v2 | params: httpMethod, path, responseMode
- HTTP Request: n8n-nodes-base.httpRequest v4.2 | params: method, url, sendBody, contentType
- Code (JS): n8n-nodes-base.code v2 | params: jsCode
- Set: n8n-nodes-base.set v3.4 | params: assignments
- Respond to Webhook: n8n-nodes-base.respondToWebhook v1.1 | params: respondWith, responseBody
- Gmail: n8n-nodes-base.gmail v2.1 | params: operation, sendTo, subject, message
- Merge: n8n-nodes-base.merge v3 | params: mode, combineBy

Posicionamiento: nodos de izquierda a derecha con 250px. Ramas paralelas: misma X, Y separado 200px.

== REGLAS ==
1. Para MODIFICAR un workflow existente usá update_workflow. No crees uno nuevo.
2. Siempre usá Webhook como trigger.
3. Explicá en español qué hiciste.
4. Si necesita credenciales (Gmail), avisá que las configure en n8n Settings → Credentials.

Siempre respondé en español y de forma clara y concisa.
"""

TOOLS = [
    {
        "name": "list_workflows",
        "description": "Lista todos los workflows existentes en n8n",
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": []
        }
    },
    {
        "name": "create_workflow",
        "description": "Crea un nuevo workflow en n8n. Siempre usar nodo Webhook como trigger.",
        "input_schema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Nombre del workflow"
                },
                "nodes": {
                    "type": "array",
                    "description": "Lista de nodos del workflow en formato n8n"
                },
                "connections": {
                    "type": "object",
                    "description": "Conexiones entre los nodos"
                }
            },
            "required": ["name", "nodes", "connections"]
        }
    },
    {
        "name": "update_workflow",
        "description": "Modifica un workflow existente en n8n reemplazando sus nodos y conexiones.",
        "input_schema": {
            "type": "object",
            "properties": {
                "workflow_id": {
                    "type": "string",
                    "description": "El ID del workflow a modificar"
                },
                "name": {
                    "type": "string",
                    "description": "Nuevo nombre del workflow (opcional)"
                },
                "nodes": {
                    "type": "array",
                    "description": "Nueva lista de nodos del workflow en formato n8n"
                },
                "connections": {
                    "type": "object",
                    "description": "Nuevas conexiones entre los nodos"
                }
            },
            "required": ["workflow_id", "nodes", "connections"]
        }
    },
    {
        "name": "activate_workflow",
        "description": "Activa o desactiva un workflow en n8n",
        "input_schema": {
            "type": "object",
            "properties": {
                "workflow_id": {
                    "type": "string",
                    "description": "El ID del workflow a activar/desactivar"
                },
                "active": {
                    "type": "boolean",
                    "description": "True para activar, False para desactivar"
                }
            },
            "required": ["workflow_id", "active"]
        }
    },
    {
        "name": "execute_workflow",
        "description": "Ejecuta un workflow en n8n con datos opcionales",
        "input_schema": {
            "type": "object",
            "properties": {
                "workflow_id": {
                    "type": "string",
                    "description": "El ID del workflow a ejecutar"
                },
                "data": {
                    "type": "object",
                    "description": "Datos opcionales para pasar al workflow"
                }
            },
            "required": ["workflow_id"]
        }
    },
    {
        "name": "run_trackeo",
        "description": "Ejecuta el trackeo de PSS contra los shipments pendientes. Lee ambos Google Sheets, aplica el criterio del documento en tiempo real, hace el matching con IA y genera un archivo Excel descargable.",
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": []
        }
    },
]


async def execute_tool(tool_name: str, tool_input: dict) -> str:
    """Ejecuta una herramienta de n8n y devuelve el resultado como string."""
    try:
        if tool_name == "list_workflows":
            result = await n8n_client.get_workflows()
            workflows = result.get("data", [])
            if not workflows:
                return "No hay workflows creados todavía."
            lines = [f"- [{wf['id']}] {wf['name']} ({'activo' if wf['active'] else 'inactivo'})"
                     for wf in workflows]
            return "Workflows encontrados:\n" + "\n".join(lines)

        elif tool_name == "create_workflow":
            result = await n8n_client.create_workflow(
                tool_input["name"],
                tool_input["nodes"],
                tool_input["connections"]
            )
            return f"Workflow '{tool_input['name']}' creado con ID: {result.get('id')}"

        elif tool_name == "update_workflow":
            result = await n8n_client.update_workflow(
                tool_input["workflow_id"],
                tool_input.get("name"),
                tool_input["nodes"],
                tool_input["connections"]
            )
            return f"Workflow {tool_input['workflow_id']} actualizado correctamente."

        elif tool_name == "activate_workflow":
            result = await n8n_client.activate_workflow(
                tool_input["workflow_id"],
                tool_input["active"]
            )
            estado = "activado" if tool_input["active"] else "desactivado"
            return f"Workflow {tool_input['workflow_id']} {estado} correctamente."

        elif tool_name == "execute_workflow":
            result = await n8n_client.execute_workflow(
                tool_input["workflow_id"],
                tool_input.get("data", {})
            )
            return f"Workflow ejecutado. Resultado: {json.dumps(result)}"

        elif tool_name == "run_trackeo":
            import trackeo
            import tempfile
            excel_bytes = await trackeo.ejecutar_trackeo()
            tmp = tempfile.NamedTemporaryFile(
                delete=False, suffix=".xlsx", prefix="trackeo_pss_"
            )
            tmp.write(excel_bytes)
            tmp.close()
            filename = os.path.basename(tmp.name)
            return (
                f"✅ Trackeo completado. "
                f"**[Descargar trackeo_pss.xlsx](http://127.0.0.1:8000/download/{filename})**"
            )

        else:
            return f"Herramienta desconocida: {tool_name}"

    except Exception as e:
        return f"Error al ejecutar {tool_name}: {str(e)}"


async def chat(messages: list) -> str:
    """
    Envía el historial de mensajes a Claude y ejecuta las herramientas que use.
    Devuelve la respuesta final en texto.
    """
    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=4096,
        system=SYSTEM_PROMPT,
        tools=TOOLS,
        messages=messages
    )

    while response.stop_reason == "tool_use":
        tool_uses = [b for b in response.content if b.type == "tool_use"]
        tool_results = []

        for tool_use in tool_uses:
            result = await execute_tool(tool_use.name, tool_use.input)
            tool_results.append({
                "type": "tool_result",
                "tool_use_id": tool_use.id,
                "content": result
            })

        messages = messages + [
            {"role": "assistant", "content": response.content},
            {"role": "user",      "content": tool_results}
        ]

        response = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=4096,
            system=SYSTEM_PROMPT,
            tools=TOOLS,
            messages=messages
        )

    text_blocks = [b.text for b in response.content if hasattr(b, "text")]
    return "\n".join(text_blocks)
