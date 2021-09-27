import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { BaseInput } from '../base/base';
import '../globals/styles/inputs.css';


export class CheckBox extends BaseInput {

    _renderControl() {
        return (
            <FormControlLabel
                labelPlacement='end'
                label={this._getFieldTitle()}
                control={
                    <Checkbox
                        key={this._getFieldName()}
                        id={this._getFieldName()}
                        size='small'
                        disabled={this._isReadOnly()}
                        name={this._getFieldName()}
                        value={this.props.value || false}
                        checked={this.props.value || false}
                        onChange={this.props.onChange}
                        error={this.props.error}
                    />
                }
            />
        )
    }
}
