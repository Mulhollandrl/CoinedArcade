import { controlsPage } from "./GUI/views/controls.js";
import { creditsPage } from "./GUI/views/credits.js";
import { homePage } from "./GUI/views/home.js";
import { levelsPage } from "./GUI/views/levels.js";
import { gamePage } from "./GUI/views/gameplay.js";
import { modesEnum } from "./state/enums.js";
// import { Mode } from './state/globals.js'

export let canvas = document.getElementById("canvas");
export let context = canvas.getContext("2d");
let canvasHeight = window.innerHeight - 175;
let canvasWidth = canvasHeight*(1 + 7/9);

canvas.height = canvasHeight;
canvas.width = canvasWidth;
canvas.style.height = canvasHeight;
canvas.style.width = canvasWidth;


let HomeScreen = homePage(canvasWidth, canvasHeight, context);
let LevelsScreen = levelsPage(canvasWidth, canvasHeight, context, restartGame);
let ControlsScreen = controlsPage(canvasWidth, canvasHeight, context);
let CreditsScreen = creditsPage(canvasWidth, canvasHeight, context);
let GameScreen = gamePage(canvasWidth, canvasHeight, context, restartGame);

export function restartGame() {
  GameScreen = gamePage(canvasWidth, canvasHeight, context, restartGame);
  // console.log("RESET");
}

let state = modesEnum.HOME;
let lastTime = performance.now();

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
  switch (state) {
      case modesEnum.HOME:
        state = HomeScreen.processInput(input.keys);
        break;
      case modesEnum.LEVELS:
        state = LevelsScreen.processInput(input.keys);
        break;
      case modesEnum.CONTROLS:
        state = ControlsScreen.processInput(input.keys);
        break;
      case modesEnum.CREDITS:
        state = CreditsScreen.processInput(input.keys);
        break;
      case modesEnum.GAME:
        state = GameScreen.processInput(input.keys);
        break;
  }
}

function update(timeStamp) {
  const elapsedTime = timeStamp - lastTime;

  switch (state) {
    case modesEnum.HOME:
      HomeScreen.update();
      break;
    case modesEnum.LEVELS:
      LevelsScreen.update();
      break;
    case modesEnum.CONTROLS:
      ControlsScreen.update();
      break;
    case modesEnum.CREDITS:
      break;
    case modesEnum.GAME:
      GameScreen.update(elapsedTime);
      break;
  }

  lastTime = timeStamp;
}

function render() {
  context.beginPath()
  context.rect(0, 0, canvasWidth, canvasHeight)
  context.fillStyle = "#595959"
  context.fill();
  context.closePath();
  context.fillStyle = "white"

  switch (state) {
    case modesEnum.HOME:
      HomeScreen.render();
      break;
    case modesEnum.LEVELS:
      LevelsScreen.render();
      break;
    case modesEnum.CONTROLS:
      ControlsScreen.render();
      break;
    case modesEnum.CREDITS:
      CreditsScreen.render();
      break;
    case modesEnum.GAME:
      GameScreen.render();
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
