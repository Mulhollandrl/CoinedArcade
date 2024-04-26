import { componentTypesEnum, entityPropertiesEnum, nounTypesEnum, textTypesEnum } from "../../state/enums.js";
import * as entityHelpers from "../entityHelpers.js"

export function checkForAll(entityManager) {
    const nouns = entityManager.queryEntities(entity =>
        entityHelpers.hasAllComponents(entity, componentTypesEnum.NOUN)
    );

    checkForSink(entityManager, nouns);
    const checks = [checkForDefeat(entityManager, nouns), checkForWin(entityManager, nouns)]
    return checks
}

function checkForDefeat(entityManager, nouns) {
    const listToCheck = []

    nouns.forEach(element => {
        if (element.getComponent(componentTypesEnum.NOUN).nounType !== nounTypesEnum.TEXT) {
            listToCheck.push(element);
        }
    });

    listToCheck.forEach(element => {
        if (element.getComponent(componentTypesEnum.PROPERTY).isDefeat === true) {
            listToCheck.forEach(entity => {
                if (entity != element && entity.getComponent(componentTypesEnum.PROPERTY).isYou == true) {
                    const entityPosition = entity.getComponent(componentTypesEnum.POSITION);
                    const elementPosition = element.getComponent(componentTypesEnum.POSITION);

                    if (entityPosition.x == elementPosition.x && entityPosition.y == elementPosition.y) {
                        entityManager.removeEntity(entity);
                    }
                }
            });
        }
    });

    if (entityManager.queryEntities(entity => entityHelpers.hasProperty(entity, entityPropertiesEnum.YOU)).length === 0) {
        return true;
    }
    
    return false;
}

function checkForSink(entityManager, nouns) {
    const listToCheck = []

    nouns.forEach(element => {
        if (element.getComponent(componentTypesEnum.NOUN).nounType !== nounTypesEnum.TEXT) {
            listToCheck.push(element);
        }
    });

    listToCheck.forEach(element => {
        if (element.getComponent(componentTypesEnum.PROPERTY).isSink === true) {
            listToCheck.forEach(entity => {
                if (entity != element) {
                    const entityPosition = entity.getComponent(componentTypesEnum.POSITION);
                    const elementPosition = element.getComponent(componentTypesEnum.POSITION);

                    if (entityPosition.x == elementPosition.x && entityPosition.y == elementPosition.y) {
                        entityManager.removeEntity(entity);
                        entityManager.removeEntity(element);
                    }
                }
            });
        }
    });
}

function checkForWin(entityManager, nouns) {
    const listToCheck = []
    let isWin = false;

    nouns.forEach(element => {
        if (element.getComponent(componentTypesEnum.NOUN).nounType !== nounTypesEnum.TEXT) {
            listToCheck.push(element);
        }
    });

    listToCheck.forEach(element => {
        if (element.getComponent(componentTypesEnum.PROPERTY).isWin === true) {
            listToCheck.forEach(entity => {
                if (entity != element && entity.getComponent(componentTypesEnum.PROPERTY).isYou == true) {
                    const entityPosition = entity.getComponent(componentTypesEnum.POSITION);
                    const elementPosition = element.getComponent(componentTypesEnum.POSITION);

                    if (entityPosition.x == elementPosition.x && entityPosition.y == elementPosition.y) {
                        isWin = true;
                    }
                }
            });
        }
    });

    return isWin;
}