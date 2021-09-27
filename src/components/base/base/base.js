import { Component } from 'react';
import { Alert } from '@material-ui/lab';
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

    _getAlert() {
        if (this.state.error) {
            return <Alert severity='error'>{this.state.error.message}</Alert>
        }
        else if (this.state.warning) {
            return <Alert severity='warning'>{this.state.warning}</Alert>
        }
        else if (this.state.success) {
            return <Alert severity='success'>{this.state.success}</Alert>
        }
        else if (this.state.info) {
            return <Alert severity='info'>{this.state.info}</Alert>
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
