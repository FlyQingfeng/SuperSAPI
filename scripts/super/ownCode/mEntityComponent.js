import * as SuperSAPI from "../SuperSAPI";
import { Timer } from "../Public/Timer";
export class mEntityComponent extends SuperSAPI.EntityComponent {
    constructor(typeId, owner) {
        super(typeId, owner);
        this.timer = new Timer();
    }
    init() {
        let entity = this.getOwner();
        this.timer.setInterval(() => {
            if (entity.isValid()) {
                entity.applyDamage(1);
            }
        }, 20);
        this.timer.setTimeout(() => {
            if (entity.isValid()) {
                entity.removeCustomComponent(this.typeId);
                this.detach();
            }
            this.timer.clearAll();
        }, 100);
    }
    detach() {
        this.getOwner().removeCustomComponent(this.typeId);
    }
    deconstructor(op) {
        this.timer.clearAll();
        console.log("remove");
    }
    onStart() {
        this.init();
        console.log("start");
        // this.getOwner().removeCustomComponent(this.typeId);
        // this.detach();
    }
}
