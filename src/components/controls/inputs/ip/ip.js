import { TextBox } from '../text_box/text_box';
import { FIXED_LENGTH_INPUT, INPUT_LENGTH } from '../globals/constants';


export class IPV4Input extends TextBox {

    FIXED_LENGTH = INPUT_LENGTH;
}


export class IPV6Input extends TextBox {

    FIXED_LENGTH = FIXED_LENGTH_INPUT;
}
