function aboutPage (windowWidth, windowHeight, context){
    let backButton = button({y: windowHeight - (100), height: 50, text: "Back!"}, windowWidth, context);

    function processInput(keys) {
        if (keys.hasOwnProperty('Space') || keys.hasOwnProperty('Enter') || keys.hasOwnProperty('Escape')) {
            delete keys['Space']
            delete keys['Enter']
            delete keys['Escape']

            return 4;
        }

        return 3;
    }

    function render() {
        let title = "About And Credits";
        let created = "Created By:\nRichard Mulholland";
        let helper = "With Assistance From:\nDr. Dean Mathias";
        let musicAndArt = "Music And Art By:\nRichard Mulholland And Zealan Tanner";
        let background = "Background From:\nThe Tanshire Clinic";

        context.font = "48px Courier";

        let fontHeight = context.measureText("m").width;

        context.fillText(title, (windowWidth/2) - (context.measureText(title).width/2), 50 + (fontHeight/2));

        context.font = "24px Courier";

        fontHeight = context.measureText("m").width;

        context.fillText(created, (windowWidth/2) - (context.measureText(created).width/2), 125 + (fontHeight/2));
        context.fillText(helper, (windowWidth/2) - (context.measureText(helper).width/2), 200 + (fontHeight/2));
        context.fillText(musicAndArt, (windowWidth/2) - (context.measureText(musicAndArt).width/2), 275 + (fontHeight/2));
        context.fillText(background, (windowWidth/2) - (context.measureText(background).width/2), 350 + (fontHeight/2));

        backButton.render();
        backButton.hover();
    }

    return {
        processInput : processInput,
        render : render
    }
}