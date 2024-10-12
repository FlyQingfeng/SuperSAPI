import * as SuperSAPI from "../SuperSAPI";
import { Timer } from "../Public/Timer";
export class mEntityComponent extends SuperSAPI.EntityComponent {
    constructor(typeId, owner) {
        super(typeId, owner);
        this.timer = new Timer();
    }
    init() {
    }
    onStart() {
        this.init();
    }
}
