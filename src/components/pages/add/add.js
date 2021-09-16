import React from 'react';
import { getCreateMetadata } from '../../../services/metadata';
import { ComplexComponent } from '../../base/complex/complex';
import { TextBox, ShortTextBox, LongTextBox } from '../../controls/text_box/text_box';
import { Divider, Paper, Tooltip } from '@material-ui/core';


export class AddComponent extends ComplexComponent {

    _fetchMetadata()
    {
        return getCreateMetadata(this.props.match.params.register_name);
    }

    _render() {
        return (
            <Paper elevation24>
                <div style={{fontSize: '8px'}}>
                    <Divider/>
                    <Tooltip title='Required' placement='bottom'>
                        <LongTextBox info={this.state.metadata.data_fields[1]}/>
                    </Tooltip>
                    {/*<br/>*/}
                    <Divider/>
                    {/*<br/>*/}
                    <TextBox info={this.state.metadata.data_fields[1]}/>
                    {/*<br/>*/}
                    <Divider/>
                    {/*<br/>*/}
                    <ShortTextBox info={this.state.metadata.data_fields[2]}/>
                    {/*<Divider/>*/}
                    {/*<br/>*/}
                    <Divider/>
                </div>
            </Paper>
        )
    }
}
