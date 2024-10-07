import { Component } from "@minecraft/server";
import { Attribute } from "../Public/attribute";

export class SuperComponent {
    source_instance: Component;
    atribute: Attribute;
    constructor(source_instance: Component) {
        this.source_instance = source_instance;
        this.typeId = source_instance.typeId;

    };
    getAttributeMap(): Attribute {
        return this.atribute;
    }
    /**
     * @remarks
     * Identifier of the component.
     *
     */
    readonly typeId: string;
    /**
     * @remarks
     * Returns whether the component is valid. A component is
     * considered valid if its owner is valid, in addition to any
     * addition to any additional validation required by the
     * component.
     *
     * @returns
     * Whether the component is valid.
     */
    isValid(): boolean {
        return this.source_instance.isValid();
    };
}