//Server Code
const http = require("http") //need to http
const fs = require("fs") //need to read and write files
const url = require("url") //to parse url strings

const { handleRegistration } = require("./registration");

const ROOT_DIR = "client" //dir to serve static files from

const MIME_TYPES = {
  css: "text/css",
  gif: "image/gif",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript", //should really be application/javascript
  json: "application/json",
  png: "image/png",
  svg: "image/svg+xml",
  txt: "text/plain"
}

function get_mime(filename) {
  //Get MIME type based on extension of requested file name
  //e.g. index.html --> text/html
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
      return MIME_TYPES[ext]
    }
  }
  return MIME_TYPES["txt"]
}

http.createServer(function(request, response) {
    var urlObj = url.parse(request.url, true, false)

    console.log("\n============================")
    console.log("PATHNAME: " + urlObj.pathname)
    console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)
    console.log("METHOD: " + request.method)

    var receivedData = ""

    //attached event handlers to collect the message data
    request.on("data", function(chunk) {
      receivedData += chunk
    })

    //event handler for the end of the message
    request.on("end", function() {
      //Handle the client POST requests
      //console.log('received data: ', receivedData);

    //If it is a POST request then we will check the data.
    if (request.method === "POST") {
        //Do this for all POST messages
        var dataObj = JSON.parse(receivedData)
        console.log("received data object: ", dataObj)
        console.log("type: ", typeof dataObj)
        console.log("USER REQUEST: " + dataObj.text)
        var returnObj = {}
        returnObj.text = "NOT FOUND: " + dataObj.text
      }


     if (request.method === "POST" && urlObj.pathname === "/register") {
        // Direct POST /register requests to the handleRegistration function
        handleRegistration(request, response);
     }
     else if (request.method === "POST") {
        //Not found or unknown POST request
        var returnObj = {};
        returnObj.text = "UNKNOWN REQUEST"
        response.writeHead(200, { "Content-Type": MIME_TYPES["json"] })
        response.end(JSON.stringify(returnObj))

      } 
      else if (request.method == "GET") {
        //handle GET requests as static file requests
        var filePath = ROOT_DIR + urlObj.pathname
        if (urlObj.pathname === "/")  { filePath = ROOT_DIR + "/studycircuit.html" }

        fs.readFile(filePath, function(err, data) {
          if (err) {
            //report error to console
            console.log("ERROR: " + JSON.stringify(err))
            //respond with not found 404 to client
            response.writeHead(404);
            response.end(JSON.stringify(err))
            return
          }
          response.writeHead(200, { "Content-Type": get_mime(filePath) })
          response.end(data)
        })
      }
      else {
        // Handle unsupported methods
        response.writeHead(405);
        response.end(JSON.stringify({error: "Method Not Allowed"}));
    }
    })
  })
  .listen(3000)

  console.log("Server Running at PORT 3000  CNTL-C to quit")
  console.log("To Test")
  console.log("http://localhost:3000/studycircuit.html")