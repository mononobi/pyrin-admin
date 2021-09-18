import React from 'react';
import { ServerFormFieldTypeEnum } from './globals/enumerations';
import { UUIDInput } from './uuid/uuid';
import { PasswordInput } from './password/password';
import { TextArea, TextBox } from './text_box/text_box';
import { DatePicker, TimePicker, DateTimePicker } from './pickers/pickers';
import { NumberInput, IntegerInput, FloatInput } from './number/number';
import { DropDown } from './dropdown/dropdown';
import { CheckBox } from './checkbox/checkbox';


const CONTROL_MAP = {};
CONTROL_MAP[ServerFormFieldTypeEnum.BOOLEAN] = CheckBox;
CONTROL_MAP[ServerFormFieldTypeEnum.DATE] = DatePicker;
CONTROL_MAP[ServerFormFieldTypeEnum.DATETIME] = DateTimePicker;
CONTROL_MAP[ServerFormFieldTypeEnum.TIME] = TimePicker;
CONTROL_MAP[ServerFormFieldTypeEnum.EMAIL] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.FILE] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.NUMBER] = NumberInput;
CONTROL_MAP[ServerFormFieldTypeEnum.INTEGER] = IntegerInput;
CONTROL_MAP[ServerFormFieldTypeEnum.FLOAT] = FloatInput;
CONTROL_MAP[ServerFormFieldTypeEnum.PASSWORD] = PasswordInput;
CONTROL_MAP[ServerFormFieldTypeEnum.TELEPHONE] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.STRING] = TextBox;
CONTROL_MAP[ServerFormFieldTypeEnum.TEXT] = TextArea;
CONTROL_MAP[ServerFormFieldTypeEnum.URL] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.UUID] = UUIDInput;
CONTROL_MAP[ServerFormFieldTypeEnum.IPV4] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.IPV6] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.OBJECT] = null;

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

export function createControl(info) {
    let control = getControl(info);
    return React.createElement(control, {info: info});
}
