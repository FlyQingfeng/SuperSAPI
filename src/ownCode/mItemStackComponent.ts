import * as SuperSAPI from "../SuperSAPI";
import { SuperPlayer } from "../SuperSAPI";

export class mItemsatckComponent extends SuperSAPI.ItemComponent {
    useDuration:number=0;
    isUseing=false;
    constructor(typeId:string,owner: SuperSAPI.SuperItemStack,options?:SuperSAPI.SuperComponentCreateOptions) {
        super(typeId,owner,options)
        this.enable_tick=true;
    };
    tick(t: number): void {
        if (this.isUseing) {
            this.useDuration++;
        }
    }
    onStart(): void {
    }
    onUse(player: SuperPlayer): void {
        console.log("use");
    }
    onStartUse(player: SuperPlayer, useDuration: number): void {
        this.isUseing=true;
        this.useDuration=0
    }
    onItemRelease(player: SuperPlayer, useDuration: number): void {
        console.log("Release:",this.useDuration);
        this.isUseing=false
    }
}