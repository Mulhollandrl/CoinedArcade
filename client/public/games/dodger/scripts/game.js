function startGame() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let canvasHeight = window.innerHeight - 125;
    let canvasWidth = canvasHeight*(4/3);
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    canvas.style.height = canvasHeight;
    canvas.style.width = canvasWidth;

    let restartGame = function() {
        GameplayScreen = gameplayPage(canvasWidth, canvasHeight, context);
    }

    let GameplayScreen = gameplayPage(canvasWidth, canvasHeight, context);
    let HighscoreScreen = highscoresPage(canvasWidth, canvasHeight, context);
    let AboutScreen = aboutPage(canvasWidth, canvasHeight, context);
    let HomeScreen = homePage(canvasWidth, canvasHeight, context, restartGame);

    let currentScreen = 3;
    let currentTime = performance.now();
    let elapsedTime = 0;

    let input = (function() {
        function Keyboard() {
            let that = {
                keys : {}
            };
            function keyPress(e) {
                that.keys[e.key] = e.timeStamp;
            }
            function keyRelease(e) {
                delete that.keys[e.key];
            }
            window.addEventListener('keydown', keyPress);
            window.addEventListener('keyup', keyRelease);
            
            return that;
        }
        
        return {
            Keyboard : Keyboard
        };
    }()).Keyboard();

    function processInput() {
        switch (currentScreen) {
            case 0:
                currentScreen = GameplayScreen.processInput(input.keys);
                break;
            case 1:
                currentScreen = HighscoreScreen.processInput(input.keys);
                break;
            case 2:
                currentScreen = AboutScreen.processInput(input.keys);
                break;
            case 3:
                currentScreen = HomeScreen.processInput(input.keys);
                break;
        }
    }

    function update(timeStamp) {
        if (timeStamp !== undefined){
            elapsedTime = timeStamp - currentTime
            currentTime = timeStamp
        }

        switch (currentScreen) {
            case 0:
                GameplayScreen.update(elapsedTime);
                break;
            case 1:
                HighscoreScreen.update();
                break;
            case 2:
                break;
            case 3:
                HomeScreen.update();
                break;
        }
    }

    function render() {
        context.beginPath()
        context.rect(0, 0, canvasWidth, canvasHeight)
        context.fillStyle = "#3693fa"
        context.fill();
        context.closePath();
        context.fillStyle = "white"

        switch (currentScreen) {
            case 0:
                GameplayScreen.render();
                break;
            case 1:
                HighscoreScreen.render();
                break;
            case 2:
                AboutScreen.render();
                break;
            case 3:
                HomeScreen.render();
                break;
        }
    }

    function gameLoop(timeStamp) {
        processInput();
        update(timeStamp);
        render();

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}

startGame();