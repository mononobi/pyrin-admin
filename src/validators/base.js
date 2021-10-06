import { JSTypeEnum, NullValueEnum } from './enumerations';


export class ValidatorBase {

    TYPE = '';
    REGEX = null;
    INCORRECT_TYPE_MESSAGE = 'Enter a valid value';
    REQUIRED_MESSAGE = 'This field is required';

    constructor(info, forUpdate) {
        this.info = info;
        this.forUpdate = forUpdate;
        this.required = this.info.required;
        this.minValue = this.info.min_value;
        this.maxValue = this.info.max_value;
        this.regex = this.info.regex;
    }

    _getRegex() {
        if (this.REGEX) {
            return this.REGEX;
        }

        if (this.regex) {
            return RegExp(this.regex);
        }

        return null;
    }

    _isNullOrUndefined(value) {
        return value === null || value === undefined;
    }

    _isNull(value) {
        if (this._isNullOrUndefined(value)) {
            return true
        }

        if (typeof value === JSTypeEnum.STRING) {
            let lowerValue = value.toLowerCase();
            if (lowerValue === NullValueEnum.NULL ||
                lowerValue === NullValueEnum.NONE) {
                return true;
            }
        }

        return false;
    }

    _isEmpty(value) {
        return value === '';
    }

    _isNullOrEmpty(value) {
        return this._isEmpty(value) || this._isNull(value);
    }

    _convert(value) {
        return value;
    }

    _validate(value) {
        return null;
    }

    _validateMinValue(value) {
        if (!this._isNullOrUndefined(this.minValue) && this._convert(value) < this.minValue) {
            return `Minimum value is ${this.minValue}`;
        }

        return null;
    }

    _validateMaxValue(value) {
        if (!this._isNullOrUndefined(this.maxValue) && this._convert(value) > this.maxValue) {
            return `Maximum value is ${this.maxValue}`;
        }

        return null;
    }

    _validatePattern(value) {
        let currentRegex = this._getRegex();
        if (currentRegex && !currentRegex.test(value)) {
            return this.INCORRECT_TYPE_MESSAGE;
        }

        return null
    }

    _validateType(value) {
        let patternError = this._validatePattern(value);
        if (patternError) {
            return patternError;
        }

        let converted = this._convert(value);
        if (converted === null || typeof converted !== this.TYPE) {
            return this.INCORRECT_TYPE_MESSAGE;
        }

        return null;
    }

    _shouldIgnoreNullForUpdate() {
        return false;
    }

    _validateRequired(value) {
        if (this.required) {
            if (this.forUpdate) {
                if (this._isNull(value) && !this._shouldIgnoreNullForUpdate()) {
                    return this.REQUIRED_MESSAGE;
                }
            }
            else {
                if (this._isNullOrEmpty(value)) {
                    return this.REQUIRED_MESSAGE;
                }
            }
        }

        return null;
    }

    validate(value) {
        if (this._isNullOrEmpty(value)) {
            return this._validateRequired(value);
        }

        let typeError = this._validateType(value);
        if (typeError) {
            return typeError;
        }

        let minValueError = this._validateMinValue(value);
        if (minValueError) {
            return minValueError;
        }

        let maxValueError = this._validateMaxValue(value);
        if (maxValueError) {
            return maxValueError;
        }

        return this._validate(value);
    }
}
