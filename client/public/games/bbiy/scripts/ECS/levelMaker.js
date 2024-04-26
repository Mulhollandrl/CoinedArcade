import { adjectiveTypesEnum, nounTypesEnum, textTypesEnum } from "../state/enums.js";
import { currentLevel, levels } from "../state/globals.js";
import * as objectEntity from "./entities/ObjectEntity.js";
import * as textEntity from "./entities/TextEntity.js";

export function levelMaker(entityManager) {
    let level = levels[currentLevel];

    // Go through each of the lines of the level
    for (let i = 0; i < level.height; i++) {
        for (let j = 0; j < level.width; j++) {
            // Check for all background entities
            switch (level.background[(i * level.width) + j]){
                case 'w':
                    entityManager.addEntity(objectEntity.createWall({x: j, y: i}));
                    break;
                case 'r':
                    entityManager.addEntity(objectEntity.createRock({x: j, y: i}));
                    break;
                case 'f':
                    entityManager.addEntity(objectEntity.createFlag({x: j, y: i}));
                    break;
                case 'b':
                    entityManager.addEntity(objectEntity.createBigBlue({x: j, y: i}));
                    break;
                case 'l':
                    entityManager.addEntity(objectEntity.createFloor({x: j, y: i}));
                    break;
                case 'g':
                    entityManager.addEntity(objectEntity.createGrass({x: j, y: i}));
                    break;
                case 'a':
                    entityManager.addEntity(objectEntity.createWater({x: j, y: i}));
                    break;
                case 'v':
                    entityManager.addEntity(objectEntity.createLava({x: j, y: i}));
                    break;
                case 'h':
                    entityManager.addEntity(objectEntity.createHedge({x: j, y: i}))
                    break;
                case 'W':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/wallWordSprites.png', textType: textTypesEnum.NOUN, wordType: nounTypesEnum.WALL}));
                    break;
                case 'R':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/rockWordSprites.png', textType: textTypesEnum.NOUN, wordType: nounTypesEnum.ROCK}));
                    break;
                case 'F':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/flagWordSprites.png', textType: textTypesEnum.NOUN, wordType: nounTypesEnum.FLAG}));
                    break;
                case 'B':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/babaWordSprites.png', textType: textTypesEnum.NOUN, wordType: nounTypesEnum.BIGBLUE}));
                    break;
                case 'V':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/lavaWordSprites.png', textType: textTypesEnum.NOUN, wordType: nounTypesEnum.LAVA}));
                    break;
                case 'A':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/waterWordSprites.png', textType: textTypesEnum.NOUN, wordType: nounTypesEnum.WATER}));
                    break;
                case 'I':
                    entityManager.addEntity(textEntity.createVerb({x: j, y: i, 
                        spriteSheet: 'assets/words/isWordSprites.png'}));
                    break;
                case 'S':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/stopWordSprites.png', textType: textTypesEnum.ADJECTIVE, wordType: adjectiveTypesEnum.STOP}));
                    break;
                case 'P':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/pushWordSprites.png', textType: textTypesEnum.ADJECTIVE, wordType: adjectiveTypesEnum.PUSH}));
                    break;
                case 'Y':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/youWordSprites.png', textType: textTypesEnum.ADJECTIVE, wordType: adjectiveTypesEnum.YOU}));
                    break;
                case 'X':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/winWordSprites.png', textType: textTypesEnum.ADJECTIVE, wordType: adjectiveTypesEnum.WIN}))
                    break;
                case 'N':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/sinkWordSprites.png', textType: textTypesEnum.ADJECTIVE, wordType: adjectiveTypesEnum.SINK}))
                    break;
                case 'K':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/killWordSprites.png', textType: textTypesEnum.ADJECTIVE, wordType: adjectiveTypesEnum.DEFEAT}))
                    break;
                case ' ':
                    break;
            }

            // Check for all foreground entities
            switch (level.foreground[(i * level.width) + j]){
                case 'w':
                    entityManager.addEntity(objectEntity.createWall({x: j, y: i}));
                    break;
                case 'r':
                    entityManager.addEntity(objectEntity.createRock({x: j, y: i}));
                    break;
                case 'f':
                    entityManager.addEntity(objectEntity.createFlag({x: j, y: i}));
                    break;
                case 'b':
                    entityManager.addEntity(objectEntity.createBigBlue({x: j, y: i}));
                    break;
                case 'l':
                    entityManager.addEntity(objectEntity.createFloor({x: j, y: i}));
                    break;
                case 'g':
                    entityManager.addEntity(objectEntity.createGrass({x: j, y: i}));
                    break;
                case 'a':
                    entityManager.addEntity(objectEntity.createWater({x: j, y: i}));
                    break;
                case 'v':
                    entityManager.addEntity(objectEntity.createLava({x: j, y: i}));
                    break;
                case 'h':
                    entityManager.addEntity(objectEntity.createHedge({x: j, y: i}))
                    break;
                case 'W':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/wallWordSprites.png', textType: textTypesEnum.NOUN, wordType: nounTypesEnum.WALL}));
                    break;
                case 'R':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/rockWordSprites.png', textType: textTypesEnum.NOUN, wordType: nounTypesEnum.ROCK}));
                    break;
                case 'F':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/flagWordSprites.png', textType: textTypesEnum.NOUN, wordType: nounTypesEnum.FLAG}));
                    break;
                case 'B':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/babaWordSprites.png', textType: textTypesEnum.NOUN, wordType: nounTypesEnum.BIGBLUE}));
                    break;
                case 'V':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/lavaWordSprites.png', textType: textTypesEnum.NOUN, wordType: nounTypesEnum.LAVA}));
                    break;
                case 'A':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/waterWordSprites.png', textType: textTypesEnum.NOUN, wordType: nounTypesEnum.WATER}));
                    break;
                case 'I':
                    entityManager.addEntity(textEntity.createVerb({x: j, y: i, 
                        spriteSheet: 'assets/words/isWordSprites.png'}));
                    break;
                case 'S':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/stopWordSprites.png', textType: textTypesEnum.ADJECTIVE, wordType: adjectiveTypesEnum.STOP}));
                    break;
                case 'P':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/pushWordSprites.png', textType: textTypesEnum.ADJECTIVE, wordType: adjectiveTypesEnum.PUSH}));
                    break;
                case 'Y':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/youWordSprites.png', textType: textTypesEnum.ADJECTIVE, wordType: adjectiveTypesEnum.YOU}));
                    break;
                case 'X':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/winWordSprites.png', textType: textTypesEnum.ADJECTIVE, wordType: adjectiveTypesEnum.WIN}))
                    break;
                case 'N':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/sinkWordSprites.png', textType: textTypesEnum.ADJECTIVE, wordType: adjectiveTypesEnum.SINK}))
                    break;
                case 'K':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, 
                        spriteSheet: 'assets/words/killWordSprites.png', textType: textTypesEnum.ADJECTIVE, wordType: adjectiveTypesEnum.DEFEAT}))
                    break;
                case ' ':
                    break;
            }
        }
    }
}