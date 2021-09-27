import { Component } from 'react';
import { Alert } from '@material-ui/lab';
import { Slide } from '@material-ui/core';
import { NotImplementedError } from '../../../core/exceptions';
import { JSTypeEnum } from '../../../validators/enumerations';
import { AlertSeverityEnum } from '../../../core/enumerations';


export class BaseComponent extends Component {

    state = {
        alert: null
    }

    _render() {
        throw new NotImplementedError();
    }

    _componentDidMount() {}

    componentDidMount() {
        this._componentDidMount();
    }

    _getAlertInfo(alert, severity) {
        let message = alert;
        let data = null;
        if (typeof alert === JSTypeEnum.OBJECT) {
            message = alert.message;
            data = alert.data;
        }
        return {
            severity: severity,
            message: message,
            data: data
        };
    }

    _createAlert(message, severity) {
        if (!message) {
            message = 'An error has been occurred.';
        }

        if (message.slice(-1) !== '.') {
            message = `${message}.`;
        }

        return (
            <>
                <Slide direction='down' in={true} mountOnEnter unmountOnExit>
                    <Alert variant='filled' severity={severity}>{message}</Alert>
                </Slide>
            </>
        )
    }

    _hasError() {
        if (this.state.alert)
        {
            return this.state.alert.severity === AlertSeverityEnum.ERROR;
        }

        return false;
    }

    _setAlert(alert, severity) {
        this.setState({
            alert: this._getAlertInfo(alert, severity)
        });
    }

    _setError(alert) {
        this._setAlert(alert, AlertSeverityEnum.ERROR);
    }

    _setWarning(alert) {
        this._setAlert(alert, AlertSeverityEnum.WARNING);
    }

    _setInfo(alert) {
        this._setAlert(alert, AlertSeverityEnum.INFO);
    }

    _setSuccess(alert) {
        this._setAlert(alert, AlertSeverityEnum.SUCCESS);
    }

    _getAlert() {
        if (this.state.alert) {
            return this._createAlert(this.state.alert.message, this.state.alert.severity);
        }

        return null;
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
