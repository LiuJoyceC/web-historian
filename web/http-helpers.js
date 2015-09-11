var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

// As you progress, keep thinking about what helper functions you can Iput

exports.sendResponse = function(res, html, statusCode){
  if(!statusCode){
    statusCode = 200;
  }
  res.writeHead(statusCode, headers);
  res.end(html);
}

exports.send404 = function(res){
  this.sendResponse(res, "404 not found", 404);
}

exports.sendRedirect = function(res, location, statusCode){
  if(!statusCode){
    statusCode = 302;
  }

  res.writeHead(statusCode, {Location: location});
  res.end();
}


exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  //check public
    //if !found, check archive && found =>  sendResponse ;
      //else sendResponse
      //!found anywhere call callback
        //if no callback, send 404

  fs.readFile(archive.paths.siteAssets + asset, 'utf8', function(err, html){
    if(err){
      fs.readFile(archive.paths.archivedSites + asset, 'utf8', function(err, html){
        if(err){
          if(callback){
            callback();
          }else{
            exports.send404(res);
          }
        }else{
          exports.sendResponse(res, html);
        }
      });

    }else{
      exports.sendResponse(res, html);
    }
  });
};


