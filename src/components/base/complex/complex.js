import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { NotImplementedError } from '../../../core/exceptions';
import { BaseComponent } from '../base/base';
import './complex.css'


export class ComplexComponent extends BaseComponent {

    REQUIRES_DATA = false;
    OPERATION_NAME = null;

    state = {
        metadata: {},
        isMetadataLoaded: false,
        data: null,
        isDataLoaded: false
    }

    _hasPermission() {
        return true;
    }

    _getPluralName() {
        throw new NotImplementedError();
    }

    _fetchData() {
        throw new NotImplementedError();
    }

    _fetchMetadata() {
        throw new NotImplementedError();
    }

    _getData(json) {
        return json;
    }

    _getMetadata(json) {
        return json;
    }

    componentDidMount() {
        let metadata = this._fetchMetadata();
        metadata.then(json => {
            this.setState({
                metadata: this._getMetadata(json),
                isMetadataLoaded: true})
        })

        if (this.REQUIRES_DATA) {
            let data = this._fetchData();
            data.then(json => {
                this.setState({
                    data: this._getData(json),
                    isDataLoaded: true
                })
            })
        }

        super._componentDidMount();
    }

    render() {
        if (this.state.isMetadataLoaded && (!this.REQUIRES_DATA || this.state.isDataLoaded))
        {
            if (this._hasPermission()) {
                return super.render();
            }
            else {
                return <h3>You are not allowed to {this.OPERATION_NAME} {this._getPluralName()}!</h3>;
            }
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
