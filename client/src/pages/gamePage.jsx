import { useEffect, useState } from "react";
import { useApi } from "../utils/use_api";
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
    ],
    tictactoe: [
    ]
}

export const GamePage = () => {
    const api = useApi();
    const { gamename } = useParams();
    const mazeGame = gamename == "mazegame";
    const bbiyGame = gamename == "bbiy";
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [html, setHtml] = useState(null);

    // useEffect(() => {
    //     if (gamename == "tictactoe") {
    //         let hmtl = api.get("/games/tictactoe/tictactoe.html")
    //         setHtml(html)
    //     }
    // }, [])

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
                            {gamename != "tictactoe" ?
                                (<canvas id="canvas" width="1000" height="750"></canvas>)
                                :
                                (<iframe frameborder="0" src="https://itch.io/embed-upload/10298665?color=333333" allowfullscreen="" width="640" height="660"><a href="https://mulhollandrl.itch.io/tictactoe">Play Tic Tac Toe with GPS AI on itch.io</a></iframe>)
                            }
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
            <></>
        )
    )
}