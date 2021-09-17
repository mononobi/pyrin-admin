import React from 'react';
import TextField from '@material-ui/core/TextField';
import { BaseControl } from '../base/base';
import {
    INPUT_CONTAINER_MARGIN, INPUT_FILL, INPUT_FONT_SIZE, INPUT_LABEL_FONT_SIZE,
    INPUT_LENGTH, INPUT_MARGIN, INPUT_SIZE, INPUT_VARIANT, LONG_INPUT_LENGTH,
    SHORT_INPUT_LENGTH, VERY_LONG_INPUT_LENGTH, VERY_SHORT_INPUT_LENGTH
} from '../globals/constants';
import '../globals/styles/inputs.css';


export class TextBox extends BaseControl {

    WIDTH = INPUT_LENGTH;

    _render() {
        return (
            <div style={{width: this.WIDTH, margin: INPUT_CONTAINER_MARGIN}}>
                <TextField variant={INPUT_VARIANT}
                           id={this.props.info.field}
                           label={this.props.info.title}
                           size={INPUT_SIZE}
                           required={this.props.info.required}
                           margin={INPUT_MARGIN}
                           InputProps={{style: {fontSize: INPUT_FONT_SIZE}}}
                           InputLabelProps={{style: {fontSize: INPUT_LABEL_FONT_SIZE}}}
                           type={this.props.info.form_field_type}
                           style={{width: INPUT_FILL}}
                />
            </div>
        )
    }
}


export class ShortTextBox extends TextBox {

    WIDTH = SHORT_INPUT_LENGTH;
}

export class LongTextBox extends TextBox {

    WIDTH = LONG_INPUT_LENGTH;
}

export class VeryShortTextBox extends TextBox {

    WIDTH = VERY_SHORT_INPUT_LENGTH;
}

export class VeryLongTextBox extends TextBox {

    WIDTH = VERY_LONG_INPUT_LENGTH;
}
