import React, { Component } from 'react';
import { NotImplementedError } from '../core/exceptions';


export class BaseComponent extends Component {

    state = {
        metadata: {},
        isMetadataLoaded: false
    }

    _fetchMetadata()
    {
        throw new NotImplementedError();
    }

    _getMetadata(json)
    {
        return json;
    }

    _componentDidMount() {}

    _render() {
        return <></>
    }

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
            return this._render();
        }
        else {
            return <div> LOADING... </div>
        }
    }
}
