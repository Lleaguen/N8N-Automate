import httpx
import os
import json
import io
import anthropic
from dotenv import load_dotenv
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

load_dotenv()

anthropic_client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
PENDIENTES_URL   = os.getenv("PENDIENTES_URL")
PSS_URL          = os.getenv("PSS_URL")
CRITERIO_URL     = os.getenv("CRITERIO_URL")


async def fetch_criterio() -> str:
    """Lee el criterio de trackeo desde el Google Doc en tiempo real."""
    if not CRITERIO_URL:
        return "No se encontró CRITERIO_URL en el .env"

    # Extraer el ID del documento de la URL
    doc_id = None
    if "/d/" in CRITERIO_URL:
        doc_id = CRITERIO_URL.split("/d/")[1].split("/")[0]

    if not doc_id:
        return "No se pudo extraer el ID del documento"

    export_url = f"https://docs.google.com/document/d/{doc_id}/export?format=txt"

    async with httpx.AsyncClient(timeout=15, follow_redirects=True) as client:
        response = await client.get(export_url)
        response.raise_for_status()
        return response.text.strip()


async def fetch_sheet(url: str) -> list:
    """Lee los datos de un Google Sheet via Apps Script."""
    async with httpx.AsyncClient(timeout=30, follow_redirects=True) as client:
        response = await client.get(url)
        response.raise_for_status()
        data = response.json()
        return data.get("data", [])


async def hacer_matching(pendientes: list, pss: list) -> list:
    """
    Manda los datos a Claude para que haga el matching
    usando el criterio leído en tiempo real desde el Google Doc.
    """

    # Leer el criterio actualizado del documento
    criterio = await fetch_criterio()

    # Limitamos a 50 registros de cada lado para no exceder tokens
    pendientes_sample = pendientes[:50]
    pss_sample = pss[:50]

    prompt = f"""Sos un experto en trackeo de piezas sin shipment (PSS) para un hub logístico.

Tenés que hacer el matching entre los SHIPMENTS PENDIENTES y las PSS.

CRITERIO DE TRACKEO (leído en tiempo real del documento del equipo):
{criterio}

SHIPMENTS PENDIENTES (columnas: id, Fecha Inhub, Sem, $, Descripciones, etc.):
{json.dumps(pendientes_sample, ensure_ascii=False, indent=2)}

PSS A TRACKEAR (solo las que tienen SHIPMENT y Fecha vacíos):
{json.dumps(pss_sample, ensure_ascii=False, indent=2)}

Devolvé ÚNICAMENTE un JSON con esta estructura exacta (sin texto adicional):
{{
  "matches": [
    {{
      "pss_codigo": "código de la PSS",
      "pss_descripcion": "descripción de la PSS",
      "shipment_id": "ID del shipment",
      "shipment_descripcion": "descripción del shipment",
      "precio": "precio del shipment",
      "semana": "semana",
      "fecha_pss": "fecha de la PSS",
      "fecha_inhub": "fecha inhub del shipment",
      "porcentaje_coincidencia": 85,
      "criterio": "descripción de por qué coinciden"
    }}
  ]
}}

Solo incluí matches con coincidencia >= 60%. Si no hay matches, devolvé {{"matches": []}}."""

    response = anthropic_client.messages.create(
        model="claude-opus-4-5",
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}]
    )

    text = response.content[0].text.strip()

    # Extraer JSON de la respuesta
    if "```json" in text:
        text = text.split("```json")[1].split("```")[0].strip()
    elif "```" in text:
        text = text.split("```")[1].split("```")[0].strip()

    result = json.loads(text)
    return result.get("matches", [])


def generar_excel(matches: list) -> bytes:
    """Genera el archivo Excel con los resultados del trackeo."""
    wb = Workbook()
    ws = wb.active
    ws.title = "Trackeo PSS"

    # Estilos
    header_font    = Font(name="Arial", bold=True, color="FFFFFF", size=11)
    header_fill    = PatternFill(start_color="1F4E79", end_color="1F4E79", fill_type="solid")
    header_align   = Alignment(horizontal="center", vertical="center", wrap_text=True)
    cell_align     = Alignment(horizontal="left", vertical="center", wrap_text=True)
    border_side    = Side(style="thin", color="BFBFBF")
    cell_border    = Border(left=border_side, right=border_side,
                            top=border_side, bottom=border_side)

    fill_alta      = PatternFill(start_color="C6EFCE", end_color="C6EFCE", fill_type="solid")  # verde
    fill_media     = PatternFill(start_color="FFEB9C", end_color="FFEB9C", fill_type="solid")  # amarillo
    fill_baja      = PatternFill(start_color="FFC7CE", end_color="FFC7CE", fill_type="solid")  # rojo

    # Headers
    headers = [
        "Código PSS", "Descripción PSS", "Shipment ID",
        "Descripción Shipment", "Precio", "Semana",
        "Fecha PSS", "Fecha Inhub", "% Coincidencia", "Criterio"
    ]
    col_widths = [15, 40, 18, 40, 15, 10, 12, 12, 14, 50]

    ws.row_dimensions[1].height = 30
    for col, (header, width) in enumerate(zip(headers, col_widths), 1):
        cell = ws.cell(row=1, column=col, value=header)
        cell.font    = header_font
        cell.fill    = header_fill
        cell.alignment = header_align
        cell.border  = cell_border
        ws.column_dimensions[get_column_letter(col)].width = width

    # Datos
    for row_idx, match in enumerate(matches, 2):
        pct = match.get("porcentaje_coincidencia", 0)
        fill = fill_alta if pct >= 85 else fill_media if pct >= 70 else fill_baja

        valores = [
            match.get("pss_codigo", ""),
            match.get("pss_descripcion", ""),
            match.get("shipment_id", ""),
            match.get("shipment_descripcion", ""),
            match.get("precio", ""),
            match.get("semana", ""),
            match.get("fecha_pss", ""),
            match.get("fecha_inhub", ""),
            f"{pct}%",
            match.get("criterio", ""),
        ]

        ws.row_dimensions[row_idx].height = 20
        for col, valor in enumerate(valores, 1):
            cell = ws.cell(row=row_idx, column=col, value=valor)
            cell.alignment = cell_align
            cell.border    = cell_border
            cell.fill      = fill

    # Resumen al pie
    ws.row_dimensions[len(matches) + 3].height = 20
    resumen = ws.cell(
        row=len(matches) + 3, column=1,
        value=f"Total matches encontrados: {len(matches)}"
    )
    resumen.font = Font(bold=True, size=11)

    # Guardar en memoria
    buffer = io.BytesIO()
    wb.save(buffer)
    buffer.seek(0)
    return buffer.getvalue()


async def ejecutar_trackeo() -> bytes:
    """Función principal: lee sheets, hace matching, genera Excel."""

    if not PENDIENTES_URL:
        raise ValueError("PENDIENTES_URL no configurada en .env")
    if not PSS_URL:
        raise ValueError("PSS_URL no configurada en .env")

    # Leer ambos sheets en paralelo
    import asyncio
    pendientes, pss = await asyncio.gather(
        fetch_sheet(PENDIENTES_URL),
        fetch_sheet(PSS_URL)
    )

    if not pendientes:
        raise ValueError("No se pudieron leer los datos de Pendientes")
    if not pss:
        raise ValueError("No se pudieron leer los datos de PSS")

    print(f"[TRACKEO] Pendientes: {len(pendientes)} | PSS: {len(pss)}")
    print(f"[TRACKEO] Ejemplo PSS: {pss[0]}")
    print(f"[TRACKEO] Ejemplo Pendiente: {pendientes[0]}")

    # Hacer el matching con Claude
    matches = await hacer_matching(pendientes, pss)
    # Generar el Excel
    excel_bytes = generar_excel(matches)
    return excel_bytes
