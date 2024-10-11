import * as SuperSAPI from "../SuperSAPI";
export class PlayerManaComponent extends SuperSAPI.PlayerComponent {
    constructor(typeId, owner) {
        super(typeId, owner);
        this.mana = 0;
    }
    // onBreakBlockAfterEvent(event: PlayerBreakBlockAfterEvent): void {
    //     console.log(event.player.name);
    // }
    onStart() {
        let player = this.entity.cast();
        player.sendMessage(`加载组件${this.typeId}`);
    }
}
