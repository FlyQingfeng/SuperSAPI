import { SuperComponent } from "../Component/SuperComponent";
export class EntitySuperComponent extends SuperComponent {
    constructor(typeId, owner) {
        super(typeId, owner);
        this.entity = this.owner;
    }
    ;
}
