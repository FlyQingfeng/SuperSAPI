import { SuperStaticComponent, StaticComponentType } from "./SuperStaticComponent";
export class SuperItemStaticComponent extends SuperStaticComponent {
    constructor(typeId) {
        super(typeId);
    }
    ;
    init() {
    }
    deconstructor(op) {
    }
    isValid() {
        return true;
    }
    onItemRelease(itemStack, player) {
    }
    onItemComplete(itemStack, player) {
    }
    onUseOn(itemStack, player, block, blockFace, faceLocation, isFirstEvent) {
    }
    onUse(itemStack, player) {
    }
}
SuperItemStaticComponent.type = StaticComponentType.Item;
