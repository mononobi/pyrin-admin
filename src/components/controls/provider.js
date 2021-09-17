import { ServerFormFieldTypeEnum } from './globals/enumerations';
import { TextArea, TextBox } from './text_box/text_box';
import { PasswordInput } from './password/password';
import { DatePicker, TimePicker, DateTimePicker } from './pickers/pickers';


const CONTROL_MAP = {};
CONTROL_MAP[ServerFormFieldTypeEnum.BOOLEAN] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.DATE] = DatePicker;
CONTROL_MAP[ServerFormFieldTypeEnum.DATETIME] = DateTimePicker;
CONTROL_MAP[ServerFormFieldTypeEnum.TIME] = TimePicker;
CONTROL_MAP[ServerFormFieldTypeEnum.EMAIL] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.FILE] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.NUMBER] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.PASSWORD] = PasswordInput;
CONTROL_MAP[ServerFormFieldTypeEnum.TELEPHONE] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.STRING] = TextBox;
CONTROL_MAP[ServerFormFieldTypeEnum.TEXT] = TextArea;
CONTROL_MAP[ServerFormFieldTypeEnum.URL] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.UUID] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.IPV4] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.IPV6] = null;
CONTROL_MAP[ServerFormFieldTypeEnum.OBJECT] = null;

Object.freeze(CONTROL_MAP);
