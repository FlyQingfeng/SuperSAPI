import { SuperStaticComponent, StaticComponentType } from "./SuperStaticComponent";
export class SuperEntityStaticComponent extends SuperStaticComponent {
    constructor(typeId) {
        super(typeId);
    }
    ;
    init() {
    }
    deconstructor(op) {
    }
    isValid() {
        return true;
    }
}
SuperEntityStaticComponent.type = StaticComponentType.Entity;
