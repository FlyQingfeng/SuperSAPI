import { system } from "@minecraft/server";
export class Timer {
    constructor() { }
    // 设置一个单次定时器
    setTimeout(callback, delay) {
        system.run(() => {
            if (this.timeoutId) {
                system.clearRun(this.timeoutId);
            }
            this.timeoutId = system.runTimeout(callback, delay);
        });
    }
    // 设置一个重复定时器
    setInterval(callback, interval) {
        if (this.intervalId) {
            system.clearRun(this.intervalId);
        }
        this.intervalId = system.runInterval(callback, interval);
    }
    // 取消单次定时器
    clearTimeout() {
        if (this.timeoutId) {
            system.clearRun(this.timeoutId);
            this.timeoutId = undefined;
        }
    }
    // 取消重复定时器
    clearInterval() {
        if (this.intervalId) {
            system.clearRun(this.intervalId);
            this.intervalId = undefined;
        }
    }
    //持久定时器,在持续时间内持续触发
    setLasting(interval, loop_event, duration, out_event) {
        if (interval > duration) {
            throw new Error("Interval cannot be greater than duration.");
        }
        this.setInterval(() => {
            loop_event();
        }, interval);
        this.setTimeout(() => {
            out_event();
            this.clearAll();
        }, duration);
    }
    // 清除所有定时器
    clearAll() {
        this.clearTimeout();
        this.clearInterval();
    }
}
