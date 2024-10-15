import * as mc from "@minecraft/server";
import { SuperItemStack } from "./SuperItemStack";
export class ItemStackManager {
    static CreateItem(item) {
        if (!item) {
            return undefined;
        }
        let found = item.getDynamicPropertyIds().find(id => {
            return id == "uuid";
        });
        let new_item;
        if (found) {
            let uuid = item.getDynamicProperty("uuid");
            if (ItemStackManager.Items.hasOwnProperty(uuid)) {
                new_item = ItemStackManager.Items[uuid];
            }
            else { //防止重新加载Items里面已经没有这个物品了
                new_item = new SuperItemStack(item);
                ItemStackManager.Items[new_item.uuid] = new_item;
                if (!new_item.isStackable) {
                    new_item.setDynamicProperty("uuid", new_item.uuid);
                }
            }
        }
        else {
            new_item = new SuperItemStack(item);
            if (!new_item.isStackable) {
                new_item.setDynamicProperty("uuid", new_item.uuid);
            }
            ItemStackManager.Items[new_item.uuid] = new_item;
        }
        return new_item;
    }
    static CreateNewItemFromTypeID(itemType, amount) {
        let item = new mc.ItemStack(itemType, amount);
        return ItemStackManager.CreateItem(item);
    }
    static getItems() {
        return ItemStackManager.Items;
    }
}
ItemStackManager.Items = {};
