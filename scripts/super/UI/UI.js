import * as mc from "@minecraft/server";
import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
function array_get(arr, index, none) {
    if (arr.length > index) {
        return arr[index];
    }
    return none;
}
export class UI {
    constructor(parent = null, player) {
        this.parent = parent;
        this.player = player;
    }
    show() {
    }
    show_out() {
    }
}
export class BtnBar extends UI {
    constructor(parent = null, player) {
        super(parent, player);
        this.title = "";
        this.body = "";
        this.btns = [];
        this.ui = new ActionFormData();
        this.title = "";
        this.body = "";
        this.btns = [];
        this.busy_wait = 1;
    }
    busy() {
    }
    cancel() {
    }
    show() {
        this.ui.title(this.title).body(this.body);
        for (const btn of this.btns) {
            this.ui.button(btn.text, btn.icon);
        }
        this.show_out();
    }
    show_out() {
        let player = this.player.getOrigin();
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
            }
            else {
                this.btns[result.selection].func(this.btns[result.selection].op);
            }
        });
    }
}
export class InfoBar extends UI {
    constructor(parent = null, player) {
        super(parent, player);
        this.ui = new ModalFormData();
        this.title = "";
        this.things = [];
        this.busy_wait = 1;
    }
    busy() { }
    ;
    cancel() {
        if (this.parent) {
            this.parent.show_out();
        }
    }
    ;
    back(result) {
    }
    ;
    addOptions(id, text, options, value) {
        const input = {
            type: "options",
            text,
            id,
            options,
            value
        };
        this.things.push(input);
    }
    addInput(id, text, place, value) {
        const input = {
            type: "input",
            text,
            id,
            place,
            value
        };
        this.things.push(input);
    }
    addToggle(id, text, value) {
        const input = {
            type: "toggle",
            text,
            id,
            value
        };
        this.things.push(input);
    }
    addRange(id, text, min, max, step, value) {
        const input = {
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
    show() {
        this.ui.title(this.title);
        for (const field of this.things) {
            switch (field.type) {
                case "toggle":
                    this.ui.toggle(field.text, field.value);
                    break;
                case "input":
                    this.ui.textField(field.text, field.place, field.value);
                    break;
                case "range":
                    this.ui.slider(field.text, field.min, field.max, field.step, field.value);
                    break;
                case "options":
                    this.ui.dropdown(field.text, field.options, field.value);
                    break;
            }
        }
        // 这里需要调用 show_out 方法来实际显示 UI
        this.show_out();
    }
    show_out() {
        let player = this.player.getOrigin();
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
            }
            else {
                var object = {};
                for (var cf = 0; cf < this.things.length; cf++) {
                    var data = result.formValues[cf];
                    if (this.things[cf].type === "options") {
                        if (Array.isArray(this.things[cf].match)) {
                            data = array_get(this.things[cf].match, data, data);
                        }
                    }
                    if (this.things[cf].type === "range") {
                        if (data < this.things[cf].min || data > this.things[cf].max) {
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
export class MessageUI extends UI {
    constructor(parent = null, player) {
        super(parent, player);
        this.title = "";
        this.body = "";
        this.messageForm = new MessageFormData();
        this.button1 = { text: "确定", func: () => { } };
        this.button2 = { text: "取消", func: () => { } };
    }
    show() {
        this.messageForm.title(this.title)
            .body(this.body)
            .button1(this.button1.text)
            .button2(this.button2.text);
        this.show_out();
    }
    ;
    back(index) { }
    ;
    cancel() { }
    ;
    show_out() {
        let player = this.player.getOrigin();
        this.messageForm.show(player).then((formData) => {
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
    }
    ;
}
