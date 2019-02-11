var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var https = require('https'),
   httpProxy = require('http-proxy');



let server = http.createServer(function (request, response) {

   var pathname = url.parse(request.url).pathname;


   console.log("Request for " + pathname.substr(1) + " received.");


   fs.readFile(path.join("./public/", pathname.substr(1)), function (err, data) {
      if (err) {
         console.log(err);
         response.writeHead(404, { 'Content-Type': 'text/html' });
      } else {

         if (pathname == "/child.html") {
            response.writeHead(200, {
               'Content-Type': 'text/html',
               'X-Frame-Options': 'allow-from http://localhost'
            });
         } else if (pathname == "/childchild.html") {
            response.writeHead(200, {
               'Content-Type': 'text/html',
               'X-Frame-Options': 'allow-from http://localhost'
            });
         } else {
            response.writeHead(200, {
               'Content-Type': 'text/html',
               'X-Frame-Options': 'DENY'
            });
         }



         response.write(data.toString());
      }

      response.end();
   });
});
console.log("Access the parent page here http://localhost/parent.html");
server.listen(80);

