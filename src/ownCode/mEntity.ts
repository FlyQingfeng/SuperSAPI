import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";
export class mEntity extends SuperSAPI.Entity {
    constructor(entity:SuperSAPI.MC_Entity,world:SuperSAPI.SuperWorld) {
        super(entity,world)
        this.enable_tick=false;
    }
    tick(t: number): void {
        
    }
    onDieAfterEvent(event: mc.EntityDieAfterEvent): void {
        
    }
}