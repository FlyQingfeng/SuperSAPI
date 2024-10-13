import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";

export class mPlayer extends SuperSAPI.Player {
    constructor(player: SuperSAPI.MC_Player,world:SuperSAPI.SuperWorld) {
        super(player,world)
        this.enable_tick=true;
        this.attribute.init("use_num",0);
        SuperSAPI.Debug.log("Player constructor:",this.id)
    }
    deconstructor(): void {
        SuperSAPI.Debug.log("Player deconstructor:",this.id)
    }
    @SuperSAPI.registerAsSubscribable
    tick(t: number): void {
    }
    @SuperSAPI.registerAsSubscribable
    onItemUseAfterEvent(event: mc.ItemUseAfterEvent): void {
        
    }
    @SuperSAPI.registerAsSubscribable
    onHitEntityAfterEvent(event: mc.EntityHitEntityAfterEvent): void {
        let hitEntity=this.getWorld().getEntity(event.hitEntity.id);
        hitEntity.addCustomComponent("damage",{
            Target: this
        });
        let damage=hitEntity.getCustomComponent("damage")
    }
}


