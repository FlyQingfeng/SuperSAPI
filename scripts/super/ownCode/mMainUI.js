import * as SuperSAPI from "../SuperSAPI";
export class MainUI extends SuperSAPI.BtnBar {
    constructor(parent = null, player) {
        super(parent, player);
        this.title = "测试";
        this.btns = [
            {
                text: "t1",
                func: () => {
                    console.log("aaa");
                }
            }
        ];
    }
}
