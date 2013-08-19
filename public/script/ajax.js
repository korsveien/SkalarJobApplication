var sja = sja || {};

sja.ajax = function(method, url, res) {
    "use strict";

    var req = new XMLHttpRequest(),
        nonCacheURL = url + "?" + (new Date()).getTime();

    req.onload = function() {
        res(this.status, this.response);
    };

    req.open(method, nonCacheURL, true);
    req.send();
};
