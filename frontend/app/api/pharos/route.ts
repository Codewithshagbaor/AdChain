import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const internalRpcUrl = 'https://devnet.dplabs-internal.com/'

  try {
    const response = await fetch(internalRpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Proxy RPC error:', err)
    return new Response(JSON.stringify({ error: 'Internal RPC call failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
