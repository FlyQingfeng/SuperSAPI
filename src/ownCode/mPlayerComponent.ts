import { PlayerBreakBlockAfterEvent } from "@minecraft/server";
import { SuperPlayer } from "../Player/SuperPlayer";
import * as SuperSAPI from "../SuperSAPI";


export class PlayerManaComponent extends SuperSAPI.PlayerComponent {
    mana:number=0;
    constructor(typeId:string,owner: any) {
        super(typeId,owner)
    }
    // onBreakBlockAfterEvent(event: PlayerBreakBlockAfterEvent): void {
    //     console.log(event.player.name);
    // }
    onStart(): void {
        let player=this.entity.cast<SuperPlayer>();
        player.sendMessage(`加载组件${this.typeId}`)
    }
}