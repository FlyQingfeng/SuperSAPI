import * as SuperSAPI from "../SuperSAPI";
import { MainUI, mInfoBarUI, mMessageUI } from "./mUI";
export class mSuperItemStaticComponent extends SuperSAPI.SuperItemStaticComponent {
    constructor(typeId) {
        super(typeId);
    }
    ;
    init() {
    }
    onUse(itemStack, player) {
        if (player.isOnGround && !player.isSneaking) {
            let ui = new MainUI(null, player);
            ui.show();
        }
        if (player.isOnGround && player.isSneaking) {
            let ui = new mInfoBarUI(null, player);
            ui.show();
        }
        if (!player.isOnGround && !player.isSneaking) {
            let ui = new mMessageUI(null, player);
            ui.show();
        }
    }
}
