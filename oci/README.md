## oci

## cmd

```sh
sudo dnf update

dnf module list nodejs
sudo dnf module install nodejs:22/common

sudo dnf install git
```

```sh
npm init --yes

npm i express
npm i web-push

```

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

```json
{
  ...
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ...
}
```