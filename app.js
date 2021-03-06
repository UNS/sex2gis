const { WebhookClient } = require('dialogflow-fulfillment');

var server = require('http').createServer()
		, url = require('url')
		, WebSocketServer = require('ws').Server
		, wss = new WebSocketServer({server: server})
		, express = require('express')
		, app = express()
		, port = 8080;
const BodyParser = require('body-parser')

server.on('request', app);
const router = express.Router();

router.use(BodyParser.urlencoded({extended: true}));
router.use(BodyParser.json());

router.post('/dialogflow', express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })

  function welcome () {
  console.log("send message");
  if (client != null) {
    client.send("hello");
  }
    agent.add('посмотри на карту')
  }

  let intentMap = new Map()
  intentMap.set('Route', welcome)
  agent.handleRequest(intentMap)
})

app.use('/', router);

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
server.listen(port, () => {
    console.log(`sex2gis app is running on port ${port}`);
});

var client;
wss.on('connection', function connection(ws) {
    console.log('Hello');
    client = ws;
    ws.on('message', function incoming(message) {
        console.log("Message [" + message + "] ");
    });

    ws.on('close', function close() {
        ws.send("Bye\r\n");
        client = null;
        console.log('disconnected');
        ws.close();
    });
});

