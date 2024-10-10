import * as SuperSAPI from "../SuperSAPI";
function test() {
    console.log("new test");
}
export class mPlayer extends SuperSAPI.Player {
    constructor(player) {
        super(player);
        this.enable_tick = true;
        this.attribute.init("use_num", 0);
        this.time = 0;
        this.Bind(this.test, test); //注册到绑定事件管理
        // eventManager.on(this.uuid, "test", test);//注册绑定
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
