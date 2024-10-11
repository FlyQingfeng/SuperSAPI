import { EventManager } from "../EventManager/EventManager";
//构建UUID
function generateUUID() {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return pattern.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
//装饰器,注册成可绑定函数
export function registerAsSubscribable(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    let fun = function (...args) {
        this.CanBindFunMap[propertyKey] = originalMethod; //添加到绑定函数
        this.eventManager.emit(propertyKey, ...args);
        // 在原始方法执行前后添加自定义行为
        const result = originalMethod.apply(this, args);
        return result;
    };
    let proxyFun = new Proxy(fun, {
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
    constructor() {
        this.uuid = "";
        this.eventManager = new EventManager();
        this.CanBindFunMap = {};
        this.uuid = generateUUID();
    }
    deconstructor(op) {
    }
    // 绑定函数监听
    Bind(func, callback) {
        if (!func) {
            return;
        }
        this.eventManager.on(func.name, callback); //注册绑定
    }
    UnBind(func, callback) {
        if (!func) {
            return;
        }
        this.eventManager.off(func.name, callback); //注册绑定
    }
    getAllFun() {
        let prototype = Object.getPrototypeOf(this);
        let funnames = [];
        while (prototype) {
            let funs = Reflect.ownKeys(prototype).filter(name => {
                return name != "constructor";
            });
            for (const name of funs) {
                if (typeof name == "string") {
                    funnames.push(name);
                }
            }
            prototype = Object.getPrototypeOf(prototype);
        }
        return funnames;
    }
}
