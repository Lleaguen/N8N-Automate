import httpx
import os
from dotenv import load_dotenv

load_dotenv()

N8N_BASE_URL = os.getenv("N8N_BASE_URL", "http://localhost:5678")
N8N_API_KEY = os.getenv("N8N_API_KEY")

headers = {
    "X-N8N-API-KEY": N8N_API_KEY,
    "Content-Type": "application/json",
}


async def get_workflows():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{N8N_BASE_URL}/api/v1/workflows",
            headers=headers,
        )
        response.raise_for_status()
        return response.json()


async def get_workflow(workflow_id: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{N8N_BASE_URL}/api/v1/workflows/{workflow_id}",
            headers=headers,
        )
        response.raise_for_status()
        return response.json()


async def activate_workflow(workflow_id: str, active: bool):
    async with httpx.AsyncClient() as client:
        response = await client.patch(
            f"{N8N_BASE_URL}/api/v1/workflows/{workflow_id}",
            headers=headers,
            json={"active": active},
        )
        response.raise_for_status()
        return response.json()


async def execute_workflow(workflow_id: str, data: dict = {}):
    # Primero obtenemos el workflow para ver si tiene webhook trigger
    workflow = await get_workflow(workflow_id)
    nodes = workflow.get("nodes", [])

    webhook_node = next(
        (n for n in nodes if n.get("type") == "n8n-nodes-base.webhook"),
        None
    )

    async with httpx.AsyncClient() as client:
        if webhook_node:
            # Ejecutar via webhook (confiable)
            path = webhook_node.get("parameters", {}).get("path", workflow_id)
            response = await client.post(
                f"{N8N_BASE_URL}/webhook/{path}",
                headers={"Content-Type": "application/json"},
                json=data,
            )
        else:
            # Fallback: endpoint interno para manual trigger
            response = await client.post(
                f"{N8N_BASE_URL}/rest/workflows/{workflow_id}/run",
                headers={
                    "Content-Type": "application/json",
                    "X-N8N-API-KEY": N8N_API_KEY,
                },
                json={
                    "runData": {},
                    "startNodes": [],
                    "destinationNode": "",
                    "workflowData": {"id": workflow_id}
                },
            )
        response.raise_for_status()
        return response.json()


async def get_executions(workflow_id: str = None):
    params = {}
    if workflow_id:
        params["workflowId"] = workflow_id
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{N8N_BASE_URL}/api/v1/executions",
            headers=headers,
            params=params,
        )
        response.raise_for_status()
        return response.json()


async def create_workflow(name: str, nodes: list, connections: dict):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{N8N_BASE_URL}/api/v1/workflows",
            headers=headers,
            json={
                "name": name,
                "nodes": nodes,
                "connections": connections,
                "settings": {}
            },
        )
        response.raise_for_status()
        return response.json()


async def update_workflow(workflow_id: str, name: str = None, nodes: list = [], connections: dict = {}):
    # Obtenemos el workflow actual para no perder datos como el nombre
    current = await get_workflow(workflow_id)
    payload = {
        "name": name or current["name"],
        "nodes": nodes,
        "connections": connections,
        "settings": current.get("settings", {}),
    }
    async with httpx.AsyncClient() as client:
        response = await client.put(
            f"{N8N_BASE_URL}/api/v1/workflows/{workflow_id}",
            headers=headers,
            json=payload,
        )
        response.raise_for_status()
        return response.json()
