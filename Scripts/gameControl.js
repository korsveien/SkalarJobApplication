var fja = fja || {};

fja.gameControl = (function () {
    var _begin_play_msg_callback_id = -1,
        _game_over_msg_callback_id = -1,
        _collision_check_callback_id = -1,
        _current_level_draw_callback_id = -1,
        _current_level = 0,
        _playing = false,
        _game_start_delay_ms = 3500;


    return {
        prepareForPlay: _prepare_for_play
    };


    function _prepare_for_play() {
        fja.canvas.onclick = _begin_play;

        if (_game_over_msg_callback_id !== -1)
            _stop_given_render_prep(_game_over_msg_callback_id);

        _begin_play_msg_callback_id = fja.screen.addToRenderPreperation(_draw_begin_play_msg);

        if (_current_level_draw_callback_id === -1)
            _current_level_draw_callback_id = fja.screen.addToRenderPreperation(_draw_current_level);
    }

    function _draw_begin_play_msg() {
        var xPos = fja.canvas.width / 2,
            yPos = fja.canvas.height / 2;

        fja.canvasContext.font = "bold 22px";
        fja.canvasContext.fillStyle = "#FFFFFF";
        fja.canvasContext.textAlign = "center";
        fja.canvasContext.fillText("Click to start game", xPos, yPos);
    }

    function _begin_play() {
        _stop_given_render_prep(_begin_play_msg_callback_id);
        fja.playerControl.initPlayer();
        fja.enemyControl.startSpawn();
        _collision_check_callback_id = fja.screen.addToRenderPreperation(_collision_check);
        fja.canvas.onclick = "";
        _playing = true;
    }

    function _collision_check() {
        if (fja.enemyControl.checkForCollision(fja.playerControl.playerSprite))
            _end_play();
    }

    function _draw_current_level() {
        if (_playing)
            _current_level = fja.enemyControl.currentLevel;

        fja.canvasContext.font = "bold 22px";
        fja.canvasContext.fillStyle = "#FFFFFF";
        fja.canvasContext.textAlign = "left";
        fja.canvasContext.textBaseline = "top";
        fja.canvasContext.fillText("Level: " + _current_level, 0, 0);
    }

    function _end_play() {
        _stop_given_render_prep(_collision_check_callback_id);
        fja.enemyControl.stopSpawn();
        fja.playerControl.deInitPlayer();
        fja.screen.clearScreen();
        _playing = false;
        _game_over_msg_callback_id = fja.screen.addToRenderPreperation(_draw_game_over_msg);
        setTimeout(_prepare_for_play, _game_start_delay_ms);
    }

    function _draw_game_over_msg() {
        var xPos = fja.canvas.width / 2,
            yPos = fja.canvas.height / 2;

        fja.canvasContext.fontSize = "36px";
        fja.canvasContext.fillStyle = "#FFFFFF";
        fja.canvasContext.textAlign = "center";
        fja.canvasContext.fillText("Game Over", xPos, yPos);
    }

    function _stop_given_render_prep(renderPrepID) {
        fja.screen.removeFromRenderPreperation(renderPrepID);
    }
}());
