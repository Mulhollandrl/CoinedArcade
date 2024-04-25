function paddle (specs, windowWidth, windowHeight, context){
    let paddleWidth = 200
    let paddleHeight = 25
    let xCoord = (windowWidth/2) - (paddleWidth/2)
    let yCoord = windowHeight - 50

    function getWidth() {
        return paddleWidth;
    }

    function brokeGreen() {
        paddleWidth = 100
    }

    function resetPaddleWidth() {
        paddleWidth = 200
    }

    function shrinkPaddle() {
        paddleWidth -= 5
        xCoord += 2.5
    }

    function collisionDetect(x, y) {
        if (x > xCoord - 5 && x < xCoord + paddleWidth + 5 && y > yCoord - 5 && y < yCoord + paddleHeight + 5) {
            return (x - xCoord) / paddleWidth;
        }

        return false;
    }

    function changeX(positive) {
        if (positive) {
            if (xCoord < windowWidth - paddleWidth) {
                xCoord += 20
            }
        } else {
            if (xCoord > 0) {
                xCoord -= 20
            }
        }
    }

    function render() {
        context.beginPath();

        context.fillStyle = "#ffcc99";
        context.fillRect(xCoord, yCoord, paddleWidth, paddleHeight);
        context.strokeRect(xCoord, yCoord, paddleWidth, paddleHeight);

        context.closePath();

        context.fillStyle = "red";
        context.beginPath();
        context.arc(xCoord + (.2 * paddleWidth) - 2, yCoord + (.3 * paddleHeight) - 2, 5, 0, 2*Math.PI);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(xCoord + (.4 * paddleWidth) - 2, yCoord + (.7 * paddleHeight) + 2, 5, 0, 2*Math.PI);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(xCoord + (.6 * paddleWidth) + 2, yCoord + (.5 * paddleHeight) + 2, 5, 0, 2*Math.PI);
        context.fill();
        context.closePath();

        context.fillStyle = "white";
        context.beginPath();
        context.arc(xCoord + (.2 * paddleWidth), yCoord + (.3 * paddleHeight), 5, 0, 2*Math.PI);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(xCoord + (.4 * paddleWidth), yCoord + (.7 * paddleHeight), 5, 0, 2*Math.PI);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(xCoord + (.6 * paddleWidth), yCoord + (.5 * paddleHeight), 5, 0, 2*Math.PI);
        context.fill();
        context.closePath();
    }

    return {
        getWidth : getWidth,
        brokeGreen : brokeGreen,
        resetPaddleWidth : resetPaddleWidth,
        shrinkPaddle : shrinkPaddle,
        collisionDetect : collisionDetect,
        changeX : changeX,
        render : render
    }
}