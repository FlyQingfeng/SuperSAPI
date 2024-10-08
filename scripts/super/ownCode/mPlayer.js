import * as SuperSAPI from "../SuperSAPI";
export class mPlayer extends SuperSAPI.Player {
    constructor(player) {
        super(player);
        this.attribute.init("use_num", 0);
    }
    onItemUseAfterEvent(event) {
        let use_num = this.attribute.get("use_num");
        use_num++;
        this.attribute.set("use_num", use_num);
        this.sendMessage(`${use_num}`);
    }
}
