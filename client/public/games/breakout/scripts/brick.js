function brick (specs, windowWidth, context){
    const fromTop = 30
    const xChange = windowWidth/14
    const yChange = 35
    const xCoord = xChange*specs.xIndex+2;
    const yCoord = yChange*specs.yIndex + fromTop;
    const color = specs.color;

    function getColor() {
        return color;
    }

    function collisionDetect(x, y) {
        if (x > xCoord - 5 && x < xCoord + xChange + 5 && y > yCoord - 5 && y < yCoord + yChange + 5) {
            let sideHit = Math.min(Math.abs(xCoord - x), Math.abs(x - (xCoord + xChange)), Math.abs(yCoord - y), Math.abs(y - (yCoord + yChange)))

            if (sideHit === xCoord - x) {
                return 1;
            }
            if (sideHit === x - (xCoord + xChange)) {
                return 2;
            }
            if (sideHit === yCoord - y) {
                return 3;
            }
            if (sideHit === y - (yCoord + yChange)) {
                return 4;
            }
        }

        return false;
    }

    function render() {
        context.beginPath();

        context.fillStyle = specs.color;

        context.fillRect(xCoord, yCoord, xChange-2, yChange-2);
        context.strokeRect(xCoord, yCoord, xChange-2, yChange-2);

        context.closePath();

        context.fillStyle = "red";

        context.beginPath();
        context.arc(xChange*specs.xIndex + (.2 * xChange) + 1, yChange*specs.yIndex + (.2 * yChange) + fromTop + 2, 5, 0, 2*Math.PI);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(xChange*specs.xIndex + (.5 * xChange) - 1, yChange*specs.yIndex + (.5 * yChange) + fromTop - 1, 5, 0, 2*Math.PI);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(xChange*specs.xIndex + (.75 * xChange) - 2, yChange*specs.yIndex + (.25 * yChange) + fromTop + 1, 5, 0, 2*Math.PI);
        context.fill();
        context.closePath();

        context.fillStyle = "white";

        context.beginPath();
        context.arc(xChange*specs.xIndex + (.2 * xChange), yChange*specs.yIndex + (.2 * yChange) + fromTop, 5, 0, 2*Math.PI);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(xChange*specs.xIndex + (.5 * xChange), yChange*specs.yIndex + (.5 * yChange) + fromTop, 5, 0, 2*Math.PI);
        context.fill();
        context.closePath();
        context.beginPath();
        context.arc(xChange*specs.xIndex + (.75 * xChange), yChange*specs.yIndex + (.25 * yChange) + fromTop, 5, 0, 2*Math.PI);
        context.fill();
        context.closePath();
    }

    return {
        getColor : getColor,
        collisionDetect : collisionDetect,
        render : render
    }
}