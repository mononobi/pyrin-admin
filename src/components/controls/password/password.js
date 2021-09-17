import { ClientFormFieldTypeEnum } from '../globals/enumerations';
import { TextBox } from '../text_box/text_box';


export class PasswordInput extends TextBox {

    TYPE = ClientFormFieldTypeEnum.PASSWORD;
}
