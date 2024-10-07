import { Entity } from "@minecraft/server";
import { SuperEntity } from "../Entity/SuperEntity";

export class mEntity extends SuperEntity {
    constructor(entity:Entity) {
        super(entity)
        this.enable_tick=true;
    }
    tick(t: number): void {
        
    }
}