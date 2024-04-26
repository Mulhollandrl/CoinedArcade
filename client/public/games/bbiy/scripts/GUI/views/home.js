// This is a file to make a gui for seeing a home screen to get to everything. A "Main Menu" of sorts
import { button } from "../utilities/buttons.js";
import { modesEnum } from "../../state/enums.js";
import { controlsKeys } from "../../state/globals.js";

export function homePage (windowWidth, windowHeight, context){
    let audio = new Audio("../../../assets/music/01 - Plantasia.mp3")
    let creditsButton = button({y: 325, height: 50, text: "Credits!"}, windowWidth, context);
    let controlsButton = button({y: 225, height: 50, text: "Controls!"}, windowWidth, context);
    let newGameButton = button({y: 125, height: 50, text: "New Game!"}, windowWidth, context);
    let selectedButton = 0;
    let musicLoaded = false;

    audio.loop = true;

    function processInput(keys) {
        if (musicLoaded) {
            audio.play();
        } else {
            if (Object.keys(keys)[0] !== undefined) {
                audio.play();
                musicLoaded = true;
            }
        }

        if (keys.hasOwnProperty(controlsKeys.data.down)) {
            selectedButton++;

            if (selectedButton > 2) {
                selectedButton = 0;
            }

            delete keys[controlsKeys.data.down];
        }

        if (keys.hasOwnProperty(controlsKeys.data.up)) {
            selectedButton--;

            if (selectedButton < 0) {
                selectedButton = 2;
            }
            
            delete keys[controlsKeys.data.up];
        }

        if (keys.hasOwnProperty(controlsKeys.data.select)) {
            delete keys[controlsKeys.data.select];

            switch (selectedButton) {
                case 0:
                    audio.pause();
                    return modesEnum.LEVELS;
                case 1:
                    return modesEnum.CONTROLS;
                case 2:
                    return modesEnum.CREDITS;
            }
        }

        return modesEnum.HOME;
    }

    function update() {
        switch (selectedButton) {
            case 0:
                newGameButton.hover();
                controlsButton.unhover();
                creditsButton.unhover();
                break;
            case 1:
                newGameButton.unhover();
                controlsButton.hover();
                creditsButton.unhover();
                break;
            case 2:
                newGameButton.unhover();
                controlsButton.unhover();
                creditsButton.hover();
                break;
        }
    }

    function render() {
        let title = "Big Blue Is You!";

        context.font = "48px Courier";

        let fontHeight = context.measureText("m").width;

        context.fillText(title, (windowWidth/2) - (context.measureText(title).width/2), 50 + (fontHeight/2));

        creditsButton.render();
        controlsButton.render();
        newGameButton.render();
    }

    return {
        processInput : processInput,
        update : update,
        render : render
    }
}