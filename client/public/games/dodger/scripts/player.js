function playerSquare (leftBound, rightBound, windowHeight, context){
    const playerWidth = 20;
    const playerHeight = 20;
    let x = (rightBound - leftBound) / 2 + leftBound
    let y = windowHeight - 30
    let alive = 1;

    let playerParticles = playerParticleSystem(x, y, context);

    function changeX(positive) {
        if (alive === 1) {
            if (positive) {
                if (x < rightBound - 25) {
                    x += 20
                }
            } else {
                if (x > leftBound + playerWidth) {
                    x -= 20
                }
            }
            playerParticles.setXCoord(x);
        }

    }

    function collisionDetect(gapStart, yCoord, gapWidth) {
        if (y > yCoord && y < yCoord + playerHeight && (x < gapStart || x + playerWidth > gapStart + gapWidth)) {
            alive = 0;
            return 0;
        }

        return 1;
    }

    function update(elapsedTime) {
        if (alive === 0) {
            playerParticles.update(elapsedTime);
        }
    }

    function render() {
        context.beginPath();

        context.fillStyle = "#B2A4D4";
        context.strokeStyle = "#fdfd96"

        context.fillRect(x, y, playerWidth, playerHeight);
        context.strokeRect(x, y, playerWidth, playerHeight);

        context.closePath();

        if (alive === 0) {
            playerParticles.render();
        }
    }

    return {
        changeX : changeX,
        collisionDetect : collisionDetect,
        update : update,
        render : render
    }
}