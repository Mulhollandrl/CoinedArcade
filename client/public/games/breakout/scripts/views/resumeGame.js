function resumeGamePage (windowWidth, windowHeight, context){
    let resumeButton = button({y: windowHeight/2 - 50, height: 50, text: "Resume Game!"}, windowWidth, context);
    let quitButton = button({y: windowHeight/2 + 50, height: 50, text: "Quit Game!"}, windowWidth, context);
    let selectedButton = 0;

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

        if (keys.hasOwnProperty('Space') || keys.hasOwnProperty('Enter')) {
            if (selectedButton === 0) {
                return 0;
            }

            delete keys['Space'];
            delete keys['Enter'];

            return 4;
        }

        return 5;
    }

    function update() {
        switch (selectedButton) {
            case 0:
                resumeButton.hover();
                quitButton.unhover();
                break;
            case 1:
                resumeButton.unhover();
                quitButton.hover();
                break;
        }
    }

    function render() {
        resumeButton.render();
        quitButton.render();
    }

    return {
        processInput : processInput,
        update : update,
        render : render
    }
}