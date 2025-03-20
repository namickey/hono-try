## プロジェクト作成

```shell
npm create hono@latest waka-mail
npm i wrangler@latest

overrides cookie
https://stackoverflow.com/questions/79073122/how-to-handle-cookie-vulnerability-in-supabase-ssr-cookie-0-7-0

npm install
npm audit

npm install -g wrangler
wrangler login
```

```shell
wrangler d1 execute mydb --local --file=./schema.sql
wrangler d1 execute mydb --local --command="SELECT id, name, message, datetime(date, 'localtime') as date FROM chat"

wrangler d1 execute mydb --remote --file=./schema.sql
wrangler d1 execute mydb --remote --command="SELECT id, name, message, datetime(date, 'localtime') as date FROM chat"
```

```
npm install
npm run dev
```

```
npm run deploy
```
