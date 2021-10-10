export const TargetEnum = {
    NEW_TAB: '_blank',
    SAME_TAB: '_self'
};

export const AlertSeverityEnum = {
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    SUCCESS: 'success'
};

Object.freeze(AlertSeverityEnum);

export const AlertTypeEnum = {
    TOAST: 'toast',
    BANNER: 'banner'
};

Object.freeze(AlertTypeEnum);

export const ListFieldTypeEnum = {
    BOOLEAN: 'boolean',
    NUMERIC: 'numeric',
    DATE: 'date',
    DATETIME: 'datetime',
    TIME: 'time',
    STRING: 'string',
    CURRENCY: 'currency',
    OBJECT: 'object'
};

Object.freeze(ListFieldTypeEnum);
