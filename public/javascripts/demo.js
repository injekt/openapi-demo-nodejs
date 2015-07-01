window.addEventListener('load', function() {
  var logger = $('#log');
  
  logger.i = function(tag, api, msg) {
    this.append('<div class="log-i">' + 
      '<span class="tag">' + tag + '</span>' + 
      '<span class="api">' + api + '</span>' + 
      '<span>'+ msg + '</span></div>');
  };
  
  logger.e = function(tag, api, msg) {
    this.append('<div class="log-e">' + 
      '<span class="tag">' + tag + '</span>' + 
      '<span class="api">' + api + '</span>' + 
      '<span>'+ msg + '</span></div>');
  };
  
  run(logger);
});

function run(logger) {
  get(
    'getapis', 
    function(data) {
      var apiMap = data.msg.map;
      var sequence = data.msg.sequence.reverse();
      var next;
      for (var i in sequence) {
        var apiPath = sequence[i];
        var apiTag = apiMap[apiPath].tag;
        next = (function(_apiPath, _apiTag, _next) {
          return function() {
            get(_apiPath, function(data) {
              if (data.err) {
                logger.e(_apiTag, _apiPath, data.err);
              }
              else {
                logger.i(_apiTag, _apiPath, data.msg);
              }
              if (_next) {
                _next();
              }
            }, function(err) {
              logger.e(_api, _apiPath, err);
            });
          };
        }) (apiPath, apiTag, next);
      }
      next();
    }, 
    function(err) {
      logger.e('error: cannot get test api list');
    });
}


function get(url, onSuccess, onFail) {
  $.ajax({
    url: url,
    type: 'GET',
    success: function(data, status, xhr) {
      onSuccess(JSON.parse(data));
    },
    error: function(xhr, errorType, error) {
      onFail(errorType + ', ' + error);
    }
  });
}