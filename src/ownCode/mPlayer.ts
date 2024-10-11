import { registerAsSubscribable } from "../Super/Super";
import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";

export class mPlayer extends SuperSAPI.Player {
    constructor(player: mc.Player) {
        super(player)
        this.enable_tick=true;
        this.attribute.init("use_num",0);
    }
    tick(t: number): void {
    }
    onItemUseAfterEvent(event: mc.ItemUseAfterEvent): void {
        let use_num=this.attribute.get("use_num");
        use_num++;
        this.attribute.set("use_num",use_num);
        this.sendMessage(`${use_num}`)
    }
}


