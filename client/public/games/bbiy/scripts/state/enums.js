export const modesEnum = {
    HOME: 'main menu',
    CREDITS: 'credits',
    LEVELS: 'levels',
    GAME: 'game',
    CONTROLS: 'controls'
}

export const PAUSE_OPTIONS = {
    RESUME: 'resume',
    QUIT: 'quit'
}

export const textTypesEnum = {
    VERB: 'verb',
    NOUN: 'noun',
    ADJECTIVE: 'adjective'
}

export const nounTypesEnum = {
    BIGBLUE: 'bigblue',
    WALL: 'wall',
    FLAG: 'flag',
    ROCK: 'rock',
    LAVA: 'lava',
    WATER: 'water',
    TEXT: 'text',
    HEDGE: 'hedge',
    FLOOR: 'floor',
    GRASS: 'grass'
}

export const adjectiveTypesEnum = {
    STOP: 'stop',
    PUSH: 'push',
    YOU: 'you',
    WIN: 'win',
    SINK: 'sink',
    DEFEAT: 'defeat'
}

export const componentTypesEnum = {
    INPUT: 'input',
    NOUN: 'noun',
    POSITION: 'position',
    PROPERTY: 'property',
    SPRITE: 'sprite',
    TEXT: 'text',
    MOVED: 'moved'
}

export const entityPropertiesEnum = {
    STOP: 'isStop',
    PUSH: 'isPush',
    YOU: 'isYou',
    WIN: 'isWin',
    SINK: 'isSink',
    DEFEAT: 'isDefeat'
}

export const directionsEnum = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
}

export const spriteSheetEnum = {
    [nounTypesEnum.BIGBLUE]: 'assets/objects/babaPlayerSprites.png',
    [nounTypesEnum.WALL]: 'assets/objects/wallObjectSprites.png',
    [nounTypesEnum.FLAG]: 'assets/objects/flagObjectSprites.png',
    [nounTypesEnum.ROCK]: 'assets/objects/rockObjectSprites.png',
    [nounTypesEnum.LAVA]: 'assets/objects/lavaObjectSprites.png',
    [nounTypesEnum.WATER]: 'assets/objects/waterObjectSprites.png',    
    [nounTypesEnum.HEDGE]: 'assets/objects/hedgeObjectSprites.png',
    [nounTypesEnum.FLOOR]: 'assets/objects/floorObjectSprites.png',
    [nounTypesEnum.GRASS]: 'assets/objects/grassObjectSprites.png'
}
