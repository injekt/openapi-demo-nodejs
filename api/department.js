var querystring = require("querystring");
var httpUtil = require('../util/http');

module.exports = {
  
  create: function(accessToken, dept, cb) {
    var path = '/department/create?' + querystring.stringify({
      access_token: accessToken,
    });
    httpUtil.post(path, JSON.stringify(dept), cb);
  },
  
  list: function(accessToken, cb) {
    var path = '/department/list?' + querystring.stringify({
      access_token: accessToken,
    });
    httpUtil.get(path, cb);
  },
  
  delete: function(accessToken, id, cb) {
    var path = '/department/delete?' + querystring.stringify({
      access_token: accessToken,
      id: id,
    });
    httpUtil.get(path, cb);
  }
};