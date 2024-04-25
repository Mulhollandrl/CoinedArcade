function startGame() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let canvasHeight = window.innerHeight - 175;
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
    let HelpScreen = helpPage(canvasWidth, canvasHeight, context);
    let AboutScreen = aboutPage(canvasWidth, canvasHeight, context);
    let HomeScreen = homePage(canvasWidth, canvasHeight, context, restartGame);
    let ResumeScreen = resumeGamePage(canvasWidth, canvasHeight, context);

    let currentScreen = 4

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
                currentScreen = HelpScreen.processInput(input.keys);
                break;
            case 3:
                currentScreen = AboutScreen.processInput(input.keys);
                break;
            case 4:
                currentScreen = HomeScreen.processInput(input.keys);
                break;
            case 5:
                currentScreen = ResumeScreen.processInput(input.keys);
                break;
        }
    }

    function update(timeStamp) {
        switch (currentScreen) {
            case 0:
                GameplayScreen.update();
                break;
            case 1:
                HighscoreScreen.update();
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                HomeScreen.update();
                break;
            case 5:
                ResumeScreen.update();
                break;
        }
    }

    function render() {
        context.beginPath()
        context.rect(0, 0, canvasWidth, canvasHeight)
        context.fillStyle = "#595959"
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
                HelpScreen.render();
                break;
            case 3:
                AboutScreen.render();
                break;
            case 4:
                HomeScreen.render();
                break;
            case 5:
                ResumeScreen.render();
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