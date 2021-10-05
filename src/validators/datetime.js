import { ValidatorBase } from './base';
import { JSTypeEnum } from './enumerations';
import { fillWithDate, isValidDate } from '../core/datetime';


export class DateAndTimeBaseValidator extends ValidatorBase {

    TYPE = JSTypeEnum.OBJECT;

    _fix(value) {
        return value;
    }

    _convert(value) {
        let converted = new Date(this._fix(value));
        if (isValidDate(converted)) {
            return converted;
        }
        return '';
    }
}

export class DateValidator extends DateAndTimeBaseValidator {

    INCORRECT_TYPE_MESSAGE = 'Enter a valid date';
}

export class DateTimeValidator extends DateAndTimeBaseValidator {

    INCORRECT_TYPE_MESSAGE = 'Enter a valid date and time';
}

export class TimeValidator extends DateAndTimeBaseValidator {

    INCORRECT_TYPE_MESSAGE = 'Enter a valid time';

    _fix(value) {
        if (typeof value === JSTypeEnum.STRING) {
            return fillWithDate(value);
        }
        return value;
    }
}
