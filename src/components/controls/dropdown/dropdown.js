import React from 'react';
import Select from '@material-ui/core/Select';
import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { BaseControl } from '../base/base';
import {
    INPUT_CONTAINER_MARGIN, INPUT_FILL, INPUT_FONT_SIZE,
    INPUT_LABEL_FONT_SIZE, INPUT_MARGIN, INPUT_VARIANT
} from '../globals/constants';


export class DropDown extends BaseControl {

    state = {
        selectedValue: ''
    }

    _render() {
        let label_id = `${this.props.info.field}-title`;
        return (
            <div>
                <FormControl style={{width: this.state.length, margin: INPUT_CONTAINER_MARGIN}}
                             variant={INPUT_VARIANT}>
                    <InputLabel id={label_id} required={this.props.info.required}
                                style={{fontSize: INPUT_LABEL_FONT_SIZE}}>
                        {this.props.info.title}
                    </InputLabel>
                    <Select
                        displayEmpty={!this.props.info.required}
                        margin={INPUT_MARGIN}
                        id={this.props.info.field}
                        labelId={label_id}
                        label={this.props.info.title}
                        value={this.state.selectedValue}
                        style={{width: INPUT_FILL}}
                        InputLabelProps={{
                            required: this.props.info.required,
                            style: {fontSize: INPUT_LABEL_FONT_SIZE}
                        }}
                        inputProps={{
                            required: this.props.info.required,
                            style: {fontSize: INPUT_FONT_SIZE},
                        }}
                        onChange={event => {
                            this.setState({
                                selectedValue: event.target.value
                            })
                        }}
                    >
                        {
                            !this.props.info.required && <MenuItem value=''><em>---</em></MenuItem>
                        }
                        {
                            this.props.info.in_enum.map(item => {
                                return <MenuItem value={item.value}>{item.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </div>
        )
    }
}
