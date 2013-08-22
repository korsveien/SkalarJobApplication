var sja = sja || {};

sja.enemyControl = (function() {
    "use strict";

    var isSpawning = false,
        currentLevel = 0,
        enemyLifeExpectancy = 5000,
        enemiesToSpawn = 0,
        spawnedEnemies = [],
        enemiesControlCallbackId = -1;


    return {
        startSpawn: startSpawn,
        stopSpawn: stopSpawn,
        checkForCollision: checkForCollision
    };


    function startSpawn() {
        isSpawning = true;
        currentLevel = 1;
        spawnEnemies(1);
        enemiesControlCallbackId = sja.screen.addToRenderPreperation(controlEnemies);
    }

    function stopSpawn() {
        isSpawning = false;
        currentLevel = 0;
        sja.screen.removeFromRenderPreperation(enemiesControlCallbackId);
        enemiesControlCallbackId = -1;
        spawnedEnemies = [];
    }

    function increaseLevel() {
        currentLevel++;
        spawnEnemies(currentLevel);
    }

    function checkForCollision(sprite) {
        var spriteToCheck = retrieveCollisionPoints(sprite),
            collisionSprite, i

        for (i = 0; i < spawnedEnemies.length; i++) {
            collisionSprite = retrieveCollisionPoints(spawnedEnemies[i]);

            if (checkSpriteCollision(spriteToCheck, collisionSprite)
                || checkSpriteCollision(collisionSprite, spriteToCheck))
            {
                return true;
            }
        }

        return false;
    }

    function retrieveCollisionPoints(sprite) {
        return {
            leftX: sprite.x,
            rightX: sprite.x + sprite.width,
            topY: sprite.y - sprite.height,
            bottomY: sprite.y
        };
    }

    function checkSpriteCollision(spriteToCheck, collisionSprite) {
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

    function spawnEnemies(numberOfEnemies) {
        var spawnInterval = enemyLifeExpectancy / numberOfEnemies,
            index;

        for (index = 0; index < numberOfEnemies; index++) {
            var additionalWait = Math.floor(Math.random() * spawnInterval);
            enemiesToSpawn = numberOfEnemies;
            setTimeout(spawnEnemy, (spawnInterval * index) + additionalWait);
        }
    }

    function spawnEnemy() {
        var sprite,
            randomXPosition;

        if (!isSpawning) {
            enemiesToSpawn = 0;
            return;
        }

        sprite = sja.createSprite("rocket.png", 1, 1, 1);
        randomXPosition = Math.floor(Math.random() * sja.screen.canvasWidth);

        sprite.creationTime = Date.now();
        sprite.move(randomXPosition, (sprite.height * -1));

        spawnedEnemies.push(sprite);
        sja.screen.addToRenderList(sprite);
        enemiesToSpawn--;
    }

    function controlEnemies() {
        var timeDiff,
            lifeExpectancyProgress,
            tmpSprite,
            newYPosition;

        spawnedEnemies.forEach(function(tmpSprite) {
            timeDiff = Date.now() - tmpSprite.creationTime;

            if (timeDiff > enemyLifeExpectancy) {
                removeSpriteFromSpawnedList(tmpSprite);
                removeSprintFromRenderList(tmpSprite);
            }

            lifeExpectancyProgress = timeDiff / enemyLifeExpectancy;
            newYPosition = sja.screen.canvasHeight * lifeExpectancyProgress;

            tmpSprite.move(tmpSprite.x, newYPosition);
        });

        if (enemiesToSpawn === 0 && isSpawning) {
            increaseLevel();
        }
    }

    function removeSpriteFromSpawnedList(spriteToRemove) {
        var altered = [];

        spawnedEnemies.forEach(function(enemy) {
            if (enemy !== spriteToRemove) {
                altered.push(enemy);
            }
        });

        spawnedEnemies = altered;
    }

    function removeSprintFromRenderList(spriteToRemove) {
        sja.screen.removeFromRenderList(spriteToRemove.__id__);
    }
})();
