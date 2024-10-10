import { SuperComponent } from "../Component/SuperComponent";
export class EntitySuperComponent extends SuperComponent {
    constructor(typeId, owner) {
        super(typeId, owner);
        this.entity = this.owner;
        this.init();
    }
    ;
    init() {
        if (this.entity) {
        }
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
