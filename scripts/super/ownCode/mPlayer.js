import { SuperPlayer } from "../Player/SuperPlayer";
export class mPlayer extends SuperPlayer {
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
