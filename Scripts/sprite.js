var fja = fja || {};

fja.createSprite = function(filename, fps, animations, frames) {
    "use strict";

    var _image = new Image(),
        _x = 0,
        _y = 0,
        _current_frame = 0,
        _current_animation = 0,
        _frame_width = 0,
        _frame_height = 0,
        _need_render = true,
        _frame_interval = 0,
        _time_since_last_frame = 0;

    _set_image_src(filename);
    _set_frame_interval(fps);


    return {
        get x() { return _x; },
        get y() { return _y; },
        get width() { return _frame_width * fja.screen.canvasWidthScale; },
        get height() { return _frame_height * fja.screen.canvasHeightScale; },

        render: _render,
        move: _move,
        setAnimation: _set_animation
    };


    function _render() {
        var widthDrawSize = _frame_width * fja.screen.canvasWidthScale,
            heightDrawSize = _frame_height * fja.screen.canvasHeightScale;

        fja.canvasContext.drawImage(_image,
                                    _get_x_offset(), _get_y_offset(), _frame_width, _frame_height,
                                    _x, _y, widthDrawSize, heightDrawSize);
        _need_render = false;
        _set_next_frame();
    }

    function _move(x, y) {
        _x = x;
        _y = y;
        _need_render = true;
    }

    function _set_animation(animationAsNumber) {
        if (animationAsNumber >= animations)
            throw { name: "Animation out of range" };
        else if (animationAsNumber < 0)
            throw { name: "Animation out of range" };

        _current_animation = animationAsNumber;
        _need_render = true;
    }

    function _set_image_src(filename) {
        _image.src = "Gfx/" + filename;
        _image.onload = _set_frame_dimensions;
    }

    function _set_frame_interval(fps) {
        _frame_interval = 1000 / fps;
    }

    function _set_frame_dimensions() {
        _frame_width = _image.width / frames;
        _frame_height = _image.height / animations;
    }

    function _get_x_offset() {
        return (_current_frame * _frame_width);
    }

    function _get_y_offset() {
        return (_current_animation * _frame_height);
    }

    function _set_next_frame() {
        var currentTime = Date.now();
        var timeSinceLastUpdate = currentTime - _time_since_last_frame;

        if (timeSinceLastUpdate > _frame_interval) {
            _current_frame += 1;
            _time_since_last_frame = currentTime;

            if (_current_frame >= frames)
                _current_frame = 0;
        }
    }
};
