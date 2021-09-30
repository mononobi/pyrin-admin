import { Component } from 'react';
import { NotImplementedError } from '../../../core/exceptions';
import { AlertSeverityEnum, AlertTypeEnum } from '../../../core/enumerations';
import { getAlert, getAlertInfo } from '../../controls/alert/provider';


export class BaseComponent extends Component {

    state = {
        alert: null
    }

    _render() {
        throw new NotImplementedError();
    }

    _componentDidMount() {}

    _removeAlert() {
        if (this.state.alert) {
            this.setState({
                alert: null
            });
        }
    }

    _hasError() {
        if (this.state.alert)
        {
            return this.state.alert.severity === AlertSeverityEnum.ERROR;
        }

        return false;
    }

    _setToastNotification(alert, severity) {
        this.setState({
            alert: getAlertInfo(alert, severity, AlertTypeEnum.TOAST)
        });
    }

    _setBannerNotification(alert, severity) {
        this.setState({
            alert: getAlertInfo(alert, severity, AlertTypeEnum.BANNER)
        });
    }

    _getAlert() {
        if (this.state.alert) {
            return getAlert(this.state.alert,
                () => {
                this._removeAlert();
            })
        }

        return null;
    }

    componentDidMount() {
        this._componentDidMount();
    }

    render() {
        return (
            <>
                {
                    this._getAlert()
                }
                {
                    this._render()
                }
            </>
        )
    }
}
