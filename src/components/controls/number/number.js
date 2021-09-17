import { TextBox } from '../text_box/text_box';
import { ClientFormFieldTypeEnum } from '../globals/enumerations';
import '../globals/styles/inputs.css';


export class NumberInput extends TextBox {

    TYPE = ClientFormFieldTypeEnum.NUMBER;

    _getStep() {
        return 0.1;
    }
}

export class IntegerInput extends NumberInput {

    _getStep() {
        return 1;
    }
}

export class FloatInput extends NumberInput {}
