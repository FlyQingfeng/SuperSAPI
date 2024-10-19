import { SuperEntity } from "Entity/SuperEntity";
import { SuperPlayer } from "Player/SuperPlayer";
import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";

const MinecraftParticleTypes=SuperSAPI.MCVD.MinecraftParticleTypes
const MinecraftBlockTypes=SuperSAPI.MCVD.MinecraftBlockTypes
export class mSuperEntityStaticComponent extends SuperSAPI.SuperEntityStaticComponent{
    constructor(typeId:string) {
        super(typeId)
    };
    init(){//组件初始化

    }
    onDie(entity: SuperEntity | SuperPlayer): void {
        console.log("gg",entity.typeId);
    }
    onHitEntity(damagingEntity: SuperEntity | SuperPlayer, hitEntity: SuperEntity | SuperPlayer): void {
        console.log("hit",hitEntity.typeId);
    }
    onHurt(entity: SuperEntity | SuperPlayer, damage: number, damageSource: mc.EntityDamageSource): void {
        console.log("hurt");
    }
    onLoad(entity: SuperEntity | SuperPlayer): void {
        console.log("load",entity.typeId);
    }
    onSpawn(entity: SuperPlayer | SuperEntity, cause: mc.EntityInitializationCause): void {
        console.log("onSpawn",entity.typeId);
    }
}