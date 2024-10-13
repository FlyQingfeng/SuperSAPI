import { Attribute } from "../Public/attribute";
import { Super } from "../Super/Super";
import { vec3 } from "../Public/vec3";

export type SuperComponentCreateOptions={
    Target?:Super,
    Location?:vec3,
    Other?:any
}

export class SuperComponent extends Super{
    owner:any;
    enable_tick:boolean=false;
    create_options:SuperComponentCreateOptions;
    constructor(typeId:string,owner: any,options?:SuperComponentCreateOptions) {
        super()
        this.typeId=typeId;
        this.owner=owner;
        this.create_options=options;
    };
    deconstructor(op?: string): void {
        
    }
    getOwner():any{
        return this.owner
    }
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