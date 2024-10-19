import * as SuperSAPI from "./SuperSAPI"; //导入SSAPI
//ownCode文件夹里面放了我们的自定义的类,注意导入路径要从src开始
import { mEntity } from "./ownCode/mEntity"; //导入自己的mEntity类
import { mPlayer } from "./ownCode/mPlayer"; //导入自己的mPlayer类
import { mPlayerComponent } from "./ownCode/mPlayerComponent";
import { mEntityComponent } from "./ownCode/mEntityComponent";
import { mItemsatckComponent } from "./ownCode/mItemStackComponent";
import { mSuperBlockStaticComponent } from "./ownCode/mSuperBlockStaticComponent";
import { mSuperItemStaticComponent } from "./ownCode/mSuperItemStaticComponent";
//把我们在ownCode文件夹写的类注册到SuperSAPI内启用
//自定义实体类
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Entity, mEntity); //替换掉原SSAPI的Entity类
//自定义自定义玩家
SuperSAPI.ClassManager.replaceClass(SuperSAPI.NativeClassType.Player, mPlayer); //替换掉原SSAPI的Player类
//注册一个实体组件
SuperSAPI.CustomComponentManager.registrationCustomComponent("mEC", mEntityComponent, SuperSAPI.CustomComponentType.EntityComponentType);
//注册一个玩家组件
SuperSAPI.CustomComponentManager.registrationCustomComponent("mPC", mPlayerComponent, SuperSAPI.CustomComponentType.PlayerComponentType);
//注册一个物品组件
SuperSAPI.CustomComponentManager.registrationCustomComponent("mIC", mItemsatckComponent, SuperSAPI.CustomComponentType.ItemComponentType);
//注册一个方块静态组件
SuperSAPI.CustomStaticComponentManager.registrationCustomComponent(SuperSAPI.MCVD.MinecraftBlockTypes.Tnt, mSuperBlockStaticComponent, mSuperBlockStaticComponent.type);
//注册一个物品静态组件
SuperSAPI.CustomStaticComponentManager.registrationCustomComponent(SuperSAPI.MCVD.MinecraftItemTypes.Tnt, mSuperItemStaticComponent, mSuperItemStaticComponent.type);
//注册一个聊天指令：#give <物品ID> <组件ID>
//可以在游戏内输入#help查看所有已经注册的指令和用法
SuperSAPI.CommandManager.registerCommand("give", "<物品ID> <组件ID>  给予一个物品，并且附加自定义组件", (player, args) => {
    //指令回调函数
    let item_id = args[0]; //物品ID
    let cc_id = args[1]; //附加组件ID
    if (item_id && cc_id) {
        let new_item = SuperSAPI.ItemStackManager.CreateNewItemFromTypeID(item_id); //使用ItemStackManager类创建一个新物品
        let re = new_item.addCustomComponent(cc_id); //给物品添加上组件
        if (re) {
            player.giveItem(new_item); //把物品给予玩家
        }
    }
    else {
        player.sendMessage("指令参数错误，请输入#help查看用法");
    }
});
SuperSAPI.System.init(); //初始化SuperSAPI系统，必须初始化要不然不起作用
