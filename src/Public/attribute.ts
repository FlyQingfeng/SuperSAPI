import { hasFun } from "../Public/stdlib";

//属性类
export class Attribute {
    private properties: { [key: string]: any } = {};
    _obj:any;
    constructor(obj:any){
        // 保证有这两个函数
        if (hasFun(obj,"getDynamicProperty")
        &&hasFun(obj,"setDynamicProperty")) {
            this._obj=obj;
            let data=obj.getDynamicProperty("Attribute");
            if (data) {
                this.properties=JSON.parse(data);
            }else{
                this.save()
            }
        }else{//抛出异常
            throw new Error("SuperAPI[Attribute:constructor]:The constructor you want to pass using the <Attribute> class must have <getDynamicProperty><setDynamicProperty>two functions,");
        }
    }
    private save(){
        let data=JSON.stringify(this.properties);
        if (this._obj) {
            this._obj.setDynamicProperty("Attribute",data);
        }
    }
    init(key: string, value: any){
        let data=this._obj.getDynamicProperty("Attribute");
        let json=JSON.parse(data);
        if (!json[key]) {//只有在该值不存在的时候才能初始化，避免覆盖值
            this.set(key,value);
        }
    }
    // 添加或更新属性
    set(key: string, value: any): void {
        this.properties[key] = value;
        this.save();
    }

    // 获取属性值
    get(key: string): any {
        return this.properties[key];
    }

    // 删除属性
    delete(key: string): void {
        delete this.properties[key];
        this.save();
    }

    // 检查属性是否存在
    has(key: string): boolean {
        return key in this.properties;
    }

    // 获取所有属性键
    keys(): string[] {
        return Object.keys(this.properties);
    }

    // 获取所有属性值
    values(): any[] {
        return Object.values(this.properties);
    }

    // 获取所有属性键值对
    entries(): [string, any][] {
        return Object.entries(this.properties);
    }

    // 清空所有属性
    clear(): void {
        Object.keys(this.properties).forEach(key => {
            delete this.properties[key];
        });
        this.save();
    }
}

// 使用示例
// const dynProps = new Attribute();
// dynProps.set('name', 'John Doe');
// dynProps.set('age', 30);

// console.log(dynProps.get('name')); // 输出：John Doe
// console.log(dynProps.has('age')); // 输出：true

// dynProps.delete('age');
// console.log(dynProps.has('age')); // 输出：false

// console.log(dynProps.keys()); // 输出：['name']
// console.log(dynProps.values()); // 输出：['John Doe']
// console.log(dynProps.entries()); // 输出：[['name', 'John Doe']]

// dynProps.clear();
// console.log(dynProps.keys()); // 输出：[]