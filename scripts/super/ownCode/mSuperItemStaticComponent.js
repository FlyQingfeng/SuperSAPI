import * as SuperSAPI from "../SuperSAPI";
export class mSuperItemStaticComponent extends SuperSAPI.SuperItemStaticComponent {
    constructor(typeId) {
        super(typeId);
    }
    ;
    init() {
    }
    onUse(itemStack, player) {
        console.log(itemStack.uuid);
    }
}
