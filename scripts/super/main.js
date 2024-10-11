import { system } from "@minecraft/server";
import { mEntity } from "./ownCode/mEntity";
import { mPlayer } from "./ownCode/mPlayer";
import { PlayerManaComponent } from "./ownCode/mPlayerComponent";
import * as SuperSAPI from "./SuperSAPI";
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Entity, mEntity);
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Player, mPlayer);
SuperSAPI.CustomComponentManager.registrationCustomComponent("id", PlayerManaComponent, SuperSAPI.CustomComponentType.EntityComponentType);
SuperSAPI.CommandManager.registerCommand('test', "测试指令", (player, arg) => {
});
SuperSAPI.CommandManager.registerCommand('add', "<组件ID> 添加组件", (player, arg) => {
    let id = arg[0];
    if (!id) {
        player.sendMessage(`缺少<组件ID>参数`);
    }
    if (SuperSAPI.CustomComponentManager.Has(id)) {
        if (player.addCustomComponent(id)) {
            player.sendMessage(`成功添加组件${id}`);
        }
        else {
            player.sendMessage(`已经存在${id}组件，添加失败`);
        }
    }
    else {
        player.sendMessage(`未发现组件${id}，请查看该组件是否注册`);
    }
});
SuperSAPI.CommandManager.registerCommand('remove', "<组件ID> 删除", (player, arg) => {
    let id = arg[0];
    if (!id) {
        player.sendMessage(`缺少<组件ID>参数`);
    }
    if (SuperSAPI.CustomComponentManager.Has(id)) {
        player.removeCustomComponent(id);
        player.sendMessage(`移除成功`);
    }
    else {
        player.sendMessage(`未发现组件${id}，请查看该组件是否注册`);
    }
});
SuperSAPI.CommandManager.registerCommand('setMana', "<设置的值> 设置组件的Mana值", (player, arg) => {
    let value = arg[0];
    if (!value) {
        player.sendMessage(`缺少<设置的值>参数`);
    }
    let mana = player.getCustomComponent("id");
    console.log(typeof mana);
    // mana.=parseInt(value);
    // player.sendMessage(`设置成功${value}`)
});
SuperSAPI.CommandManager.registerCommand('putMana', "打印组件的Mana值", (player, arg) => {
    let mana = player.getCustomComponent("id");
    player.sendMessage(`mana:${mana.mana}`);
});
SuperSAPI.System.init();
system.run(() => {
});
