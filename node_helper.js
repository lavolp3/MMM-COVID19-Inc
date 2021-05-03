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
        this.config = payload;
        this.log("Socket Notification received. Title: "+notification+", Payload: "+payload);
        if (notification == "INC_REQUEST") {
            var apiBase = "https://api.corona-zahlen.org/districts/history/incidence/";
            var url = apiBase + this.config.days;
            this.log(url);
            this.getData(url);
        }
    },

    getData: function(url) {
        var self = this;
        request(url, function (error, response, body) {
            if (error) throw new Error(error);
            self.log(body);
            self.sendSocketNotification("INC_DATA", JSON.parse(body));
        });
    },

    log: function (msg) {
        if (this.config && this.config.debug) {
            console.log(this.name + ": ", (msg));
        }
    }
});
