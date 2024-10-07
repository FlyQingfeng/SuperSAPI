import { Super } from "Public/Super";
import { SuperComponent } from "../Component/SuperComponent";

export class CustomComponentManager{
    private static  customComponent:{[identifier:string]:SuperComponent}
    constructor() {
    }
    static registrationCustomComponent(identifier:string,CustomClass:SuperComponent){
        CustomComponentManager.customComponent[identifier]=CustomClass
    }
    static getCustomComponentInstance(identifier:string):SuperComponent{
        return CustomComponentManager.customComponent[identifier]
    }
}