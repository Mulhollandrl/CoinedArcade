// This is the page where we render the game and do what the "game" part of the game requires
import { button } from "../utilities/buttons.js";
import { modesEnum } from "../../state/enums.js";
import { controlsKeys } from "../../state/globals.js";
import EntityManager from "../../ECS/EntityManager.js";
import { levelMaker } from "../../ECS/levelMaker.js";

export function gamePage (windowWidth, windowHeight, context, resetGame){
    let audio = new Audio();
    let entityManager = null;
    let levelMade = false;
    let gameOverText = `GAME OVER! Press ${controlsKeys.data.undo} to undo!`;
    let winText = `YOU WIN!! Press ${controlsKeys.data.leave} to go to levels!`;
    let winSoundPlayed = false;
    const randomSong = Math.floor(Math.random() * 7);
    const winSound = new Audio("games/bbiy/assets/sounds/win.mp3")

    audio.loop = true;

    switch (randomSong) {
        case 0:
            audio.src = "games/bbiy/assets/music/02 - Symphony For A Spider Plant.mp3"
            break;
        case 1:
            audio.src = "games/bbiy/assets/music/04 - Ode To An African Violet.mp3"
            break;
        case 2:
            audio.src = "games/bbiy/assets/music/05 - Concerto For Philodendron And Pothos.mp3"
            break;
        case 3:
            audio.src = "games/bbiy/assets/music/06 - Rhapsody In Green.mp3"
            break;
        case 4:
            audio.src = "games/bbiy/assets/music/07 - Swingin' Spathiphyllums.mp3"
            break;
        case 5:
            audio.src = "games/bbiy/assets/music/08 - You Don't Have To Walk A Begonia.mp3"
            break;
        case 6:
            audio.src = "games/bbiy/assets/music/09 - Mellow Mood For Maidenhair.mp3"
            break;
        }

    function processInput(keys) {
        audio.play();

        if (keys.hasOwnProperty(controlsKeys.data.reset)) {
            audio.currentTime = 0;
            audio.pause();
            resetGame();

            delete keys[controlsKeys.data.reset]
        }

        if (keys.hasOwnProperty(controlsKeys.data.leave)) {
            audio.pause();
            delete keys[controlsKeys.data.leave]

            return modesEnum.LEVELS;
        }

        return modesEnum.GAME;
    }

    function update(elapsedTime) {
        // We need to initialize it, but only once per a gamePage...
        if (!levelMade) {
            entityManager = new EntityManager();
            levelMaker(entityManager);
            levelMade = true;
        }

        entityManager.update(elapsedTime);
    }

    function render() {
        entityManager.render();

        if (!entityManager.stillAlive) {
            context.fillStyle = "white"
            context.font = "48px Courier";

            let fontHeight = context.measureText("m").width;

            context.fillText(gameOverText, (windowWidth/2) - (context.measureText(gameOverText).width/2), (windowHeight/2) + (fontHeight/2));
        }

        if (entityManager.win) {
            if (!winSoundPlayed) {
                winSound.play();
                winSoundPlayed = true;
            }

            context.fillStyle = "white"
            context.font = "48px Courier";

            let fontHeight = context.measureText("m").width;

            context.fillText(winText, (windowWidth/2) - (context.measureText(winText).width/2), (windowHeight/2) + (fontHeight/2));
        }
    }

    return {
        processInput : processInput,
        update : update,
        render : render
    }
}