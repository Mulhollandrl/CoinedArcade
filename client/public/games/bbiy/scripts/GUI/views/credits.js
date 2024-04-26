// This is a file to make a gui for seeing the credits and attributions for the game
import { button } from "../utilities/buttons.js";
import { modesEnum } from "../../state/enums.js";
import { controlsKeys } from "../../state/globals.js";

export function creditsPage (windowWidth, windowHeight, context){
    let backButton = button({y: windowHeight - (100), height: 50, text: "Back!"}, windowWidth, context);

    function processInput(keys) {
        // TODO: We need to put a function here haha

        if (keys.hasOwnProperty(controlsKeys.data.select)) {
            delete keys[controlsKeys.data.select]

            return modesEnum.HOME;
        }

        return modesEnum.CREDITS;
    }

    function render() {
        let title = "Credits";
        let created = "Created By:\nEthan Christensen AND\nRichard Mulholland";
        let helper = "With Assistance From:\nDr. Dean Mathias";
        let music = "With Music From:\nPlantasia by Mort Garson";
        let art = "With Art From:\nBaba is You by Hempuli";

        context.font = "48px Courier";

        let fontHeight = context.measureText("m").width;

        context.fillText(title, (windowWidth/2) - (context.measureText(title).width/2), 50 + (fontHeight/2));

        context.font = "24px Courier";

        fontHeight = context.measureText("m").width;

        context.fillText(created, (windowWidth/2) - (context.measureText(created).width/2), 125 + (fontHeight/2));
        context.fillText(helper, (windowWidth/2) - (context.measureText(helper).width/2), 200 + (fontHeight/2));
        context.fillText(music, (windowWidth/2) - (context.measureText(music).width/2), 275 + (fontHeight/2));
        context.fillText(art, (windowWidth/2) - (context.measureText(art).width/2), 350 + (fontHeight/2));

        backButton.render();
        backButton.hover();
    }

    return {
        processInput : processInput,
        render : render
    }
}