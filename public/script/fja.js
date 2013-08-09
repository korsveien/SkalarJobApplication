var fja = fja || {};

fja.init = function() {
    "use strict";

    fja.canvas = document.getElementById("canvas");
    fja.canvasContext = fja.canvas.getContext("2d");
    fja.screen.calculateCanvasScale();

    setInterval(fja.screen.render, 10);

    fja.gameControl.prepareForPlay();
};
