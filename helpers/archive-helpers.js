var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var util = require('util');
var requestMod = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf8', function(error, text){
    if(error){
      console.error(error);
    }else{
      var urls = text.split('\n');
      callback(urls);
    }
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(urls) {
    callback(_.indexOf(urls,url) !== -1);
  })
};

exports.addUrlToList = function(url, callback){
  //call isUrlInList
  //if not, then append url to file
  exports.isUrlInList(url, function(isInList) {
    if (!isInList) {
      fs.appendFile(exports.paths.list, url + '\n', function(err, data) {
        if (err) {
          console.error(err)
        } else {
          callback();
        }
      });
    }
  });
};

exports.isUrlArchived = function(url, callback){
  fs.readdir(exports.paths.archivedSites, function(error, files){
    if(error){
      console.error(error);
    }else{
      callback(_.indexOf(files, url)!== -1);
    }
  });
};

exports.downloadUrls = function(urlArray){
  _.each(urlArray, function(url) {
    requestMod('http://' + url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        fs.writeFile(exports.paths.archivedSites + '/' + url, body);
      }
    });
  });
};
