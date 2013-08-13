var fja = fja || {};

fja.createSprite = function(filename, fps, animations, frames) {
    "use strict";

    var image = new Image(),
        x = 0,
        y = 0,
        currentFrame = 0,
        currentAnimation = 0,
        frameWidth = 0,
        frameHeight = 0,
        needRender = true,
        frameInterval = 0,
        timeSinceLastFrame = 0;

    setImageSource(filename);
    setFrameInterval(fps);


    return {
        get x() { return x; },
        get y() { return y; },
        get width() { return frameWidth * fja.screen.canvasWidthScale; },
        get height() { return frameHeight * fja.screen.canvasHeightScale; },

        render: render,
        move: move,
        setAnimation: setAnimation
    };


    function render() {
        var widthDrawSize = frameWidth * fja.screen.canvasWidthScale,
            heightDrawSize = frameHeight * fja.screen.canvasHeightScale;

        fja.canvasContext.drawImage(image,
                                    getXOffset(), getYOffset(), frameWidth, frameHeight,
                                    x, y, widthDrawSize, heightDrawSize);
        needRender = false;
        setNextFrame();
    }

    function move(newX, newY) {
        x = newX;
        y = newY;
        needRender = true;
    }

    function setAnimation(animationAsNumber) {
        if (animationAsNumber >= animations) {
            throw { name: "Animation out of range" };
        } else if (animationAsNumber < 0) {
            throw { name: "Animation out of range" };
        }

        currentAnimation = animationAsNumber;
        needRender = true;
    }

    function setImageSource(filename) {
        image.src = "img/" + filename;
        image.onload = setFrameDimensions;
    }

    function setFrameInterval(fps) {
        frameInterval = 1000 / fps;
    }

    function setFrameDimensions() {
        frameWidth = image.width / frames;
        frameHeight = image.height / animations;
    }

    function getXOffset() {
        return (currentFrame * frameWidth);
    }

    function getYOffset() {
        return (currentAnimation * frameHeight);
    }

    function setNextFrame() {
        var currentTime = Date.now();
        var timeSinceLastUpdate = currentTime - timeSinceLastFrame;

        if (timeSinceLastUpdate > frameInterval) {
            currentFrame += 1;
            timeSinceLastFrame = currentTime;

            if (currentFrame >= frames)
                currentFrame = 0;
        }
    }
};
