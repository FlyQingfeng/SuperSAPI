import * as mc from "@minecraft/server";
class Menu {
    ;
    ;
    constructor(id) {
        this.items = new Map();
        this.funs = new Map();
        this.id = id;
        for (let i = 0; i < 9; i++) {
            let item = new mc.ItemStack(id);
            item.nameTag = `${i}`;
            this.items[i] = item;
            this.funs[i] = () => {
            };
        }
    }
    show(player) {
        let player_inventory = player.getComponent(mc.EntityComponentTypes.Inventory);
        const mcontainer = player_inventory?.container;
        if (!mcontainer) {
            return;
        }
        for (let i = 0; i < 9; i++) {
            mcontainer.setItem(i, new mc.ItemStack("minecraft:air"));
            if (this.items[i]) {
                mcontainer.setItem(i, this.items[i]);
            }
        }
    }
    setText(index, str) {
        let item = this.items[index];
        item.nameTag = str;
        this.items[index] = item;
    }
    setItem(index, item) {
        if (index >= 0 && index <= 8) {
            this.items[index] = item;
        }
    }
    setMuen(index, callback) {
        if (index >= 0 && index <= 8) {
            this.funs[index] = callback;
        }
    }
}
class Menu_stack {
    constructor() {
        this.stack = [];
        this.top = -1;
    }
    push(menu) {
        this.top++;
        this.stack[this.top] = menu;
        return this.top;
    }
    pop() {
        if (this.top == -1) {
            return undefined;
        }
        const pop = this.stack.pop();
        this.top--;
        return pop;
    }
    gettop() {
        if (this.top == -1) {
            return undefined;
        }
        return this.stack[this.top];
    }
    isNull() {
        return this.top == -1;
    }
}
class MenuManager {
    constructor() {
        this.menu_stack = new Menu_stack();
    }
    ;
    static getPlayerMenuManager(player) {
        let mManager = MenuManager.playersManager[player.name];
        if (mManager == undefined) {
            mManager = new MenuManager();
            MenuManager.playersManager[player.name] = mManager;
        }
        return mManager;
    }
    static registeredMenu(id, menu) {
        MenuManager.MenuMap[id] = menu;
    }
    static registeredMenuBind(item_id, menu_id) {
        MenuManager.Item_ID_Menu[item_id] = menu_id;
    }
    getMenu() {
        return this.menu_stack.gettop();
    }
    getPlayerContainer(player) {
        let items = [];
        let player_inventory = player.getComponent(mc.EntityComponentTypes.Inventory);
        const mcontainer = player_inventory?.container;
        if (!mcontainer) {
            return undefined;
        }
        return mcontainer;
    }
    getItems(player) {
        let items = [];
        let player_container = this.getPlayerContainer(player);
        for (let i = 0; i < 9; i++) {
            items.push(player_container.getItem(i));
        }
        return items;
    }
    create(id, player) {
        if (this.menu_stack.isNull()) {
            this.orgitems = this.getItems(player);
        }
        const copy = MenuManager.MenuMap[id];
        this.menu_stack.push(copy);
        return copy;
    }
    closeNow(player) {
        let pop = this.menu_stack.pop();
        if (this.menu_stack.isNull()) {
            let player_container = this.getPlayerContainer(player);
            for (let i = 0; i < 9; i++) {
                player_container.setItem(i, this.orgitems[i]);
            }
        }
        else {
            this.menu_stack.gettop().show(player);
        }
    }
}
MenuManager.playersManager = new Map();
MenuManager.MenuMap = new Map();
MenuManager.Item_ID_Menu = new Map(); //未打开UI时使用物品ID对应的UI
export default MenuManager;
let MainUI = new Menu("minecraft:stick");
MainUI.setMuen(0, (player) => {
    let mManager = MenuManager.getPlayerMenuManager(player);
    mManager.create("子UI", player).show(player);
    player.sendMessage("打开子UI1");
});
MainUI.setMuen(8, (player) => {
    let mManager = MenuManager.getPlayerMenuManager(player);
    mManager.closeNow(player);
});
MenuManager.registeredMenu("主UI", MainUI);
MenuManager.registeredMenuBind("minecraft:stick", "主UI");
let UI = new Menu("minecraft:tnt");
UI.setMuen(0, (player) => {
    player.sendMessage("打开子UI1");
});
UI.setMuen(8, (player) => {
    let mManager = MenuManager.getPlayerMenuManager(player);
    mManager.closeNow(player);
});
MenuManager.registeredMenu("子UI", UI);
mc.world.afterEvents.itemUse.subscribe((event) => {
    let player = event.source;
    let item = event.itemStack;
    let mManager = MenuManager.getPlayerMenuManager(player);
    let curr_menu = mManager.getMenu();
    if (curr_menu) {
        curr_menu.funs[player.selectedSlotIndex](player);
    }
    else {
        let menu_id = MenuManager.Item_ID_Menu[item.typeId];
        if (menu_id) {
            mManager.create(menu_id, player).show(player);
        }
    }
});
