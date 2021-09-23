import React from 'react';
import { Paper } from '@material-ui/core';
import { getUpdateMetadata } from '../../../services/metadata';
import { BaseComplexPage } from '../base/base';
import { UpdateForm } from '../../forms/update';
import { get } from '../../../services/data';


export class EditComponent extends BaseComplexPage {

    REQUIRES_DATA = true;
    OPERATION_NAME = 'view details of';

    _hasPermission() {
        return this.state.metadata.has_get_permission;
    }

    _fetchData() {
        return get(this.props.match.params.register_name, this.props.match.params.pk)
    }

    _fetchMetadata()
    {
        return getUpdateMetadata(this.props.match.params.register_name);
    }

    _render() {
        return (
            <Paper variant='elevation' elevation={3}>
                <UpdateForm register_name={this.state.metadata.register_name}
                            dataFields={this.state.metadata.data_fields}
                            pk={this.props.match.params.pk}
                            initialValues={this.state.data}
                />
            </Paper>
        )
    }
}
