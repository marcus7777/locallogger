const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
app.use(cors())
app.use( express.static( __dirname + '/' ))

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post('/', cors(corsOptions), function(request, response){
  console.log(request.body);
})

app.get('/', cors(corsOptions), function (req, res, next) {
  res.sendFile( __dirname + '/log.js' );
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port} add <script src="http://localhost:${port}/"></script> to you page`)
})
