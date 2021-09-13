import React from 'react';
import { getCreateMetadata } from '../../../services/metadata';
import { BaseComponent } from '../../base';


export class AddComponent extends BaseComponent {

    _fetchMetadata()
    {
        return getCreateMetadata(this.props.match.params.register_name);
    }

    _render() {
        return <div> ADD </div>
    }
}
