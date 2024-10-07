export class CustomComponentManager {
    constructor() {
    }
    static registrationCustomComponent(identifier, CustomClass) {
        CustomComponentManager.customComponent[identifier] = CustomClass;
    }
    static getCustomComponentInstance(identifier) {
        return CustomComponentManager.customComponent[identifier];
    }
}
