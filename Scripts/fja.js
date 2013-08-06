var fja = fja || {};

fja.canvas = undefined;
fja.canvasContext = undefined;

fja.init = function() {
    "use strict";

    fja.canvas = document.getElementById('canvas');
    fja.canvasContext = fja.canvas.getContext('2d');
    fja.screen.calculateCanvasScale();

    setInterval(fja.screen.render, 10);

    fja.menu.bindMenuItems();
    fja.menu.changeActiveMenuItem("applicationItem");
    fja.menu.changeActivePage("application");
    fja.gameControl.prepareForPlay();
};
