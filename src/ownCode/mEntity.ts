import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";

export class mEntity extends SuperSAPI.Entity {
    constructor(entity:mc.Entity) {
        super(entity)
        this.enable_tick=false;
    }
    tick(t: number): void {
        
    }
    onHurtAfterEvent(event: mc.EntityHurtAfterEvent): void {
        SuperSAPI.SuperSystem.getWorld().sendMessage(`${event.damage}`)
    }
}