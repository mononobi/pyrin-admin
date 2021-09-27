import { BooleanValueEnum, JSTypeEnum } from './enumerations';
import { ValidatorBase } from './base';


export class StringValidator extends ValidatorBase {

    TYPE = JSTypeEnum.STRING;
    SINGLE_QUOTE_REGEX = RegExp("^['].*[']$");
    DOUBLE_QUOTE_REGEX = RegExp('^["].*["]$');

    constructor(info, forUpdate) {
        super(info, forUpdate);
        this.minLength = this.info.min_length;
        this.maxLength = this.info.max_length;
        this.allowWhitespace = this.info.allow_whitespace;
    }

    _unquote(value) {
        if (this.SINGLE_QUOTE_REGEX.test(value) || this.DOUBLE_QUOTE_REGEX.test(value)) {
            return value.slice(1, -1);
        }

        return value;
    }

    _isEmpty(value) {
        if (typeof value === this.TYPE) {
            value = this._unquote(value)
        }

        return super._isEmpty(value);
    }

    _validateMinLength(value) {
        if (this.minLength && value.length < this.minLength) {
            return `Use minimum ${this.minLength} characters`;
        }

        return null;
    }

    _validateMaxLength(value) {
        if (this.maxLength && value.length > this.maxLength) {
            return `Use maximum ${this.maxLength} characters`;
        }

        return null;
    }

    _validateWhitespace(value) {
        if (this.allowWhitespace === false && !value.trim()) {
            return 'This field can not be only whitespace';
        }

        return null;
    }

    _validateBoolean(value) {
        let lowerValue = value.toLowerCase();
        if (lowerValue === BooleanValueEnum.TRUE ||
            lowerValue === BooleanValueEnum.FALSE) {
            return 'Quote the value to be processed as string'
        }

        return null;
    }

    _validate(value) {
        let booleanError = this._validateBoolean(value);
        if (booleanError) {
            return booleanError;
        }

        value = this._unquote(value);
        let whitespaceError = this._validateWhitespace(value);
        if (whitespaceError) {
            return whitespaceError;
        }

        let minLengthError = this._validateMinLength(value);
        if (minLengthError) {
            return minLengthError;
        }

        let maxLengthError = this._validateMaxLength(value);
        if (maxLengthError) {
            return maxLengthError;
        }

        return null;
    }
}
