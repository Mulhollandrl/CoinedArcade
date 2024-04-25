function helpPage (windowWidth, windowHeight, context){
    let backButton = button({y: windowHeight - (100), height: 50, text: "Back!"}, windowWidth, context);

    function processInput(keys) {
        if (keys.hasOwnProperty('Space') || keys.hasOwnProperty('Enter') || keys.hasOwnProperty('Escape')) {
            delete keys['Space']
            delete keys['Enter']
            delete keys['Escape']

            return 4;
        }

        return 2;
    }

    function render() {
        let title = "Help!";
        let movement = "Move with Arrow Keys!";
        let breakBricks = "Break the Bricks!";

        context.font = "48px Courier";

        let fontHeight = context.measureText("m").width;

        context.fillText(title, (windowWidth/2) - (context.measureText(title).width/2), 50 + (fontHeight/2));

        context.fillText(movement, (windowWidth/2) - (context.measureText(movement).width/2), 225 + (fontHeight/2));
        context.fillText(breakBricks, (windowWidth/2) - (context.measureText(breakBricks).width/2), 300 + (fontHeight/2));

        backButton.render();
        backButton.hover();
    }

    return {
        processInput : processInput,
        render : render
    }
}