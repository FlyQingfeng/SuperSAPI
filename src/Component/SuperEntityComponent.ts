import { Component, EntityComponent, Entity } from "@minecraft/server";
import { SuperComponent } from "../Component/SuperComponent";

export class EntitySuperComponent extends SuperComponent {

    source_instance: EntityComponent;
    constructor(source_instance: EntityComponent) {
        super(source_instance)
        this.source_instance = source_instance;
        this.entity = source_instance.entity;

    };
    /**
     * @remarks
     * The entity that owns this component. The entity will be
     * undefined if it has been removed.
     *
     */
    readonly entity: Entity;
}