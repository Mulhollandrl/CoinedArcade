function initializeMazeMaker() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    let maze = []
    let shortestPathList = []
    let shortestPath = []
    let breadcrumbPath = []
    let characterImage;
    let brickImage;
    let goalImage;
    let strawImage;

    canvas.height = 500
    canvas.width = 500

    /*
    *   RENDER MAZE!
    * 
    *   This next section houses the function that initializes everything, and then renders everything
    */

    function renderMaze(mazeSize, init = false, generateShortestPath = false, showHint = false, showBreadcrumbs = false, showShortestPath = false, playerSpecs = {x: 0, y:0}) {
        let background = new Image();

        if (init) {
            maze = []
            shortestPathList = []
            breadcrumbPath = []
            createRandomMaze(mazeSize);
            shortestPath = findShortestPath(mazeSize);

            characterImage = new Image();
            goalImage = new Image();
            brickImage = new Image();
            strawImage = new Image();
        
            characterImage.src = "games/mazegame/images/scarecrow.png"
            goalImage.src = "games/mazegame/images/heart.png"
            brickImage.src = "games/mazegame/images/yellowBrick.png"
            strawImage.src = "games/mazegame/images/straw.png"
        }

        background.src = "games/mazegame/images/cornBackground.jpg";
        background.onload = function() {
            context.beginPath();
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(background, 0, 0, canvas.width, canvas.height);
            // drawGrid(mazeSize);
            if (showShortestPath) {
                drawShortestPath(mazeSize);
            }

            if (showHint) {
                drawHint(mazeSize);
            }

            if (showBreadcrumbs) {
                debugger
                drawBreadcrumbs(mazeSize);
            }

            drawGoal(mazeSize);
            drawCharacter(playerSpecs, mazeSize);
            drawMaze(mazeSize);
            context.closePath();
        }
    }

    /*
    *   UTILITY FUNCTIONS!
    * 
    *   This next section houses all of functions that I needed for miscellaneous reasons
    */

    function findNeighborsNotInList(notInList, cellIndex, mazeSize) {
        const cellCount = mazeSize * mazeSize
        const getIndex = (cellNumber, list) => list.findIndex(cell => cell.cellNumber == cellNumber);

        let possibleNeighbors = [parseInt(cellIndex - 1), parseInt(cellIndex + 1), parseInt(cellIndex - mazeSize), parseInt(cellIndex) + parseInt(mazeSize)]
        let neighborsNotInList = []
        let currentRow = parseInt(cellIndex/mazeSize)

        for (let neighbor of possibleNeighbors) {
            if (neighbor < 0 || neighbor >= cellCount || (neighbor - 1 == cellIndex && parseInt(neighbor/mazeSize)!= currentRow) || (neighbor + 1 == cellIndex && parseInt(neighbor/mazeSize)!= currentRow)) {
                continue;
            }

            neighborsNotInList.push(neighbor)

            for (let cell of notInList) {
                if (cell.cellNumber == neighbor) {
                    neighborsNotInList.splice(getIndex(neighbor, neighborsNotInList), 1)
                }
            }
        }

        return neighborsNotInList
    }

    function findPossiblePathNeighbors(cellIndex, mazeSize) {
        let mazeCell = maze[cellIndex]
        let possiblePathNeighbors = []

        for (let wallIndex in mazeCell.walls) {
            let wall = mazeCell.walls[wallIndex]

            if (wall == 0) {
                if (wallIndex == 0) {
                    possiblePathNeighbors.push(parseInt(cellIndex) - 1)
                }
                if (wallIndex == 1) {
                    possiblePathNeighbors.push(parseInt(cellIndex) + 1)
                }
                if (wallIndex == 2) {
                    possiblePathNeighbors.push(parseInt(cellIndex) - parseInt(mazeSize))
                }
                if (wallIndex == 3) {
                    possiblePathNeighbors.push(parseInt(cellIndex) + parseInt(mazeSize))
                }
            }
        }

        return possiblePathNeighbors;
    }

    /*
    *   CREATE MAZE!
    * 
    *   This next section creates the random maze using a version of Prim's Minimal Spanning Tree algorithm
    */

    function createRandomMaze(mazeSize) {
        let cellCount = mazeSize * mazeSize;
        let notVisited = [];
        let frontier = [];

        for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
            notVisited.push({
                cellNumber : cellIndex,
                walls : [1, 1, 1, 1]
            });
            maze.push({
                cellNumber : cellIndex,
                //left, right, up, down
                walls : [1, 1, 1, 1]
            });
        }

        frontier.push(notVisited[0]);

        let frontierNeighbors = findNeighborsNotInList(frontier, frontier[0].cellNumber, mazeSize);
        frontier.push(...frontierNeighbors);

        frontier.splice(0, 1);
        notVisited.splice(0, 1);
        while (frontier.length != 0) {
            const getIndex = (cellNumber, list) => list.findIndex(cell => cell.cellNumber == cellNumber);

            let currentCell = frontier[Math.floor(Math.random() * frontier.length)];
            let frontierIndex = frontier.indexOf(currentCell);
            let notVisitedIndex = getIndex(currentCell, notVisited);
            let pathNeighbors = findNeighborsNotInList(notVisited, currentCell, mazeSize);
            let randomPathNeighbor = pathNeighbors[Math.floor(Math.random() * pathNeighbors.length)];

            let frontierNeighbors = findNeighborsNotInList(frontier, currentCell, mazeSize);

            for (let frontierNeighborCell in frontierNeighbors) {
                let nv = getIndex(frontierNeighbors[frontierNeighborCell], notVisited);
                let fn = frontier.indexOf(frontierNeighbors[frontierNeighborCell]);

                if (nv != -1 && fn == -1) {
                    frontier.push(frontierNeighbors[frontierNeighborCell]);
                }
            }

            frontier.splice(frontierIndex, 1);
            notVisited.splice(notVisitedIndex, 1);

            // right
            if (parseInt(currentCell) + 1 == parseInt(randomPathNeighbor)) {
                maze[currentCell].walls[1] = 0;
                maze[randomPathNeighbor].walls[0] = 0;
            }
            // left
            if (parseInt(currentCell) - 1 == parseInt(randomPathNeighbor)) {
                maze[currentCell].walls[0] = 0;
                maze[randomPathNeighbor].walls[1] = 0;
            }
            // down
            if (parseInt(currentCell) + parseInt(mazeSize) == parseInt(randomPathNeighbor)) {
                maze[currentCell].walls[3] = 0;
                maze[randomPathNeighbor].walls[2] = 0;
            }
            // up
            if (parseInt(currentCell) - parseInt(mazeSize) == parseInt(randomPathNeighbor)) {
                maze[currentCell].walls[2] = 0;
                maze[randomPathNeighbor].walls[3] = 0;
            }
        }
    }

    /*
    *   FIND SHORTEST PATH!
    * 
    *   This next section finds the shortest path using a modified version of a breadth first search and 
    *   a version of Dijkstra's algorithm
    */

    function findShortestPath(mazeSize) {
        let cellCount = mazeSize * mazeSize;
        let notVisited = [];
        let frontier = [];

        for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
            notVisited.push(cellIndex);
            shortestPathList.push(Infinity);
        }

        shortestPathList[0] = 0
        notVisited.splice(0, 1)
        frontier.push({index: 0, path: [0]})

        while (frontier.length != 0) {
            let currentCell = frontier.pop()
            let possiblePathNeighbors = findPossiblePathNeighbors(currentCell.index, mazeSize)

            if (currentCell.index == cellCount - 1) {
                let path = currentCell.path
                return path;
            }

            for (let pathNeighbor of possiblePathNeighbors) {
                if (shortestPathList[pathNeighbor] > (shortestPathList[currentCell.index] + 1)) {
                    shortestPathList[pathNeighbor] = shortestPathList[currentCell.index] + 1
                }

                if (notVisited.indexOf(pathNeighbor) != -1) {
                    notVisited.splice(notVisited.indexOf(pathNeighbor), 1)
                    let path = currentCell.path.slice()
                    path.push(pathNeighbor)
                    frontier.push({index: pathNeighbor, path: path})
                }
            }
        }
    }

    /*
    *   DRAWING!
    * 
    *   This next section houses all of functions responsible for the rendering of the maze
    */

    function drawGrid(mazeSize) {
        let hcellSize = canvas.width/mazeSize
        let vcellSize = canvas.height/mazeSize

        context.translate(0.5, 0.5)

        for (let x = 1; x < mazeSize; x++) {
            context.moveTo(x*hcellSize, 0)
            context.lineTo(x*hcellSize, canvas.height)
        }

        for (let y = 1; y < mazeSize; y++) {
            context.moveTo(0, y*vcellSize)
            context.lineTo(canvas.width, y*vcellSize)
        }

        context.lineWidth = 1;
        context.strokeStyle = "black";
        context.stroke();

        context.translate(-0.5, -0.5)
    }

    function drawMaze(mazeSize) {
        let hcellSize = canvas.width/mazeSize
        let vcellSize = canvas.height/mazeSize

        for (let cell of maze) {
            let walls = cell.walls
            let rowIndex = cell.cellNumber % mazeSize
            let colIndex = (cell.cellNumber - rowIndex) / mazeSize

            if (walls[0] == 1) {
                context.moveTo(rowIndex*hcellSize, colIndex*vcellSize)
                context.lineTo(rowIndex*hcellSize, (colIndex+1)*vcellSize)
            }
            if (walls[1] == 1) {
                context.moveTo((rowIndex+1)*hcellSize, colIndex*vcellSize)
                context.lineTo((rowIndex+1)*hcellSize, (colIndex+1)*vcellSize)
            }
            if (walls[2] == 1) {
                context.moveTo(rowIndex*hcellSize, colIndex*vcellSize)
                context.lineTo((rowIndex+1)*hcellSize, colIndex*vcellSize)
            }
            if (walls[3] == 1) {
                context.moveTo(rowIndex*hcellSize, (colIndex+1)*vcellSize)
                context.lineTo((rowIndex+1)*hcellSize, (colIndex+1)*vcellSize)
            }
        }

        context.lineWidth = 6;
        context.strokeStyle = "white";
        context.stroke();
    }

    function drawCharacter(specs, mazeSize) {
        let hcellSize = canvas.width/mazeSize
        let vcellSize = canvas.height/mazeSize

        context.drawImage(characterImage, specs.x*hcellSize, specs.y*vcellSize, canvas.width/mazeSize, canvas.height/mazeSize);
    }

    function drawGoal(mazeSize) {
        let hcellSize = canvas.width/mazeSize
        let vcellSize = canvas.height/mazeSize

        context.drawImage(goalImage, canvas.width-hcellSize, canvas.height-vcellSize, canvas.width/mazeSize, canvas.height/mazeSize);
    }

    function drawShortestPath(mazeSize) {
        let hcellSize = canvas.width/mazeSize
        let vcellSize = canvas.height/mazeSize
        
        for (let cell of shortestPath.slice(1, shortestPath.length-1)) {
            let rowIndex = cell % mazeSize
            let colIndex = (cell - rowIndex) / mazeSize
            
            context.drawImage(brickImage, rowIndex*hcellSize, colIndex*vcellSize, hcellSize, vcellSize);
        }
    }

    function drawHint(mazeSize) {
        let hcellSize = canvas.width/mazeSize
        let vcellSize = canvas.height/mazeSize
        let cell = shortestPath[1]
        let rowIndex = cell % mazeSize
        let colIndex = (cell - rowIndex) / mazeSize

        context.drawImage(brickImage, rowIndex*hcellSize, colIndex*vcellSize, hcellSize, vcellSize);
    }

    function drawBreadcrumbs(mazeSize) {
        let hcellSize = canvas.width/mazeSize
        let vcellSize = canvas.height/mazeSize
        
        for (let cell of breadcrumbPath) {
            let rowIndex = cell % mazeSize
            let colIndex = (cell - rowIndex) / mazeSize
            debugger
            
            context.drawImage(strawImage, rowIndex*hcellSize, colIndex*vcellSize, hcellSize, vcellSize);
        }
    }

    /*
    *   WALL CHECK!
    * 
    *   This next section checks to see if there is a wall there, and will not let the character move there if there is
    */

    function wallCheck(direction, playerSpecs) {
        return maze[(playerSpecs.y * mazeSize) + playerSpecs.x].walls[direction] == 0
    }

    /*
    *   SHORTEST PATH CHECK!
    * 
    *   This next section checks to see if the character has moved in or out of the shortest path, and adjusts the shortest path to reflect that.
    *   It also... adds breadcrumbs...
    */

    function pathChecks(playerSpecs) {
        if (shortestPath.indexOf((playerSpecs.y * mazeSize) + playerSpecs.x) != -1) {
            shortestPath.splice(0, 1)
        } else {
            shortestPath.splice(0, 0, (playerSpecs.y * mazeSize) + playerSpecs.x)
        }

        if (breadcrumbPath.indexOf((playerSpecs.y * mazeSize) + playerSpecs.x) == -1) {
            breadcrumbPath.push((playerSpecs.y * mazeSize) + playerSpecs.x)
        }
    }

    /*
    *   WIN CHECK!
    * 
    *   Are you winning... Old Sport? Checks if you have won or not
    */

    function winCheck(playerSpecs, mazeSize) {
        if ((playerSpecs.y * mazeSize) + playerSpecs.x == (mazeSize * mazeSize) - 1) {
            drawCharacter(playerSpecs, maze)
            return true;
        }
    }

    return {
        renderMaze : renderMaze,
        findNeighborsNotInList : findNeighborsNotInList,
        findPossiblePathNeighbors : findPossiblePathNeighbors,
        createRandomMaze : createRandomMaze,
        findShortestPath : findShortestPath,
        drawGrid : drawGrid,
        drawMaze : drawMaze,
        drawCharacter : drawCharacter,
        drawGoal : drawGoal,
        drawShortestPath : drawShortestPath,
        drawHint : drawBreadcrumbs,
        wallCheck : wallCheck,
        pathChecks : pathChecks,
        winCheck : winCheck
    }
}

const mazeMaker = initializeMazeMaker();

const renderMaze = mazeMaker.renderMaze;
const findNeighborsNotInList = mazeMaker.findNeighborsNotInList;
const findPossiblePathNeighbors = mazeMaker.findPossiblePathNeighbors;
const createRandomMaze = mazeMaker.createRandomMaze;
const findShortestPath = mazeMaker.findShortestPath;
const drawGrid = mazeMaker.drawGrid;
const drawMaze = mazeMaker.drawMaze;
const drawCharacter = mazeMaker.drawCharacter;
const drawGoal = mazeMaker.drawGoal;
const drawShortestPath = mazeMaker.drawShortestPath;
const drawHint = mazeMaker.drawHint;
const wallCheck = mazeMaker.wallCheck;
const pathChecks = mazeMaker.pathChecks;
const winCheck = mazeMaker.winCheck;