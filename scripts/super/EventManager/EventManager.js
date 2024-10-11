export class EventManager {
    constructor() {
        this.listeners = {};
    }
    // 注册事件监听器
    on(eventName, callback) {
        if (this.listeners.hasOwnProperty(eventName)) {
            this.listeners[eventName].push(callback);
            return;
        }
        this.listeners[eventName] = [callback];
    }
    // 触发事件
    emit(eventName, ...args) {
        if (this.listeners.hasOwnProperty(eventName)) {
            const callbacks = this.listeners[eventName];
            if (callbacks) {
                callbacks.forEach(callback => callback(...args));
            }
        }
    }
    // 注销事件监听器
    off(eventName, callback) {
        if (this.listeners.hasOwnProperty(eventName)) {
            this.listeners[eventName] = this.listeners[eventName].filter(cb => cb !== callback);
        }
    }
    getlisteners() {
        return this.listeners;
    }
}
