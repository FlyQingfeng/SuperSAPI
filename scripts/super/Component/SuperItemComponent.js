import { SuperComponent } from "./SuperComponent";
export class ItemSuperComponent extends SuperComponent {
    constructor(typeId, owner, options) {
        super(typeId, owner, options);
    }
    ;
    getOwner() {
        return this.owner;
    }
    onStart() {
    }
    onHand(player) {
        console.log("in_hand");
    }
    onSwitchOut(player) {
    }
    onSwitchIn(player) {
    }
    onAttack(player, target) {
    }
    onUse(player) {
    }
    onUseOn(player, block, blockFace, faceLocation, isFirstEvent) {
    }
    onStartUse(player, useDuration) {
    }
    onStopUse(player, block) {
    }
    onItemRelease(player, useDuration) {
    }
    onItemComplete(player) {
    }
}
