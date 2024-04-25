function gameplayPage (windowWidth, windowHeight, context){
    let background = new Image();
    let backgroundReady = false;
    let audio = new Audio();
    let player = paddle({}, windowWidth, windowHeight, context);
    let scorer = score(windowWidth, windowHeight, context);
    let exitButton = button({y: windowHeight - (100), height: 50, text: "Main Menu!"}, windowWidth, context);
    let savedScore = false;
    let introDone = false;
    let needsShrink = false;
    let pastTime = performance.now();
    let introNumber = 3;
    let rows = [[], [], [], [], [], [], [], []];
    let currentBrokenRows = 0;
    const randomSong = Math.floor(Math.random() * 3);
        
    audio.loop = true;

    let bricks = [];
    let balls = [];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 14; j++) {
            switch (i) {
                case 1:
                case 2:
                    bricks.push(brick({
                        xIndex : j,
                        yIndex : i,
                        color : "green"
                    }, windowWidth, context));
                    break;
                case 3:
                case 4:
                    bricks.push(brick({
                        xIndex : j,
                        yIndex : i,
                        color : "blue"
                    }, windowWidth, context));
                    break;
                    case 5:
                        case 6:
                            bricks.push(brick({
                                xIndex : j,
                                yIndex : i,
                        color : "orange"
                    }, windowWidth, context));
                    break;
                    case 7:
                        case 8:
                            bricks.push(brick({
                                xIndex : j,
                        yIndex : i,
                        color : "yellow"
                    }, windowWidth, context));
                    break;
                }
        }
    }

    for (let i = 0; i < 3; i++) {
        balls.push(ball({}, windowWidth, windowHeight, context))
    }

    let currentBrick = 0
    
    for (let i = 0; i < bricks.length / 14; i++) {
        for (let j = 0; j < 14; j++) {
            rows[i].push(bricks[currentBrick])
            currentBrick++;
        }
    }
    
    background.src = "games/breakout/assets/background.jpg";
    background.onload = function() {
        backgroundReady = true;
    }

    function processInput(keys) {
        if (balls.length > 0) {
            if (keys.hasOwnProperty('ArrowLeft')) {
                player.changeX(false);

                delete keys['ArrowLeft']
            }

            if (keys.hasOwnProperty('ArrowRight')) {
                player.changeX(true);

                delete keys['ArrowRight']
            }
        } else {
            if (keys.hasOwnProperty('Enter')) {
                audio.pause();
    
                delete keys['Enter']
    
                return 4;
            }
        }

        if (keys.hasOwnProperty('Escape')) {
            audio.pause();

            delete keys['Escape']

            return 5;
        }

        return 0;
    }

    function update() {
        if (needsShrink) {
            player.shrinkPaddle();

            if (player.getWidth() <= 0) {
                needsShrink = false;
            }
        }
        if (introDone && !needsShrink) {
            let brokenRowsCurrentFrame = 0;

            for (row in rows) {
                if (row.length === 0) {
                    brokenRowsCurrentFrame++
                }
            }

            if (brokenRowsCurrentFrame > currentBrokenRows) {
                scorer.addScore("row")
            }

            if (balls.length > 0) {
                let bricksBroken = 0;
                let isAlive = balls[0].moveBall();

                balls[0].updateSpeed();

                if (!isAlive) {
                    balls.splice(0, 1);
                    player.resetPaddleWidth();
                    needsShrink = true;
                    introDone = false;
                    introNumber = 3;
                }

                if (balls.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        for (let j = rows[i].length - 1; j >= 0; j--) {
                            let sideHit = rows[i][j].collisionDetect(balls[0].getX(), balls[0].getY());
                            if (sideHit !== false) {
                                if (rows[i][j].getColor() == "green") {
                                    player.brokeGreen();
                                }

                                bricksBroken += 1;
                                scorer.addScore(rows[i][j].getColor())
                                rows[i].splice(j, 1);
                                balls[0].hitBrick(sideHit, bricksBroken);
                            }
                        }
                    }
                    
                    balls[0].hitPaddle(player.collisionDetect(balls[0].getX(), balls[0].getY()))
                }
            }
        }
    }

    function render() {
        if (balls.length > 0 && bricks.length > 0) {
            if (backgroundReady) {
                context.drawImage(background, 0, 0, windowWidth, windowHeight)
            }
            
            for (row of rows) {
                for (brickObject of row) {
                    brickObject.render();
                }
            }

            for (let i = 0; i < balls.length; i++) {
                balls[i].renderLife(i);
            }

            balls[0].render();
            player.render();
            scorer.render();
            
            audio.play();
        } else {
            let deadText = "Yer dead!!";
            let scoreText = `Score: ${scorer.getScore()}`;

            if (!savedScore) {
                let highscoresHere = []
                let previousScores = localStorage.getItem('Breakout.highscores')

                if (previousScores !== null) {
                    highscoresHere = JSON.parse(previousScores);
                    highscoresHere.sort();
                }

                highscoresHere.push(scorer.getScore());
                highscoresHere.sort(function(a, b){return b - a});
        
                if (highscoresHere.length > 10) {
                    highscoresHere.pop();
                }

                localStorage.setItem('Breakout.highscores', JSON.stringify(highscoresHere));
                savedScore = true;
            }

            context.fillStyle = "white"
            context.font = "bolder 36px Courier";

            fontHeight = context.measureText("m").width;
            
            context.fillText(deadText, (windowWidth/2) - (context.measureText(deadText).width/2), ((windowHeight/2) - 50) - (fontHeight/2));
            context.fillText(scoreText, (windowWidth/2) - (context.measureText(scoreText).width/2), ((windowHeight/2) + 50) - (fontHeight/2));
            exitButton.hover();
            exitButton.render();
        }
        if (!introDone && balls.length > 0 && !needsShrink) {
            let elapsedTime = performance.now() - pastTime;

            player.resetPaddleWidth();
        
            if (elapsedTime/1000 > 1) {
                introNumber--;
                pastTime = performance.now()
            }
        
            if (introNumber === 0) {
                introDone = true
            }
        
            context.fillStyle = "black"
            context.font = "bolder 36px Courier";
        
            fontHeight = context.measureText("m").width;
        
            context.fillText(introNumber, (windowWidth/2) - (context.measureText(introNumber).width/2), ((windowHeight/2)) - (fontHeight/2)); 
        }
    }
    
    return {
        processInput : processInput,
        update : update,
        render : render
    }
}