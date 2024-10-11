import * as mc from "@minecraft/server";
import { SuperPlayer } from "../Player/SuperPlayer";
import * as SuperSAPI from "../SuperSAPI";


export class mPlayerComponent extends SuperSAPI.PlayerComponent {
    constructor(typeId:string,owner: SuperPlayer) {
        super(typeId,owner)
    }
    onBreakBlockAfterEvent(event: mc.PlayerBreakBlockAfterEvent): void {

    }
    init(): void {
    }
    onStart(): void {
        this.init();
        this.getOwner().sendMessage(`加载组件${this.typeId}`);
    }
}