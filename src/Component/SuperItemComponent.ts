import { Component, ItemComponent, ItemStack } from "@minecraft/server";
import { SuperComponent, SuperComponentCreateOptions } from "./SuperComponent";
import { SuperItemStack } from "../Item/SuperItemStack";

export class ItemSuperComponent extends SuperComponent {
    constructor(typeId:string,owner: SuperItemStack,options?:SuperComponentCreateOptions) {
        super(typeId,owner,options)
    };
    getOwner():SuperItemStack {
        return this.owner as SuperItemStack
    }
}