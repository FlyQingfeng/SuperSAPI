import { Player, PlayerBreakBlockAfterEvent, PlayerBreakBlockBeforeEvent, PlayerJoinAfterEvent, PlayerPlaceBlockAfterEvent, PlayerSpawnAfterEvent, world } from "@minecraft/server";
import { SuperPlayer } from "../Player/SuperPlayer";
import { ClassManager, NativeClassType, runtime } from "Runtime";

export class mPlayer extends SuperPlayer {
    constructor(player: Player) {
        super(player)
        this.atribute.set("value",0);
        // this.enable_tick=true;
    }
    tick(t: number): void {
        this.sendMessage(`${this.name}`)
    }
    //玩家破坏方块之后
    onAfterBreakBlockEvent(event: PlayerBreakBlockAfterEvent): void {
        this.sendMessage(`${event.brokenBlockPermutation.type.id}`)
    }
    
}