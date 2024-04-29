import { useNavigate } from "react-router-dom"
import { GamePreview } from "./components/gamePreview"
import "./styles/ArcadePage.css"

export const ArcadePage = () => {
    const navigate = useNavigate();
    const gamesAvailable = {
        // "Maze Game" : {
        //     name: "Amaizeing Maze!",
        //     description: "A game where you try to solve the maze as fast as possible!",
        //     imageLocation: "../../../public/maze.png",
        //     gameUrl: "mazegame"
        // },
        "Breakout" : {
            name: "Acne Breakout!",
            description: "A ripoff of Atari Breakout! Break all of the blocks to move on!",
            imageLocation: "../../../public/breakout.png",
            gameUrl: "breakout"
        },
        "Dodger" : {
            name: "Dodger",
            description: "Dodge the falling blocks for as long as you can!",
            imageLocation: "../../../public/dodger.png",
            gameUrl: "dodger"
        },
        "Big Blue Is You" : {
            name: "Big Blue Is You",
            description: "A ripoff of Baba Is You! Move the words to change the rules!",
            imageLocation: "../../../public/bbiy.png",
            gameUrl: "bbiy"
        },
        "Tic Tac Toe" : {
            name: "Tic Tac Toe",
            description: "A game where you try to solve the maze as fast as possible!",
            imageLocation: "../../../public/tictactoe.png",
            gameUrl: "tictactoe"
        }
    }

    return (
        <div>
            <h1>🎉 COINED! ARCADE 🎉</h1>
            <h2>Games Available:</h2>
  
            <div>
                {
                    gamesAvailable && Object.entries(gamesAvailable).map(([gameKey, gameValue], index) => {
                        return (
                            <GamePreview 
                                key={index}
                                name={gameValue.name}
                                description={gameValue.description}
                                imageLocation={gameValue.imageLocation}
                                gameUrl={gameValue.gameUrl}
                                onClick={() => navigate(`/games/${gameValue.gameUrl}`)}
                            />
                        )
                    })
                }
            </div>
        </div>
      )
}