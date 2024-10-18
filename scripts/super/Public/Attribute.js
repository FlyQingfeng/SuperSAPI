import { hasFun } from "./Stdlib";
//属性类
export class Attribute {
    constructor(obj) {
        this.properties = {};
        // 保证有这两个函数
        if (hasFun(obj, "getDynamicProperty")
            && hasFun(obj, "setDynamicProperty")) {
            this._obj = obj;
            let data = obj.getDynamicProperty("Attribute");
            if (data) {
                this.properties = JSON.parse(data);
            }
            else {
                this.save();
            }
        }
        else { //抛出异常
            throw new Error("SuperAPI[Attribute:constructor]:The constructor you want to pass using the <Attribute> class must have <getDynamicProperty><setDynamicProperty>two functions,");
        }
    }
    save() {
        let data = JSON.stringify(this.properties);
        if (this._obj) {
            this._obj.setDynamicProperty("Attribute", data);
        }
    }
    init(key, value) {
        let data = this._obj.getDynamicProperty("Attribute");
        let json = JSON.parse(data);
        if (!json[key]) { //只有在该值不存在的时候才能初始化，避免覆盖值
            this.set(key, value);
        }
    }
    // 添加或更新属性
    set(key, value) {
        this.properties[key] = value;
        this.save();
    }
    // 获取属性值
    get(key) {
        return this.properties[key];
    }
    // 删除属性
    delete(key) {
        delete this.properties[key];
        this.save();
    }
    // 检查属性是否存在
    has(key) {
        return key in this.properties;
    }
    // 获取所有属性键
    keys() {
        return Object.keys(this.properties);
    }
    // 获取所有属性值
    values() {
        return Object.values(this.properties);
    }
    // 获取所有属性键值对
    entries() {
        return Object.entries(this.properties);
    }
    // 清空所有属性
    clear() {
        Object.keys(this.properties).forEach(key => {
            delete this.properties[key];
        });
        this.save();
    }
}
