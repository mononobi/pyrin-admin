import { OrderingEnum } from './enumerations';


export function getOrderingInfo(name) {
    let direction = OrderingEnum.ASCENDING;
    let field = name;
    if (name.startsWith('-')) {
        direction = OrderingEnum.DESCENDING;
        field = name.substring(1);
    }
    else if (name.startsWith('+')) {
        direction = OrderingEnum.ASCENDING;
        field = name.substring(1);
    }
    return [field, direction];
}

export function getOrdering(field, orderDirection) {
    let sign = '';
    if (orderDirection === OrderingEnum.DESCENDING) {
        sign = '-';
    }
    field = `${sign}${field}`;
    return field;
}
