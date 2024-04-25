import { useEffect } from "react";
import { useParams } from "react-router-dom"

const gameScripts = {
    mazegame: [
        ""
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
    ]
}

export const GamePage = () => {
    const { gamename } = useParams();

    useEffect(() => {
        const scriptPaths = gameScripts[gamename]

        scriptPaths.forEach((scriptPath) => {
            const script = document.createElement('script');
            script.src = `/games/${gamename}/scripts/${scriptPath}`;
            script.async = true;
            document.body.appendChild(script);
        });

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
        <table style={{width: "100%"}}>
            <thead>
                <tr>
                    <th id="Header" colSpan="3">{gamename}</th>
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
    )
}