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
	console.log("Hello intent");
    agent.add('Welcome to my agent!')
  }

  let intentMap = new Map()
  intentMap.set('Default Welcome Intent', welcome)
  agent.handleRequest(intentMap)
})

app.use('/', router);

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
server.listen(port, () => {
    console.log(`sex2gis app is running on port ${port}`);
})
