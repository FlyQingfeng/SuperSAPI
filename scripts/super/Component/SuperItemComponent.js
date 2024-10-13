import { SuperComponent } from "./SuperComponent";
export class ItemSuperComponent extends SuperComponent {
    constructor(typeId, owner, options) {
        super(typeId, owner, options);
    }
    ;
    getOwner() {
        return this.owner;
    }
}
