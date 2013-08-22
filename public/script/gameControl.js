var sja = sja || {};

sja.gameControl = (function () {
    "use strict";

    var beginPlayMsgCallbackId = -1,
        gameOverMsgCallbackId = -1,
        collisionCheckCallbackId = -1,
        currentLevelDrawCallbackId = -1,
        gameStarted = null,
        currentScore = 0,
        playing = false,
        gameStartDelay = 3500;


    return {
        prepareForPlay: prepeareForPlay
    };


    function prepeareForPlay() {
        sja.canvas.onclick = beginPlay;

        if (gameOverMsgCallbackId !== -1) {
            stopGivenRenderPrepId(gameOverMsgCallbackId);
        }

        beginPlayMsgCallbackId = sja.screen.addToRenderPreperation(drawBeginPlayMsg);

        if (currentLevelDrawCallbackId === -1) {
            currentLevelDrawCallbackId = sja.screen.addToRenderPreperation(drawCurrentLevel);
        }
    }

    function drawBeginPlayMsg() {
        var xPos = sja.canvas.width / 2,
            yPos = sja.canvas.height / 2;

        sja.canvasContext.font = "12pt sans-serif";
        sja.canvasContext.fillStyle = "#FFFFFF";
        sja.canvasContext.textAlign = "center";
        sja.canvasContext.fillText("Click to start new game", xPos, yPos);
    }

    function beginPlay() {
        stopGivenRenderPrepId(beginPlayMsgCallbackId);
        sja.playerControl.initPlayer();
        sja.enemyControl.startSpawn();

        collisionCheckCallbackId = sja.screen.addToRenderPreperation(collisionCheck);
        sja.canvas.onclick = "";

        playing = true;
        gameStarted = Date.now();
    }

    function collisionCheck() {
        if (sja.enemyControl.checkForCollision(sja.playerControl.playerSprite)) {
            endPlay();
        }
    }

    function drawCurrentLevel() {
        if (!playing) {
            return;
        }

        currentScore = Math.floor((Date.now() - gameStarted) / 100);

        sja.canvasContext.font = "12pt sans-serif";
        sja.canvasContext.fillStyle = "#FFFFFF";
        sja.canvasContext.textAlign = "left";
        sja.canvasContext.textBaseline = "top";
        sja.canvasContext.fillText("Level: " + currentScore, 0, 0);
    }

    function endPlay() {
        stopGivenRenderPrepId(collisionCheckCallbackId);

        sja.enemyControl.stopSpawn();
        sja.playerControl.deInitPlayer();
        sja.screen.clearScreen();

        playing = false;
        gameOverMsgCallbackId = sja.screen.addToRenderPreperation(drawGameOverMsg);

        sja.highscores.registerHighscore(currentScore);

        setTimeout(prepeareForPlay, gameStartDelay);
    }

    function drawGameOverMsg() {
        var xPos = sja.canvas.width / 2,
            yPos = sja.canvas.height / 2;

        sja.canvasContext.font = "12pt sans-serif";
        sja.canvasContext.fillStyle = "#FFFFFF";
        sja.canvasContext.textAlign = "center";
        sja.canvasContext.fillText("Game Over", xPos, yPos);
    }

    function stopGivenRenderPrepId(renderPrepID) {
        sja.screen.removeFromRenderPreperation(renderPrepID);
    }
})();
