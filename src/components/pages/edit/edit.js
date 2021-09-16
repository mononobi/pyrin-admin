import React from 'react';
import { getUpdateMetadata } from '../../../services/metadata';
import { ComplexComponent } from '../../base/complex/complex';


export class EditComponent extends ComplexComponent {

    _fetchMetadata()
    {
        return getUpdateMetadata(this.props.match.params.register_name);
    }

    _render() {
        return <div> EDIT {this.props.match.params.register_name} - {this.props.match.params.pk} </div>
    }
}
