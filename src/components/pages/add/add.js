import React from 'react';
import { getCreateMetadata } from '../../../services/metadata';
import { BaseComponent } from '../../base';


export class AddComponent extends BaseComponent {

    render() {
        return <div> ADD </div>
    }

    _fetchMetadata()
    {
        return getCreateMetadata(this.props.match.params.register_name);
    }
}
