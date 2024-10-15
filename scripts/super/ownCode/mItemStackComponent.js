import * as mc from "@minecraft/server";
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
    onAttack(player, target) {
        if (target) {
            target.applyDamage(99, { damagingEntity: player.source_instance, cause: mc.EntityDamageCause.entityAttack });
        }
    }
    onUse(player) {
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
