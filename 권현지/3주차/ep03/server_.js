import http from 'http';
const hostname = 'localhost';
// const app = express();
const port = 3000;

const server = http.createServer((req,res) => {
  console.log('req',{
    url: req.url,
    method: req.method,
    headers: req.headers,
  })
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  console.log('Server running at http://localhost:${port}');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running ${hostname} at http://localhost:${port}`);
} );