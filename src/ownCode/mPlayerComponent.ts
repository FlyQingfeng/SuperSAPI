import * as mc from "@minecraft/server";
import * as SuperSAPI from "../SuperSAPI";


export class mPlayerComponent extends SuperSAPI.PlayerComponent {
    constructor(typeId:string,owner: SuperSAPI.SuperPlayer) {
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