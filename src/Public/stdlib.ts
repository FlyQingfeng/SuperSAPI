export function cast<T>(obj:any):T {
    return obj
}
export function hasFun(obj:any,funName:string) {
    return (funName in obj)
}