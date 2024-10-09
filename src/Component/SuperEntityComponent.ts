import { SuperEntity } from "../Entity/SuperEntity";
import { SuperComponent } from "../Component/SuperComponent";

export class EntitySuperComponent extends SuperComponent {

    constructor(typeId:string,owner: SuperEntity) {
        super(typeId,owner)
        this.entity=this.owner
    };
    /**
     * @remarks
     * The entity that owns this component. The entity will be
     * undefined if it has been removed.
     *
     */
    readonly entity: SuperEntity;
}