import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";

export class mPlayer extends SuperSAPI.Player {
    constructor(player: SuperSAPI.MC_Player,world:SuperSAPI.SuperWorld) {
        super(player,world)
        this.enable_tick=true;
    }
    @SuperSAPI.registerAsSubscribable
    onItemUseAfterEvent(event: mc.ItemUseAfterEvent): void {
        console.log("use item");
    }
}


