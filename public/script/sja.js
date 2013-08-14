var sja = sja || {};

sja.init = function() {
    "use strict";

    sja.canvas = document.getElementById("canvas");
    sja.canvasContext = sja.canvas.getContext("2d");
    sja.screen.calculateCanvasScale();

    setInterval(sja.screen.render, 10);

    sja.gameControl.prepareForPlay();
};
