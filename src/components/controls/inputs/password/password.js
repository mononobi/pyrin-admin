import { AutoCompleteEnum, ClientFormFieldTypeEnum } from '../globals/enumerations';
import { TextBox } from '../text_box/text_box';


export class PasswordInput extends TextBox {

    TYPE = ClientFormFieldTypeEnum.PASSWORD;
    AUTO_COMPLETE = AutoCompleteEnum.NEW_PASSWORD;
}
