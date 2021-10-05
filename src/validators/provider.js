import { ServerFormFieldTypeEnum } from '../components/controls/inputs/globals/enumerations';
import { StringValidator } from './string';
import { IntegerValidator, NumberValidator } from './number';
import { EmailValidator } from './email';
import { IPV4Validator, IPV6Validator } from './ip';
import { DateTimeValidator, DateValidator, TimeValidator } from './datetime';


const VALIDATOR_MAP = {};
VALIDATOR_MAP[ServerFormFieldTypeEnum.DATE] = DateValidator;
VALIDATOR_MAP[ServerFormFieldTypeEnum.DATETIME] = DateTimeValidator;
VALIDATOR_MAP[ServerFormFieldTypeEnum.TIME] = TimeValidator;
VALIDATOR_MAP[ServerFormFieldTypeEnum.EMAIL] = EmailValidator;
VALIDATOR_MAP[ServerFormFieldTypeEnum.FILE] = null;
VALIDATOR_MAP[ServerFormFieldTypeEnum.NUMBER] = NumberValidator;
VALIDATOR_MAP[ServerFormFieldTypeEnum.INTEGER] = IntegerValidator;
VALIDATOR_MAP[ServerFormFieldTypeEnum.FLOAT] = NumberValidator;
VALIDATOR_MAP[ServerFormFieldTypeEnum.PASSWORD] = StringValidator;
VALIDATOR_MAP[ServerFormFieldTypeEnum.TELEPHONE] = null;
VALIDATOR_MAP[ServerFormFieldTypeEnum.STRING] = StringValidator;
VALIDATOR_MAP[ServerFormFieldTypeEnum.TEXT] = StringValidator;
VALIDATOR_MAP[ServerFormFieldTypeEnum.URL] = null;
VALIDATOR_MAP[ServerFormFieldTypeEnum.UUID] = null;
VALIDATOR_MAP[ServerFormFieldTypeEnum.IPV4] = IPV4Validator;
VALIDATOR_MAP[ServerFormFieldTypeEnum.IPV6] = IPV6Validator;
VALIDATOR_MAP[ServerFormFieldTypeEnum.OBJECT] = null;

Object.freeze(VALIDATOR_MAP);

export function getValidator(info, forUpdate) {
    let validator = VALIDATOR_MAP[info.form_field_type];
    if (validator) {
        return new validator(info, forUpdate);
    }
    return null;
}
