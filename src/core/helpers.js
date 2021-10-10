import { JSTypeEnum } from '../validators/enumerations';


export function isJSONSerializable(value) {
    if (!value) {
        return false;
    }
    return typeof value === JSTypeEnum.OBJECT;
}
