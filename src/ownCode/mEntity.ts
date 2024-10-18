import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";
export class mEntity extends SuperSAPI.SuperEntity {
    constructor(entity:SuperSAPI.MC_Entity,world:SuperSAPI.SuperWorld) {
        super(entity,world)
    }
    onDieAfterEvent(event: mc.EntityDieAfterEvent): void {
        console.log("onDieAfterEvent");
    }
}