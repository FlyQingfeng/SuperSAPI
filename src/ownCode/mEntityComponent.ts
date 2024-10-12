import * as SuperSAPI from "../SuperSAPI";
import { Timer } from "../Public/Timer";
import { SuperEntity } from "../Entity/SuperEntity";
import { system, world } from "@minecraft/server";


export class mEntityComponent extends SuperSAPI.EntityComponent {
    timer:Timer;
    constructor(typeId:string,owner: SuperEntity) {
        super(typeId,owner)
        this.timer=new Timer();
    }
    init(): void {
        
    }
    onStart(): void {
        this.init();
    }
}