import React from 'react';
import TextField from '@material-ui/core/TextField';
import { BaseControl } from '../base/base';
import { ClientFormFieldTypeEnum } from '../globals/enumerations';
import {
    INPUT_CONTAINER_MARGIN, INPUT_FILL, INPUT_FONT_SIZE,
    INPUT_LABEL_FONT_SIZE, INPUT_MARGIN, INPUT_SIZE, INPUT_VARIANT
} from '../globals/constants';
import '../globals/styles/inputs.css';


export class TextBox extends BaseControl {

    TYPE = ClientFormFieldTypeEnum.TEXT;

    _render() {
        return (
            <div style={{width: this.props.fixed_length ||
                    this.state.input_length, margin: INPUT_CONTAINER_MARGIN}}>
                <TextField variant={INPUT_VARIANT}
                           id={this.props.info.field}
                           label={this.props.info.title}
                           size={INPUT_SIZE}
                           required={this.props.info.required}
                           margin={INPUT_MARGIN}
                           InputProps={{style: {fontSize: INPUT_FONT_SIZE}}}
                           InputLabelProps={{style: {fontSize: INPUT_LABEL_FONT_SIZE}}}
                           type={this.TYPE}
                           style={{width: INPUT_FILL}}
                />
            </div>
        )
    }
}
