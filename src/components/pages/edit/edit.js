import React from 'react';
import { Divider, Paper } from '@material-ui/core';
import { getUpdateMetadata } from '../../../services/metadata';
import { createControl } from '../../controls/provider';
import { BaseComplexPage } from '../base/base';


export class EditComponent extends BaseComplexPage {

    _fetchMetadata()
    {
        return getUpdateMetadata(this.props.match.params.register_name);
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
                                {
                                    <Divider/>
                                }
                            </>
                        )
                    })
                }
            </Paper>
        )
    }
}
