
import * as mc from "@minecraft/server";
import { SuperStaticComponent,StaticComponentType } from "./SuperStaticComponent";
import { SuperEntity } from "Entity/SuperEntity";
import { SuperPlayer } from "Player/SuperPlayer";

export class SuperEntityStaticComponent extends SuperStaticComponent{
    
    static type:StaticComponentType=StaticComponentType.Entity;
    constructor(typeId:string) {
        super(typeId)
    };
    init(){//组件初始化

    }
    deconstructor(op?: string): void {
    }
    isValid(): boolean {
        return true
    }

    //触发事件
    onDie(entity: SuperEntity | SuperPlayer) {
    }
    
    onHealthChanged(entity: SuperEntity | SuperPlayer) {
    }
    
    onHitBlock() {
    }
    
    onHitEntity(damagingEntity: SuperEntity | SuperPlayer, hitEntity: SuperEntity | SuperPlayer) {
    }
    
    onHurt(entity: SuperEntity | SuperPlayer, damage: number, damageSource: mc.EntityDamageSource) {
    }
    
    onLoad(entity: SuperEntity | SuperPlayer) {
    }
    
    onRemove(entity: SuperEntity | SuperPlayer) {
    }

    onSpawn(entity: SuperPlayer | SuperEntity, cause: mc.EntityInitializationCause) {
    }
}