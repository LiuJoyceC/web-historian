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

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  if (res.statusCode === 200) {
    asset = asset === '/' ? './web/public/index.html' : archive.paths.archivedSites + '/' + asset;
  }

  //asset = asset === '/' ? './web/public/index.html' : asset;
  fs.readFile(asset, 'utf8', function(err, html){
    console.log(html);
    if(err){
      res.writeHead(404);
    }

    res.end(html);  //res.write(asset)??
    // we want to write the c ontents o the h tm-
  })
//oh yeah
// and we don't want to use url.parse and passing that in as asset,
// because asset needs to be a string, not an object
// now that we have ./web, it's no longer logging undefined. now
// html is defined. for some reason, the readfile is using our root
// file as the reference, not the folder that this file is in
//k

// ok we're passing the first test now. I guess we do actually have to
// use res.end here.
//so we passed 2 tests now :) 1st n last

};



// As you progress, keep thinking about what helper functions you can put here!
