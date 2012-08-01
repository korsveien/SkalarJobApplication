fja = fja || {};

fja.enemyControl = (function() {
    var _is_spawning = false,
        _current_level = 0,
        _enemy_life_expectancy = 5000,
        _enemies_to_spawn = 0,
        _spawned_enemies = [],
        _enemy_control_callback_id = -1;


    return {
        get currentLevel() { return _current_level; },
        
        startSpawn: _start_spawn,
        stopSpawn: _stop_spawn,
        checkForCollision: _check_for_collision
    };


    function _start_spawn() {
        _is_spawning = true;
        _current_level = 1;
        _spawn_enemies(1);
        _enemy_control_callback_id = fja.screen.addToRenderPreperation(_control_enemies);
    }

    function _stop_spawn() {
        _is_spawning = false;
        _current_level = 0;
        fja.screen.removeFromRenderPreperation(_enemy_control_callback_id);
        _enemy_control_callback_id = -1;
        _spawned_enemies = [];
    }

    function _increase_level() {
        _current_level++;
        _spawn_enemies(_current_level);
    }

    function _check_for_collision(sprite) {
        var spriteToCheck = _retrive_collision_check_points(sprite),
            collisionSprite;

        for (var i = 0; i < _spawned_enemies.length; i++) {
            collisionSprite = _retrive_collision_check_points(_spawned_enemies[i]);

            if(_check_sprite_collision(spriteToCheck, collisionSprite))
                return true;

            if(_check_sprite_collision(collisionSprite, spriteToCheck))
                return true;
        }

        return false;
    }

    function _retrive_collision_check_points(sprite) {
        return {
            leftX: sprite.x,
            rightX: sprite.x + sprite.width,
            topY: sprite.y - sprite.height,
            bottomY: sprite.y
        };
    }

    function _check_sprite_collision(spriteToCheck, collisionSprite) {
        if (spriteToCheck.leftX > collisionSprite.leftX && spriteToCheck.topY > collisionSprite.topY) {
            if (spriteToCheck.leftX < collisionSprite.rightX && spriteToCheck.topY < collisionSprite.bottomY) {
                return true
            }
        } else if (spriteToCheck.rightX > collisionSprite.leftX && spriteToCheck.topY > collisionSprite.topY) {
            if (spriteToCheck.rightX < collisionSprite.rightX && spriteToCheck.topY < collisionSprite.bottomY) {
                return true
            }
        } else if (spriteToCheck.leftX > collisionSprite.leftX && spriteToCheck.bottomY > collisionSprite.topY) {
            if (spriteToCheck.leftX < collisionSprite.rightX && spriteToCheck.bottomY < collisionSprite.bottomY) {
                return true
            }
        } else if (spriteToCheck.rightX > collisionSprite.leftX && spriteToCheck.bottomY > collisionSprite.topY) {
            if (spriteToCheck.rightX < collisionSprite.rightX && spriteToCheck.bottomY < collisionSprite.bottomY) {
                return true
            }
        }

        return false;
    }

    function _spawn_enemies(numberOfEnemies) {
        var spawnInterval = _enemy_life_expectancy / numberOfEnemies,
            index;

        for (index = 0; index < numberOfEnemies; index++) {
            var additionalWait = Math.floor(Math.random() * spawnInterval);
            _enemies_to_spawn = numberOfEnemies;
            setTimeout(_spawn_enemy, spawnInterval*index+additionalWait);
        }
    }

    function _spawn_enemy() {
        var sprite,
            randomXPosition;

        if (!_is_spawning) {
            _enemies_to_spawn = 0;
            return;
        }

        sprite = fja.createSprite("rocket.png", 1, 1, 1);
        randomXPosition = Math.floor(Math.random() * fja.screen.canvasWidth);

        sprite.creationTime = Date.now();
        sprite.move(randomXPosition, (sprite.height * -1));

        _spawned_enemies.push(sprite);
        fja.screen.addToRenderList(sprite);
        _enemies_to_spawn--;
    }

    function _control_enemies() {
        var i,
            timeDiff,
            lifeExpectancyProgress,
            tmpSprite,
            newYPosition;

        for (i = 0; i < _spawned_enemies.length; i++) {
            tmpSprite = _spawned_enemies[i];
            timeDiff = Date.now() - tmpSprite.creationTime;

            if (timeDiff > _enemy_life_expectancy) {
                _remove_sprite_from_spawned_list(tmpSprite);
                _remove_sprite_from_render_list(tmpSprite);
            }

            lifeExpectancyProgress = timeDiff / _enemy_life_expectancy;
            newYPosition = fja.screen.canvasHeight * lifeExpectancyProgress;

            tmpSprite.move(tmpSprite.x, newYPosition);
        }

        if (_enemies_to_spawn === 0 && _is_spawning) {
            _increase_level();
        }
    }

    function _remove_sprite_from_spawned_list(spriteToRemove) {
        for (var i = 0; i < _spawned_enemies.length; i++) {
            if (_spawned_enemies[i].creationTime === spriteToRemove.creationTime) {
                _spawned_enemies.splice(i, 1);
            }
        }
    }

    function _remove_sprite_from_render_list(spriteToRemove) {
        fja.screen.removeFromRenderList(spriteToRemove.__id__);
    }
}());
