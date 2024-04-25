function gameplayPage (windowWidth, windowHeight, context){
    let gameOver = false;
    let savedScore = false;

    const centerWidth = windowWidth * .5
    const leftWidth = windowWidth * .25
    const rightWidth = windowWidth * .25
    let backgroundCenter = new Image();
    let backgroundLeft = new Image();
    let backgroundRight = new Image();
    let backgroundCenterReady = false;
    let backgroundLeftReady = false;
    let backgroundRightReady = false;

    let player = playerSquare(leftWidth, windowWidth - rightWidth, windowHeight, context);
    let timed = timer(leftWidth + centerWidth, context)
    let platforms = [platform(leftWidth, leftWidth + centerWidth, (leftWidth + (centerWidth/2)) - (centerWidth / 6), windowHeight, context)];
    let previewPlatform = platform(leftWidth, leftWidth + centerWidth, platforms[platforms.length - 1].getGapStart(), windowHeight, context);

    let timeSinceLastPlatform = 0;

    backgroundCenter.src = "games/dodger/assets/background-center.jpg";
    backgroundLeft.src = "games/dodger/assets/background-left.png";
    backgroundRight.src = "games/dodger/assets/background-right.png";

    backgroundCenter.onload = function() {
        backgroundCenterReady = true;
    }
    backgroundLeft.onload = function() {
        backgroundLeftReady = true;
    }
    backgroundRight.onload = function() {
        backgroundRightReady = true;
    }

    platforms[0].unPreview();

    function processInput(keys) {
        if (keys.hasOwnProperty('ArrowLeft') || keys.hasOwnProperty('a')) {
            player.changeX(false);

            delete keys['ArrowLeft']
            delete keys['a']
        }

        if (keys.hasOwnProperty('ArrowRight') || keys.hasOwnProperty('d')) {
            player.changeX(true);

            delete keys['ArrowRight']
            delete keys['d']
        }

        if (keys.hasOwnProperty('Escape')) {
            delete keys['Escape']

            return 3;
        }

        return 0;
    }

    function update(elapsedTime) {
        player.update(elapsedTime);

        if (!gameOver) {
            let deleteList = []

            timeSinceLastPlatform += elapsedTime
            timed.addTime(elapsedTime)

            if (platforms.length < 6) {
                if (timeSinceLastPlatform > 700) {
                    previewPlatform.unPreview();
                    platforms.push(previewPlatform)

                    previewPlatform = platform(leftWidth, leftWidth + centerWidth, platforms[platforms.length - 1].getGapStart(), windowHeight, context);
                
                    timeSinceLastPlatform = 0;
                }
            }

            for (let i = 0; i < platforms.length; i++) {
                if (player.collisionDetect(platforms[i].getGapStart(), platforms[i].getY(), platforms[i].getGapWidth()) === 0){
                    gameOver = true;
                }

                if (platforms[i].update(elapsedTime) === 0) {
                    deleteList.push(i);

                    if (platforms.length < 6) {
                        previewPlatform.unPreview();
                        platforms.push(previewPlatform)

                        previewPlatform = platform(leftWidth, leftWidth + centerWidth, platforms[platforms.length - 1].getGapStart(), windowHeight, context);
                    
                        timeSinceLastPlatform = 0;
                    }
                }
            }

            for (let i = deleteList.length - 1; i > -1; i--) {
                platforms.splice(deleteList[i], 1);
            }
        } else {
            if (!savedScore) {
                let highscoresHere = []
                let previousScores = localStorage.getItem('Minigame.highscores')

                if (previousScores !== null) {
                    highscoresHere = JSON.parse(previousScores);
                    highscoresHere.sort();
                }

                highscoresHere.push(timed.getTime());
                highscoresHere.sort(function(a, b){return b - a});
        
                if (highscoresHere.length > 5) {
                    highscoresHere.pop();
                }

                localStorage.setItem('Minigame.highscores', JSON.stringify(highscoresHere));
                savedScore = true;
            }
        }
    }

    function render() {
        if (backgroundCenterReady) {
            context.drawImage(backgroundCenter, leftWidth, 0, centerWidth, windowHeight)
        }

        if (backgroundLeftReady) {
            context.drawImage(backgroundLeft, 0, 0, leftWidth, windowHeight)
        }

        if (backgroundRightReady) {
            context.drawImage(backgroundRight, leftWidth + centerWidth, 0, rightWidth, windowHeight)
        }

        player.render();
        
        for (let i = 0; i < platforms.length; i++) {
            platforms[i].render();
        }

        previewPlatform.render();

        timed.render();

        if (gameOver) {
            let deadText = "GAME OVER!"
            let timeText = `Time: ${timed.getTime()} sec`;

            context.beginPath();

            context.fillStyle = "white"
            context.font = "bolder 24px Courier";

            fontHeight = context.measureText("m").width;

            context.fillText(deadText, leftWidth + (centerWidth / 2) - (context.measureText(deadText).width / 2), (windowHeight / 2) - (fontHeight / 2));
            context.fillText(timeText, leftWidth + (centerWidth / 2) - (context.measureText(timeText).width / 2), (windowHeight / 2) - (fontHeight / 2) + 50);

            context.closePath();
        }
    }

    return {
        processInput : processInput,
        update : update,
        render : render
    }
}