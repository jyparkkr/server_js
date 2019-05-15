const http = require('http'); // module 'http' is needed + http is returned.

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
// createServer method returns http Server: which is server in this code

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
// server is "http server" which created by .createServer
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
