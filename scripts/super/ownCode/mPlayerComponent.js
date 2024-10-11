import * as SuperSAPI from "../SuperSAPI";
export class mPlayerComponent extends SuperSAPI.PlayerComponent {
    constructor(typeId, owner) {
        super(typeId, owner);
    }
    onBreakBlockAfterEvent(event) {
    }
    init() {
    }
    onStart() {
        this.init();
        this.getOwner().sendMessage(`加载组件${this.typeId}`);
    }
}
