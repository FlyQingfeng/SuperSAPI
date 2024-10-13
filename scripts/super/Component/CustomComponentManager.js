export var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["EntityComponentType"] = 0] = "EntityComponentType";
    ComponentType[ComponentType["PlayerComponentType"] = 1] = "PlayerComponentType";
    ComponentType[ComponentType["ItemComponentType"] = 2] = "ItemComponentType";
})(ComponentType || (ComponentType = {}));
export class CustomComponentManager {
    static registrationCustomComponent(identifier, CustomClass, type) {
        CustomComponentManager.customComponent[identifier] = {
            type: type,
            class: CustomClass
        };
    }
    static CreateComponentInstance(identifier, owner, options) {
        const componentMap = CustomComponentManager.Get(identifier);
        if (componentMap) {
            return new componentMap.class(identifier, owner, options);
        }
        throw new Error(`Component with identifier '${identifier}' not found.`);
    }
    static Has(identifier) {
        return CustomComponentManager.customComponent.hasOwnProperty(identifier);
    }
    static Get(identifier) {
        return CustomComponentManager.customComponent[identifier];
    }
    static GetClass(identifier) {
        const componentMap = CustomComponentManager.Get(identifier);
        return componentMap?.class;
    }
    static GetType(identifier) {
        const componentMap = CustomComponentManager.Get(identifier);
        return componentMap?.type;
    }
}
CustomComponentManager.customComponent = {};
