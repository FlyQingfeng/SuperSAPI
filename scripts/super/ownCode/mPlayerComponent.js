import * as SuperSAPI from "../SuperSAPI";
export class PlayerManaComponent extends SuperSAPI.EntityComponent {
    constructor(typeId, owner) {
        super(typeId, owner);
        this.mana = 0;
    }
    onStart() {
        let player = this.entity.cast();
        player.sendMessage(`加载组件${this.typeId}`);
    }
}
