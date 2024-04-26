import { nounTypesEnum } from "../../state/enums.js"

// A Noun is an object that you can see and push around i.e. A Rock
export function Noun(spec) {
    // Define a default Noun
    if (spec == undefined) {
        spec = {
            nounType: nounTypesEnum.BIGBLUE
        }
    }

    // The name of the component is always the same, no matter if it is undefined specs
    spec.name = 'noun';

    // Make it so that you can retrieve all of them
    return {
        get name() { return spec.name },
        nounType : spec.nounType
    }
}