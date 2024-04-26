import { canvas } from "../game.js";

export function positionGrid(levelWidth, levelHeight) {
    const tileSize = canvas.height / levelHeight;
    const leftStart = (canvas.width - (levelWidth * tileSize)) / 2;

    function getX(xIndex) {
        return xIndex * tileSize + leftStart;
    }

    function getY(yIndex) {
        return yIndex * tileSize;
    }

    return {
        get tileSize() { return tileSize },
        get leftStart() { return leftStart },
        levelWidth : tileSize * levelWidth,
        levelHeight : tileSize * levelHeight,
        getX : getX,
        getY : getY
    }
}