import React from 'react';
import { getUpdateMetadata} from '../services/metadata';
import { BaseComponent } from './base';


export class EditComponent extends BaseComponent {

    _fetchMetadata()
    {
        return getUpdateMetadata(this.props.match.params.register_name);
    }

    render() {
        return <div> EDIT {this.props.match.params.register_name} - {this.props.match.params.pk} </div>
    }
}
