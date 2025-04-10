import { Hono } from 'hono'
import { KVNamespace, D1Database } from '@cloudflare/workers-types'

type Bindings = {
  MY_KV: KVNamespace
  MY_DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/list', async (c) => {
  const { results } = await c.env.MY_DB.prepare("select id, name, message, strftime('%m/%d %H:%M', datetime(date, 'localtime')) as date from chat").run();
  const chatList = results.map((chat: any) => {
    return <li key={chat.id}>{chat.name} {chat.date} {chat.message}</li>
  })
  return c.html(<ul>{chatList}</ul>)
})

app.post('/talk1', async (c) => {
  const chat = String((await c.req.parseBody())['talkText'])
  await insertMessage(c, 'わか', chat)
  return createRedirect()
})

app.post('/talk2', async (c) => {
  const chat = String((await c.req.parseBody())['talkText'])
  await insertMessage(c, 'まま', chat)
  const url = await c.env.MY_KV.get("pushurl")
  const result = await fetch(String(url))
  console.log(await result.text())
  return createRedirect()
})

app.post('/talk3', async (c) => {
  const chat = String((await c.req.parseBody())['talkText'])
  await insertMessage(c, 'ちち', chat)
  const url = await c.env.MY_KV.get("pushurl")
  const result = await fetch(String(url))
  console.log(await result.text())
  return createRedirect()
})

async function insertMessage(c: any, who: string, message: string) {
  const { results } = await c.env.MY_DB.prepare("select (max(id) + 1) as id from chat").run();
  console.log(results.id)
  await c.env.MY_DB.prepare("INSERT INTO chat (id, name, message, date) VALUES (?, ?, ?, CURRENT_TIMESTAMP)").bind(Number(results.id), who, message).run();
  await c.env.MY_DB.prepare("DELETE FROM chat WHERE id NOT IN (SELECT id FROM chat ORDER BY id DESC LIMIT 5)").run();
}

app.post('/pushsub', async (c) => {
  const subscription = JSON.stringify(await c.req.json())
  await c.env.MY_DB.prepare("INSERT INTO sub (name, pushsub, date) VALUES (?, ?, CURRENT_TIMESTAMP)").bind('waka', subscription).run();
  return createRedirect()
})

app.post('/reset', async (c) => {
  await c.env.MY_DB.prepare("delete from chat").run();
  return createRedirect()
})

function createRedirect() {
  return new Response(null, {
    status: 204,
    headers: {
      'HX-Redirect': '/',
    }
  });
}

export default app
