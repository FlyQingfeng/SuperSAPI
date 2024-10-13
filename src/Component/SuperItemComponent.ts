import * as mc from "@minecraft/server";
import { SuperComponent, SuperComponentCreateOptions } from "./SuperComponent";
import { SuperItemStack } from "../Item/SuperItemStack";
import { SuperPlayer } from "../Player/SuperPlayer";

export class ItemSuperComponent extends SuperComponent {
    constructor(typeId:string,owner: SuperItemStack,options?:SuperComponentCreateOptions) {
        super(typeId,owner,options)
    };
    getOwner():SuperItemStack {
        return this.owner as SuperItemStack
    }
    onStart(): void {
        
    }
    onUse(player:SuperPlayer){
        
    }
    onUseOn(player: SuperPlayer, block: mc.Block, blockFace: mc.Direction, faceLocation: mc.Vector3, isFirstEvent: boolean){
        
    }
    onStartUse(player: SuperPlayer, useDuration: number){
        
    }
    onStopUse(player: SuperPlayer, block: mc.Block){
        
    }
    onItemRelease(player: SuperPlayer, useDuration: number) {
        
    }
    onItemComplete(player:SuperPlayer) {
        
    }
}