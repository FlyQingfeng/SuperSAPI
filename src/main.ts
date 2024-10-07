import { mPlayer } from "./ownCode/mPlayer";
import { mEntity } from "./ownCode/mEntity";
import { ClassManager, NativeClassType, runtime, SuperSystem } from "./Runtime";
import { CommandManager } from "./Command/CommandManager";
import { SuperPlayer } from "./Player/SuperPlayer";
import { SuperWorld } from "./World/SuperWorld";

//运行时初始化之前执行注册和替换操作
ClassManager.replaceClass(NativeClassType.Player, mPlayer);
ClassManager.replaceClass(NativeClassType.Entity, mEntity)

//注册指令
CommandManager.registerCommand(`at`, "打印玩家身上的全部属性", (player: SuperPlayer, arg: string[]) => {
    let v = player.getAttributeMap().get("value")
    player.getAttributeMap().set("value", v + 1)
    player.sendMessage(`${JSON.stringify(player.getAttributeMap())}`)
})
CommandManager.registerCommand(`test`, "测试", (player: SuperPlayer, arg: string[]) => {
    console.log(JSON.stringify(SuperWorld.Players));
})

runtime.init();

let world = SuperSystem.getWorld()
runtime.run(() => {
    world.sendMessage("加载插件")
    // let num=world.getDimension("overworld").getEntities().length
    // console.log(num);

})
