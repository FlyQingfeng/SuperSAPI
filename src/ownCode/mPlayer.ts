import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";

export class mPlayer extends SuperSAPI.Player {
    constructor(player: mc.Player) {
        super(player)
        this.atribute.set("value",0);
        // this.enable_tick=true;
    }
    tick(t: number): void {
        this.sendMessage(`${this.name}`)
    }
    onHitBlockAfterEvent(event: mc.EntityHitBlockAfterEvent): void {
        this.sendMessage(`hit block`)
    }
    onHitEntityAfterEvent(event: mc.EntityHitEntityAfterEvent): void {
        this.sendMessage(`hit`)
    }
    onHurtAfterEvent(event: mc.EntityHurtAfterEvent): void {
        this.sendMessage(`${event.damage}`)
    }
    //玩家破坏方块之后
    onAfterBreakBlockEvent(event: mc.PlayerBreakBlockAfterEvent): void {
        this.sendMessage(`${event.brokenBlockPermutation.type.id}`)
    }
}
// SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Player,mPlayer)