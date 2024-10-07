import * as SuperSAPI from "../SuperSAPI";
export class mEntity extends SuperSAPI.Entity {
    constructor(entity) {
        super(entity);
        this.enable_tick = true;
    }
    tick(t) {
    }
}
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Entity, mEntity);
