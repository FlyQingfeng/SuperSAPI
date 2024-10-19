import { Vec3 } from "../Public/Vec3";
import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";
const MinecraftParticleTypes = SuperSAPI.MCVD.MinecraftParticleTypes;
const MinecraftBlockTypes = SuperSAPI.MCVD.MinecraftBlockTypes;
export class mSuperBlockStaticComponent extends SuperSAPI.SuperBlockStaticComponent {
    constructor(typeId) {
        super(typeId);
    }
    ;
    init() {
    }
    onEntityFallOn(block, entity, FallingTime) {
        for (let x = 0; x < 2 * Math.PI; x += 0.1) {
            let sp_location = Vec3.fromObj(entity.location);
            sp_location.x = entity.location.x + Math.cos(x);
            sp_location.y = entity.location.y + Math.tan(x) * FallingTime / 20;
            sp_location.z = entity.location.z + Math.sin(x);
            entity.dimension.spawnParticle(MinecraftParticleTypes.eyeofender_death_explode_particle, sp_location);
        }
        entity.applyKnockback(0, 0, 0, FallingTime / 20 * 1.25);
        block.setPermutation(mc.BlockPermutation.resolve(MinecraftBlockTypes.Air));
    }
}
