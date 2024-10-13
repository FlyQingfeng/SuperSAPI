import * as sp from "./Player/SuperPlayer"
import * as se from "./Entity/SuperEntity"
import * as run from "./Runtime"
import * as cm from "./Command/CommandManager";
import * as sw from "./World/SuperWorld";
import * as mc from "@minecraft/server";
import * as sc from "./Component/SuperComponent";
import * as ccm from "./Component/CustomComponentManager";
import * as sec from "./Component/SuperEntityComponent";
import * as spc from "./Component/SuperPlayerComponent";
import * as sic from "./Component/SuperItemComponent";
import * as si from "./Item/SuperItemStack";
import * as std from "./Public/stdlib";
import * as tm from "./Public/Timer";
import * as msuper from "./Super/Super";
import * as db from "./Public/debug";

//版本说明
export const version_information={
    name:"SuperSAPI",
    author:"Qingfeng",
    link:"https://github.com/FlyQingfeng/SuperSAPI",
    version:[1,0,0],
    beta:true,
    toString(){
        return `${this.name}${JSON.stringify(this.version)}${this.beta?"-bata":""} 加载成功 @${this.name} |项目地址:${this.link}`
    }
}

//代导入
export const MC=await import("@minecraft/server");
export const Std = await import("./Public/stdlib");


//原生类类型
export type MC_World=mc.World
export type MC_Player=mc.Player
export type MC_Entity=mc.Entity
export type MC_ItemStack=mc.ItemStack

//super类
export const World = sw.SuperWorld
export const Player = sp.SuperPlayer
export const Entity = se.SuperEntity
export const ItemStack = si.SuperItemStack
//super类类型
export type SuperWorld = sw.SuperWorld
export type SuperPlayer = sp.SuperPlayer
export type SuperEntity = se.SuperEntity
export type SuperItemStack = si.SuperItemStack

//组件类
export const PlayerComponent=spc.PlayerSuperComponent
export const EntityComponent=sec.EntitySuperComponent
export const ItemComponent=sic.ItemSuperComponent
export const SuperComponent=sc.SuperComponent

//组件类类型
export type PlayerComponent=spc.PlayerSuperComponent
export type EntityComponent=sec.EntitySuperComponent
export type ItemComponent=sic.ItemSuperComponent
export type SuperComponent=sc.SuperComponent
export type SuperComponentCreateOptions=sc.SuperComponentCreateOptions

export const SuperSystem=run.SuperSystem;

//类管理
export const ClassManager=run.ClassManager;
export const CommandManager=cm.CommandManager
export const CustomComponentManager=ccm.CustomComponentManager
export const Debug=db.Debug

//定时器类
export const Timer=tm.Timer;
export type Timer=tm.Timer;

Debug.debug=version_information.beta
//枚举
export const NativeClassType=run.NativeClassType;
export const System = run.runtime;
export const CustomComponentType=ccm.ComponentType

export const registerAsSubscribable=msuper.registerAsSubscribable

console.log(version_information.toString());
