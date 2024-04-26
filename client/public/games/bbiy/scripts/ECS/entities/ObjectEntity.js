import { Entity } from "./Entity.js";
import { Sprite } from "../components/Sprite.js";
import { Position } from "../components/Position.js";
import { Noun } from "../components/Noun.js";
import { nounTypesEnum, spriteSheetEnum } from "../../state/enums.js"
import { Property } from "../components/Property.js";

export function createBigBlue(spec) {
    let bigBlue = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    bigBlue.addComponent(Sprite({spriteSheet: spriteSheetEnum.bigblue, spriteWidth: 24, spriteIndex: 0, maxSpriteIndex: 3}));
    bigBlue.addComponent(Position({x: spec.x, y: spec.y}));
    bigBlue.addComponent(Noun({nounType: nounTypesEnum.BIGBLUE}));
    bigBlue.addComponent(Property());

    return bigBlue;
}

export function createWall(spec) {
    let wall = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    wall.addComponent(Sprite({spriteSheet: spriteSheetEnum.wall, spriteWidth: 24, spriteIndex: 0, maxSpriteIndex: 3}));
    wall.addComponent(Position({x: spec.x, y: spec.y}));
    wall.addComponent(Noun({nounType: nounTypesEnum.WALL}));
    wall.addComponent(Property());

    return wall;
}

export function createHedge(spec) {
    let hedge = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    hedge.addComponent(Sprite({spriteSheet: spriteSheetEnum.hedge, spriteWidth: 24, spriteIndex: 0, maxSpriteIndex: 3}));
    hedge.addComponent(Position({x: spec.x, y: spec.y}));
    hedge.addComponent(Property({isStop: true}))

    return hedge;
}

export function createFlag(spec) {
    let flag = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    flag.addComponent(Sprite({spriteSheet: spriteSheetEnum.flag, spriteWidth: 24, spriteIndex: 0, maxSpriteIndex: 3}));
    flag.addComponent(Position({x: spec.x, y: spec.y}));
    flag.addComponent(Noun({nounType: nounTypesEnum.FLAG}));
    flag.addComponent(Property());

    return flag;
}

export function createRock(spec) {
    let rock = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    rock.addComponent(Sprite({spriteSheet: spriteSheetEnum.rock, spriteWidth: 24, spriteIndex: 0, maxSpriteIndex: 3}));
    rock.addComponent(Position({x: spec.x, y: spec.y}));
    rock.addComponent(Noun({nounType: nounTypesEnum.ROCK}));
    rock.addComponent(Property());

    return rock;
}

export function createLava(spec) {
    let lava = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    lava.addComponent(Sprite({spriteSheet: spriteSheetEnum.lava, spriteWidth: 24, spriteIndex: 0, maxSpriteIndex: 3}));
    lava.addComponent(Position({x: spec.x, y: spec.y}));
    lava.addComponent(Noun({nounType: nounTypesEnum.LAVA}));
    lava.addComponent(Property());

    return lava;
}

export function createWater(spec) {
    let water = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    water.addComponent(Sprite({spriteSheet: spriteSheetEnum.water, spriteWidth: 24, spriteIndex: 0, maxSpriteIndex: 3}));
    water.addComponent(Position({x: spec.x, y: spec.y}));
    water.addComponent(Noun({nounType: nounTypesEnum.WATER}));
    water.addComponent(Property());

    return water;
}

export function createFloor(spec) {
    let floor = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    floor.addComponent(Sprite({spriteSheet: spriteSheetEnum.floor, spriteWidth: 24, spriteIndex: 0, maxSpriteIndex: 3}));
    floor.addComponent(Position({x: spec.x, y: spec.y}));

    return floor;
}

export function createGrass(spec) {
    let grass = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    grass.addComponent(Sprite({spriteSheet: spriteSheetEnum.grass, spriteWidth: 24, spriteIndex: 0, maxSpriteIndex: 3}));
    grass.addComponent(Position({x: spec.x, y: spec.y}));

    return grass;
}
