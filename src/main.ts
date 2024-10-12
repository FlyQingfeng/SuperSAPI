import { StructureSaveMode, system, world } from "@minecraft/server";
import { mEntity } from "./ownCode/mEntity";
import { mPlayer } from "./ownCode/mPlayer";
import { mPlayerComponent } from "./ownCode/mPlayerComponent";
import * as SuperSAPI from "./SuperSAPI";
import { mEntityComponent } from "./ownCode/mEntityComponent";



SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Entity, mEntity)
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Player, mPlayer)
SuperSAPI.CustomComponentManager.registrationCustomComponent("id", mPlayerComponent, SuperSAPI.CustomComponentType.PlayerComponentType)
SuperSAPI.CustomComponentManager.registrationCustomComponent("damage", mEntityComponent, SuperSAPI.CustomComponentType.EntityComponentType)

SuperSAPI.CommandManager.registerCommand('test', "测试指令", (player, arg) => {
    let ets=world.getDimension("overworld").getEntities()
    for (const e of ets) {
        console.log("cc:",e.getDynamicProperty("CustomComponent"));
    }
})
system.runInterval(()=>{
    SuperSAPI.SuperSystem.getWorld().getAllEntitys().forEach((e)=>{
    })
},10)


SuperSAPI.CommandManager.registerCommand('has', "获取玩家的全部组件", (player, arg) => {
    let coms= player.getCustomComponents()
    for (const com of coms) {
        console.log(com.typeId);
    }
})
SuperSAPI.CommandManager.registerCommand('add', "<组件ID> 添加组件", (player, arg) => {
    let id = arg[0];
    if (!id) {
        player.sendMessage(`缺少<组件ID>参数`)
    }
    if (SuperSAPI.CustomComponentManager.Has(id)) {
        if (player.addCustomComponent(id)) {
            player.sendMessage(`成功添加组件${id}`)
        } else {
            player.sendMessage(`已经存在${id}组件，添加失败`)
        }
    } else {
        player.sendMessage(`未发现组件${id}，请查看该组件是否注册`)
    }

})
SuperSAPI.CommandManager.registerCommand('remove', "<组件ID> 删除", (player, arg) => {
    let id = arg[0];
    if (!id) {
        player.sendMessage(`缺少<组件ID>参数`)
    }
    if (SuperSAPI.CustomComponentManager.Has(id)) {
        player.removeCustomComponent(id);
        player.sendMessage(`移除成功`)
    } else {
        player.sendMessage(`未发现组件${id}，请查看该组件是否注册`)
    }
})


SuperSAPI.System.init();


system.run(() => {
    
})

