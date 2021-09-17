import React from 'react';
import { getUpdateMetadata } from '../../../services/metadata';
import { BaseComplexPage } from '../base/base';


export class EditComponent extends BaseComplexPage {

    _fetchMetadata()
    {
        return getUpdateMetadata(this.props.match.params.register_name);
    }

    _render() {
        return <div> EDIT {this.props.match.params.register_name} - {this.props.match.params.pk} </div>
    }
}
