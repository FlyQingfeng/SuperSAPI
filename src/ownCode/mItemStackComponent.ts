import * as mc from "@minecraft/server";
import * as SuperSAPI from "../SuperSAPI";

export class mItemsatckComponent extends SuperSAPI.ItemComponent {
    useDuration:number=0;
    isUseing=false;
    constructor(typeId:string,owner: SuperSAPI.SuperItemStack,options?:SuperSAPI.SuperComponentCreateOptions) {
        super(typeId,owner,options)
        this.enable_tick=true;
    };
    tick(t: number): void {
        if (this.isUseing) {
            this.useDuration++;
        }
    }
    onStart(): void {
    }
    onAttack(player: SuperSAPI.SuperPlayer, target: SuperSAPI.SuperEntity): void {
        if (target) {
            target.applyDamage(99,{damagingEntity:player.source_instance,cause:mc.EntityDamageCause.entityAttack});
        }
    }
    onUse(player: SuperSAPI.SuperPlayer): void {
    }
    onStartUse(player: SuperSAPI.SuperPlayer, useDuration: number): void {
        this.isUseing=true;
        this.useDuration=0
    }
    onItemRelease(player: SuperSAPI.SuperPlayer, useDuration: number): void {
        console.log("Release:",this.useDuration);
        this.isUseing=false
    }
}