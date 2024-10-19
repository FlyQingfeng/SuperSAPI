import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";

export class mPlayer extends SuperSAPI.SuperPlayer {
    constructor(player: SuperSAPI.MC_Player,world:SuperSAPI.SuperWorld) {
        super(player,world)
        this.enable_tick=true;
    }
    @SuperSAPI.registerAsSubscribable
    onItemUseAfterEvent(event: mc.ItemUseAfterEvent): void {
    }
}


