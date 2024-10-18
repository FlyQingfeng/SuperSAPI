export class Debug {
    constructor() {
    }
    static log(...args) {
        if (this.debug) {
            console.log("[SSAPI_DUBG] ", ...args);
        }
    }
    static debug_run(fun) {
        if (this.debug) {
            fun();
        }
    }
}
Debug.debug = true;
