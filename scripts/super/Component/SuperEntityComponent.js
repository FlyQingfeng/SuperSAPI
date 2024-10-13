import { SuperComponent } from "../Component/SuperComponent";
export class EntitySuperComponent extends SuperComponent {
    constructor(typeId, owner, options) {
        super(typeId, owner, options);
        this.owner = owner;
        let entity = this.getOwner();
        if (entity.isValid()) {
            entity.Bind(entity.onDieAfterEvent, this.onDieAfterEvent);
            entity.Bind(entity.onHealthChangedAfterEvent, this.onHealthChangedAfterEvent);
            entity.Bind(entity.onHitBlockAfterEvent, this.onHitBlockAfterEvent);
            entity.Bind(entity.onHitEntityAfterEvent, this.onHitEntityAfterEvent);
            entity.Bind(entity.onHurtAfterEvent, this.onHurtAfterEvent);
            entity.Bind(entity.onHurtAfterEvent, this.onHurtAfterEvent);
            entity.Bind(entity.onLoadAfterEvent, this.onLoadAfterEvent);
            entity.Bind(entity.onRemoveAfterEvent, this.onRemoveAfterEvent);
            entity.Bind(entity.onEntitySpawnAfterEvent, this.onEntitySpawnAfterEvent);
            entity.Bind(entity.onRemoveBeforeEvent, this.onRemoveBeforeEvent);
        }
    }
    ;
    deconstructor(op) {
        let entity = this.getOwner();
        if (entity.isValid()) {
            entity.UnBind(entity.onDieAfterEvent, this.onDieAfterEvent);
            entity.UnBind(entity.onHealthChangedAfterEvent, this.onHealthChangedAfterEvent);
            entity.UnBind(entity.onHitBlockAfterEvent, this.onHitBlockAfterEvent);
            entity.UnBind(entity.onHitEntityAfterEvent, this.onHitEntityAfterEvent);
            entity.UnBind(entity.onHurtAfterEvent, this.onHurtAfterEvent);
            entity.UnBind(entity.onHurtAfterEvent, this.onHurtAfterEvent);
            entity.UnBind(entity.onLoadAfterEvent, this.onLoadAfterEvent);
            entity.UnBind(entity.onRemoveAfterEvent, this.onRemoveAfterEvent);
            entity.UnBind(entity.onEntitySpawnAfterEvent, this.onEntitySpawnAfterEvent);
            entity.UnBind(entity.onRemoveBeforeEvent, this.onRemoveBeforeEvent);
        }
    }
    detach() {
        this.getOwner()?.removeCustomComponent(this.typeId);
    }
    getOwner() {
        return this.owner;
    }
    onStart() {
        super.onStart();
    }
    //绑定到对应实体的触发事件
    onDieAfterEvent(event) {
    }
    onHealthChangedAfterEvent(event) {
    }
    onHitBlockAfterEvent(event) {
    }
    onHitEntityAfterEvent(event) {
    }
    onHurtAfterEvent(event) {
    }
    onLoadAfterEvent(event) {
    }
    onRemoveAfterEvent(event) {
    }
    onEntitySpawnAfterEvent(event) {
    }
    onRemoveBeforeEvent(event) {
    }
}
