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
            let entity=this.entity;
            entity.Bind(entity.onDieAfterEvent,this.onDieAfterEvent)
            entity.Bind(entity.onHealthChangedAfterEvent,this.onHealthChangedAfterEvent)
            entity.Bind(entity.onHitBlockAfterEvent,this.onHitBlockAfterEvent)
            entity.Bind(entity.onHitEntityAfterEvent,this.onHitEntityAfterEvent)
            entity.Bind(entity.onHurtAfterEvent,this.onHurtAfterEvent)
            entity.Bind(entity.onHurtAfterEvent,this.onHurtAfterEvent)
            entity.Bind(entity.onLoadAfterEvent,this.onLoadAfterEvent)
            entity.Bind(entity.onRemoveAfterEvent,this.onRemoveAfterEvent)
            entity.Bind(entity.onEntitySpawnAfterEvent,this.onEntitySpawnAfterEvent)
            entity.Bind(entity.onRemoveBeforeEvent,this.onRemoveBeforeEvent)
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