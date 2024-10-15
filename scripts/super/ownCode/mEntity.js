import * as SuperSAPI from "../SuperSAPI";
export class mEntity extends SuperSAPI.Entity {
    constructor(entity, world) {
        super(entity, world);
    }
    onDieAfterEvent(event) {
        console.log("onDieAfterEvent");
    }
}
