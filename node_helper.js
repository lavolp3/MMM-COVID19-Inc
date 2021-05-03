var NodeHelper = require('node_helper');
var request = require('request');
var moment = require('moment');

module.exports = NodeHelper.create({

    // Override start method.
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    // Override socketNotificationReceived method.
    socketNotificationReceived: function(notification, payload) {
        this.log("Socket Notification received. Title: "+notification+", Payload: "+payload);
        if (notification == "INC_REQUEST") {
            var url = payload.apiBase + payload.days;
            console.log(url);
            this.getData(url);
        }
    },

    getData: function(url) {
        var self = this;
        request(url, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
            self.sendSocketNotification("INC_DATA", JSON.parse(body));
        });
    },
        
    log: function (msg) {
        if (this.config && this.config.debug) {
            console.log(this.name + ": ", (msg));
        }
    }
});
