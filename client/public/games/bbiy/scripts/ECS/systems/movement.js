import { componentTypesEnum, entityPropertiesEnum } from "../../state/enums.js";
import * as entityHelpers from "../entityHelpers.js"

/**
 * 
 * @param {EntityManager} entityManager 
 * @param {Grid} grid 
 */
export function handleMovement (entityManager, grid) {
  const moveSound = new Audio("../../../assets/sounds/move.mp3")
  const movings = entityManager.queryEntities(entity =>
    entityHelpers.hasAllComponents(entity, componentTypesEnum.MOVED)
  )

  moveSound.volume = .35;

  if (movings.length > 0) {
    moveSound.play();
  }
  
  for (let i = 0; i < movings.length; i++) {
    const moving = movings[i]
    const { direction } = moving.getComponent(componentTypesEnum.MOVED)
    grid.moveEntity(moving, direction)
    moving.removeComponent(componentTypesEnum.MOVED)
  }
}
