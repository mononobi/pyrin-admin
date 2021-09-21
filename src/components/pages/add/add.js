import React from 'react';
import { Paper } from '@material-ui/core';
import { getCreateMetadata } from '../../../services/metadata';
import { BaseComplexPage } from '../base/base';
import { CreateForm } from '../../controls/forms/create';


export class AddComponent extends BaseComplexPage {

    _fetchMetadata()
    {
        return getCreateMetadata(this.props.match.params.register_name);
    }

    _render() {
        return (
            <Paper variant='elevation' elevation={3}>
                <CreateForm register_name={this.state.metadata.register_name}
                            dataFields={this.state.metadata.data_fields}/>
            </Paper>
        )
    }
}
