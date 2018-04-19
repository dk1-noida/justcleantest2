'user strict'

var FCM = require('fcm-node');
var config = require('../../config/env/'+process.env.NODE_ENV);
var fcm = new FCM(config.notification.serverkey);


module.exports = {
    /*
        API:Push notification from firebase
        Noorulameen
    */

    pushmsg: function (params, next) {
        var message = {
            to: 'registration_token',
            data: {  //you can send only notification or only data(or include both)
                title: 'Heloo',
                message: 'Test notification from nodeserver'
            }
        }

        fcm.send(message, function (err, response) {
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
   }
}
