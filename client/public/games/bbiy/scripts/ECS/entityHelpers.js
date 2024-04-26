import { componentTypesEnum } from "../state/enums.js"

// Aside: I really really wish functional code was as fast as imperative code in JS. Oh well.

/**
 * Does this entity have this component?
 * @param {Entity} entity 
 * @param {Component | Component[]} components
 * @returns 
 */
export function hasAllComponents (entity, components) {
  components = _toArray(components) // Force single values into arrays for ease of use
  const entityComponents = entity.componentList
  // for loop is equivalent to `components.every(component => entityComponents.has(component))`
  for (let i = 0; i < components.length; i++) {
      if (!entityComponents.has(components[i])) {
          return false
      }
  }
  return true
}

/**
 * Does this entity have this property?
 * @param {Entity} entity 
 * @param {property} property e.g. isPush 
 * @returns 
 */
export function hasProperty (entity, property) {
  return entity.getComponent(componentTypesEnum.PROPERTY)?.[property]
}

function _toArray (maybeArray) {
  if (Array.isArray(maybeArray)) {
    return maybeArray
  } else {
    return [maybeArray]
  }
}
