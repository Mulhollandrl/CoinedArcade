import { componentTypesEnum, entityPropertiesEnum } from "../../state/enums.js";
import { context } from "../../game.js";
import * as entityHelpers from "../entityHelpers.js"
import { positionGrid } from "../positionGrid.js";

export function handleRendering(entityManager, grid, changeSprite) {
    const {
        getX, getY, tileSize, levelWidth, levelHeight
      } = positionGrid(grid.width, grid.height)

    const animateds = entityManager.queryEntities(entity =>
        entityHelpers.hasAllComponents(entity, [componentTypesEnum.SPRITE, componentTypesEnum.POSITION])
    );

    context.fillStyle = "#415080"
    context.fillRect(getX(0), getY(0), levelWidth, levelHeight)

    for (let i = 0; i < animateds.length; i++) {
        // Get all necessary components for drawing it correctly
        const animated = animateds[i];
        const sprite = animated.getComponent(componentTypesEnum.SPRITE);
        const spriteSheet = sprite.spriteSheet;
        const spriteWidth = sprite.spriteWidth;
        const maxSpriteIndex = sprite.maxSpriteIndex;
        const spriteIndex = Math.trunc((performance.now() / 250) % maxSpriteIndex)
        const position = animated.getComponent(componentTypesEnum.POSITION);

        const image = new Image();
        image.src = spriteSheet;

        // It draws the sprite that is necessary on the spriteSheet. The reason it has the ones is because of the borders on the sprites...
        context.drawImage(image, 
            (spriteIndex * (spriteWidth + 1)) + 2, 2, 
            spriteWidth - 2, spriteWidth - 2, 
            getX(position.x), getY(position.y), 
            tileSize, tileSize);
    }
}
