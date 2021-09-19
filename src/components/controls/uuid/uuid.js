import { TextBox } from '../text_box/text_box';
import { AutoCompleteEnum } from '../globals/enumerations';


export class UUIDInput extends TextBox {

    FIXED_LENGTH = '350px';
    AUTO_COMPLETE = AutoCompleteEnum.OFF;
}
