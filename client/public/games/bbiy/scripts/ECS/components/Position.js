export function Position(spec) {
    // Define a default Position
    if (spec == undefined) {
        spec = {
            x: 0,
            y: 0
        }
    }

    // The name of the component is always the same, no matter if it is undefined specs
    spec.name = 'position';

    // Make it so that you can retrieve all of them
    return {
        get name() { return spec.name },
        x : spec.x,
        y : spec.y
    }
}