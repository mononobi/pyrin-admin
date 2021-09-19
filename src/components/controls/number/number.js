import { TextBox } from '../text_box/text_box';


export class NumberInput extends TextBox {

    PATTERN = '(0|([-]?[1-9]([0-9])*))|([-]?(0|([1-9]([0-9])*))[.]([0-9])+)';
    INPUT_MODE = 'numeric';
}

export class IntegerInput extends NumberInput {

    PATTERN = '[-]?(0|([1-9]([0-9])*))[.]([0-9])+';
}

export class FloatInput extends NumberInput {}
