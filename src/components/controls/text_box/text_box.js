import React from 'react';
import TextField from '@material-ui/core/TextField';
import { BaseControl } from '../base/base';
import { AutoCompleteEnum, ClientFormFieldTypeEnum } from '../globals/enumerations';
import {
    INPUT_FILL, INPUT_MARGIN, INPUT_SIZE, INPUT_VARIANT, VERY_LONG_INPUT_LENGTH
} from '../globals/constants';
import '../globals/styles/inputs.css';


export class TextBox extends BaseControl {

    TYPE = ClientFormFieldTypeEnum.TEXT;
    MULTILINE = false;
    AUTO_COMPLETE = AutoCompleteEnum.ON;
    PATTERN = null;
    INPUT_MODE = null;

    _renderControl() {
        return (
                <TextField variant={INPUT_VARIANT}
                           id={this._getFieldName()}
                           autoComplete={this.AUTO_COMPLETE}
                           multiline={this.MULTILINE}
                           label={this._getFieldTitle()}
                           size={INPUT_SIZE}
                           required={this._isRequired()}
                           margin={INPUT_MARGIN}
                           inputProps={{
                               maxLength: this.props.info.max_length,
                               minLength: this.props.info.min_length,
                               max: this.props.info.max_value,
                               min: this.props.info.min_value,
                               pattern: this.PATTERN,
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
                />
        )
    }
}

export class TextArea extends TextBox {

    MULTILINE = true;
    FIXED_LENGTH = VERY_LONG_INPUT_LENGTH;
    AUTO_COMPLETE = AutoCompleteEnum.OFF;
}
