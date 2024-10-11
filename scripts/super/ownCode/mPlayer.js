import * as SuperSAPI from "../SuperSAPI";
export class mPlayer extends SuperSAPI.Player {
    constructor(player) {
        super(player);
        this.enable_tick = true;
        this.attribute.init("use_num", 0);
    }
    tick(t) {
    }
    onItemUseAfterEvent(event) {
        let use_num = this.attribute.get("use_num");
        use_num++;
        this.attribute.set("use_num", use_num);
        this.sendMessage(`${use_num}`);
    }
}
