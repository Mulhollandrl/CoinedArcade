function homePage (windowWidth, windowHeight, context, restartGame){
    let audio = new Audio("games/breakout/assets/main.mp3");
    let aboutButton = button({y: 425, height: 50, text: "About!"}, windowWidth, context);
    let helpButton = button({y: 325, height: 50, text: "Help!"}, windowWidth, context);
    let highscoresButton = button({y: 225, height: 50, text: "Highscores!"}, windowWidth, context);
    let newGameButton = button({y: 125, height: 50, text: "New Game!"}, windowWidth, context);
    let selectedButton = 0;

    // document.addEventListener("click", () => {audio.play()})
    audio.loop = true;

    function processInput(keys) {
        if (keys.hasOwnProperty('s') || keys.hasOwnProperty('k') || keys.hasOwnProperty('ArrowDown')) {
            selectedButton++;

            if (selectedButton > 3) {
                selectedButton = 0
            }

            delete keys['s']
            delete keys['k']
            delete keys['ArrowDown']
        }

        if (keys.hasOwnProperty('w') || keys.hasOwnProperty('i') || keys.hasOwnProperty('ArrowUp')) {
            selectedButton--;

            if (selectedButton < 0) {
                selectedButton = 3;
            }
            
            delete keys['w'];
            delete keys['i'];
            delete keys['ArrowUp'];
        }

        if (keys.hasOwnProperty('Space') || keys.hasOwnProperty('Enter')) {
            if (selectedButton === 0) {
                audio.pause();
                restartGame();
            }

            delete keys['Space'];
            delete keys['Enter'];

            return selectedButton;
        }

        return 4;
    }

    function update() {
        switch (selectedButton) {
            case 0:
                newGameButton.hover();
                highscoresButton.unhover();
                helpButton.unhover();
                aboutButton.unhover();
                break;
            case 1:
                newGameButton.unhover();
                highscoresButton.hover();
                helpButton.unhover();
                aboutButton.unhover();
                break;
            case 2:
                newGameButton.unhover();
                highscoresButton.unhover();
                helpButton.hover();
                aboutButton.unhover();
                break;
            case 3:
                newGameButton.unhover();
                highscoresButton.unhover();
                helpButton.unhover();
                aboutButton.hover();
                break;
        }
    }

    function render() {
        let title = "Acne Breakout!";

        context.font = "48px Courier";

        let fontHeight = context.measureText("m").width;

        context.fillText(title, (windowWidth/2) - (context.measureText(title).width/2), 50 + (fontHeight/2));

        aboutButton.render();
        helpButton.render();
        highscoresButton.render();
        newGameButton.render();
    }

    return {
        processInput : processInput,
        update : update,
        render : render
    }
}