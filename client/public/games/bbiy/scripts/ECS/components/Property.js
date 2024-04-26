// A Property is an adjective applied to something. For example if Baba is Push, Push needs to be a property applied to Baba. isPush is used for this
export function Property(spec) {
    // Define a default Property
    if (spec == undefined) {
        spec = {
            isStop: false,
            isPush: false,
            isYou: false,
            isWin: false,
            isSink: false,
            isDefeat: false
        }
    }

    // The name of the component is always the same, no matter if it is undefined specs
    spec.name = 'property';

    // Make it so that you can retrieve all of them
    return {
        get name() { return spec.name },
        isStop : spec.isStop,
        isPush : spec.isPush,
        isYou : spec.isYou,
        isWin : spec.isWin,
        isSink : spec.isSink,
        isDefeat : spec.isDefeat
    }
}