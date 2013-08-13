var fja = fja || {};

fja.gameControl = (function () {
    "use strict";

    var beginPlayMsgCallbackId = -1,
        gameOverMsgCallbackId = -1,
        collisionCheckCallbackId = -1,
        currentLevelDrawCallbackId = -1,
        currentLevel = 0,
        playing = false,
        gameStartDelay = 3500;


    return {
        prepareForPlay: prepeareForPlay
    };


    function prepeareForPlay() {
        fja.canvas.onclick = beginPlay;

        if (gameOverMsgCallbackId !== -1) {
            stopGivenRenderPrepId(gameOverMsgCallbackId);
        }

        beginPlayMsgCallbackId = fja.screen.addToRenderPreperation(drawBeginPlayMsg);

        if (currentLevelDrawCallbackId === -1) {
            currentLevelDrawCallbackId = fja.screen.addToRenderPreperation(drawCurrentLevel);
        }
    }

    function drawBeginPlayMsg() {
        var xPos = fja.canvas.width / 2,
            yPos = fja.canvas.height / 2;

        fja.canvasContext.font = "bold 22px";
        fja.canvasContext.fillStyle = "#FFFFFF";
        fja.canvasContext.textAlign = "center";
        fja.canvasContext.fillText("Click to start game", xPos, yPos);
    }

    function beginPlay() {
        stopGivenRenderPrepId(beginPlayMsgCallbackId);
        fja.playerControl.initPlayer();
        fja.enemyControl.startSpawn();
        collisionCheckCallbackId = fja.screen.addToRenderPreperation(collisionCheck);
        fja.canvas.onclick = "";
        playing = true;
    }

    function collisionCheck() {
        if (fja.enemyControl.checkForCollision(fja.playerControl.playerSprite)) {
            endPlay();
        }
    }

    function drawCurrentLevel() {
        if (playing) {
            currentLevel = fja.enemyControl.currentLevel;
        }

        fja.canvasContext.font = "bold 22px";
        fja.canvasContext.fillStyle = "#FFFFFF";
        fja.canvasContext.textAlign = "left";
        fja.canvasContext.textBaseline = "top";
        fja.canvasContext.fillText("Level: " + currentLevel, 0, 0);
    }

    function endPlay() {
        stopGivenRenderPrepId(collisionCheckCallbackId);

        fja.enemyControl.stopSpawn();
        fja.playerControl.deInitPlayer();
        fja.screen.clearScreen();

        playing = false;
        gameOverMsgCallbackId = fja.screen.addToRenderPreperation(drawGameOverMsg);

        setTimeout(prepeareForPlay, gameStartDelay);
    }

    function drawGameOverMsg() {
        var xPos = fja.canvas.width / 2,
            yPos = fja.canvas.height / 2;

        fja.canvasContext.fontSize = "36px";
        fja.canvasContext.fillStyle = "#FFFFFF";
        fja.canvasContext.textAlign = "center";
        fja.canvasContext.fillText("Game Over", xPos, yPos);
    }

    function stopGivenRenderPrepId(renderPrepID) {
        fja.screen.removeFromRenderPreperation(renderPrepID);
    }
})();
