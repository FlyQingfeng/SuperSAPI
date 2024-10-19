import { SuperStaticComponent, StaticComponentType } from "./SuperStaticComponent";
export class SuperEntityStaticComponent extends SuperStaticComponent {
    constructor(typeId) {
        super(typeId);
    }
    ;
    init() {
    }
    deconstructor(op) {
    }
    isValid() {
        return true;
    }
    //触发事件
    onDie(entity) {
    }
    onHealthChanged(entity) {
    }
    onHitBlock() {
    }
    onHitEntity(damagingEntity, hitEntity) {
    }
    onHurt(entity, damage, damageSource) {
    }
    onLoad(entity) {
    }
    onRemove(entity) {
    }
    onSpawn(entity, cause) {
    }
}
SuperEntityStaticComponent.type = StaticComponentType.Entity;
