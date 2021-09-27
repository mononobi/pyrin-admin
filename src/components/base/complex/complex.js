import React from 'react';
import { NotImplementedError } from '../../../core/exceptions';
import { BaseComponent } from '../base/base';
import { ProgressBar } from '../../controls/progress/progress';


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
        metadata.then(([json, ok]) => {
            if (!ok) {
                this.setState({
                    error: json,
                    isMetadataLoaded: false
                })
            }
            else {
                this.setState({
                    metadata: this._getMetadata(json),
                    isMetadataLoaded: true
                })

                if (this.REQUIRES_DATA && this._hasPermission()) {
                    let data = this._fetchData();
                    data.then(([json, ok]) => {
                        if (!ok) {
                            this.setState({
                                error: json,
                                isDataLoaded: false
                            })
                        }
                        else {
                            this.setState({
                                data: this._getData(json),
                                isDataLoaded: true
                            })
                        }
                    })
                }
            }
        })

        super._componentDidMount();
    }

    _prepareRendering() {}

    _finalRender() {
        throw new NotImplementedError();
    }

    _render() {
        if (this.state.isMetadataLoaded) {
            if (this._hasPermission()) {
                if (!this.REQUIRES_DATA || this.state.isDataLoaded) {
                    this._prepareRendering();
                    return this._finalRender();
                }
                else if (!this._hasError()) {
                    return <ProgressBar/>
                }
                else {
                    return null;
                }
            }
            else {
                return this._createAlert(
                    `You are not allowed to ${this.OPERATION_NAME} ${this._getPluralName()}`,
                    'warning');
            }
        }
        else if (!this._hasError()) {
            return <ProgressBar/>
        }
        else {
            return null;
        }
    }
}
