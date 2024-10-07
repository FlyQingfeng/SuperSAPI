import { Component, ItemComponent } from "@minecraft/server";
import { SuperComponent } from "./SuperComponent";

export class ItemSuperComponent extends SuperComponent {
    source_instance: ItemComponent;
    constructor(source_instance: ItemComponent) {
        super(source_instance)
        this.source_instance = source_instance;
    };
}