export function cast<T>(obj:any):T {//转换类型仅ts可用于强制类型转化，例如SuperEntity转SuperPlayer
    return (obj as T);
}
export function hasFun(obj:any,funName:string) {
    return (funName in obj)
}