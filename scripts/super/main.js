import { Player, system, world } from "@minecraft/server";
import { mEntity } from "./ownCode/mEntity";
import { mPlayer } from "./ownCode/mPlayer";
import * as SuperSAPI from "./SuperSAPI";
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Entity, mEntity);
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Player, mPlayer);
SuperSAPI.CommandManager.registerCommand('test', "测试指令", (player, arg) => {
    console.log(`${JSON.stringify(SuperSAPI.World.Entitys)}`);
    // player.sendMessage(`${JSON.stringify(SuperSAPI.World.Players)}`)
});
SuperSAPI.System.init();
system.run(() => {
    let player = world.getAllPlayers()[0];
    let p = world.getEntity(player.id);
    if (p instanceof Player) {
        // console.log("run:player");
    }
});
