import { Entity } from "@minecraft/server";
import { SuperEntity } from "../Entity/SuperEntity";

//属性类
export class Attribute {
    // entity:Entity
    private properties: { [key: string]: any } = {};
    // constructor(entity:Entity){
    //     this.entity=entity
    // }
    constructor(){
    }
    // 添加或更新属性
    set(key: string, value: any): void {
        // let tags=this.entity.getTags().filter((tag)=>{
        //     return tag.startsWith("attribute:")
        // })
        // let data=`${key}#${JSON.stringify(value)}`
        // const found=tags.find((tag)=>{
        //     let atag=tag.replace("attribute:",'')
        //     let name=atag.split("#")[0]
        //     return name==key
        // })
        // let newtag=`attribute:${data}`
        // if (found!=undefined) {
        //     // console.log(found);
        //     this.entity.removeTag(found);
        //     this.entity.addTag(newtag)
        // }else{
        //     this.entity.addTag(newtag)
        // }
        this.properties[key] = value;
    }

    // 获取属性值
    get(key: string): any {
        // let tags=this.entity.getTags().filter((tag)=>{
        //     return tag.startsWith("attribute:")
        // })
        // const found=tags.find((tag)=>{
        //     let atag=tag.replace("attribute:",'')
        //     let name=atag.split("#")[0]
        //     return name==key
        // })
        // if (found==undefined) {
        //     return undefined
        // }
        // let atag=found.replace("attribute:",'')
        // let value=JSON.parse(atag.split("#")[1])
        // return value;
        return this.properties[key];
    }

    // 删除属性
    delete(key: string): void {
        delete this.properties[key];
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