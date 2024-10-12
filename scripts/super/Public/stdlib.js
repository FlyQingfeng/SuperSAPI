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
export function toJSON(value) {
    let cache = [];
    let index = 0;
    let str = JSON.stringify(value, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // 循环引用，返回特殊标记
                return `_CircularReference_${index++}`;
            }
            // 收集所有的值
            cache.push(value);
        }
        return value;
    });
    // 清空变量，便于垃圾回收机制回收
    cache = null;
    return str;
}
export function fromJSON(value) {
    // 解析 JSON 字符串，但保留循环引用的标记
    let parsed = JSON.parse(value);
    let refs = [];
    let refIndex = 0;
    // 用于恢复循环引用的 reviver 函数
    function revive(key, val) {
        if (typeof val === 'string' && val.startsWith('_CircularReference_')) {
            let refIndex = parseInt(val.split('_CircularReference_')[1], 10);
            return refs[refIndex];
        }
        return val;
    }
    // 使用 reviver 函数解析数据，以恢复循环引用
    return JSON.parse(JSON.stringify(parsed, function (key, val) {
        if (typeof val === 'object' && val !== null) {
            refs.push(val);
            return refs[refIndex++];
        }
        return val;
    }), revive);
}
