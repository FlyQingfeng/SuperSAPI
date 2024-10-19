import * as SuperSAPI from "../SuperSAPI";

export class MainUI extends SuperSAPI.BtnBarUI{
    constructor(parent: SuperSAPI.UI | null = null,player: SuperSAPI.SuperPlayer){
        super(parent,player);
        this.title="按钮选项"
        this.btns=[
            {
                text: "按钮1",
                func: () => {
                    console.log("点击按钮1");
                }
            },
            {
                text: "带图标按钮",
                icon:"",
                func: () => {
                    console.log("点击带图标按钮");
                }
            }
        ]
    }
}
export class mInfoBarUI extends SuperSAPI.InfoBarUI{
    constructor(parent: SuperSAPI.UI | null = null,player: SuperSAPI.SuperPlayer){
        super(parent,player);
        this.title="测试"
        this.addInput("input","输入","输入","");
        this.addOptions("options","选项",["选项1","选项2"],0);
        this.addRange("range","范围选择",0,64,1,0);
        this.addToggle("toggle","触发框",false);
    }
    back(result: any): void {
        console.log(result["input"]);
        console.log(result["options"]);
        console.log(result["range"]);
        console.log(result["toggle"]);
    }
}

export class mMessageUI extends SuperSAPI.MessageUI{
    constructor(parent: SuperSAPI.UI | null = null,player: SuperSAPI.SuperPlayer){
        super(parent,player);
        this.title="弹窗标题"
        this.body="弹窗内容"
        this.button1={
            text:"按钮1",
            func:()=>{
                console.log("点击按钮1");
            }
        }
        this.button2={
            text:"按键2",
            func:()=>{
                console.log("点击按钮2");
            }
        }
    }
}