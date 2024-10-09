import * as sp from "./Player/SuperPlayer";
import * as se from "./Entity/SuperEntity";
import * as run from "./Runtime";
import * as cm from "./Command/CommandManager";
import * as sw from "./World/SuperWorld";
import * as mc from "@minecraft/server";
import * as sc from "./Component/SuperComponent";
import * as ccm from "./Component/CustomComponentManager";
import * as sec from "./Component/SuperEntityComponent";
import * as sic from "./Component/SuperItemComponent";
import * as std from "./Public/stdlib";
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
export const MC = mc;
export const Std = std;
//super类
export const World = sw.SuperWorld;
export const Player = sp.SuperPlayer;
export const Entity = se.SuperEntity;
//组件类
export const EntityComponent = sec.EntitySuperComponent;
export const ItemComponent = sic.ItemSuperComponent;
export const SuperComponent = sc.SuperComponent;
export const SuperSystem = run.SuperSystem;
//类管理
export const ClassManager = run.ClassManager;
export const CommandManager = cm.CommandManager;
export const CustomComponentManager = ccm.CustomComponentManager;
//枚举
export const NativeClassType = run.NativeClassType;
export const System = run.runtime;
export const CustomComponentType = ccm.ComponentType;
console.log(version_information.toString());
