import { SuperComponent } from "../Component/SuperComponent";
export class EntitySuperComponent extends SuperComponent {
    constructor(source_instance) {
        super(source_instance);
        this.source_instance = source_instance;
        this.entity = source_instance.entity;
    }
    ;
}
