function initializeGame() {
    const LEFT = 0
    const RIGHT = 1
    const UP = 2
    const DOWN = 3

    let moved = false
    let hint = false
    let breadcrumbs = false
    let showShortestPath = false
    let mazeStarted = false
    let startTime = 0
    let totalScore = 0
    let totalHighscore = 0
    let totalHighscoreSize = 0
    let elapsedTime = 0
    let moves = 0
    let mazeSize = 0
    let playerSpecs = {
        x: 0,
        y: 0
    }


    /*
    *   INITIALIZE!
    * 
    *   This next section initializes the whole of everything. 
    *   It is called when the "Create Maze!" button is pressed
    */

    function initialize() {
        moved = false
        breadcrumbs = false
        showShortestPath = false
        mazeStarted = false
        startTime = 0
        hint = false
        totalScore = 0
        elapsedTime = 0
        moves = 0
        mazeSize = document.getElementById("size").value
        playerSpecs = {
            x: 0,
            y: 0
        }

        renderMaze(mazeSize, true);
        mazeStarted = true;
        startTime = performance.now()

        gameLoop();
    }

    function end() {
        if (totalScore > totalHighscore) {
            totalHighscore = totalScore
            totalHighscoreSize = mazeSize
        }

        mazeStarted = false;

        gameLoop();
    }

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
        if (input.keys.hasOwnProperty('a') || input.keys.hasOwnProperty('j') || input.keys.hasOwnProperty('ArrowLeft')) {
            if (playerSpecs.x > 0 && wallCheck(LEFT, playerSpecs)) {
                playerSpecs.x -= 1
                moves++
                moved = true
            }

            delete input.keys['a']
            delete input.keys['j']
            delete input.keys['ArrowLeft']
        }

        if (input.keys.hasOwnProperty('d') || input.keys.hasOwnProperty('l') || input.keys.hasOwnProperty('ArrowRight')) {
            if (playerSpecs.x < mazeSize - 1 && wallCheck(RIGHT, playerSpecs)) {
                playerSpecs.x += 1
                moves++
                moved = true
            }

            delete input.keys['d']
            delete input.keys['l']
            delete input.keys['ArrowRight']
        }

        if (input.keys.hasOwnProperty('w') || input.keys.hasOwnProperty('i') || input.keys.hasOwnProperty('ArrowUp')) {
            if (playerSpecs.y > 0 && wallCheck(UP, playerSpecs)) {
                playerSpecs.y -= 1
                moves++
                moved = true
            }

            delete input.keys['w']
            delete input.keys['i']
            delete input.keys['ArrowUp']
        }

        if (input.keys.hasOwnProperty('s') || input.keys.hasOwnProperty('k') || input.keys.hasOwnProperty('ArrowDown')) {
            if (playerSpecs.y < mazeSize - 1 && wallCheck(DOWN, playerSpecs)) {
                playerSpecs.y += 1
                moves++
                moved = true
            }

            delete input.keys['s']
            delete input.keys['k']
            delete input.keys['ArrowDown']
        }

        if (input.keys.hasOwnProperty('h')) {
            hint = !hint
            delete input.keys['h']
        }

        if (input.keys.hasOwnProperty('b')) {
            breadcrumbs = !breadcrumbs
            delete input.keys['b']
        }

        if (input.keys.hasOwnProperty('p')) {
            showShortestPath = !showShortestPath
            delete input.keys['p']
        }
    }

    function update(timeStamp) {
        if (mazeStarted) {
            elapsedTime = (timeStamp - startTime) / 1000
            totalScore = moves - (elapsedTime / (mazeSize / 2))

            if (moved) {
                pathChecks(playerSpecs)
                moved = false
            }
        }
    }

    function render() {
        let time = document.getElementById("time");
        let score = document.getElementById("score");
        let highscore = document.getElementById("highscore");

        time.innerHTML = `Elapsed Time: ${parseInt(elapsedTime)} sec`;
        score.innerHTML = `Score: ${parseInt(totalScore)}`;
        highscore.innerHTML = `Highscore: ${parseInt(totalHighscore)} on a ${totalHighscoreSize}x${totalHighscoreSize}`;

        if (mazeStarted) {
            renderMaze(mazeSize, false, false, hint, breadcrumbs, showShortestPath, playerSpecs);
        }
    }

    function gameLoop(timeStamp) {
        
        processInput();
        update(timeStamp);
        render();

        if (mazeStarted) {
            if (winCheck(playerSpecs, mazeSize)) {
                // debugger
                render()
                end()
                debugger
            }
        }

        requestAnimationFrame(gameLoop);
    }
    
    return initialize;
}

const initialize = initializeGame()
