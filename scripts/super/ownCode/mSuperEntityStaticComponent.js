import * as SuperSAPI from "../SuperSAPI";
const MinecraftParticleTypes = SuperSAPI.MCVD.MinecraftParticleTypes;
const MinecraftBlockTypes = SuperSAPI.MCVD.MinecraftBlockTypes;
export class mSuperEntityStaticComponent extends SuperSAPI.SuperEntityStaticComponent {
    constructor(typeId) {
        super(typeId);
    }
    ;
    init() {
    }
    onDie(entity) {
        console.log("gg", entity.typeId);
    }
    onHitEntity(damagingEntity, hitEntity) {
        console.log("hit", hitEntity.typeId);
    }
    onHurt(entity, damage, damageSource) {
        console.log("hurt");
    }
    onLoad(entity) {
        console.log("load", entity.typeId);
    }
    onSpawn(entity, cause) {
        console.log("onSpawn", entity.typeId);
    }
}
