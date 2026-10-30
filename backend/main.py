from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import n8n_client


app = FastAPI(title="N8N Automate API")


#|---------CONEXION CON EL FRONT----------|

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExecuteWorkflowRequest(BaseModel):
    data: Optional[dict] = {}

class ActivateWorkflowRequest(BaseModel):
    active: bool

#|---------END-POINTS + RESPONSES ----------|


#|---------INDICADOR DE FUNCIONAMIENTO----------|
@app.get("/")
async def root():
    return {"status": "ok", "message": "N8N Automate API Corriendo"}


#|---------LISTAR TODOS LOS WORKFLOWS----------|
@app.get("/workflows")
async def list_workflows():
    try:
        return await n8n_client.get_workflows()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



#|---------OBTENER DETALLE DEL WORKFLOW----------|
@app.get("/workflows/{workflow_id}")
async def get_workflow(workflow_id: str):
    try:
        return await n8n_client.get_workflow(workflow_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


#|---------ACTIVA O DESACTIVA UN WORKFLOW----------|
@app.patch("/workflows/{workflow_id}/activate")
async def activate_workflow(workflow_id: str, body: ActivateWorkflowRequest):
    try:
        return await n8n_client.activate_workflow(workflow_id, body.active)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


#|---------EJECUTA UN WORKFLOW---------|
@app.post("/workflows/{workflow_id}/execute")
async def execute_workflow(workflow_id: str, body: ExecuteWorkflowRequest):
    try:
        return await n8n_client.execute_workflow(workflow_id, body.data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


#|---------HISTORIAL DE EJECUCCIONES----------|
@app.get("/executions")
async def list_executions(workflow_id: Optional[str] = None):
    try:
        return await n8n_client.get_executions(workflow_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: list[ChatMessage]

import claude_client

@app.post("/chat")
async def chat(body: ChatRequest):
    try:
        messages = [{"role": m.role, "content": m.content} for m in body.messages]
        reply = await claude_client.chat(messages)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
