export class SuperComponent {
    constructor(source_instance) {
        this.source_instance = source_instance;
        this.typeId = source_instance.typeId;
    }
    ;
    getAttributeMap() {
        return this.atribute;
    }
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
    isValid() {
        return this.source_instance.isValid();
    }
    ;
}
