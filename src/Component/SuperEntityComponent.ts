import { SuperEntity } from "../Entity/SuperEntity";
import { SuperComponent } from "../Component/SuperComponent";
import { EntityDieAfterEvent, EntityHealthChangedAfterEvent, EntityHitBlockAfterEvent, EntityHitEntityAfterEvent, EntityHurtAfterEvent, EntityLoadAfterEvent, EntityRemoveAfterEvent, EntitySpawnAfterEvent, EntityRemoveBeforeEvent } from "@minecraft/server";

export class EntitySuperComponent extends SuperComponent {

    constructor(typeId:string,owner: SuperEntity) {
        super(typeId,owner)
        this.entity=this.owner
        this.init();
    };
    init(): void {
        if (this.entity) {
            
        }
    }
    //绑定到对应实体的触发事件
    onDieAfterEvent(event: EntityDieAfterEvent) {
    }
    onHealthChangedAfterEvent(event: EntityHealthChangedAfterEvent) {
    }
    onHitBlockAfterEvent(event: EntityHitBlockAfterEvent) {
    }
    onHitEntityAfterEvent(event: EntityHitEntityAfterEvent) {
    }
    onHurtAfterEvent(event: EntityHurtAfterEvent) {
    }
    onLoadAfterEvent(event: EntityLoadAfterEvent) {
    }
    onRemoveAfterEvent(event: EntityRemoveAfterEvent) {
    }
    onEntitySpawnAfterEvent(event: EntitySpawnAfterEvent) {
    }
    onRemoveBeforeEvent(event: EntityRemoveBeforeEvent) {
    }
    /**
     * @remarks
     * The entity that owns this component. The entity will be
     * undefined if it has been removed.
     *
     */
    readonly entity: SuperEntity;
}