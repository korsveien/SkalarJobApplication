var fja = fja || {};

fja.screen = (function() {
    "use strict";

    var renderPreperationCallbacks = [],
        renderList = [],
        originalCanvasWidth = 480,
        originalCanvasHeight = 840,
        canvasWidthScale = 0,
        canvasHeightScale = 0,
        generalPurposeUniqueId = 0;


    return {
        get canvasWidth() { return fja.canvas.width; },
        get canvasHeight() { return fja.canvas.height; },
        get canvasWidthScale() { return canvasWidthScale; },
        get canvasHeightScale() { return canvasHeightScale; },

        addToRenderList: addToRenderList,
        removeFromRenderList: removeFromRenderList,
        addToRenderPreperation: addToRenderPreperation,
        removeFromRenderPreperation: removeFromRenderPreperation,
        render: render,
        clearScreen: clearScreen,
        calculateCanvasScale: calculateCanvasScale
    };


    function addToRenderList(renderableObject) {
        renderableObject.__id__ = generalPurposeUniqueId;
        renderList.push(renderableObject);
        generalPurposeUniqueId++;

        return renderableObject.__id__;
    }

    function removeFromRenderList(id) {
        for (var i = 0; i < renderList.length; i++) {
            if (renderList[i].__id__ === id) {
                renderList.splice(i, 1);
                return;
            }
        }
    }

    function addToRenderPreperation(callback) {
        callback.__id__ = generalPurposeUniqueId;
        renderPreperationCallbacks.push(callback);
        generalPurposeUniqueId++;

        return callback.__id__;
    }

    function removeFromRenderPreperation(id) {
        for (var i = 0; i < renderPreperationCallbacks.length; i++) {
            if (renderPreperationCallbacks[i].__id__ === id) {
                renderPreperationCallbacks.splice(i, 1);
                return;
            }
        }
    }

    function renderPreperation() {
        var i,
            len = renderPreperationCallbacks.length;

        for (i = 0; i < len; i++) {
            renderPreperationCallbacks[i]();
        }
    }

    function render() {
        var i,
            len = renderList.length;

        fja.canvasContext.fillStyle = "#000000";
        fja.canvasContext.fillRect(0, 0, fja.screen.canvasWidth, fja.screen.canvasHeight);

        renderPreperation();

        for (i = 0; i < len; i++) {
            renderList[i].render();
        }
    }

    function clearScreen() {
        renderList = [];
    }

    function calculateCanvasScale() {
        canvasWidthScale = fja.canvas.width / originalCanvasWidth;
        canvasHeightScale = fja.canvas.height / originalCanvasHeight;
    }
})();
