
import { SuperItemStack } from "Item/SuperItemStack";
import { SuperPlayer } from "Player/SuperPlayer";
import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";

export class mSuperItemStaticComponent extends SuperSAPI.SuperItemStaticComponent{
    constructor(typeId:string) {
        super(typeId)
    };
    init(){//组件初始化

    }
    onUse(itemStack: SuperItemStack, player: SuperPlayer): void {
        console.log(itemStack.uuid);
    }
}