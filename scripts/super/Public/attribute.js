//属性类
export class Attribute {
    // constructor(entity:Entity){
    //     this.entity=entity
    // }
    constructor() {
        // entity:Entity
        this.properties = {};
    }
    // 添加或更新属性
    set(key, value) {
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
    get(key) {
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
    delete(key) {
        delete this.properties[key];
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
