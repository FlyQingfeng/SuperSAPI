
import { SuperItemStack } from "Item/SuperItemStack";
import { SuperPlayer } from "Player/SuperPlayer";
import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";
import { MainUI, mInfoBarUI, mMessageUI } from "./mUI";

export class mSuperItemStaticComponent extends SuperSAPI.SuperItemStaticComponent{
    constructor(typeId:string) {
        super(typeId)
    };
    init(){//组件初始化

    }
    onUse(itemStack: SuperItemStack, player: SuperPlayer): void {
        if (player.isOnGround&&!player.isSneaking) {
            let ui=new MainUI(null,player);
            ui.show();
        }
        if (player.isOnGround&&player.isSneaking) {
            let ui=new mInfoBarUI(null,player);
            ui.show();
        }
        if (!player.isOnGround&&!player.isSneaking) {
            let ui=new mMessageUI(null,player);
            ui.show();
        }
    }
}