import React from 'react';
import { ServerFormFieldTypeEnum } from './globals/enumerations';
import { UUIDInput } from './uuid/uuid';
import { PasswordInput } from './password/password';
import { TextArea, TextBox } from './text_box/text_box';
import { DatePicker, TimePicker, DateTimePicker } from './pickers/pickers';
import { NumberInput, IntegerInput, FloatInput } from './number/number';
import { DropDown } from './dropdown/dropdown';
import { CheckBox } from './checkbox/checkbox';
import { EmailInput } from './email/email';
import { TelephoneInput } from './telephone/telephone';
import { URLInput } from './url/url';
import { IPV4Input, IPV6Input } from './ip/ip';
import { ObjectInput } from './object/object';


const CONTROL_MAP = {};
CONTROL_MAP[ServerFormFieldTypeEnum.BOOLEAN] = CheckBox;
CONTROL_MAP[ServerFormFieldTypeEnum.DATE] = DatePicker;
CONTROL_MAP[ServerFormFieldTypeEnum.DATETIME] = DateTimePicker;
CONTROL_MAP[ServerFormFieldTypeEnum.TIME] = TimePicker;
CONTROL_MAP[ServerFormFieldTypeEnum.EMAIL] = EmailInput;
CONTROL_MAP[ServerFormFieldTypeEnum.FILE] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.NUMBER] = NumberInput;
CONTROL_MAP[ServerFormFieldTypeEnum.INTEGER] = IntegerInput;
CONTROL_MAP[ServerFormFieldTypeEnum.FLOAT] = FloatInput;
CONTROL_MAP[ServerFormFieldTypeEnum.PASSWORD] = PasswordInput;
CONTROL_MAP[ServerFormFieldTypeEnum.TELEPHONE] = TelephoneInput;
CONTROL_MAP[ServerFormFieldTypeEnum.STRING] = TextBox;
CONTROL_MAP[ServerFormFieldTypeEnum.TEXT] = TextArea;
CONTROL_MAP[ServerFormFieldTypeEnum.URL] = URLInput;
CONTROL_MAP[ServerFormFieldTypeEnum.UUID] = UUIDInput;
CONTROL_MAP[ServerFormFieldTypeEnum.IPV4] = IPV4Input;
CONTROL_MAP[ServerFormFieldTypeEnum.IPV6] = IPV6Input;
CONTROL_MAP[ServerFormFieldTypeEnum.OBJECT] = ObjectInput;

Object.freeze(CONTROL_MAP);

export function getControl(info) {
    if (info.in_enum) {
        return DropDown;
    }

    let control = CONTROL_MAP[info.form_field_type];
    if (control) {
        return control;
    }

    return CONTROL_MAP[ServerFormFieldTypeEnum.STRING];
}

export function createControl(info, value, onChange, error,
                              helperText, disabled, forUpdate,
                              setFieldValue, openFKDialog) {
    let control = getControl(info);
    return React.createElement(control,
        {
            info: info, value: value, onChange: onChange,
            error: error, helperText: helperText,
            disabled: disabled, forUpdate: forUpdate,
            setFieldValue: setFieldValue, openFKDialog: openFKDialog
        });
}
