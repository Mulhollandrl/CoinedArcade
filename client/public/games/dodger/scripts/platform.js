function platform (leftBound, rightBound, previousGapLeft, windowHeight, context){
    const platformHeight = 20;
    const gapWidth = (rightBound - leftBound) / 6
    const side = Math.floor(Math.random() * 2) + 1;
    const gapPercentDiff = Math.random() * .60 + .15
    let preview = true;
    let gapStart = previousGapLeft
    let y = 0

    if (side === 1) {
        gapStart -= (gapPercentDiff * gapWidth)

        if (gapStart < leftBound) {
            gapStart = previousGapLeft + (gapPercentDiff * gapWidth)
        }
    } else {
        gapStart += (gapPercentDiff * gapWidth)

        if (gapStart > rightBound - gapWidth) {
            gapStart = previousGapLeft - (gapPercentDiff * gapWidth)
        }
    }

    let leftParticles = platformParticleSystem(leftBound, rightBound, gapStart, gapWidth, y, 0, context)
    let rightParticles = platformParticleSystem(leftBound, rightBound, gapStart, gapWidth, y, 1, context)

    function getGapStart() {
        return gapStart;
    }

    function getY(){
        return y;
    }

    function getGapWidth() {
        return gapWidth;
    }

    function unPreview() {
        preview = false;
    }

    function update(elapsedTime) {
        y += 3

        leftParticles.update(elapsedTime);
        rightParticles.update(elapsedTime);

        if (y > windowHeight) {
            return 0;
        }

        return 1;
    }

    function render() {
        leftParticles.render();
        rightParticles.render();

        context.beginPath();

        if (preview) {
            context.fillStyle = "#81dafc";
            context.strokeStyle = "#81bbfc";
        } else {
            context.fillStyle = "#91dd77";
            context.strokeStyle = "#77dd77";
        }

        context.fillRect(leftBound, y, gapStart - leftBound, platformHeight);
        context.strokeRect(leftBound, y, gapStart - leftBound, platformHeight);

        context.fillRect(gapStart + gapWidth, y, rightBound - (gapStart + gapWidth), platformHeight);
        context.strokeRect(gapStart + gapWidth, y, rightBound - (gapStart + gapWidth), platformHeight);

        context.closePath();
    }

    return {
        getGapStart : getGapStart,
        getY : getY,
        getGapWidth : getGapWidth,
        unPreview : unPreview,
        update : update,
        render : render
    }
}