/**
 * Created by liqiao on 7/15/15.
 */

var crypto = require('crypto');

var auth = require('../api/auth');



var sign = {
    getJsapiSign: function(params) {
        var plain = 'jsapi_ticket=' + params.ticket + '&noncestr=' + params.nonceStr +
            '&timestamp=' + params.timeStamp + '&url=' + params.url;
        console.log(plain);
        var sha1 = crypto.createHash('sha1');
        sha1.update(plain, 'utf8');
        return sha1.digest('hex');
    },

    getSign: function(params, cb) {
        auth.getAccessToken({
            success: function(data) {
                if (data && data.access_token) {
                    accessToken = data.access_token;
                    console.log('sign accessToken: ' + accessToken);
                    auth.getTicket(accessToken, {
                        success: function(data) {
                            if (data && data.ticket) {
                                jsapiTicket = data.ticket;
                                console.log('sign ticket: ' + jsapiTicket);
                                params.ticket = jsapiTicket;
                                var signature = sign.getJsapiSign(params);
                                console.log('sign signature:' + signature);
                                cb.success(signature);
                            }
                            else {
                                error('cannot get jsapi_ticket');
                            }
                        },
                        error: cb.error
                    });
                }
                else {
                    error('cannot get access_token');
                }
            },
            error: cb.error
        });
    }
};

module.exports = sign;
