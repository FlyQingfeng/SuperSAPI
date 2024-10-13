import * as SuperSAPI from "../SuperSAPI";
export class mEntityComponent extends SuperSAPI.EntityComponent {
    constructor(typeId, owner, options) {
        super(typeId, owner, options);
        this.timer = new SuperSAPI.Timer();
    }
    init() {
        let entity = this.getOwner();
        this.timer.lasting(20, () => {
            if (entity.isValid()) {
                entity.applyDamage(1);
            }
        }, 100, () => {
            if (entity.isValid()) {
                entity.removeCustomComponent(this.typeId);
                this.detach();
            }
        });
    }
    detach() {
        this.getOwner().removeCustomComponent(this.typeId);
    }
    deconstructor(op) {
        this.timer.clearAll();
    }
    onStart() {
        this.init();
    }
}
