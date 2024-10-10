

import { eventManager } from "../EventManager/EventManager";

//构建UUID
function generateUUID(): string {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return pattern.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

//装饰器,注册成可绑定函数
function registerAsSubscribable(target: Super, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    let fun = function (...args: any[]) {
        eventManager.emit(this.uuid, propertyKey)
        // 在原始方法执行前后添加自定义行为
        const result = originalMethod.apply(this, args);
        return result;
    };
    let proxyFun = new Proxy(fun, {//构造函数名字，便于Bind函数进行绑定
        get(target, key, receiver) {
          if (key === 'name') {
            return propertyKey;
          }
          return Reflect.get(target, propertyKey, receiver);
        }
      });
    descriptor.value = proxyFun;
    return descriptor;
}

//保证每个Super类只要一个唯一的UUID
export class Super {
    readonly uuid: string = ""
    constructor() {
        this.uuid = generateUUID()
    }
    // 绑定函数监听
    Bind(func: (...args: any[]) => void, callback: (...args: any[]) => void): void {
        eventManager.on(this.uuid, func.name, callback);//注册绑定
    }
    UnBind(func: (...args: any[]) => void, callback: (...args: any[]) => void): void {
        eventManager.off(this.uuid, func.name, callback);//注册绑定
    }
    getAllFun(): string[] {
        let prototype = Object.getPrototypeOf(this);
        let funnames: string[] = []
        while (prototype) {
            let funs = Reflect.ownKeys(prototype).filter(name => {
                return name != "constructor"
            })
            for (const name of funs) {
                if (typeof name == "string") {
                    funnames.push(name)
                }
            }
            prototype = Object.getPrototypeOf(prototype);
        }
        return funnames
    }
    //注册函数可绑定例子
    @registerAsSubscribable
    test() {
        console.log("test");
    }
}
