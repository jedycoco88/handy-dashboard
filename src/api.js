const BASE = 'https://n8n.dy7io.com/webhook'

async function get(path) {
  const res = await fetch(`${BASE}/${path}`)
  if (!res.ok) throw new Error(`${path} ${res.status}`)
  return res.json()
}

export async function fetchPipeline() {
  return get('handy-pipeline')
}

export async function fetchConversations() {
  return get('handy-conversations')
}
