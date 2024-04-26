// Input is a thing to say whether or not something cares about key presses
export function Input(spec) {
    // Define a default Input
    if (spec == undefined) {
        spec = {
            inputReady: true
        }
    }

    // The name of the component is always the same, no matter if it is undefined specs
    spec.name = 'input';

    // Make it so that you can retrieve all of them
    return {
        get name() { return spec.name },
        inputReady : spec.inputReady
    }
}