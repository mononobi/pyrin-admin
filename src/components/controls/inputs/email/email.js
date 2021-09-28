import { TextBox } from '../text_box/text_box';
import { AutoCompleteEnum, ClientFormFieldTypeEnum } from '../globals/enumerations';
import { FIXED_LENGTH_INPUT } from '../globals/constants';


export class EmailInput extends TextBox {

    FIXED_LENGTH = FIXED_LENGTH_INPUT;
    TYPE = ClientFormFieldTypeEnum.EMAIL;
    AUTO_COMPLETE = AutoCompleteEnum.EMAIL;
}
