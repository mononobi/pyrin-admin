export function getOrderingInfo(name) {
    let direction = 'asc';
    let field = name;
    if (name.startsWith('-')) {
        direction = 'desc';
        field = name.substring(1);
    }
    else if (name.startsWith('+')) {
        direction = 'asc';
        field = name.substring(1);
    }
    return [field, direction];
}

export function getOrdering(field, orderDirection) {
    let sign = '';
    if (orderDirection === 'desc') {
        sign = '-';
    }
    field = `${sign}${field}`;
    return field;
}
