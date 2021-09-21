import { TextBox } from '../text_box/text_box';


export class NumberInput extends TextBox {

    INPUT_MODE = 'numeric';
}

export class IntegerInput extends NumberInput {

    PATTERN = '^\\d+$'
}

export class FloatInput extends NumberInput {}
