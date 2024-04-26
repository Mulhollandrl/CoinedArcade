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
import parseLevels from "../bbiy_server/levels/parseLevels";

export const buildGamesController = () => {
  const router = Router();
  let levels: Array<{name: string, width: number, height: number, background: string, foreground: string}> | null = null

  router.get("/:gamename", (req, res) => {
    res.json(gamesAvailable)
  });

  router.get("/levels", async (req, res) => {
    if (!levels) {
        levels = await parseLevels("../bbiy_server/levels-all.bbiy")
    }
  });

  return router;
}