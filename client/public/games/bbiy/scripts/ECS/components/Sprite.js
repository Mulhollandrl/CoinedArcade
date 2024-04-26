export function Sprite(spec) {
    // Define a default Sprite
    if (spec == undefined) {
        spec = {
            spriteSheet: 'assets/babaSprites',
            // spriteWidth is the width of your sprites on your spriteSheet
            spriteWidth: 24,
            spriteIndex: 0,
            maxSpriteIndex: 3
        }
    }

    // The name of the component is always the same, no matter if it is undefined specs
    spec.name = 'sprite';

    // Make it so that you can retrieve all of them
    return {
        get name() { return spec.name },
        get spriteWidth() { return spec.spriteWidth },
        get maxSpriteIndex() { return spec.maxSpriteIndex },
        spriteSheet: spec.spriteSheet,
        spriteIndex : spec.spriteIndex
    }
}
