// Class methods inspired by GPT4 when prompted:
/*
What if my game uses a grid structure,and I need to find a way
to check for adjacent entities over any given space?
*/
// Comments are original

import { componentTypesEnum, directionsEnum, entityPropertiesEnum } from "../state/enums.js"
import { Entity } from "./entities/Entity.js"
import { Property } from "./components/Property.js"

// We need something to efficiently keep track of the positions of everything.
export default class Grid {
  constructor (width, height) {
    this.width = width
    this.height = height
    
    // Create a width*height grid that can hold multiple entities in each position
    this.clear()
  }
  
  clear () {
    this.grid = Array.from({length: this.width * this.height}, () => new Map())
  }
  
  _getIndex (x, y) {
    return y * this.width + x 
  }
  
  _getPositionFromEntity (entity) {
    return entity.getComponent(componentTypesEnum.POSITION)
  }
  
  _getVectorFromDirection (direction) {
    switch (direction) {
      case directionsEnum.RIGHT: return {x: 1, y: 0}
      case directionsEnum.LEFT: return {x: -1, y: 0}
      case directionsEnum.DOWN: return {x: 0, y: 1}
      case directionsEnum.UP: return {x: 0, y: -1}
      default: throw new Error(`_getVectorFromDirection: invalid direction: ${direction}`)
    }
  }
  
  _invalidPositionError (x, y) {
    return `(${x}, ${y}) is not a valid position on the (${this.width} x ${this.height}) grid`
  }
  
  addEntity (entity) {
    const {x, y} = this._getPositionFromEntity(entity)
    const index = this._getIndex(x,y)
    if (!this.isValidCoordinate(x, y)) {
      console.error(entity)
      throw new Error(`Grid.js::addEntity: ${this._invalidPositionError(x, y)}`)
    }
    this.grid[index].set(entity.id, entity)
  }
  
  removeEntity (entity) {
    const {x, y} = this._getPositionFromEntity(entity)
    if (!this.isValidCoordinate(x, y)) {
      console.error(entity)
      throw new Error(`Grid.js::removeEntity: ${this._invalidPositionError(x, y)}`)
    }
    this.grid[this._getIndex(x, y)].delete(entity.id)
  }
  
  moveEntity (entity, direction) {
    this.removeEntity(entity)
    const position = this._getPositionFromEntity(entity)
    const vector = this._getVectorFromDirection(direction)
    position.x += vector.x
    position.y += vector.y
    if (!this.isValidCoordinate(position.x, position.y)) {
      console.error(entity)
      throw new Error(`Grid.js::moveEntity: ${this._invalidPositionError(position.x, position.y)}`)
    }
    this.addEntity(entity)
  }
    
  getEntities (x, y) {
    if (!this.isValidCoordinate(x, y)) {
      const blocker = Entity()
      blocker.addComponent(Property({
        [entityPropertiesEnum.STOP]: true
      }))
      return [blocker]
    }
    const index = this._getIndex(x, y)
    return [...this.grid[index].values()]
  }
  
  isValidCoordinate (x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }
  
  /**
   * Gets a list of entities in the direction of a position
   * @param {*} position 
   * @param {*} direction
   * @param {*} length
   * @returns 
   */
  getAdjacentEntities (position, direction, length) {
    length = length ?? 1
    const {x, y} = position
    const {x: dx, y: dy} = this._getVectorFromDirection(direction)
    return this.getEntities(x + dx * length, y + dy * length)
  }
}
