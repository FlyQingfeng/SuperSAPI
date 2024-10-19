import { SuperStaticComponent, StaticComponentType } from "../Component/SuperStaticComponent";
export class SuperBlockStaticComponent extends SuperStaticComponent {
    constructor(typeId) {
        super(typeId);
    }
    ;
    init() {
    }
    beforeOnPlayerPlace(player, event) {
    }
    onEntityFallOn(block, entity, FallingTime) {
    }
    onPlayerPlace(player, block, dimension) {
    }
    onPlayerDestroy(player, block, brokenBlockPermutation, dimension, itemStackAfterBreak, itemStackBeforeBreak) {
    }
    onPlayerInteract(player, beforeItemStack, block, blockFace, faceLocation, isFirstEvent, itemStack) {
    }
}
SuperBlockStaticComponent.type = StaticComponentType.Block;
