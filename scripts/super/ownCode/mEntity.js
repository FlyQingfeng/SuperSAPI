import * as SuperSAPI from "../SuperSAPI";
export class mEntity extends SuperSAPI.Entity {
    constructor(entity) {
        super(entity);
        this.enable_tick = true;
    }
    tick(t) {
        if (this.source_instance instanceof SuperSAPI.Player) {
            console.log("tick:player");
        }
    }
}
