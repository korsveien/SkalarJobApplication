var sja = sja || {};

sja.screen = (function() {
    "use strict";

    var renderPreperationCallbacks = [],
        renderList = [],
        originalCanvasWidth = 480,
        originalCanvasHeight = 840,
        canvasWidthScale = 0,
        canvasHeightScale = 0,
        generalPurposeUniqueId = 0;


    return {
        get canvasWidth() { return sja.canvas.width; },
        get canvasHeight() { return sja.canvas.height; },
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

    function render() {
        sja.canvasContext.fillStyle = "#000000";
        sja.canvasContext.fillRect(0, 0, sja.screen.canvasWidth, sja.screen.canvasHeight);

        renderPreperationCallbacks.forEach(function(cb) {
            cb();
        });

        renderList.forEach(function(renderable) {
            renderable.render();
        });
    }

    function clearScreen() {
        renderList.length = 0;
    }

    function calculateCanvasScale() {
        canvasWidthScale = sja.canvas.width / originalCanvasWidth;
        canvasHeightScale = sja.canvas.height / originalCanvasHeight;
    }
})();
