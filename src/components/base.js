import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { NotImplementedError } from '../core/exceptions';
import './base.css'


export class BaseComponent extends Component {

    state = {
        metadata: {},
        isMetadataLoaded: false
    }

    _fetchMetadata() {
        throw new NotImplementedError();
    }

    _render() {
        throw new NotImplementedError();
    }

    _getMetadata(json) {
        return json;
    }

    _componentDidMount() {}

    _prepareRendering() {}

    componentDidMount() {
        let response = this._fetchMetadata();
        response.then(json => {
            this.setState({
                metadata: this._getMetadata(json),
                isMetadataLoaded: true})
        })

        this._componentDidMount();
    }

    render() {
        if (this.state.isMetadataLoaded)
        {
            this._prepareRendering();
            return this._render();
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
