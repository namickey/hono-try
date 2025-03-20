import { Hono } from 'hono'
import {KVNamespace, D1Database} from '@cloudflare/workers-types'

type Bindings = {
  MY_KV: KVNamespace
  MY_DB: D1Database
}

const app = new Hono<{ Bindings: Bindings}>()

app.get('/a', async (c) => {
  const message = await c.env.MY_KV.get("message")
  return c.text(message || "No message found")
})

app.get('/put', (c) => {
  c.env.MY_KV.put("message", "Hello World!")
  return c.text('put complete.')
})

app.get('/customer/:id', async (c) => {
  const id = c.req.param('id');
  const  { results } = await c.env.MY_DB.prepare("select * from Customers where CustomerId = ?").bind(id).all();
  console.log(results)
  return c.json({Customer:results})
})

app.get('/customers', async (c) => {
  const  { results } = await c.env.MY_DB.prepare("select * from Customers").run();
  return c.json({Customer:results})
})

export default app
