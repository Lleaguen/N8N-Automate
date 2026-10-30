import anthropic
import os
import json
from dotenv import load_dotenv
import n8n_client

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """Sos un asistente experto en automatizaciones con n8n.
El usuario te va a describir en lenguaje natural qué automatización quiere crear o modificar.

Tenés acceso a las siguientes herramientas para interactuar con n8n:

1. list_workflows   - Lista todos los workflows existentes
2. create_workflow  - Crea un nuevo workflow en n8n
3. update_workflow  - Modifica un workflow existente (nodos, conexiones, nombre)
4. activate_workflow - Activa o desactiva un workflow por ID
5. execute_workflow - Ejecuta un workflow por ID

Cuando el usuario te pida MODIFICAR un workflow existente, usá update_workflow con su ID.
NO crees uno nuevo si el usuario quiere modificar uno que ya existe.

Cuando crees o modifiques workflows, siempre usá un nodo Webhook como trigger
para que puedan ejecutarse remotamente. El path del webhook debe ser descriptivo
y en minúsculas con guiones, por ejemplo: "bienvenida", "procesar-email", etc.

Siempre respondé en español y de forma clara y concisa.
Cuando hagas algo en n8n, explicá qué hiciste y por qué.
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
                    "description": "Nuevo nombre del workflow (opcional, mantiene el actual si no se especifica)"
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

    # Bucle de herramientas: Claude puede usar varias en secuencia
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

        # Continuamos la conversación con los resultados de las herramientas
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

    # Extraemos el texto final
    text_blocks = [b.text for b in response.content if hasattr(b, "text")]
    return "\n".join(text_blocks)
