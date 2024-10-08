import { system } from "@minecraft/server";
import { mEntity } from "./ownCode/mEntity";
import { mPlayer } from "./ownCode/mPlayer";
import * as SuperSAPI from "./SuperSAPI";
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Entity, mEntity);
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Player, mPlayer);
SuperSAPI.CommandManager.registerCommand('test', "测试指令", (player, arg) => {
    console.log(`${JSON.stringify(SuperSAPI.World.Entitys)}`);
});
SuperSAPI.System.init();
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:\'",.<>/?\\';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
system.run(() => {
});
