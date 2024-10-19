import { StaticComponentType } from "../Component/SuperStaticComponent";
export class CustomStaticComponentManager {
    static registrationCustomComponent(bind_typeid, CustomClass, type) {
        let custom_static_com = new CustomClass(bind_typeid);
        custom_static_com.onStart();
        let customComponent = {};
        switch (type) {
            case StaticComponentType.Block: {
                customComponent = CustomStaticComponentManager.BlockCustomComponent;
                break;
            }
            case StaticComponentType.Entity: {
                customComponent = CustomStaticComponentManager.EntityCustomComponent;
                break;
            }
            case StaticComponentType.Item: {
                customComponent = CustomStaticComponentManager.ItemCustomComponent;
                break;
            }
            default:
                break;
        }
        customComponent[bind_typeid] = custom_static_com;
    }
    static HasBlockCustomComponent(bind_typeid) {
        return CustomStaticComponentManager.BlockCustomComponent.hasOwnProperty(bind_typeid);
    }
    static HasItemCustomComponent(bind_typeid) {
        return CustomStaticComponentManager.ItemCustomComponent.hasOwnProperty(bind_typeid);
    }
    static HasEntityCustomComponent(bind_typeid) {
        return CustomStaticComponentManager.EntityCustomComponent.hasOwnProperty(bind_typeid);
    }
    static GetBlockCustomComponent(bind_typeid) {
        return CustomStaticComponentManager.BlockCustomComponent[bind_typeid];
    }
    static GetItemCustomComponent(bind_typeid) {
        return CustomStaticComponentManager.ItemCustomComponent[bind_typeid];
    }
    static GetEntityCustomComponent(bind_typeid) {
        return CustomStaticComponentManager.EntityCustomComponent[bind_typeid];
    }
}
CustomStaticComponentManager.BlockCustomComponent = {};
CustomStaticComponentManager.ItemCustomComponent = {};
CustomStaticComponentManager.EntityCustomComponent = {};
