import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { NotImplementedError } from '../../../core/exceptions';
import { BaseComponent } from '../base/base';
import './complex.css'


export class ComplexComponent extends BaseComponent {

    state = {
        metadata: {},
        isMetadataLoaded: false
    }

    _fetchMetadata() {
        throw new NotImplementedError();
    }

    _getMetadata(json) {
        return json;
    }

    componentDidMount() {
        let response = this._fetchMetadata();
        response.then(json => {
            this.setState({
                metadata: this._getMetadata(json),
                isMetadataLoaded: true})
        })

        super._componentDidMount();
    }

    render() {
        if (this.state.isMetadataLoaded)
        {
            return super.render()
        }
        else {
            return (
                <div className='page-loading'>
                    <LinearProgress color='primary'/>
                </div>
            )
        }
    }
}
