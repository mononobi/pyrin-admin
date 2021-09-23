import React from 'react';
import Select from '@material-ui/core/Select';
import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { BaseControl } from '../base/base';
import { INPUT_MARGIN, INPUT_SIZE, INPUT_VARIANT } from '../globals/constants';
import '../globals/styles/inputs.css';
import '../dropdown/dropdown.css'


export class DropDown extends BaseControl {

    CONTAINER_CLASS_NAME = 'dropdown-container';

    _renderControl() {
        let label_id = `${this._getFieldName()}-title`;
        return (
            <FormControl style={{paddingTop: '9px'}} fullWidth={true}
                         variant={INPUT_VARIANT} size={INPUT_SIZE}
                         disabled={this._isReadOnly()}>
                <InputLabel id={label_id}>
                    {this._getFieldTitle()}
                </InputLabel>
                <Select
                    key={this._getFieldName()}
                    displayEmpty={!this._isRequired()}
                    margin={INPUT_MARGIN}
                    id={this._getFieldName()}
                    labelId={label_id}
                    label={this._getFieldTitle()}
                    name={this._getFieldName()}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    error={this.props.error}
                >
                    {
                        !this._isRequired() && <MenuItem value=''><br/></MenuItem>
                    }
                    {
                        this.props.info.in_enum.map(item => {
                            return <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        )
    }
}
