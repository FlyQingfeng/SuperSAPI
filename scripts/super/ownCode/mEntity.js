import { SuperEntity } from "../Entity/SuperEntity";
export class mEntity extends SuperEntity {
    constructor(entity) {
        super(entity);
        this.enable_tick = true;
    }
    tick(t) {
    }
}
