var sja = sja || {};

sja.ajax = function(method, url, cb) {
    "use strict";

    var req = new XMLHttpRequest(),
        nonCacheURL = url + "?" + (new Date()).getTime();

    req.onload = function() {
        var res = this.response;

        if (this.getResponseHeader("Content-Type") == "application/json") {
            res = JSON.parse(res);
        }

        cb(this.status, res);
    };

    req.open(method, nonCacheURL, true);
    req.send();
};
