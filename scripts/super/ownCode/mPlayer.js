import * as SuperSAPI from "../SuperSAPI";
export class mPlayer extends SuperSAPI.Player {
    constructor(player) {
        super(player);
        this.enable_tick = true;
        this.attribute.init("use_num", 0);
        this.time = 0;
    }
    tick(t) {
        // this.time++
        // if (this.time>=20) {
        //     this.time=0;
        //     this.sendMessage(`out`)
        // }
    }
    onItemUseAfterEvent(event) {
        let use_num = this.attribute.get("use_num");
        use_num++;
        this.attribute.set("use_num", use_num);
        this.sendMessage(`${use_num}`);
    }
}
