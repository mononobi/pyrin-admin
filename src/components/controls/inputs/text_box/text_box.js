import React from 'react';
import TextField from '@material-ui/core/TextField';
import { BaseInput } from '../base/base';
import { AutoCompleteEnum, ClientFormFieldTypeEnum } from '../globals/enumerations';
import { HELPER_TEXT_STYLE } from '../globals/styles/inputs';
import {
    INPUT_FILL, INPUT_MARGIN, INPUT_SIZE, INPUT_VARIANT, VERY_LONG_INPUT_LENGTH
} from '../globals/constants';
import '../globals/styles/inputs.css';


export class TextBox extends BaseInput {

    TYPE = ClientFormFieldTypeEnum.TEXT;
    MULTILINE = false;
    AUTO_COMPLETE = AutoCompleteEnum.ON;
    INPUT_MODE = null;

    _renderControl() {
        return (
            <TextField
                key={this._getFieldName()}
                fullWidth={true}
                variant={INPUT_VARIANT}
                id={this._getFieldName()}
                autoComplete={this.AUTO_COMPLETE}
                multiline={this.MULTILINE}
                label={this._getFieldTitle()}
                size={INPUT_SIZE}
                margin={INPUT_MARGIN}
                inputProps={{
                    inputMode: this.INPUT_MODE
                }}
                type={this.props.type || this.TYPE}
                style={{width: INPUT_FILL}}
                disabled={this._isReadOnly()}
                name={this._getFieldName()}
                value={this.props.value}
                onChange={this.props.onChange}
                error={this.props.error}
                helperText={this.props.helperText}
                FormHelperTextProps={{style: HELPER_TEXT_STYLE, margin: 'dense'}
                }
            />
        )
    }
}

export class TextArea extends TextBox {

    MULTILINE = true;
    FIXED_LENGTH = VERY_LONG_INPUT_LENGTH;
    AUTO_COMPLETE = AutoCompleteEnum.OFF;
}
