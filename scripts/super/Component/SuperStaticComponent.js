import { Super } from "../Super/Super";
export var StaticComponentType;
(function (StaticComponentType) {
    StaticComponentType[StaticComponentType["Item"] = 0] = "Item";
    StaticComponentType[StaticComponentType["Entity"] = 1] = "Entity";
    StaticComponentType[StaticComponentType["Block"] = 2] = "Block";
})(StaticComponentType || (StaticComponentType = {}));
export class SuperStaticComponent extends Super {
    constructor(bind_typeid, ...args) {
        super();
        this.enable_tick = false;
        this.bind_typeid = bind_typeid;
        this.init();
    }
    ;
    init() {
    }
    isValid() {
        return false;
    }
    tick() {
    }
    onStart() {
    }
}
SuperStaticComponent.type = StaticComponentType.Block;
