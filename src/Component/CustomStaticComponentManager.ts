
import { SuperBlockStaticComponent } from "SuperSAPI";
import { SuperStaticComponent, StaticComponentType } from "../Component/SuperStaticComponent";
import { SuperItemStaticComponent } from "./SuperItemStaticComponent";
import { SuperEntityStaticComponent } from "./SuperEntityStaticComponent";


type SuperStaticComponentClass = typeof SuperStaticComponent



export class CustomStaticComponentManager {
    private static BlockCustomComponent: { [bind_typeid: string]: SuperStaticComponent } = {};
    private static ItemCustomComponent: { [bind_typeid: string]: SuperStaticComponent } = {};
    private static EntityCustomComponent: { [bind_typeid: string]: SuperStaticComponent } = {};


    static registrationCustomComponent<C extends SuperStaticComponent>(bind_typeid: string, CustomClass: SuperStaticComponentClass, type: StaticComponentType): void {
        let custom_static_com=new CustomClass(bind_typeid);
        let customComponent:{ [bind_typeid: string]: SuperStaticComponent }={};
        switch (type) {
            case StaticComponentType.Block:{
                customComponent=CustomStaticComponentManager.BlockCustomComponent;
                break;
            }
            case StaticComponentType.Entity:{
                customComponent=CustomStaticComponentManager.EntityCustomComponent;
                break;
            }
            case StaticComponentType.Item:{
                customComponent=CustomStaticComponentManager.ItemCustomComponent;
                break;
            }
            default:
                break;
        }
        customComponent[bind_typeid] = custom_static_com as C;
    }
    static HasBlockCustomComponent(bind_typeid: string): boolean {
        return CustomStaticComponentManager.BlockCustomComponent.hasOwnProperty(bind_typeid);
    }
    static HasItemCustomComponent(bind_typeid: string): boolean {
        return CustomStaticComponentManager.ItemCustomComponent.hasOwnProperty(bind_typeid);
    }
    static HasEntityCustomComponent(bind_typeid: string): boolean {
        return CustomStaticComponentManager.EntityCustomComponent.hasOwnProperty(bind_typeid);
    }

    static GetBlockCustomComponent<C extends SuperBlockStaticComponent>(bind_typeid: string): C | undefined {
        return CustomStaticComponentManager.BlockCustomComponent[bind_typeid] as C;
    }
    static GetItemCustomComponent<C extends SuperItemStaticComponent>(bind_typeid: string): C | undefined {
        return CustomStaticComponentManager.ItemCustomComponent[bind_typeid] as C;
    }
    static GetEntityCustomComponent<C extends SuperEntityStaticComponent>(bind_typeid: string): C | undefined {
        return CustomStaticComponentManager.EntityCustomComponent[bind_typeid] as C;
    }
}