import * as SuperSAPI from "../SuperSAPI";
export class mItemsatckComponent extends SuperSAPI.ItemComponent {
    constructor(typeId, owner, options) {
        super(typeId, owner, options);
        this.useDuration = 0;
        this.isUseing = false;
        this.enable_tick = true;
    }
    ;
    tick(t) {
        if (this.isUseing) {
            this.useDuration++;
        }
    }
    onStart() {
    }
    onUse(player) {
        console.log("use");
    }
    onStartUse(player, useDuration) {
        this.isUseing = true;
        this.useDuration = 0;
    }
    onItemRelease(player, useDuration) {
        console.log("Release:", this.useDuration);
        this.isUseing = false;
    }
}
