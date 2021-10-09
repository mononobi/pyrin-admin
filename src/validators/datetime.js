import { ValidatorBase } from './base';
import { JSTypeEnum } from './enumerations';
import { isValidDate } from '../core/datetime';


export class DateAndTimeBaseValidator extends ValidatorBase {

    TYPE = JSTypeEnum.OBJECT;

    _convert(value) {
        if (!this._isNull(value)) {
            let converted = new Date(value);
            if (isValidDate(converted)) {
                return converted;
            }
        }
        return null;
    }

    _shouldIgnoreNullForUpdate() {
        return true;
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
}
