const gamesAvailable = {
    "mazegame" : {
        name: "Amaizeing Maze!",
        description: "A game where you try to solve the maze as fast as possible!",
        imageLocation: "../../../public/maze.png",
        gameUrl: "mazegame"
    },
    "breakout" : {
        name: "Acne Breakout!",
        description: "A ripoff of Atari Breakout! Break all of the blocks to move on!",
        imageLocation: "../../../public/breakout.png",
        gameUrl: "breakout"
    },
    "dodger" : {
        name: "Dodger",
        description: "Dodge the falling blocks for as long as you can!",
        imageLocation: "../../../public/dodger.png",
        gameUrl: "dodger"
    },
    "bbiy" : {
        name: "Big Blue Is You",
        description: "A ripoff of Baba Is You! Move the words to change the rules!",
        imageLocation: "../../../public/maze.png",
        gameUrl: "bbiy"
    },
    "tictactoe" : {
        name: "Tic Tac Toe",
        description: "A game where you try to solve the maze as fast as possible!",
        imageLocation: "../../../public/maze.png",
        gameUrl: "tictactoe"
    }
}

import { Router } from "express";
import { DEBUG, MANIFEST } from "../../index";

export const buildHomeController = () => {
  const router = Router();
  router.get("/:gamename", (req, res) => {
    res.json(gamesAvailable.)
  });

  return router;
}