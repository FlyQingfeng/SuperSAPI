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
        let entity=this.getOwner();
        this.timer.setInterval(()=>{
            if (entity.isValid()) {
                entity.applyDamage(1);
            }
        },20)
        this.timer.setTimeout(()=>{
            if (entity.isValid()) {
                entity.removeCustomComponent(this.typeId)
                this.detach();
            }
            this.timer.clearAll();
        },100);
    }
    detach(): void {
        this.getOwner().removeCustomComponent(this.typeId);
    }
    deconstructor(op?: string): void {
        this.timer.clearAll();
        console.log("remove");
    }
    onStart(): void {
        this.init();
        console.log("start");
        // this.getOwner().removeCustomComponent(this.typeId);
        // this.detach();
    }
}