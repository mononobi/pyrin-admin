import { StringValidator } from './string';


export class IPV4Validator extends StringValidator {

    INCORRECT_TYPE_MESSAGE = 'Enter a valid IPv4 address';
}

export class IPV6Validator extends StringValidator {

    INCORRECT_TYPE_MESSAGE = 'Enter a valid IPv6 address';
}
