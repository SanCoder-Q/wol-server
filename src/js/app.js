import log from './util/log'
import express from 'express'
import bodyParser from 'body-parser'

const server = require('http').createServer(),
      app = express();

const defaultWolStatus = "";
let wolStatus = "";

app.use('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  log('OriginalUrl:', req.originalUrl);
  next();
});

app.get('/diagnostic', (req, res) => {
  res.send("ok");
});

app.get('/status', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(wolStatus);
});

app.use(bodyParser.text({type: '*/*'}));

app.post('/status', function (req, res) {
  wolStatus = req.body;
  setTimeout(() => {
    wolStatus = defaultWolStatus;
  }, 300 * 1000);
  res.send(`Status update to ${wolStatus} successfully.`)
})

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({message: "Help your self."}));
});

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.status(400).send(`Bad Request`);
});

server.on("request", app);

server.listen(5000, () => {
  log('Server listening on port http://0.0.0.0:5000');
});
