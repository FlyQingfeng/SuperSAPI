import * as mc from "@minecraft/server";
import { Super } from "../Super/Super";
import { enumKeyToString, fromJSON, toJSON } from "../Public/Stdlib";
import { ComponentType, CustomComponentManager } from "../Component/CustomComponentManager";
import { Timer } from "../Public/Timer";
export class SuperItemStack extends Super {
    constructor(source_instance) {
        super();
        this.source_instance = source_instance;
        this.custom_component = {};
        this.readCustomComponent();
        this.in_hand_timer = new Timer();
    }
    get amount() {
        return this.source_instance.amount;
    }
    get isStackable() {
        return this.source_instance.isStackable;
    }
    get keepOnDeath() {
        return this.source_instance.keepOnDeath;
    }
    get lockMode() {
        return this.source_instance.lockMode;
    }
    get maxAmount() {
        return this.source_instance.maxAmount;
    }
    get nameTag() {
        return this.source_instance.nameTag;
    }
    get type() {
        return this.source_instance.type;
    }
    get typeId() {
        return this.source_instance.typeId;
    }
    setItem(item) {
        this.source_instance = item;
    }
    onSwitchIn(player) {
        this.getCustomComponents().forEach((c) => {
            c.onSwitchIn(player);
        });
        this.in_hand_timer.setInterval(() => {
            this.onHand(player);
        }, 1);
    }
    onSwitchOut(player) {
        this.getCustomComponents().forEach((c) => {
            c.onSwitchOut(player);
        });
        this.in_hand_timer.clearInterval();
    }
    onHand(player) {
        this.getCustomComponents().forEach((c) => {
            c.onHand(player);
        });
    }
    onAttack(player, target) {
        this.getCustomComponents().forEach((c) => {
            c.onAttack(player, target);
        });
    }
    onUse(player) {
        this.getCustomComponents().forEach((c) => {
            c.onUse(player);
        });
    }
    onUseOn(player, block, blockFace, faceLocation, isFirstEvent) {
        this.getCustomComponents().forEach((c) => {
            c.onUseOn(player, block, blockFace, faceLocation, isFirstEvent);
        });
    }
    onStartUse(player, useDuration) {
        this.getCustomComponents().forEach((c) => {
            c.onStartUse(player, useDuration);
        });
    }
    onStopUse(player, block) {
        this.getCustomComponents().forEach((c) => {
            c.onStopUse(player, block);
        });
    }
    onItemRelease(player, useDuration) {
        this.getCustomComponents().forEach((c) => {
            c.onItemRelease(player, useDuration);
        });
    }
    onItemComplete(player) {
        this.getCustomComponents().forEach((c) => {
            c.onItemComplete(player);
        });
    }
    getItem() {
        if (!this.source_instance) {
            return undefined;
        }
        return this.source_instance;
    }
    readCustomComponent() {
        if (this.isStackable) {
            return;
        }
        let data = this.getDynamicProperty("CustomComponent");
        if (data) {
            let json = fromJSON(data);
            for (let [id, cm_data] of Object.entries(json)) { //读取每个组件
                let type = CustomComponentManager.GetType(id);
                if (type == ComponentType.ItemComponentType) {
                    let com = CustomComponentManager.CreateComponentInstance(id, this);
                    for (let [key, value] of Object.entries(cm_data)) {
                        if (typeof value != "function" && typeof value != "object") { //不复制函数，不拷贝对象
                            com[key] = value;
                        }
                    }
                    if (!this.custom_component.hasOwnProperty(id)) {
                        com.onStart();
                        this.custom_component[id] = com;
                    }
                }
            }
        }
    }
    saveCustomComponent() {
        if (this.isStackable) {
            return;
        }
        let data = toJSON(this.custom_component);
        this.setDynamicProperty("CustomComponent", data);
    }
    addCustomComponent(identifier, options) {
        if (this.isStackable) {
            throw new Error("You cannot add custom components to stackable items");
        }
        let type = CustomComponentManager.GetType(identifier);
        if (type != ComponentType.ItemComponentType) {
            throw new Error(`Attempting to add ${enumKeyToString(ComponentType, ComponentType.PlayerComponentType)} components to item components`);
        }
        let com = CustomComponentManager.CreateComponentInstance(identifier, this, options);
        if (this.custom_component.hasOwnProperty(identifier) || this.custom_component[identifier]) {
            return false;
        }
        com.onStart();
        this.custom_component[identifier] = com;
        this.saveCustomComponent();
        return true;
    }
    removeCustomComponent(identifier) {
        if (this.isStackable) {
            return;
        }
        let com = this.custom_component[identifier];
        if (com) {
            com.deconstructor();
        }
        delete this.custom_component[identifier];
        this.saveCustomComponent();
    }
    getCustomComponent(identifier) {
        if (this.isStackable) {
            return undefined;
        }
        if (this.custom_component.hasOwnProperty(identifier)) {
            return this.custom_component[identifier];
        }
        return undefined;
    }
    getCustomComponents() {
        if (this.isStackable) {
            return [];
        }
        let coms = [];
        for (const key in this.custom_component) {
            if (this.custom_component.hasOwnProperty(key)) {
                coms.push(this.custom_component[key]);
            }
        }
        return coms;
    }
    clearDynamicProperties() {
        if (!this.source_instance) {
            return;
        }
        return this.source_instance.clearDynamicProperties();
    }
    ;
    /**
     * @remarks
     * Creates an exact copy of the item stack, including any
     * custom data or properties.
     *
     * @returns
     * Returns a copy of this item stack.
     */
    clone() {
        return this.source_instance.clone();
    }
    ;
    /**
     * @remarks
     * Get the list of block types this item can break in Adventure
     * mode.
     *
     * This function can't be called in read-only mode.
     *
     */
    getCanDestroy() {
        return this.source_instance.getCanDestroy();
    }
    ;
    /**
     * @remarks
     * Get the list of block types this item can be placed on in
     * Adventure mode.
     *
     * This function can't be called in read-only mode.
     *
     */
    getCanPlaceOn() {
        return this.source_instance.getCanPlaceOn();
    }
    ;
    /**
     * @remarks
     * Gets a component (that represents additional capabilities)
     * for an item stack.
     *
     * @param componentId
     * The identifier of the component (e.g., 'minecraft:food'). If
     * no namespace prefix is specified, 'minecraft:' is assumed.
     * Available component IDs can be found as part of the {@link
     * ItemComponentTypes} enum.
     * @returns
     * Returns the component if it exists on the item stack,
     * otherwise undefined.
     * @example durability.ts
     * ```typescript
     * // Gives a player a half-damaged diamond sword
     * import { ItemStack, Player, ItemComponentTypes, EntityComponentTypes } from '@minecraft/server';
     * import { MinecraftItemTypes } from '@minecraft/vanilla-data';
     *
     * function giveHurtDiamondSword(player: Player) {
     *     const hurtDiamondSword = new ItemStack(MinecraftItemTypes.DiamondSword);
     *     const durabilityComponent = hurtDiamondSword.getComponent(ItemComponentTypes.Durability);
     *     if (durabilityComponent !== undefined) {
     *         durabilityComponent.damage = durabilityComponent.maxDurability / 2;
     *     }
     *
     *     const inventory = player.getComponent(EntityComponentTypes.Inventory);
     *     if (inventory === undefined || inventory.container === undefined) {
     *         return;
     *     }
     *
     *     inventory.container.addItem(hurtDiamondSword);
     * }
     * ```
     */
    getComponent(componentId) {
        return this.source_instance.getComponent(componentId);
    }
    ;
    /**
     * @remarks
     * Returns all components that are both present on this item
     * stack and supported by the API.
     *
     */
    getComponents() {
        return this.source_instance.getComponents();
    }
    ;
    /**
     * @remarks
     * Returns a property value.
     *
     * @param identifier
     * The property identifier.
     * @returns
     * Returns the value for the property, or undefined if the
     * property has not been set.
     */
    getDynamicProperty(identifier) {
        if (!this.source_instance) {
            return undefined;
        }
        return this.source_instance.getDynamicProperty(identifier);
    }
    ;
    /**
     * @remarks
     * Returns the available set of dynamic property identifiers
     * that have been used on this entity.
     *
     * @returns
     * A string array of the dynamic properties set on this entity.
     */
    getDynamicPropertyIds() {
        if (!this.source_instance) {
            return [];
        }
        return this.source_instance.getDynamicPropertyIds();
    }
    ;
    /**
     * @remarks
     * Returns the total size, in bytes, of all the dynamic
     * properties that are currently stored for this entity. This
     * includes the size of both the key and the value.  This can
     * be useful for diagnosing performance warning signs - if, for
     * example, an entity has many megabytes of associated dynamic
     * properties, it may be slow to load on various devices.
     *
     */
    getDynamicPropertyTotalByteCount() {
        if (!this.source_instance) {
            return 0;
        }
        return this.source_instance.getDynamicPropertyTotalByteCount();
    }
    ;
    /**
     * @remarks
     * Returns the lore value - a secondary display string - for an
     * ItemStack.
     *
     * @returns
     * An array of lore lines. If the item does not have lore,
     * returns an empty array.
     */
    getLore() {
        return this.source_instance.getLore();
    }
    ;
    /**
     * @remarks
     * Returns a set of tags associated with this item stack.
     *
     */
    getTags() {
        return this.source_instance.getTags();
    }
    ;
    /**
     * @remarks
     * Returns true if the specified component is present on this
     * item stack.
     *
     * @param componentId
     * The identifier of the component (e.g., 'minecraft:food') to
     * retrieve. If no namespace prefix is specified, 'minecraft:'
     * is assumed.
     */
    hasComponent(componentId) {
        return this.source_instance.hasComponent(componentId);
    }
    ;
    /**
     * @remarks
     * Checks whether this item stack has a particular tag
     * associated with it.
     *
     * @param tag
     * Tag to search for.
     * @returns
     * True if the Item Stack has the tag associated with it, else
     * false.
     */
    hasTag(tag) {
        return this.source_instance.hasTag(tag);
    }
    ;
    /**
     * @remarks
     * Returns whether this item stack can be stacked with the
     * given `itemStack`. This is determined by comparing the item
     * type and any custom data and properties associated with the
     * item stacks. The amount of each item stack is not taken into
     * consideration.
     *
     * @param itemStack
     * ItemStack to check stacking compatability with.
     * @returns
     * True if the Item Stack is stackable with the itemStack
     * passed in.
     */
    isStackableWith(itemStack) {
        return this.source_instance.isStackableWith(itemStack);
    }
    ;
    /**
     * @remarks
     * Version safe way of checking if an item matches.
     *
     * @param itemName
     * Identifier of the item.
     * @param states
     *  Applicable only for blocks. An optional set of states to
     * compare against. If states is not specified, matches checks
     * against the set of types more broadly.
     * @returns
     * Returns a boolean whether the specified item matches.
     */
    matches(itemName, states) {
        return this.source_instance.matches(itemName, states);
    }
    ;
    /**
     * @remarks
     * The list of block types this item can break in Adventure
     * mode. The block names are displayed in the item's tooltip.
     * Setting the value to undefined will clear the list.
     *
     * This function can't be called in read-only mode.
     *
     * @param blockIdentifiers
     * String list of block types that the item can destroy.
     * @throws
     * Throws if any of the provided block identifiers are invalid.
     * @example example.ts
     * ```typescript
     * const specialPickaxe = new ItemStack('minecraft:diamond_pickaxe');
     * specialPickaxe.setCanDestroy(['minecraft:cobblestone', 'minecraft:obsidian']);
     *
     * // Creates a diamond pickaxe that can destroy cobblestone and obsidian
     * import { ItemStack, Player } from '@minecraft/server';
     * import { MinecraftItemTypes } from '@minecraft/vanilla-data';
     *
     * function giveRestrictedPickaxe(player: Player) {
     *     const specialPickaxe = new ItemStack(MinecraftItemTypes.DiamondPickaxe);
     *     specialPickaxe.setCanPlaceOn([MinecraftItemTypes.Cobblestone, MinecraftItemTypes.Obsidian]);
     *
     *     const inventory = player.getComponent('inventory');
     *     if (inventory === undefined || inventory.container === undefined) {
     *         return;
     *     }
     *
     *     inventory.container.addItem(specialPickaxe);
     * }
     * ```
     */
    setCanDestroy(blockIdentifiers) {
        return this.source_instance.setCanDestroy(blockIdentifiers);
    }
    ;
    /**
     * @remarks
     * The list of block types this item can be placed on in
     * Adventure mode. This is only applicable to block items. The
     * block names are displayed in the item's tooltip. Setting the
     * value to undefined will clear the list.
     *
     * This function can't be called in read-only mode.
     *
     * @param blockIdentifiers
     * String list of block types that the item can be placed on.
     * @throws
     * Throws if any of the provided block identifiers are invalid.
     * @example example.ts
     * ```typescript
     * // Creates a gold block that can be placed on grass and dirt
     * import { ItemStack, Player, EntityComponentTypes } from '@minecraft/server';
     * import { MinecraftItemTypes } from '@minecraft/vanilla-data';
     *
     * function giveRestrictedGoldBlock(player: Player) {
     *     const specialGoldBlock = new ItemStack(MinecraftItemTypes.GoldBlock);
     *     specialGoldBlock.setCanPlaceOn([MinecraftItemTypes.Grass, MinecraftItemTypes.Dirt]);
     *
     *     const inventory = player.getComponent(EntityComponentTypes.Inventory);
     *     if (inventory === undefined || inventory.container === undefined) {
     *         return;
     *     }
     *
     *     inventory.container.addItem(specialGoldBlock);
     * }
     * ```
     */
    setCanPlaceOn(blockIdentifiers) {
        return this.source_instance.setCanPlaceOn(blockIdentifiers);
    }
    ;
    /**
     * @remarks
     * Sets a specified property to a value. Note: This function
     * only works with non-stackable items.
     *
     * @param identifier
     * The property identifier.
     * @param value
     * Data value of the property to set.
     * @throws
     * Throws if the item stack is stackable.
     */
    setDynamicProperty(identifier, value) {
        if (!this.source_instance) {
            return;
        }
        if (this.source_instance.isStackable) {
            return;
        }
        return this.source_instance.setDynamicProperty(identifier, value);
    }
    ;
    /**
     * @remarks
     * Sets the lore value - a secondary display string - for an
     * ItemStack. The lore list is cleared if set to an empty
     * string or undefined.
     *
     * This function can't be called in read-only mode.
     *
     * @param loreList
     * List of lore lines. Each element in the list represents a
     * new line. The maximum lore line count is 20. The maximum
     * lore line length is 50 characters.
     * @throws This function can throw errors.
     * @example diamondAwesomeSword.ts
     * ```typescript
     * import { EntityComponentTypes, ItemStack, Player } from '@minecraft/server';
     * import { MinecraftItemTypes } from '@minecraft/vanilla-data';
     *
     * function giveAwesomeSword(player: Player) {
     *     const diamondAwesomeSword = new ItemStack(MinecraftItemTypes.DiamondSword, 1);
     *     diamondAwesomeSword.setLore([
     *         '§c§lDiamond Sword of Awesome§r',
     *          '+10 coolness', '§p+4 shiny§r'
     *     ]);
     *
     *     // hover over/select the item in your inventory to see the lore.
     *     const inventory = player.getComponent(EntityComponentTypes.Inventory);
     *     if (inventory === undefined || inventory.container === undefined) {
     *         return;
     *     }
     *
     *     inventory.container.setItem(0, diamondAwesomeSword);
     * }
     * ```
     */
    setLore(loreList) {
        return this.source_instance.setLore(loreList);
    }
    ;
    /**
     * @beta
     * @remarks
     * Helper function for creating potion items.
     *
     * This function can't be called in read-only mode.
     *
     * @throws This function can throw errors.
     */
    static createPotion(options) {
        return mc.ItemStack.createPotion(options);
    }
    ;
}
