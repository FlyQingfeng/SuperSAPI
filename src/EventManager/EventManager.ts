

//事件订阅类
type EventCallback = (...args: any[]) => void;
type listen = { [eventName: string]: EventCallback[] }
export class EventManager {
    private listeners: listen = {};
    // 注册事件监听器
    on(eventName: string, callback: EventCallback): void {
        if (this.listeners.hasOwnProperty(eventName)) {
            this.listeners[eventName].push(callback);
            return
        }
        this.listeners[eventName] = [callback]
    }
    // 触发事件
    emit(eventName: string, ...args: any[]): void {
        if (this.listeners.hasOwnProperty(eventName)) {
            const callbacks = this.listeners[eventName];
            if (callbacks) {
                callbacks.forEach(callback => callback(...args));
            }
        }
    }

    // 注销事件监听器
    off(eventName: string, callback: EventCallback): void {
        if (this.listeners.hasOwnProperty(eventName)) {
            this.listeners[eventName] = this.listeners[eventName].filter(cb => cb !== callback)
        }
    }
    getlisteners() {
        return this.listeners
    }
}