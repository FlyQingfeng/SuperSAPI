import { Attribute } from "../Public/attribute";
import { CustomComponentManager } from "../Component/CustomComponentManager";

export class SuperComponent {
    owner:any;
    enable_tick:boolean=false;
    constructor(typeId:string,owner: any) {
        this.typeId=typeId;
        this.owner=owner;
        this.init();
    };
    
    init(){//组件初始化

    }
    onStart(){

    }
    tick(t: number){

    }
    getOwnerAttributeMap(): Attribute {
        return this.owner.getAttributeMap();
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
        return true
    };
}