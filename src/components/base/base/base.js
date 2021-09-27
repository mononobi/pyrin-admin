import { Component } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Slide } from '@material-ui/core';
import { NotImplementedError } from '../../../core/exceptions';


export class BaseComponent extends Component {

    state = {
        error: null,
        warning: null,
        info: null,
        success: null
    }

    _render() {
        throw new NotImplementedError();
    }

    _componentDidMount() {}

    componentDidMount() {
        this._componentDidMount();
    }

    _removeAlerts() {
        this.setState({
            error: null,
            warning: null,
            info: null,
            success: null
        })
    }

    _createAlert(message, severity, title) {
        if (!message) {
            message = 'An error has been occurred.';
        }
        if (message.slice(-1) !== '.') {
            message = `${message}.`;
        }
        return (
            <>
                <Slide direction='down' in={true} mountOnEnter unmountOnExit>
                    <Alert variant='filled' severity={severity}>
                        <AlertTitle>{title}</AlertTitle>
                        {message}
                    </Alert>
                </Slide>
            </>
        )
    }

    _getAlert() {
        if (this.state.error) {
            return this._createAlert(this.state.error.message, 'error', 'Error');
        }
        else if (this.state.warning) {
            return this._createAlert(this.state.warning, 'warning', 'Warning');
        }
        else if (this.state.success) {
            return this._createAlert(this.state.success, 'success', 'Success');
        }
        else if (this.state.info) {
            return this._createAlert(this.state.info, 'info', 'Info');
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
