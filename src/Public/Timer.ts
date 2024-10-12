import { system } from "@minecraft/server";

export class Timer {
    private timeoutId?: number;
    private intervalId?: number;
    constructor() { }

    // 设置一个单次定时器
    public setTimeout(callback: () => void, delay: number): void {
        if (this.timeoutId) {
            system.clearRun(this.timeoutId);
        }
        this.timeoutId = system.runTimeout(callback, delay);
    }

    // 设置一个重复定时器
    public setInterval(callback: () => void, interval: number): void {
        if (this.intervalId) {
            system.clearRun(this.intervalId);
        }
        this.intervalId = system.runInterval(callback, interval);
    }

    // 取消单次定时器
    public clearTimeout(): void {
        if (this.timeoutId) {
            system.clearRun(this.timeoutId);
            this.timeoutId = undefined;
        }
    }

    // 取消重复定时器
    public clearInterval(): void {
        if (this.intervalId) {
            system.clearRun(this.intervalId);
            this.intervalId = undefined;
        }
    }

    // 清除所有定时器
    public clearAll(): void {
        this.clearTimeout();
        this.clearInterval();
    }
}
