import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { BaseControl } from '../base/base';
import '../globals/styles/inputs.css';


export class CheckBox extends BaseControl {

    _renderControl() {
        return (
            <FormControlLabel
                labelPlacement='end'
                label={this._getFieldTitle()}
                control={
                    <Checkbox
                        id={this._getFieldName()}
                        size='small'
                        disabled={this._isReadOnly()}
                        name={this._getFieldName()}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        error={this.props.error}
                    />
                }
            />
        )
    }
}
