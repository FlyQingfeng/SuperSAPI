import * as SuperSAPI from "../SuperSAPI";
export class mEntity extends SuperSAPI.Entity {
    constructor(entity) {
        super(entity);
        this.enable_tick = false;
    }
    tick(t) {
    }
    onDieAfterEvent(event) {
    }
}
