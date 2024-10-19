
import * as mc from "@minecraft/server";
import {
    ActionFormData,
    MessageFormData,
    ModalFormData,
    ActionFormResponse
} from "@minecraft/server-ui";
import { SuperPlayer } from "../Player/SuperPlayer";

type Button = {
    text: string;
    icon?: string;
    func: (op?: any) => void;
    op?: any;
};

type InputField = {
    type: "options" | "input" | "toggle" | "range";
    text: string;
    id: string;
    options?: string[];
    value?: number | string | boolean;
    place?: string;
    min?: number;
    max?: number;
    step?: number;
    match?: string[];
};

function array_get(arr: any[], index: number, none: any) {
    if (arr.length > index) {
        return arr[index]
    }
    return none
}

export class UI {
    parent: UI | null;
    player: SuperPlayer;
    constructor(parent: UI | null = null, player: SuperPlayer) {
        this.parent = parent;
        this.player = player;
    }
    show(): void {

    }
    show_out(): void {

    }
}

export class BtnBar extends UI {
    title: string="";
    body: string="";
    btns: Button[]=[];
    busy_wait: number;
    ui: ActionFormData = new ActionFormData();
    constructor(parent: UI | null = null, player: SuperPlayer) {
        super(parent, player);
        this.title = "";
        this.body = "";
        this.btns = [];
        this.busy_wait = 1;
    }
    busy() {

    }
    cancel() {

    }
    show(): void {
        this.ui.title(this.title).body(this.body);
        for (const btn of this.btns) {
            this.ui.button(btn.text, btn.icon)
        }
        this.show_out();
    }
    show_out(): void {
        let player = this.player.getOrigin() as mc.Player
        this.ui.show(player).then((result) => {
            if (result.canceled) {
                if (result.cancelationReason === "UserClosed") {
                    this.cancel();
                }
                else {
                    if (typeof (this.busy) !== "function") {
                        mc.system.runTimeout(() => {
                            this.show_out();
                        }, this.busy_wait);
                    }
                    else {
                        this.busy();
                    }
                }
            } else {
                this.btns[result.selection].func(this.btns[result.selection].op);
            }
        });
    }
}



export class InfoBar extends UI {
    ui: ModalFormData = new ModalFormData();
    title: string = "";
    things: InputField[] = [];
    busy_wait: number = 1;
    constructor(parent: UI | null = null, player: SuperPlayer) {
        super(parent, player);
    }
    busy() { };
    cancel() {
        if (this.parent) {
            this.parent.show_out();
        }
    };
    back(result: any) {

    };
    addOptions(id: string, text: string, options: string[], value: number): void {
        const input: InputField = {
            type: "options",
            text,
            id,
            options,
            value
        };
        this.things.push(input);
    }

    addInput(id: string, text: string, place: string, value: string): void {
        const input: InputField = {
            type: "input",
            text,
            id,
            place,
            value
        };
        this.things.push(input);
    }

    addToggle(id: string, text: string, value: boolean): void {
        const input: InputField = {
            type: "toggle",
            text,
            id,
            value
        };
        this.things.push(input);
    }

    addRange(id: string, text: string, min: number, max: number, step: number, value: number): void {
        const input: InputField = {
            type: "range",
            text,
            id,
            min,
            max,
            step,
            value
        };
        this.things.push(input);
    }

    // 展示UI的方法，需要根据实际情况完成
    show(): void {
        this.ui.title(this.title);
        for (const field of this.things) {
            switch (field.type) {
                case "toggle":
                    this.ui.toggle(field.text, field.value as boolean);
                    break;
                case "input":
                    this.ui.textField(field.text, field.place, field.value as string);
                    break;
                case "range":
                    this.ui.slider(field.text, field.min, field.max, field.step, field.value as number);
                    break;
                case "options":
                    this.ui.dropdown(field.text, field.options, field.value as number);
                    break;
            }
        }
        // 这里需要调用 show_out 方法来实际显示 UI
        this.show_out();
    }
    show_out(): void {
        let player = this.player.getOrigin() as mc.Player
        this.ui.show(player).then((result) => {
            if (result.canceled) {
                if (result.cancelationReason === "UserClosed") {
                    this.cancel();
                }
                else {
                    if (typeof (this.busy) !== "function") {
                        mc.system.runTimeout(() => {
                            this.show_out();
                        }, this.busy_wait);
                    }
                    else {
                        this.busy();
                    }
                }
            } else {
                var object = {};
                for (var cf = 0; cf < this.things.length; cf++) {
                    var data = result.formValues[cf];
                    if (this.things[cf].type === "options") {
                        if (Array.isArray(this.things[cf].match)) {
                            data = array_get(this.things[cf].match, data as number, data);
                        }
                    }
                    if (this.things[cf].type === "range") {
                        if (data as number < this.things[cf].min || data as number > this.things[cf].max) {
                            data = this.things[cf].min;
                        }
                    }
                    if (object[this.things[cf].id] === undefined) {
                        object[this.things[cf].id] = data;
                    }
                    else {
                        if (Array.isArray(object[this.things[cf].id])) {
                            object[this.things[cf].id].push(data);
                        }
                        else {
                            object[this.things[cf].id] = [object[this.things[cf].id], data];
                        }
                    }
                }
                this.back(object);
            }
        });
    }
}

export class MessageUI extends UI{
    title: string="";
    body: string="";
    messageForm: MessageFormData=new MessageFormData();
    button1: { text: string; func: () => void; }={text:"确定",func:()=>{}};
    button2: { text: string; func: () => void; }={text:"取消",func:()=>{}};

    constructor(parent: UI | null = null, player: SuperPlayer) {
        super(parent, player);
    }

    show(){
        this.messageForm.title(this.title)
            .body(this.body)
            .button1(this.button1.text)
            .button2(this.button2.text);
        this.show_out();
    };

    back(index: number){ };

    cancel(){ };

    show_out(){
        let player=this.player.getOrigin() as mc.Player
        this.messageForm.show(player).then((formData: any) => {
            if (formData.canceled || formData.selection === undefined) {
                this.cancel();
                return;
            }
            switch (formData.selection) {
                case 0:
                    this.button1.func();
                    break;
                case 1:
                    this.button2.func();
                    break;
                default:
                    this.cancel();
                    break;
            }
            this.back(formData.selection);
        });
    };
}