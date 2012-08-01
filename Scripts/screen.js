var fja = fja || {};

fja.screen = (function() {
	var _render_preperation_callbacks = [],
        _render_list = [],
        _original_canvas_width = 480,
        _original_canvas_heigth = 840,
        _canvas_width_scale = 0,
        _canvas_heigth_scale = 0,
        _general_purpose_unique_id = 0;


	return {
        get canvasWidth() { return fja.canvas.width; },
        get canvasHeight() { return fja.canvas.height; },
        get canvasWidthScale() { return _canvas_width_scale; },
        get canvasHeightScale() { return _canvas_heigth_scale; },

		addToRenderList: _add_to_render_list,
        removeFromRenderList: _remove_from_render_list,
        addToRenderPreperation: _add_to_render_preperation,
        removeFromRenderPreperation: _remove_from_render_preperation,
		render: _render,
        clearScreen: _clear_screen,
        calculateCanvasScale: _calculate_canvas_scale
	};


	function _add_to_render_list(renderableObject) {
		if (typeof renderableObject.render !== "function") {
			throw { name: "Missing render method" };
		}

        renderableObject.__id__ = _general_purpose_unique_id;
		_render_list.push(renderableObject);
        _general_purpose_unique_id++;

        return renderableObject.__id__;
	}

    function _remove_from_render_list(id) {
        fja.utils.assertNumber(id);

        for (var i = 0; i < _render_list.length; i++) {
            if (_render_list[i].__id__ === id) {
                _render_list.splice(i, 1);
                return;
            }
        }
    }

    function _add_to_render_preperation(callback) {
        fja.utils.assertFunction(callback);

        callback.__id__ = _general_purpose_unique_id;
        _render_preperation_callbacks.push(callback);
        _general_purpose_unique_id++;

        return callback.__id__;
    }

    function _remove_from_render_preperation(id) {
        fja.utils.assertNumber(id);

        for (var i = 0; i < _render_preperation_callbacks.length; i++) {
            if (_render_preperation_callbacks[i].__id__ === id) {
                _render_preperation_callbacks.splice(i, 1);
                return;
            }
        }
    }

    function _render_preperation() {
        var i,
            len = _render_preperation_callbacks.length;

        for (i = 0; i < len; i++) {
            _render_preperation_callbacks[i]();
        }
    }

	function _render() {
		var i,
            len = _render_list.length;

        fja.canvasContext.fillStyle = "#000000";
        fja.canvasContext.fillRect(0, 0, fja.screen.canvasWidth, fja.screen.canvasHeight);

        _render_preperation();

		for (i = 0; i < len; i++) {
			_render_list[i].render();
		}
	}

    function _clear_screen() {
        _render_list = [];
    }

    function _calculate_canvas_scale() {
        _canvas_width_scale = fja.canvas.width / _original_canvas_width;
        _canvas_heigth_scale = fja.canvas.height / _original_canvas_heigth;
    }
}());
