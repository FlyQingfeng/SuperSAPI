import * as SuperSAPI from "../SuperSAPI";
export class mEntity extends SuperSAPI.Entity {
    constructor(entity, world) {
        super(entity, world);
        this.enable_tick = false;
    }
    tick(t) {
    }
    onDieAfterEvent(event) {
    }
}
