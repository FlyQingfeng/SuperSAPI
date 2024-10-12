import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";

export class mPlayer extends SuperSAPI.Player {
    constructor(player: mc.Player) {
        super(player)
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
        let use_num=this.attribute.get("use_num");
        use_num++;
        this.attribute.set("use_num",use_num);
        this.sendMessage(`${use_num}`)
    }
    @SuperSAPI.registerAsSubscribable
    onHitEntityAfterEvent(event: mc.EntityHitEntityAfterEvent): void {
        let hitEntity=SuperSAPI.SuperSystem.getWorld().getEntity(event.hitEntity.id);
        hitEntity.addCustomComponent("damage");
        let damage=hitEntity.getCustomComponent("damage")
        // damage.detach();
        // hitEntity.removeCustomComponent("damage")
    }
}


