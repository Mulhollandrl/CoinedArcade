import { componentTypesEnum } from "../../state/enums.js";

// When the player moves, we want to communicate that to other systems.
export function Moved(spec) {
  // Define a default Position
  if (spec === undefined || spec.direction === undefined) {
    // Fail early here, because a default direction for this would be confusing to debug.
    throw new Error('Cannot create Moved component without specifying a direction')
  }

  // The name of the component is always the same, no matter if it is undefined specs
  spec.name = componentTypesEnum.MOVED;

  // Make it so that you can retrieve all of them
  return {
      get name() { return spec.name },
      direction: spec.direction
  }
}
