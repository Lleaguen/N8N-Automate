import { useState, useRef, useEffect, useMemo } from 'react'
import { Weld, useWeld } from '@weldjs/react'
import { Weld as WeldClient } from '@weldjs/core'
import { z } from 'zod'

// ── Cliente HTTP de WELD ───────────────────────────────────────────
const api = new WeldClient('http://127.0.0.1:8000')

const API_URL = 'http://127.0.0.1:8000'

// ── Schemas de validación ──────────────────────────────────────────
const WorkflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  active: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const WorkflowsResponseSchema = z.object({
  data: z.array(WorkflowSchema),
})

const ExecutionSchema = z.object({
  id: z.string(),
  finished: z.boolean(),
  mode: z.string(),
  startedAt: z.string(),
  stoppedAt: z.string().optional(),
  status: z.string(),
  workflowId: z.string().optional(),
})

const ExecutionsResponseSchema = z.object({
  data: z.array(ExecutionSchema),
})

type Workflow = z.infer<typeof WorkflowSchema>
type Page = 'chat' | 'workflows' | 'executions'

// ── App principal ──────────────────────────────────────────────────
export function App() {
  const [page, setPage] = useState<Page>('chat')

  const navBtn = (target: Page, label: string) => (
    <Weld.Button
      variant={page === target ? 'primary' : 'ghost'} size="sm"
      action={() => { setPage(target); return Promise.resolve() }}
    >{label}</Weld.Button>
  )

  return (
    <Weld.Shell>
      <Weld.Header fixed neon>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span style={{
            fontWeight: 700, fontSize: 18,
            background: 'linear-gradient(135deg, #00d4ff, #3b6bff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            ⚡ N8N Automate
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {navBtn('chat',       '💬 Chat')}
            {navBtn('workflows',  '⚙️ Workflows')}
            {navBtn('executions', '📋 Ejecuciones')}
          </div>
        </div>
      </Weld.Header>

      <Weld.Main>
        {page === 'chat'       && <ChatPage />}
        {page === 'workflows'  && <WorkflowsPage />}
        {page === 'executions' && <ExecutionsPage />}
      </Weld.Main>

      <Weld.Footer>
        <Weld.Text variant="muted" style={{ textAlign: 'center', fontSize: 13 }}>
          N8N Automate · Backend en{' '}
          <a href="http://127.0.0.1:8000/docs" target="_blank" style={{ color: '#00d4ff' }}>
            http://127.0.0.1:8000
          </a>
        </Weld.Text>
      </Weld.Footer>
    </Weld.Shell>
  )
}

// ── Tipos del chat ─────────────────────────────────────────────────
interface Message {
  role: 'user' | 'assistant'
  content: string
}

// ── Página de Chat ─────────────────────────────────────────────────
function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de automatización. Describime qué querés automatizar y lo creo en n8n por vos.\n\nPor ejemplo:\n• "Quiero que cuando llegue un email con la palabra factura me avise por Slack"\n• "Creame un workflow que se ejecute todos los lunes a las 9am"\n• "Listame todos mis workflows activos"',
    }
  ])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef             = useRef<HTMLDivElement>(null)

  // Auto-scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    const updated = [...messages, userMessage]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })
      const json = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: json.reply }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Error al conectar con el backend. Verificá que esté corriendo.'
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div style={{
      maxWidth: 800, margin: '0 auto', padding: '24px 24px 0',
      display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)',
    }}>
      {/* Historial de mensajes */}
      <div style={{
        flex: 1, overflowY: 'auto', display: 'flex',
        flexDirection: 'column', gap: 16, paddingBottom: 16,
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
          }}>
            <div style={{
              maxWidth: '80%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(59,107,255,0.2))'
                : 'rgba(255,255,255,0.05)',
              border: msg.role === 'user'
                ? '1px solid rgba(0,212,255,0.3)'
                : '1px solid rgba(255,255,255,0.08)',
              fontSize: 14,
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              color: '#f4f4f5',
            }}>
              {msg.role === 'assistant' && (
                <div style={{ fontSize: 11, color: '#00d4ff', marginBottom: 6, fontWeight: 600 }}>
                  ⚡ Claude
                </div>
              )}
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '12px 16px', borderRadius: '16px 16px 16px 4px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <Weld.Spinner />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: 16, paddingBottom: 16,
        display: 'flex', gap: 8,
      }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describí qué querés automatizar... (Enter para enviar, Shift+Enter para nueva línea)"
          rows={2}
          style={{
            flex: 1, padding: '10px 14px', borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.05)',
            color: '#f4f4f5', fontSize: 14, resize: 'none',
            fontFamily: 'inherit', lineHeight: 1.5,
            outline: 'none',
          }}
        />
        <Weld.Button
          variant="primary"
          neon={{ color: '#00d4ff', intensity: 1 }}
          action={sendMessage}
          style={{ alignSelf: 'flex-end', height: 44, paddingInline: 20 }}
        >
          Enviar ➤
        </Weld.Button>
      </div>
    </div>
  )
}

// ── Página de Workflows ────────────────────────────────────────────
function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string | null>(null)

  const fetchWorkflows = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/workflows`)
      const json = await res.json()
      setWorkflows(json.data ?? [])
    } catch (e) {
      setError('Error al conectar con el backend')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchWorkflows() }, [])

  if (loading) return <Weld.Spinner />
  if (error)   return <Weld.Text variant="danger">{error}</Weld.Text>

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <Weld.Section
        title="Workflows"
        description={`${workflows.length} workflows encontrados en n8n`}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <Weld.Button size="sm" variant="ghost" action={() => { fetchWorkflows(); return Promise.resolve() }}>
            🔄 Actualizar
          </Weld.Button>
        </div>
        <Weld.Grid cols={1} gap={12} style={{ marginTop: 24 }}>
          {workflows.map(wf => (
            <WorkflowCard key={wf.id} workflow={wf} onRefresh={fetchWorkflows} />
          ))}
        </Weld.Grid>
      </Weld.Section>
    </div>
  )
}

// ── Tarjeta de un Workflow ─────────────────────────────────────────
function WorkflowCard({ workflow, onRefresh }: { workflow: Workflow; onRefresh: () => void }) {
  const [inputData, setInputData] = useState('{}')
  const [result, setResult]       = useState<string | null>(null)

  const handleActivate = async () => {
    await fetch(`${API_URL}/workflows/${workflow.id}/activate`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !workflow.active }),
    })
    onRefresh()
  }

  const handleExecute = async () => {
    let parsed = {}
    try { parsed = JSON.parse(inputData) } catch { parsed = {} }
    const res = await fetch(`${API_URL}/workflows/${workflow.id}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: parsed }),
    })
    const json = await res.json()
    setResult(JSON.stringify(json, null, 2))
  }

  return (
    <Weld.Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Weld.Heading level={4}>{workflow.name}</Weld.Heading>
          <Weld.Text variant="muted" style={{ fontSize: 12, marginTop: 4 }}>
            ID: {workflow.id} · Actualizado: {new Date(workflow.updatedAt).toLocaleString()}
          </Weld.Text>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Weld.Badge variant={workflow.active ? 'success' : 'warning'} dot>
            {workflow.active ? 'Activo' : 'Inactivo'}
          </Weld.Badge>
          <Weld.Button
            size="sm"
            variant={workflow.active ? 'danger' : 'secondary'}
            action={handleActivate}
          >
            {workflow.active ? 'Desactivar' : 'Activar'}
          </Weld.Button>
        </div>
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <Weld.Text variant="muted" style={{ fontSize: 12, marginBottom: 4 }}>Datos de entrada (JSON)</Weld.Text>
          <input
            value={inputData}
            onChange={e => setInputData(e.target.value)}
            style={{
              width: '100%', padding: '6px 10px', borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)',
              color: 'inherit', fontFamily: 'monospace', fontSize: 13,
            }}
          />
        </div>
        <Weld.Button
          size="sm" variant="primary"
          neon={{ color: '#00d4ff', intensity: 0.7 }}
          action={() => { handleExecute(); return Promise.resolve() }}
        >
          ▶ Ejecutar
        </Weld.Button>
      </div>

      {result && (
        <pre style={{
          marginTop: 12, padding: 12, borderRadius: 6,
          background: 'rgba(0,0,0,0.3)', fontSize: 12,
          overflowX: 'auto', color: '#a1ffae',
        }}>
          {result}
        </pre>
      )}
    </Weld.Card>
  )
}

// ── Página de Ejecuciones ──────────────────────────────────────────
function ExecutionsPage() {
  const response = useMemo(() => api.get('executions', ExecutionsResponseSchema), [])
  const { data, loading, error } = useWeld(response)

  if (loading) return <Weld.Spinner />
  if (error)   return <Weld.Text variant="danger">Error al cargar ejecuciones</Weld.Text>

  const executions = data?.data ?? []

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <Weld.Section
        title="Historial de Ejecuciones"
        description={`${executions.length} ejecuciones registradas`}
      >
        <Weld.Grid cols={1} gap={8} style={{ marginTop: 24 }}>
          {executions.map(ex => (
            <Weld.Card key={ex.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <Weld.Text style={{ fontWeight: 600 }}>Ejecución #{ex.id}</Weld.Text>
                  <Weld.Text variant="muted" style={{ fontSize: 12, marginTop: 2 }}>
                    Inicio: {new Date(ex.startedAt).toLocaleString()} · Modo: {ex.mode}
                  </Weld.Text>
                </div>
                <Weld.Badge variant={ex.status === 'success' ? 'success' : ex.status === 'error' ? 'danger' : 'warning'} dot>
                  {ex.status}
                </Weld.Badge>
              </div>
            </Weld.Card>
          ))}
        </Weld.Grid>
      </Weld.Section>
    </div>
  )
}
