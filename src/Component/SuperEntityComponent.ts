import { SuperEntity } from "../Entity/SuperEntity";
import { SuperComponent, SuperComponentCreateOptions } from "../Component/SuperComponent";
import { EntityDieAfterEvent, EntityHealthChangedAfterEvent, EntityHitBlockAfterEvent, EntityHitEntityAfterEvent, EntityHurtAfterEvent, EntityLoadAfterEvent, EntityRemoveAfterEvent, EntitySpawnAfterEvent, EntityRemoveBeforeEvent } from "@minecraft/server";


export class EntitySuperComponent extends SuperComponent {
    constructor(typeId: string, owner: SuperEntity,options?:SuperComponentCreateOptions) {
        super(typeId, owner,options)
        this.owner=owner;
        let entity = this.getOwner();
        if (entity.isValid()) {
            entity.Bind(entity.onDieAfterEvent, this.onDieAfterEvent)
            entity.Bind(entity.onHealthChangedAfterEvent, this.onHealthChangedAfterEvent)
            entity.Bind(entity.onHitBlockAfterEvent, this.onHitBlockAfterEvent)
            entity.Bind(entity.onHitEntityAfterEvent, this.onHitEntityAfterEvent)
            entity.Bind(entity.onHurtAfterEvent, this.onHurtAfterEvent)
            entity.Bind(entity.onHurtAfterEvent, this.onHurtAfterEvent)
            entity.Bind(entity.onLoadAfterEvent, this.onLoadAfterEvent)
            entity.Bind(entity.onRemoveAfterEvent, this.onRemoveAfterEvent)
            entity.Bind(entity.onEntitySpawnAfterEvent, this.onEntitySpawnAfterEvent)
            entity.Bind(entity.onRemoveBeforeEvent, this.onRemoveBeforeEvent)
        }
    };
    deconstructor(op?: string): void {
        let entity = this.getOwner();
        if (entity.isValid()) {
            entity.UnBind(entity.onDieAfterEvent, this.onDieAfterEvent)
            entity.UnBind(entity.onHealthChangedAfterEvent, this.onHealthChangedAfterEvent)
            entity.UnBind(entity.onHitBlockAfterEvent, this.onHitBlockAfterEvent)
            entity.UnBind(entity.onHitEntityAfterEvent, this.onHitEntityAfterEvent)
            entity.UnBind(entity.onHurtAfterEvent, this.onHurtAfterEvent)
            entity.UnBind(entity.onHurtAfterEvent, this.onHurtAfterEvent)
            entity.UnBind(entity.onLoadAfterEvent, this.onLoadAfterEvent)
            entity.UnBind(entity.onRemoveAfterEvent, this.onRemoveAfterEvent)
            entity.UnBind(entity.onEntitySpawnAfterEvent, this.onEntitySpawnAfterEvent)
            entity.UnBind(entity.onRemoveBeforeEvent, this.onRemoveBeforeEvent)
        }
    }
    detach(){//脱离，从owner上移除自己这个组件
        this.getOwner()?.removeCustomComponent(this.typeId);
    }
    getOwner(): SuperEntity {
        return this.owner as SuperEntity
    }
    onStart(): void {
        super.onStart();
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
}