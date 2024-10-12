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
    // 清除所有定时器
    clearAll() {
        this.clearTimeout();
        this.clearInterval();
    }
}
