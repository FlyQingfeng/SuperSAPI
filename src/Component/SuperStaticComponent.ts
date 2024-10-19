import { Super } from "../Super/Super"

export enum StaticComponentType{
    Item,
    Entity,
    Block,
}

export class SuperStaticComponent extends Super{
    static type:StaticComponentType=StaticComponentType.Block;
    bind_typeid:string;
    enable_tick:boolean=false;
    constructor(bind_typeid:string,...args:any[]) {
        super()
        this.bind_typeid=bind_typeid;
        this.init();
    };
    init(){//组件初始化

    }
    isValid():boolean{
        return false
    }
    tick(){
        
    }
    onStart(){

    }
}