import { TextBox } from '../text_box/text_box';
import { AutoCompleteEnum, ClientFormFieldTypeEnum } from '../globals/enumerations';


export class TelephoneInput extends TextBox {

    TYPE = ClientFormFieldTypeEnum.TELEPHONE;
    AUTO_COMPLETE = AutoCompleteEnum.TELEPHONE;
}
