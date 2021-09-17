import React from 'react';
import { Divider, Paper } from '@material-ui/core';
import { getCreateMetadata } from '../../../services/metadata';
import { DatePicker, DateTimePicker, TimePicker } from '../../controls/pickers/pickers';
import { BaseComplexPage } from '../base/base';
import {TextBox} from "../../controls/text_box/text_box";


export class AddComponent extends BaseComplexPage {

    _fetchMetadata()
    {
        return getCreateMetadata(this.props.match.params.register_name);
    }

    _render() {
        return (
            <Paper elevation24>
                <div>
                    <Divider/>
                    <DateTimePicker info={this.state.metadata.data_fields[4]}/>
                    {/*<br/>*/}
                    <Divider/>
                    {/*<br/>*/}
                    <TimePicker info={this.state.metadata.data_fields[1]}/>
                    {/*<br/>*/}
                    <Divider/>
                    {/*<br/>*/}
                    <DatePicker info={this.state.metadata.data_fields[2]}/>
                    {/*<Divider/>*/}
                    {/*<br/>*/}
                    <Divider/>
                    <TextBox info={this.state.metadata.data_fields[3]}/>
                </div>
            </Paper>
        )
    }
}
