import { Component } from 'react';
import { Alert } from '@material-ui/lab';
import { Slide } from '@material-ui/core';
import { Snackbar } from '@mui/material';
import { NotImplementedError } from '../../../core/exceptions';
import { JSTypeEnum } from '../../../validators/enumerations';
import { AlertSeverityEnum } from '../../../core/enumerations';


export class BaseComponent extends Component {

    ALERT_EXPIRE = 5000;

    state = {
        alert: null
    }

    _render() {
        throw new NotImplementedError();
    }

    _componentDidMount() {}

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
            data: data,
            created: Date.now()
        };
    }

    _removeAlert() {
        if (this.state.alert) {
            this.setState({
                alert: null
            });
        }
    }

    _createAlert(message, severity) {
        if (!message) {
            message = 'An error has been occurred.';
        }

        if (message.slice(-1) !== '.') {
            message = `${message}.`;
        }

        return (
                <Snackbar open={Boolean(this.state.alert)} autoHideDuration={this.ALERT_EXPIRE} key={'alert-toast'}
                          TransitionComponent={Slide} sx={{width: '60%'}}
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                          onClose={() => {
                              this._removeAlert();
                          }}
                          TransitionProps={{
                              direction: 'up', in: true,
                              mountOnEnter: true, unmountOnExit: true}}>
                    <Alert variant='filled' severity={severity} sx={{width: '100%'}}>
                        {message}
                    </Alert>
                </Snackbar>
        )
    }

    _isAlertExpired() {
        if (this.state.alert) {
            return Date.now() - this.state.alert.created > this.ALERT_EXPIRE;
        }
        return true;
    }

    _hasError() {
        if (!this._isAlertExpired())
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
        if (!this._isAlertExpired()) {
            return this._createAlert(this.state.alert.message, this.state.alert.severity);
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
