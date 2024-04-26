let current_id = 0
export function Entity(existing_id) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    const componentList = new Map()
    const id = existing_id || current_id++
    function addComponent(component) {
        componentList.set(component.name, component)
    }
    
    function getComponent (componentName) {
        return componentList.get(componentName)
    }
    
    function removeComponent (componentName) {
        return componentList.delete(componentName)
    }
    
    function clone () {
        return {id: id, components: [...componentList.entries()]}
    }
    
    return {
        componentList: componentList,
        id: id,
        addComponent : addComponent,
        getComponent : getComponent,
        removeComponent : removeComponent,
        clone: clone
    }
}

export function EntityFromComponents (cloned) {
    const entity = Entity(cloned.id)
    for (let i = 0; i < cloned.components.length; i++) {
        entity.componentList.set(cloned.components[i][0], cloned.components[i][1])
    }
    return entity
}
