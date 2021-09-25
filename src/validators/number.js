import { JSTypeEnum } from './enumerations';
import { ValidatorBase } from './base';


export class NumberValidator extends ValidatorBase {

    TYPE = JSTypeEnum.NUMBER;
    REGEX = RegExp('^[-]?(0|([1-9]([0-9])*))[.]([0-9])+$|^(0|([-]?[1-9]([0-9])*))$');

    _convert(value) {
        return Number(value);
    }
}

export class IntegerValidator extends NumberValidator {

    INCORRECT_TYPE_MESSAGE = 'Enter a valid integer';
    REGEX = RegExp('^(0|([-]?[1-9]([0-9])*))$');
}
