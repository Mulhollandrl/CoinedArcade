import { componentTypesEnum, entityPropertiesEnum } from "../../state/enums.js";
import { Moved } from "../components/Moved.js";
import * as entityHelpers from "../entityHelpers.js"

/**
 * 
 * @param {EntityManager} entityManager 
 * @param {Grid} grid 
 */
export function handlePushing (entityManager, grid) {
  const movings = entityManager.queryEntities(entity =>
    entityHelpers.hasAllComponents(entity, componentTypesEnum.MOVED)
  )
  
  for (let i = 0; i < movings.length; i++) {
    const moving = movings[i]
    const { direction } = moving.getComponent(componentTypesEnum.MOVED)
    const position = moving.getComponent(componentTypesEnum.POSITION)
    const canPush = recursivePush(grid, position, direction, 1)
    if (!canPush) {
      moving.removeComponent(componentTypesEnum.MOVED)
    }
  }
}

function recursivePush (grid, position, direction, magnitude) { // returns boolean if move is successful
  magnitude = magnitude ?? 1
  const adjacentEntities = grid.getAdjacentEntities(position, direction, magnitude)
  if (adjacentEntities.length === 0) {
    return true
  }
  const pushable = []
  for (let i = 0; i < adjacentEntities.length; i++) {
    const entity = adjacentEntities[i]
    if (entityHelpers.hasProperty(entity, entityPropertiesEnum.PUSH) || entityHelpers.hasAllComponents(entity, componentTypesEnum.TEXT)) {
      pushable.push(entity) // push and stop is still push
    } else if (entityHelpers.hasProperty(entity, entityPropertiesEnum.STOP)) {
      pushable.push(entity) // push and stop is still push
      return false
    }
  }
  
  if (pushable.length === 0) {
    return true
  }
  
  const canPush = recursivePush(grid, position, direction, magnitude + 1)
  if (canPush) {
    for (let i = 0; i < pushable.length; i++) {
      pushable[i].addComponent(Moved({direction}))
    }
    return true
  } else {
    return false
  }
}
