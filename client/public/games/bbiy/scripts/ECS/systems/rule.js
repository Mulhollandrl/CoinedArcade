import { adjectiveTypesEnum, componentTypesEnum, directionsEnum, entityPropertiesEnum, nounTypesEnum, spriteSheetEnum, textTypesEnum } from "../../state/enums.js";
import { Property } from "../components/Property.js";
import * as entityHelpers from "../entityHelpers.js"
import { mergeSets, cartesianProduct, filterSet } from "../../utilities/setutils.js";

let winUnlock = new Audio("../../../assets/sounds/unlockWin.mp3")
let soundPlayed = false;

winUnlock.loop = false;

winUnlock.onended = function() {
    winUnlock = new Audio();
    // winUnlock.currentTime = 0;
    soundPlayed = true;
}

function playSound() {
    winUnlock = new Audio("../../../assets/sounds/unlockWin.mp3")
    winUnlock.play();

    winUnlock.onended = function() {
        winUnlock = new Audio();
        // winUnlock.currentTime = 0;
        soundPlayed = true;
    }
}

const onlyText = entity => entityHelpers.hasAllComponents(entity, componentTypesEnum.TEXT)
export function handleRules(entityManager, grid) {
    const allSentences = new Set();

    // Go through the whole grid
    
    const verbs = entityManager.queryEntities(entity => {
        const textComponent = entity.getComponent(componentTypesEnum.TEXT)
        return textComponent && textComponent.textType === textTypesEnum.VERB
    })
    
    for (const v of verbs) {
        const position = v.getComponent(componentTypesEnum.POSITION)
        if (!position) {
            continue
        }
        
        const left = filterSet(grid.getAdjacentEntities(position, directionsEnum.LEFT), onlyText)
        const right = filterSet(grid.getAdjacentEntities(position, directionsEnum.RIGHT), onlyText)
        const up = filterSet(grid.getAdjacentEntities(position, directionsEnum.UP), onlyText)
        const down = filterSet(grid.getAdjacentEntities(position, directionsEnum.DOWN), onlyText)
        
        const horizontalRules = cartesianProduct(left, right)
        const verticalRules = cartesianProduct(up, down)
        
        mergeSets(allSentences, horizontalRules)
        mergeSets(allSentences, verticalRules)
    }
    
    const rules = filterSet(allSentences, ([first, last]) => {
        // e.g [BABA, YOU]
        // (IS is implied)
        const firstText = first.getComponent(componentTypesEnum.TEXT)
        const lastText = last.getComponent(componentTypesEnum.TEXT)
        if (firstText.textType === textTypesEnum.NOUN && lastText.textType !== textTypesEnum.VERB) {
            return true
        }        
        return false
    })
    
    ruleEffects(entityManager, rules.values())
}

function ruleEffects(entityManager, rules) {
    const oldWins = new Set(entityManager.queryEntities(
        entity => entityHelpers.hasProperty(entity, entityPropertiesEnum.WIN)
    ).map(entity => entity.id));

    
    entityManager.queryEntities(
        entity => {
            const nounType = entity.getComponent(componentTypesEnum.NOUN)?.nounType
            return nounType && nounType !== nounTypesEnum.TEXT
        }
    ).forEach(entity => {
        entity.addComponent(Property())
    }) // Clear properties of all nouns
    
    const adjectiveRules = []
    for (const rule of rules) {
        const predicate = rule[1].getComponent(componentTypesEnum.TEXT);
        const subject = rule[0].getComponent(componentTypesEnum.TEXT);
        if (predicate.textType === textTypesEnum.ADJECTIVE) {
            adjectiveRules.push([subject, predicate])
            continue
        }
        const toChange = entityManager.queryEntities(entity =>
            entity.getComponent(componentTypesEnum.NOUN)?.nounType === subject.wordType
        )
        
        for (let j = 0; j < toChange.length; j++) {
            // let properties = toChange[j].getComponent(componentTypesEnum.PROPERTY);
            toChange[j].getComponent(componentTypesEnum.NOUN).nounType = predicate.wordType;
            toChange[j].getComponent(componentTypesEnum.SPRITE).spriteSheet = spriteSheetEnum[predicate.wordType]
        }
    }
        
    for (let i = 0; i < adjectiveRules.length; i++) {
        const [subject, predicate] = adjectiveRules[i]
        const toChange = entityManager.queryEntities(entity =>
            entity.getComponent(componentTypesEnum.NOUN)?.nounType === subject.wordType
        )
    
        for (let j = 0; j < toChange.length; j++) {
            // let properties = toChange[j].getComponent(componentTypesEnum.PROPERTY);
            const properties = toChange[j].getComponent(componentTypesEnum.PROPERTY)
        
        switch (predicate.wordType) {
            case adjectiveTypesEnum.DEFEAT:
                properties.isDefeat = true;
                break;
            case adjectiveTypesEnum.PUSH:
                properties.isPush = true;
                break;
                case adjectiveTypesEnum.SINK:
                    properties.isSink = true;
                break;
            case adjectiveTypesEnum.STOP:
                properties.isStop = true;
                break;
            case adjectiveTypesEnum.WIN:
                winUnlock.play();
                properties.isWin = true;
                break;
            case adjectiveTypesEnum.YOU:
                properties.isYou = true;
                break;
            }
        }
    }

    const newWins = new Set(entityManager.queryEntities(
        entity => entityHelpers.hasProperty(entity, entityPropertiesEnum.WIN)
    ).map(entity => entity.id));
    
    // console.log("Old Wins ", [...oldWins.values()])
    // console.log("New Wins ", [...newWins.values()])

    for (const win of newWins.values()) {
        if (!oldWins.has(win)) {
            console.log("DING!!")
            playSound()
            break;
        }
    }
}
