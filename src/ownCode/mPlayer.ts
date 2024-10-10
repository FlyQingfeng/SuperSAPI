import { eventManager } from "../EventManager/EventManager";
import * as SuperSAPI from "../SuperSAPI";
import * as mc from "@minecraft/server";
function test() {
    console.log("new test");
}
export class mPlayer extends SuperSAPI.Player {
    time: number;
    constructor(player: mc.Player) {
        super(player)
        this.enable_tick=true;
        this.attribute.init("use_num",0);
        this.time=0;
        this.Bind(this.test, test)//注册到绑定事件管理
    }
    tick(t: number): void {
        // this.time++
        // if (this.time>=20) {
        //     this.time=0;
        //     this.sendMessage(`out`)
        // }
    }
    onItemUseAfterEvent(event: mc.ItemUseAfterEvent): void {
        let use_num=this.attribute.get("use_num");
        use_num++;
        this.attribute.set("use_num",use_num);
        this.sendMessage(`${use_num}`)
    }
}