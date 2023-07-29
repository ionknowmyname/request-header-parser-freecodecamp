// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.set('trust proxy', true);

app.use((req, res, next) => {

  const ip = req.ip || req.socket.remoteAddress;

  const language = req.headers['accept-language'];

  const userAgent = req.headers['user-agent'];

  req.clientInfo = { ip, language, userAgent };

  // console.log({ conection: req.connection });
  console.log({ socket: req.socket.remoteAddress });
  console.log({ ip: req.ip });
  console.log({ testing: req.clientInfo });
  // console.log({ req });

  next();
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', function (req, res) {
  const { ip, language, userAgent } = req.clientInfo;
  res.json({
    ipaddress: ip,
    language,
    software: userAgent,
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
