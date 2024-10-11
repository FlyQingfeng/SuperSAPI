var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
__decorate([
    SuperSAPI.registerAsSubscribable
], mPlayer.prototype, "tick", null);
__decorate([
    SuperSAPI.registerAsSubscribable
], mPlayer.prototype, "onItemUseAfterEvent", null);
