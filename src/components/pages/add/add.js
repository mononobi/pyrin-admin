import React from 'react';
import { Paper } from '@material-ui/core';
import { getCreateMetadata } from '../../../services/metadata';
import { createControl } from '../../controls/provider';
import { BaseComplexPage } from '../base/base';


export class AddComponent extends BaseComplexPage {

    _fetchMetadata()
    {
        return getCreateMetadata(this.props.match.params.register_name);
    }

    _render() {
        return (
            <Paper variant='elevation' elevation={3}>
                {
                    this.state.metadata.data_fields.map(item => {
                        return (
                            <>
                                {
                                    createControl(item)
                                }
                            </>
                        )
                    })
                }
            </Paper>
        )
    }
}
