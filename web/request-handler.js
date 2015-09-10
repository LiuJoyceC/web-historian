var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
var url = require('url');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(req.method + 'hellooooooo');
  if (req.method === 'POST') {
      var fullBody = '';
      req.on('data', function(chunk) {
        fullBody += chunk;
        var urlObj = JSON.parse(fullBody);
        fs.appendFileSync(archive.paths.list, urlObj.url + '\n' );
        console.log('Im being run here!!!!');
        res.writeHead(302, helpers.headers);
        res.end();
      });
  }

  //res.writeHead(200, helpers.headers);
  //var pathname = req.url === '/' ? './web/public/index.html' : './archives/sites/' + req.url;
  if(req.method === 'GET'){
    helpers.serveAssets(res, req.url);
  }
  //res.end(archive.paths.list);

  //res.write('helloooooo');
  //res.end('helloooo');
};