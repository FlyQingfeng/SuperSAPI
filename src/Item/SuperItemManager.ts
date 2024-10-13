import * as mc from "@minecraft/server";
import { SuperItemStack } from "./SuperItemStack";


export class ItemStackManager {
    static Items:{[uuid:string]:SuperItemStack}={}
    static CreateItem(item:mc.ItemStack):SuperItemStack{
        let uuid=item.getDynamicProperty("uuid") as string
        if (uuid) {
            if(ItemStackManager.Items.hasOwnProperty(uuid)){
                return ItemStackManager.Items[uuid]
            }
        }
        let new_item=new SuperItemStack(item);
        item.setDynamicProperty("uuid",new_item.uuid);
        ItemStackManager.Items[new_item.uuid]=new_item;
        return new_item
    }
    static CreateItemFromTypeID(itemType: mc.ItemType | string, amount?: number):SuperItemStack{
        let item = new mc.ItemStack(itemType,amount);
        return ItemStackManager.CreateItem(item);
    }
    static getItems(){
        return ItemStackManager.Items
    }
    
}