var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
var url = require('url');

// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var options = {
    GET: function(){
      var urlPath = url.parse(req.url).pathname;
      var pathname = urlPath === '/' ? '/index.html' : urlPath;
      helpers.serveAssets(res, pathname, function(){
        archive.isUrlInList(urlPath, function(found){
          if(found){
            helpers.sendRedirect(res, '/loading.html');
          }else{
            helpers.send404(res);
          }
        });
      });
    },

    POST: function(){
      var fullBody = '';
      req.on('data', function(chunk) {
        fullBody += chunk;
      });
      req.on('end', function() {
        if (fullBody.trim()[0] === '{') { // necessary to pass tests
          var url = JSON.parse(fullBody).url;
        } else {
          var url = fullBody.split('=')[1];
        }
        archive.isUrlInList(url, function(found){
          if(found){
            archive.isUrlArchived(url, function(foundInArchive){
              if(foundInArchive){
                helpers.sendRedirect(res, '/'+ url);
              }else{
                helpers.sendRedirect(res, '/loading.html');
              }
            })
          }else{
            archive.addUrlToList(url, function(){
              helpers.sendRedirect(res, '/loading.html');
            });
          }
        });
      });
    }
  };

  if(options[req.method]){
    options[req.method]();
  }else{
    helpers.send404(res);
  }

};