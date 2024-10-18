import * as SuperSAPI from "../SuperSAPI";


export class mEntityComponent extends SuperSAPI.EntityComponent {
    timer:SuperSAPI.Timer;
    constructor(typeId:string,owner: SuperSAPI.SuperEntity,options?:SuperSAPI.SuperComponentCreateOptions) {
        super(typeId,owner,options)
        this.timer=new SuperSAPI.Timer();
    }
    init(): void {
        let entity=this.getOwner();
        this.timer.setLasting(20,()=>{
            if (entity.isValid()) {
                entity.applyDamage(1);
            }
        },100,()=>{
            if (entity.isValid()) {
                entity.removeCustomComponent(this.typeId)
                this.detach();
            }
        });
    }
    detach(): void {
        this.getOwner().removeCustomComponent(this.typeId);
    }
    deconstructor(op?: string): void {
        this.timer.clearAll();
    }
    onStart(): void {
        this.init();
    }
}