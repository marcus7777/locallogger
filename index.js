const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
app.use(cors())
app.use( express.static( __dirname + '/' ))

function rawBody(req, res, next) {
  req.setEncoding('utf8')
  req.rawBody = ''
  req.on('data', function(chunk) {
    req.rawBody += chunk
  })
  req.on('end', function(){
    next()
  })
}
app.use(rawBody)

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Access the parse results as request.body
app.post('/', cors(corsOptions), function(request, response){
  let body = JSON.parse(request.rawBody)
  console.log(body)
  if (body[0] === "log") {
    for (let i = 1; i < body.length; i++) {
      process.stdout.write("\x1b[31m", body[i], "\x1b[0m")
    }
  } else {
    console.log(body)
  }
})

app.get('/', cors(corsOptions), function (req, res, next) {
  res.sendFile( __dirname + '/log.js' );
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port} add <script src="http://localhost:${port}/"></script> to the page`)
})
