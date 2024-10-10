var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { eventManager } from "../EventManager/EventManager";
//构建UUID
function generateUUID() {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return pattern.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
function createNamedFunction(name, body) {
    return new Function(`return function ${name}() { ${body} }`)();
}
//装饰器,注册成可绑定函数
function registerAsSubscribable(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    let fun = function (...args) {
        eventManager.emit(this.uuid, propertyKey);
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
        this.uuid = generateUUID();
    }
    // 绑定函数监听
    Bind(func, callback) {
        eventManager.on(this.uuid, func.name, callback); //注册绑定
    }
    UnBind(func, callback) {
        eventManager.off(this.uuid, func.name, callback); //注册绑定
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
    //注册函数可绑定例子
    test() {
        console.log("test");
    }
}
__decorate([
    registerAsSubscribable
], Super.prototype, "test", null);
