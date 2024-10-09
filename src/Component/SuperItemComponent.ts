import { Component, ItemComponent, ItemStack } from "@minecraft/server";
import { SuperComponent } from "./SuperComponent";
import { SuperItemStack } from "../Item/SuperItemStack";

export class ItemSuperComponent extends SuperComponent {
    constructor(typeId:string,owner: SuperItemStack) {
        super(typeId,owner)
        this.item=this.owner
    };
    readonly item: ItemStack;
}