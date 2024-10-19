
import { SuperPlayer } from "../Player/SuperPlayer";
import * as mc from "@minecraft/server";
import { SuperStaticComponent,StaticComponentType } from "../Component/SuperStaticComponent";
import { SuperEntity } from "../Entity/SuperEntity";

export class SuperBlockStaticComponent extends SuperStaticComponent{
    static type:StaticComponentType=StaticComponentType.Block;
    constructor(typeId:string) {
        super(typeId)
    };
    init(){//组件初始化

    }
    beforeOnPlayerPlace(player: SuperPlayer, event: mc.PlayerPlaceBlockBeforeEvent) {

    }
    onEntityFallOn(block:mc.Block,entity: SuperEntity, FallingTime: number){

    }
    onPlayerPlace(player: SuperPlayer, block: mc.Block, dimension: mc.Dimension){

    }
    onPlayerDestroy(player: SuperPlayer, block: mc.Block, brokenBlockPermutation: mc.BlockPermutation, dimension: mc.Dimension, itemStackAfterBreak: mc.ItemStack, itemStackBeforeBreak: mc.ItemStack) {

    }
    onPlayerInteract(player: SuperPlayer, beforeItemStack: mc.ItemStack, block: mc.Block, blockFace: mc.Direction, faceLocation: mc.Vector3, isFirstEvent: boolean, itemStack: mc.ItemStack) {

    }
}