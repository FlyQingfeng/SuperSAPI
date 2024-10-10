class EventManager {
    // 注册事件监听器
    on(obj_uuid, eventName, callback) {
        if (EventManager.listeners.hasOwnProperty(obj_uuid)) {
            if (EventManager.listeners[obj_uuid].hasOwnProperty(eventName)) {
                EventManager.listeners[obj_uuid][eventName].push(callback);
                return;
            }
        }
        let list = {};
        list[eventName] = [callback];
        EventManager.listeners[obj_uuid] = list;
    }
    // 触发事件
    emit(obj_uuid, eventName, ...args) {
        if (EventManager.listeners.hasOwnProperty(obj_uuid)) {
            if (EventManager.listeners[obj_uuid].hasOwnProperty(eventName)) {
                const callbacks = EventManager.listeners[obj_uuid][eventName];
                if (callbacks) {
                    callbacks.forEach(callback => callback(...args));
                }
            }
        }
    }
    // 注销事件监听器
    off(obj_uuid, eventName, callback) {
        if (EventManager.listeners.hasOwnProperty(obj_uuid)) {
            if (EventManager.listeners[obj_uuid].hasOwnProperty(eventName)) {
                EventManager.listeners[obj_uuid][eventName] = EventManager.listeners[obj_uuid][eventName].filter(cb => cb !== callback);
            }
        }
    }
}
EventManager.listeners = {};
export const eventManager = new EventManager();
