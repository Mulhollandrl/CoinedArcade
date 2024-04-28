import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import "./styles/GamePage.css"

const gameScripts = {
    mazegame: [
        "mazeMaker.js",
        "game.js"
    ],
    breakout: [
        "ball.js",
        "brick.js",
        "buttons.js",
        "paddle.js",
        "score.js",
        "views/about.js",
        "views/gameplay.js",
        "views/help.js",
        "views/highscores.js",
        "views/home.js",
        "views/resumeGame.js",
        "game.js",
    ],
    dodger: [
        "buttons.js",
        "platform.js",
        "platformParticles.js",
        "player.js",
        "playerParticles.js",
        "timer.js",
        "views/about.js",
        "views/gameplay.js",
        "views/highscores.js",
        "views/home.js",
        "game.js",
    ],
    bbiy: [
        "game.js",
        "inputs/Keyboard.js"
    ]
}

export const GamePage = () => {
    const { gamename } = useParams();
    const mazeGame = gamename == "mazegame";
    const bbiyGame = gamename == "bbiy";
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        const scriptPaths = gameScripts[gamename]

        const loadScript = (index) => {
            if (index >= scriptPaths.length) {
                setScriptLoaded(true);
                return;
            }
    
            const script = document.createElement('script');
            if (bbiyGame){
                script.type = 'module';
            }
            script.src = `/games/${gamename}/scripts/${scriptPaths[index]}`;
            script.onload = () => loadScript(index + 1);
            document.body.appendChild(script);
        };
    
        loadScript(0);

        return () => {
            scriptPaths.forEach((scriptPath) => {
                const script = document.querySelector(`script[src="/games/${gamename}/scripts/${scriptPath}"]`);
                if (script) {
                    console.log(script)
                    document.body.removeChild(script);
                }
            })
        }
    }, [gamename])

    return (
        !mazeGame ? 
        (
            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id="GameArea">
                            <canvas id="canvas" width="1000" height="750"></canvas>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th id="Footer" colSpan="3">Created By Richard Mulholland For CS5410</th>
                    </tr>
                </tfoot>
            </table>
        ) : (
            <MazeGamePage scriptLoaded={scriptLoaded}/>
        )
    )
}

const MazeGamePage = (scriptLoaded) => {
    const innerInitialize = () => {
        if (scriptLoaded) {
            initialize()
        }
    }

    return (
        <div>
            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th id="Header" colSpan="3">Amaizeing Maze</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="3">
                            <div id="HorizontalDiv">
                                <p className="Scores" id="score">Score: </p>
                                <p className="Scores" id="highscore">Highscore: </p>
                                <p className="Scores" id="time">Elapsed Time: </p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td id="CreateMaze">
                            <div className="CenteredDiv">
                                <h2>Create New Maze:</h2>
                                <label htmlFor="size">Size:</label>
                                <select name="size" id="size">
                                    <option value="5">5x5</option>
                                    <option value="10">10x10</option>
                                    <option value="15">15x15</option>
                                    <option value="20">20x20</option>
                                </select>
                                <br />
                                <button id="button" onClick={innerInitialize}>Create Maze!</button>
                            </div>
                        </td>
                        <td id="GameArea">
                            <canvas id="canvas" width="500" length="500"></canvas>
                        </td>
                        <td id="ControlsAndScores">
                            <div className="CenteredDiv">
                                <h2>Controls:</h2>
                                <h3>Hint (toggle): h</h3>
                                <h3>Breadcrumb Trail (toggle): b</h3>
                                <h3>Shortest Path (toggle): p</h3>
                                <h3>Move (toggle): WASD/IJKL/Arrow Keys</h3>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th id="Footer" colSpan="3">Created By Richard Mulholland For CS5410</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}