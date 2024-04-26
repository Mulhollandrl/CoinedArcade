import Keyboard from "../../inputs/Keyboard.js";
import { componentTypesEnum, directionsEnum, entityPropertiesEnum } from "../../state/enums.js";
import { controlsKeys } from "../../state/globals.js";
import { Moved } from "../components/Moved.js";
import * as entityHelpers from "../entityHelpers.js"
/**
 * 
 * @param {EntityManager} entityManager 
 */
export function handleControl (entityManager) {
  const undid = handleUndo(entityManager)
  const playerMoved = handlePlayer(entityManager)
  return playerMoved || undid
}

function handlePlayer(entityManager) {
  const yous = entityManager.queryEntities(entity =>
    entityHelpers.hasProperty(entity, entityPropertiesEnum.YOU)
  )
  if (yous.length === 0) {
    return false
  }
  let direction
  if (Keyboard.isPressed(controlsKeys.data.up)) {
    direction = directionsEnum.UP
  } else if (Keyboard.isPressed(controlsKeys.data.down)) {
    direction = directionsEnum.DOWN
  } else if (Keyboard.isPressed(controlsKeys.data.left)) {
    direction = directionsEnum.LEFT
  } else if (Keyboard.isPressed(controlsKeys.data.right)) {
    direction = directionsEnum.RIGHT
  }
  else {
    return false
  }
  Keyboard.unpress()
  entityManager.saveState()
  
  for (let i = 0; i < yous.length; i++) {
    yous[i].addComponent(Moved({direction}))
  }
  
  return true
}

function handleUndo(entityManager) {
  if (Keyboard.isPressed(controlsKeys.data.undo)) {
    entityManager.restore()
    Keyboard.unpress()
    return true
  }
}
