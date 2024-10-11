export function cast(obj) {
    return obj;
}
export function hasFun(obj, funName) {
    return (funName in obj);
}
export function enumKeyToString(enumObj, enumValue) {
    const keys = Reflect.ownKeys(enumObj);
    for (const key of keys) {
        if (enumObj[key] === enumValue) {
            return key.toString();
        }
    }
    return '';
}
