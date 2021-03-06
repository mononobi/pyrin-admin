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
        return get(this._getInitialRegisterName(), this.props.match.params.pk)
    }

    _fetchMetadata()
    {
        return getUpdateMetadata(this._getInitialRegisterName());
    }

    _prepareData(data) {
        let result = {};
        for (let i = 0; i < this.state.metadata.data_fields.length; i++) {
            let fieldName = this.state.metadata.data_fields[i].field;
            result[fieldName] = data[fieldName];
        }
        return result;
    }

    _getPageTitle() {
        return `Edit ${this._getName()}`;
    }

    _finalRender() {
        return (
            <div style={{padding: '6px'}}>
                <Paper variant='elevation' elevation={3}>
                    <UpdateForm registerName={this._getRegisterName()}
                                name={this._getName()}
                                history={this.props.history}
                                location={this.props.location}
                                dataFields={this.state.metadata.data_fields}
                                dataFieldsDict={this.state.metadata.data_fields_dict}
                                pk={this.props.match.params.pk}
                                initialValues={this._prepareData(this.state.data)}
                                hasSavePermission={this.state.metadata.has_update_permission}
                                hasDeletePermission={this.state.metadata.has_remove_permission}/>
                </Paper>
            </div>
        )
    }
}
