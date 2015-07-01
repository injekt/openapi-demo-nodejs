var querystring = require("querystring");
var httpUtil = require('../util/http');
var env = require('./env');

module.exports = {
    
    getAccessToken: function(cb) {
      var path = '/gettoken?' + querystring.stringify({
        corpid: env.corpId,
        corpsecret: env.secret
      });
      httpUtil.get(path, cb);
    },
};