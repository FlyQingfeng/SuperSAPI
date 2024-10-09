import { SuperComponent } from "./SuperComponent";
export class ItemSuperComponent extends SuperComponent {
    constructor(typeId, owner) {
        super(typeId, owner);
        this.item = this.owner;
    }
    ;
}
