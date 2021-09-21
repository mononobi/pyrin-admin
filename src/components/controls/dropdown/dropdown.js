import React from 'react';
import Select from '@material-ui/core/Select';
import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { BaseControl } from '../base/base';
import { INPUT_MARGIN, INPUT_SIZE, INPUT_VARIANT } from '../globals/constants';
import '../globals/styles/inputs.css';
import '../dropdown/dropdown.css'


export class DropDown extends BaseControl {

    _render() {
        let label_id = `${this.props.info.field}-title`;
        return (
            <div style={{width: this.state.length}} className='dropdown-container'>
                <FormControl style={{width: this.state.length, paddingTop: '9px'}}
                             variant={INPUT_VARIANT} size={INPUT_SIZE}
                             disabled={this.props.info.read_only}>
                    <InputLabel id={label_id} required={this.props.info.required}>
                        {this.props.info.title}
                    </InputLabel>
                    <Select
                        displayEmpty={!this.props.info.required}
                        margin={INPUT_MARGIN}
                        id={this.props.info.field}
                        labelId={label_id}
                        label={this.props.info.title}
                        inputProps={{
                            required: this.props.info.required
                        }}
                        name={this.props.info.field}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        error={this.props.error}
                    >
                        {
                            !this.props.info.required && <MenuItem value=''><em>---</em></MenuItem>
                        }
                        {
                            this.props.info.in_enum.map(item => {
                                return <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </div>
        )
    }
}
