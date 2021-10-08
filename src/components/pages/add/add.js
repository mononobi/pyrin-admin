import React from 'react';
import { Paper } from '@material-ui/core';
import { getCreateMetadata } from '../../../services/metadata';
import { BaseComplexPage } from '../base/base';
import { CreateForm } from '../../forms/create';


export class AddComponent extends BaseComplexPage {

    OPERATION_NAME = 'add';

    _hasPermission() {
        return this.state.metadata.has_create_permission;
    }

    _fetchMetadata()
    {
        return getCreateMetadata(this._getInitialRegisterName());
    }

    _finalRender() {
        return (
            <Paper variant='elevation' elevation={3}>
                <CreateForm registerName={this._getRegisterName()}
                            name={this._getName()}
                            forSelect={this._isForSelect()}
                            setSelectedFK={this.props.setSelectedFK}
                            history={this.props.history}
                            dataFields={this.state.metadata.data_fields}
                            dataFieldsDict={this.state.metadata.data_fields_dict}
                            hasSavePermission={this.state.metadata.has_create_permission}/>
            </Paper>
        )
    }
}
