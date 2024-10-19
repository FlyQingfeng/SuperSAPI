
import { SuperPlayer } from "../Player/SuperPlayer";
import * as mc from "@minecraft/server";
import { SuperStaticComponent,StaticComponentType } from "./SuperStaticComponent";
import { SuperItemStack } from "../Item/SuperItemStack";

export class SuperEntityStaticComponent extends SuperStaticComponent{
    static type:StaticComponentType=StaticComponentType.Entity;
    constructor(typeId:string) {
        super(typeId)
    };
    init(){//组件初始化

    }
    deconstructor(op?: string): void {
    }
    isValid(): boolean {
        return true
    }
}