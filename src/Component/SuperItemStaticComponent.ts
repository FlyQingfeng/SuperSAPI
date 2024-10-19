
import { SuperPlayer } from "../Player/SuperPlayer";
import * as mc from "@minecraft/server";
import { SuperStaticComponent,StaticComponentType } from "./SuperStaticComponent";
import { SuperItemStack } from "../Item/SuperItemStack";

export class SuperItemStaticComponent extends SuperStaticComponent{
    static type:StaticComponentType=StaticComponentType.Item;
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
    onItemRelease(itemStack: SuperItemStack, player: SuperPlayer) {
    }
    onItemComplete(itemStack: SuperItemStack, player: SuperPlayer) {
    }
    onUseOn(itemStack: SuperItemStack, player: SuperPlayer, block: mc.Block, blockFace: mc.Direction, faceLocation: mc.Vector3, isFirstEvent: boolean) {
    }
    onUse(itemStack: SuperItemStack, player: SuperPlayer) {
    }
}