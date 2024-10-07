import * as SuperSAPI from "../SuperSAPI";
export class mPlayer extends SuperSAPI.Player {
    constructor(player) {
        super(player);
        this.atribute.set("value", 0);
        // this.enable_tick=true;
    }
    tick(t) {
        this.sendMessage(`${this.name}`);
    }
    //玩家破坏方块之后
    onAfterBreakBlockEvent(event) {
        this.sendMessage(`${event.brokenBlockPermutation.type.id}`);
    }
}
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Player, mPlayer);
