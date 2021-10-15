import { JSTypeEnum } from '../validators/enumerations';


export function isJSONSerializable(value) {
    if (!value) {
        return false;
    }
    return typeof value === JSTypeEnum.OBJECT;
}

export function deleteKey(key, object) {
    if (object[key] !== undefined) {
        delete object[key];
    }
}

export function popKey(key, object, defaultValue=undefined) {
    let value = object[key];
    deleteKey(key, object);
    if (value === undefined) {
        value = defaultValue;
    }
    return value;
}

export function isString(value) {
    if (!value) {
        return false;
    }

    return Object.prototype.toString.call(value) === '[object String]';
}
