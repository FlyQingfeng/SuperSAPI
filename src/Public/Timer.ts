import { system } from "@minecraft/server";

export class Timer {
    private timeoutId?: number;
    private intervalId?: number;
    constructor() { }

    // 设置一个单次定时器
    public setTimeout(callback: () => void, delay: number): void {
        system.run(()=>{
            if (this.timeoutId) {
                system.clearRun(this.timeoutId);
            }
            this.timeoutId = system.runTimeout(callback, delay);
        })
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
    //持久定时器,在持续时间内持续触发
    public lasting(interval:number,loop_event:()=>void,duration:number,out_event:()=>void):void{
        if (interval>duration) {
            throw new Error("Interval cannot be greater than duration.");
        }
        this.setInterval(()=>{
            loop_event();
        },interval)
        this.setTimeout(()=>{
            out_event();
            this.clearAll();
        },duration);
    }
    // 清除所有定时器
    public clearAll(): void {
        this.clearTimeout();
        this.clearInterval();
    }
}
