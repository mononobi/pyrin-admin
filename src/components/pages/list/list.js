import React from 'react';
import { getFindMetadata} from '../../../services/metadata';
import { BaseComponent } from '../../base';


export class ListComponent extends BaseComponent {

    _fetchMetadata()
    {
        return getFindMetadata(this.props.match.params.register_name);
    }

    render() {
        return <div> LIST </div>
    }
}
