
## プロジェクト作成

```shell
npm create hono@latest hono-d1
npm i wrangler@latest

overrides cookie
https://stackoverflow.com/questions/79073122/how-to-handle-cookie-vulnerability-in-supabase-ssr-cookie-0-7-0

npm install
npm audit

npm install -g wrangler
wrangler login
```

## KV
https://enuesaa.dev/posts/cloudflare-workers-hono-kv  

```shell
#KV作成コマンドが新しくなった。
wrangler kv namespace create MY_KV
wrangler kv namespace create MY_KV --preview
```

wrangler.jsonc
```jsonc
"kv_namespaces": [
  {
    "binding": "MY_KV",
    "id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "preview_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }
]
```

index.ts
```ts
import {KVNamespace} from '@cloudflare/workers-types'

type Bindings = {
  MY_KV: KVNamespace
}

const app = new Hono<{ Bindings: Bindings}>()

app.get('/', async (c) => {
  const message = await c.env.MY_KV.get("message")
  return c.text(message || "No message found")
})

app.get('/put', (c) => {
  c.env.MY_KV.put("message", "Hello World!")
  return c.text('put complete.')
})
```

## D1

https://developers.cloudflare.com/d1/get-started/  
https://qiita.com/kizitorashiro/items/60724c5d745ae26a1c23#hono--cloudflare-workers%E3%81%8B%E3%82%89d1%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%BF%E3%82%8B  
https://zenn.dev/shinryuzz/articles/cloudflare-d1-w-hono-n-drizzle  

```shell
wrangler d1 create mydb
```

wrangler.jsonc
```jsonc
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "mydb",
      "database_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
  ]
```

create table
```shell
wrangler d1 execute mydb --local --file=./schema.sql
wrangler d1 execute mydb --local --command="SELECT * FROM Customers"

wrangler d1 execute mydb --remote --file=./schema.sql
wrangler d1 execute mydb --remote --command="SELECT * FROM Customers"
```

index.ts
```ts
import {KVNamespace, D1Database} from '@cloudflare/workers-types'

type Bindings = {
  MY_KV: KVNamespace
  MY_DB: D1Database
}

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
```

## コマンド

```
npm install
npm run dev
```

```
npm run deploy
```
