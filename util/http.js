var https = require("https");
var http = require('http');

var env = require("../api/env");

var oapiHost = 'oapi.dingtalk.com';
var debugHost = '10.218.141.241';


function handleGet(response, cb) {
  if (response.statusCode === 200) {
    var body = '';  
    response.on('data', function (data) {
      body += data; 
    }).on('end', function () { 
      var result = JSON.parse(body);
      if (result && 0 === result.errcode) {
        cb.success(result);
      }
      else {
        cb.error(result);
      }
    });  
  }
  else {
    cb.error(response.statusCode);
  }
}

function handlePost(response, cb) {
  if (response.statusCode === 200) {  
    var body = '';  
    response.on('data', function (data) {
      body += data; 
    }).on('end', function () { 
      var result = JSON.parse(body);
      if (result && 0 === result.errcode) {
        cb.success(result);
      }
      else {
        cb.error(result);
      }
    });  
  }  
  else {
    cb.error(response.statusCode);  
  }  
}

module.exports = {
  get: function(path, cb) {
    if (env.DEBUG) {
      http.get('http://' + debugHost + path, function(response) {
        handleGet(response, cb);
      });
    }
    else {
      https.get('https://' + oapiHost + path, function(response) {
        handleGet(response, cb);
      });
    }
  },

  post: function(path, data, cb) {
    var opt = {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      path: path,  
    };
    if (env.DEBUG) {
      opt.host = debugHost;
      opt.port = 7001;
      var req = http.request(opt, function(response) {
         handlePost(response, cb); 
      });
    }
    else {
      opt.host = oapiHost;
      var req = https.request(opt, function (response) {
        handlePost(response, cb);
      });
    }
    req.write(data + '\n');  
    req.end();  
  }
};