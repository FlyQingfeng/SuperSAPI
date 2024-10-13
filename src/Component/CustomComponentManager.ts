import { SuperComponent, SuperComponentCreateOptions } from "../Component/SuperComponent";
import { SuperEntity } from "../Entity/SuperEntity";
import { SuperPlayer } from "../Player/SuperPlayer";
import { SuperItemStack } from "../Item/SuperItemStack";

export type SuperComponentClass = typeof SuperComponent;

export enum ComponentType {
    EntityComponentType,
    PlayerComponentType,
    ItemComponentType
}

export class CustomComponentManager {
    private static customComponent: { [identifier: string]: { type: ComponentType, class: SuperComponentClass } } = {};

    static registrationCustomComponent<C extends SuperComponent>(identifier: string, CustomClass: SuperComponentClass, type: ComponentType): void {
        CustomComponentManager.customComponent[identifier] = {
            type: type,
            class: CustomClass
        };
    }

    static CreateComponentInstance<C extends SuperComponent,O extends SuperEntity|SuperPlayer|SuperItemStack>(identifier: string, owner: O,options?:SuperComponentCreateOptions): C {
        const componentMap = CustomComponentManager.Get(identifier);
        if (componentMap) {
            return new componentMap.class(identifier, owner, options) as C;
        }
        throw new Error(`Component with identifier '${identifier}' not found.`);
    }

    static Has(identifier: string): boolean {
        return CustomComponentManager.customComponent.hasOwnProperty(identifier);
    }

    static Get(identifier: string): { type: ComponentType, class: SuperComponentClass } | undefined {
        return CustomComponentManager.customComponent[identifier];
    }

    static GetClass(identifier: string): SuperComponentClass | undefined {
        const componentMap = CustomComponentManager.Get(identifier);
        return componentMap?.class;
    }

    static GetType(identifier: string): ComponentType | undefined {
        const componentMap = CustomComponentManager.Get(identifier);
        return componentMap?.type;
    }
}