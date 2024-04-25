function ball (specs, windowWidth, windowHeight, context){
    let x = (windowWidth/2);
    let y = windowHeight - 100;
    let xMultiplier = 1;
    let yMultiplier = -1;
    let speed = 5;
    let direction = 315;
    let brokenBricks = 0;

    function getX() {
        return x;
    }

    function getY() {
        return y;
    }

    function updateSpeed() {
        if (brokenBricks >= 4) {
            speed = 6
        }
        if (brokenBricks >= 12) {
            speed = 7
        }
        if (brokenBricks >= 36) {
            speed = 8
        }
        if (brokenBricks >= 62) {
            speed = 9
        }
    }

    function hitPaddle(multiplier) {
        if (multiplier !== false) {
            yMultiplier = -1

            direction = multiplier * 160

            direction += 190

            if (multiplier < .5) {
                xMultiplier = -1
            } else {
                xMultiplier = 1
            }
        }
    }

    function hitBrick(side, frameBroken) {
        const radians = (Math.PI / 180) * direction;

        brokenBricks++;

        if (frameBroken < 2) {
            switch (side) {
                case 1:
                    xMultiplier *= -1
                    break;
                case 2:
                    xMultiplier *= -1
                    break;
                case 3:
                    yMultiplier *= -1
                    break;
                case 4:
                    yMultiplier *= -1
                    break;
            }
        }

    }
    
    function moveBall() {
        const radians = (Math.PI / 180) * direction;

        if (x <= 5) {
            xMultiplier = 1;
        }
        if (x >= windowWidth - 5) {
            xMultiplier = -1;
        }
        if (y <= 5) {
            yMultiplier = 1;
        }
        if (y >= windowHeight - 5) {
            return false;
        }

        x += xMultiplier * speed * Math.abs(Math.cos(radians));
        y += yMultiplier * speed * Math.abs(Math.sin(radians));

        return true;
    }

    function renderLife(index) {
        context.beginPath();

        context.fillStyle = "white";
        context.beginPath();
        context.arc(25*index + 20, windowHeight - 20, 10, 0, 2*Math.PI);
        context.fill();
        context.stroke();
        context.closePath();

        context.closePath();
    }

    function render() {
        context.beginPath();

        context.fillStyle = "white";
        context.beginPath();
        context.arc(x, y, 10, 0, 2*Math.PI);
        context.fill();
        context.stroke();
        context.closePath();

        context.closePath();
    }

    return {
        getX : getX,
        getY : getY,
        updateSpeed : updateSpeed,
        hitPaddle : hitPaddle,
        hitBrick : hitBrick,
        moveBall : moveBall,
        renderLife : renderLife,
        render : render
    }
}