function highscoresPage (windowWidth, windowHeight, context){
    let backButton = button({y: windowHeight - (100), height: 50, text: "Back!"}, windowWidth, context);
    let resetButton = button({y: windowHeight - (200), height: 50, text: "Reset Scores!"}, windowWidth, context);
    let highscores = []
    let previousScores = []
    let selectedButton = 1

    function processInput(keys) {
        if (keys.hasOwnProperty('s') || keys.hasOwnProperty('k') || keys.hasOwnProperty('ArrowDown')) {
            selectedButton++;

            if (selectedButton > 1) {
                selectedButton = 0
            }

            delete keys['s']
            delete keys['k']
            delete keys['ArrowDown']
        }

        if (keys.hasOwnProperty('w') || keys.hasOwnProperty('i') || keys.hasOwnProperty('ArrowUp')) {
            selectedButton--;

            if (selectedButton < 0) {
                selectedButton = 1;
            }
            
            delete keys['w'];
            delete keys['i'];
            delete keys['ArrowUp'];
        }

        if (keys.hasOwnProperty('Space') || keys.hasOwnProperty('Enter') || keys.hasOwnProperty('Escape')) {
            delete keys['Space']
            delete keys['Enter']
            delete keys['Escape']

            if (selectedButton === 1){
                return 4;
            } else {
                localStorage.removeItem("Breakout.highscores")
            }
        }

        return 1;
    }

    function update() {
        switch (selectedButton) {
            case 0:
                resetButton.hover();
                backButton.unhover();
                break;
            case 1:
                resetButton.unhover();
                backButton.hover();
                break;
        }
    }

    function render() {
        let title = "Highscores!";
        let scoreStart = 125;

        previousScores = localStorage.getItem('Breakout.highscores')

        if (previousScores !== null) {
            highscores = JSON.parse(previousScores);
        } else {
            highscores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }

        gotItems = true;

        context.font = "48px Courier";

        let fontHeight = context.measureText("m").width;

        context.fillText(title, (windowWidth/2) - (context.measureText(title).width/2), 50 + (fontHeight/2));

        context.font = "24px Courier";

        fontHeight = context.measureText("m").width;

        for (let highscoreIndex = 0; highscoreIndex < 10; highscoreIndex++) {
            let currentHighscore = highscores[highscoreIndex]

            if (currentHighscore === undefined) {
                currentHighscore = 0;
            }

            let text = `${highscoreIndex + 1}: ${currentHighscore}`

            context.fillText(text, (windowWidth/2) - (context.measureText(text).width/2), scoreStart + (fontHeight/2))
            scoreStart += 35
        }

        resetButton.render();
        backButton.render();
    }

    return {
        processInput : processInput,
        update : update,
        render : render
    }
}