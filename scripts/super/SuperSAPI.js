import * as sp from "./Player/SuperPlayer";
import * as se from "./Entity/SuperEntity";
import * as run from "./Runtime";
import * as cm from "./Command/CommandManager";
import * as sw from "./World/SuperWorld";
import * as sc from "./Component/SuperComponent";
import * as ccm from "./Component/CustomComponentManager";
import * as sec from "./Component/SuperEntityComponent";
import * as spc from "./Component/SuperPlayerComponent";
import * as sic from "./Component/SuperItemComponent";
import * as si from "./Item/SuperItemStack";
import * as sim from "./Item/SuperItemManager";
import * as tm from "./Public/Timer";
import * as msuper from "./Super/Super";
import * as db from "./Public/Debug";
import * as cscm from "./Component/CustomStaticComponentManager";
import * as ssc from "./Component/SuperStaticComponent";
import * as sbsc from "./Component/SuperBlockStaticComponent";
import * as sisc from "./Component/SuperItemStaticComponent";
//版本说明
export const version_information = {
    name: "SuperSAPI",
    author: "Qingfeng",
    link: "https://github.com/FlyQingfeng/SuperSAPI",
    version: [1, 0, 0],
    beta: true,
    toString() {
        return `${this.name}${JSON.stringify(this.version)}${this.beta ? "-bata" : ""} 加载成功 @${this.name} |项目地址:${this.link}`;
    }
};
//代导入
export const MC = await import("@minecraft/server");
export const Std = await import("./Public/Stdlib");
export const MCVD = await import("./VanillaData/VanillaData");
//super类
export const SuperWorld = sw.SuperWorld;
export const SuperPlayer = sp.SuperPlayer;
export const SuperEntity = se.SuperEntity;
export const SuperItemStack = si.SuperItemStack;
export const SuperSystem = run.SuperSystem;
//组件类
export const PlayerComponent = spc.PlayerSuperComponent;
export const EntityComponent = sec.EntitySuperComponent;
export const ItemComponent = sic.ItemSuperComponent;
export const SuperComponent = sc.SuperComponent;
export const SuperStaticComponent = ssc.SuperStaticComponent;
export const StaticComponentType = ssc.StaticComponentType;
export const SuperBlockStaticComponent = sbsc.SuperBlockStaticComponent;
export const SuperItemStaticComponent = sisc.SuperItemStaticComponent;
//类管理
export const ClassManager = run.ClassManager;
export const CommandManager = cm.CommandManager;
export const CustomComponentManager = ccm.CustomComponentManager;
export const ItemStackManager = sim.ItemStackManager;
export const CustomStaticComponentManager = cscm.CustomStaticComponentManager;
//工具类
export const Debug = db.Debug;
//定时器类
export const Timer = tm.Timer;
Debug.debug = version_information.beta;
//枚举
export const NativeClassType = run.NativeClassType;
//实例
export const System = run.runtime;
export const CustomComponentType = ccm.ComponentType;
export const registerAsSubscribable = msuper.registerAsSubscribable;
console.log(version_information.toString());
