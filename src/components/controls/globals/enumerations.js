export const ServerFormFieldTypeEnum = {
    BOOLEAN: 'boolean',
    DATE: 'date',
    DATETIME: 'datetime',
    TIME: 'time',
    EMAIL: 'email',
    FILE: 'file',
    NUMBER: 'number',
    INTEGER: 'integer',
    FLOAT: 'float',
    PASSWORD: 'password',
    TELEPHONE: 'telephone',
    STRING: 'string',
    TEXT: 'text',
    URL: 'url',
    UUID: 'uuid',
    IPV4: 'ipv4',
    IPV6: 'ipv6',
    OBJECT: 'object'
};

Object.freeze(ServerFormFieldTypeEnum);

export const ClientFormFieldTypeEnum = {
    CHECK_BOX: 'checkbox',
    DATE: 'date',
    DATETIME: 'datetime-local',
    TIME: 'time',
    EMAIL: 'email',
    FILE: 'file',
    NUMBER: 'number',
    PASSWORD: 'password',
    TELEPHONE: 'tel',
    TEXT: 'text',
    URL: 'url'
};

Object.freeze(ClientFormFieldTypeEnum);

export const AutoCompleteEnum = {
    ON: 'on',
    OFF: 'off'
};

Object.freeze(AutoCompleteEnum);
