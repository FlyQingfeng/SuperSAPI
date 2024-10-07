import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";

export class mEntity extends SuperSAPI.Entity {
    constructor(entity:mc.Entity) {
        super(entity)
        this.enable_tick=true;
    }
    tick(t: number): void {
        
    }
}