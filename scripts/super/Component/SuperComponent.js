export class SuperComponent {
    constructor(typeId, owner) {
        this.enable_tick = false;
        this.typeId = typeId;
        this.owner = owner;
    }
    ;
    onStart() {
    }
    tick(t) {
    }
    getOwnerAttributeMap() {
        return this.owner.getAttributeMap();
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
        return true;
    }
    ;
}
