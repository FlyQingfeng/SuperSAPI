
export class Debug {
    static debug:boolean=true;
    constructor() {
    }
    
    static log(...args:any[]){
        if (this.debug) {
            console.log("[SSAPI_DUBG] ",...args);
        }
    }
    static debug_run(fun:()=>void){
        if (this.debug) {
            fun()
        }
    }
}