import React from 'react';
import { NotImplementedError } from '../../../core/exceptions';
import { BaseComponent } from '../base/base';
import { ProgressBar } from '../../controls/progress/progress';
import { AlertSeverityEnum } from '../../../core/enumerations';
import { setConfigs } from '../../../core/configs';


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

    _getName() {
        throw new NotImplementedError();
    }

    _getRegisterName() {
        throw new NotImplementedError();
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
                    isMetadataLoaded: false
                });
                this._setBannerNotification(json, AlertSeverityEnum.ERROR);
            }
            else {
                setConfigs(json.configs);
                let info = this._getMetadata(json);
                this._prepareMetadata(info);
                // we should set metadata directly to prevent early re-rendering.
                this.state.metadata = info;
                if (!this._hasPermission()) {
                    this._setBannerNotification(
                        `You are not allowed to ${this.OPERATION_NAME} ${this._getPluralName()}.`,
                        AlertSeverityEnum.WARNING)
                }
                else {
                    this.setState({
                        isMetadataLoaded: true
                    });

                    if (this.REQUIRES_DATA) {
                        let data = this._fetchData();
                        data.then(([json, ok]) => {
                            if (!ok) {
                                this.setState({
                                    isDataLoaded: false
                                });
                                this._setBannerNotification(json, AlertSeverityEnum.ERROR);
                            }
                            else {
                                this.setState({
                                    data: this._getData(json),
                                    isDataLoaded: true
                                });
                            }
                        })
                    }
                }
            }
        });

        this._componentDidMount();
    }

    _prepareMetadata(metadata) {}

    _finalRender() {
        throw new NotImplementedError();
    }

    _render() {
        if (this.state.isMetadataLoaded) {
            if (!this.REQUIRES_DATA || this.state.isDataLoaded) {
                return this._finalRender();
            }
            else if (!this._hasError()) {
                return <ProgressBar/>
            }
            else {
                return null;
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
