import React from 'react';
import { Divider, Paper } from '@material-ui/core';
import { getCreateMetadata } from '../../../services/metadata';
import { DatePicker, DateTimePicker, TimePicker } from '../../controls/pickers/pickers';
import { BaseComplexPage } from '../base/base';
import { TextArea, TextBox } from '../../controls/text_box/text_box';
import { PasswordInput } from '../../controls/password/password';
import { UUIDInput } from '../../controls/uuid/uuid';
import { FloatInput, IntegerInput, NumberInput } from '../../controls/number/number';
import { getControl } from '../../controls/provider';
import {DropDown} from "../../controls/dropdown/dropdown";
import SimpleSelect from "../../controls/test";


export class AddComponent extends BaseComplexPage {

    _fetchMetadata()
    {
        return getCreateMetadata(this.props.match.params.register_name);
    }

    _render() {
        return (
            <Paper>
                <div>
                    <Divider/>
                    <DateTimePicker info={this.state.metadata.data_fields[4]}/>
                    <Divider/>
                    <TimePicker info={this.state.metadata.data_fields[1]}/>
                    <Divider/>
                    <DatePicker info={this.state.metadata.data_fields[2]}/>
                    <Divider/>
                    <TextBox info={this.state.metadata.data_fields[0]}/>
                    <Divider/>
                    <PasswordInput info={this.state.metadata.data_fields[3]}/>
                    <Divider/>
                    <TextArea info={this.state.metadata.data_fields[1]}/>
                    <Divider/>
                    <UUIDInput info={this.state.metadata.data_fields[3]}/>
                    <Divider/>
                    <NumberInput info={this.state.metadata.data_fields[5]}/>
                    <Divider/>
                    {
                        React.createElement(getControl(this.state.metadata.data_fields[0]),
                            {info: this.state.metadata.data_fields[0]})
                    }
                    {/*<DropDown info={this.state.metadata.data_fields[0]}/>*/}
                    <Divider/>
                    <FloatInput info={this.state.metadata.data_fields[4]}/>
                    <Divider/>
                    <SimpleSelect/>
                    <Divider/>
                </div>
            </Paper>
        )
    }
}
