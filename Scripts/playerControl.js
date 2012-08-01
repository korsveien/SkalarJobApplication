fja = fja || {};

fja.playerControl = (function() {
    var _player_sprite = fja.createSprite("player.png", 1, 1, 1),
        _x_target = 0,
        _y_target = 0,
        _pixel_movement_per_ms = 0.1,
        _last_movement_time = Date.now(),
        _move_player_callback_id = -1;


    return {
        get playerSprite() { return _player_sprite; },
        
        initPlayer: _init_player,
        deInitPlayer: _de_init_player
    };


    function _init_player() {
        var middleOfScreen = fja.screen.canvasWidth/2,
            bottomOfScreen = fja.screen.canvasHeight - _player_sprite.height/2;

        _set_xy_target(middleOfScreen, bottomOfScreen);
        _player_sprite.move(middleOfScreen, bottomOfScreen);

        fja.canvas.onmousedown = _on_input;
        fja.screen.addToRenderPreperation(_move_player_to_target);
        fja.screen.addToRenderList(_player_sprite);
    }

    function _de_init_player() {
        fja.screen.removeFromRenderPreperation(_move_player_callback_id);
        _move_player_callback_id = -1;
        fja.canvas.onmousedown = "";
    }

    function _on_input(event) {
        var actualX = event.pageX - fja.canvas.offsetLeft,
            actualY = event.pageY - fja.canvas.offsetTop;
        
        _set_xy_target(actualX, actualY);
    }

    function _set_xy_target(x, y) {
        _x_target = Math.round(x - (_player_sprite.width/2));
        _y_target = Math.round(y - (_player_sprite.height/2));
    }

    function _move_player_to_target() {
        var timeSinceLastMovement = Date.now() - _last_movement_time,
            pixels_to_move = Math.round(timeSinceLastMovement * _pixel_movement_per_ms),
            i,
            newXPos = _player_sprite.x,
            newYPos = _player_sprite.y;

        for (i = 0; i < pixels_to_move; i++) {
            if (_player_sprite.x < _x_target) {
                newXPos++;
            } else if (_player_sprite.x > _x_target) {
                newXPos--;
            }

            if (_player_sprite.y < _y_target) {
                newYPos++;
            } else if (_player_sprite.y > _y_target) {
                newYPos--;
            }
        }
        _last_movement_time = Date.now();

        if (newXPos < 0 || newYPos < 0)
            return;

        _player_sprite.move(newXPos, newYPos);
    }
}());
