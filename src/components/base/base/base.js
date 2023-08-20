import { Component } from 'react';
import { NotImplementedError } from '../../../core/exceptions';
import { AlertSeverityEnum, AlertTypeEnum } from '../../../core/enumerations';
import { getAlert, getAlertInfo } from '../../controls/alert/provider';
import { getConfirmDialog, getConfirmDialogInfo } from '../../controls/dialogs/provider';
import { ConfirmActionDialog, ConfirmDeleteDialog } from '../../controls/dialogs/confirm';


export class BaseComponent extends Component {

    state = {
        alert: null,
        confirmDialog: null
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

    _removeConfirmDialog() {
        if (this.state.confirmDialog) {
            this.setState({
                confirmDialog: null
            });
        }
    }

    _hasError() {
        if (this.state.alert)
        {
            return this.state.alert.severity === AlertSeverityEnum.ERROR ||
                this.state.alert.type === AlertTypeEnum.BANNER;
        }

        return false;
    }

    _setConfirmDialog(dialogInfo) {
        this.setState({
            confirmDialog: dialogInfo
        });
    }

    _setConfirmDeleteDialog(title, handleAccept) {
        let dialogInfo = getConfirmDialogInfo(
            title, () => {
                this._removeConfirmDialog();
                handleAccept();
            }, () => {
                this._removeConfirmDialog();
            },
            ConfirmDeleteDialog);
        this._setConfirmDialog(dialogInfo);
    }

    _setConfirmActionDialog(title, handleAccept, importantAction=false) {
        let dialogInfo = getConfirmDialogInfo(
            title, () => {
                this._removeConfirmDialog();
                handleAccept();
            }, () => {
                this._removeConfirmDialog();
            },
            ConfirmActionDialog, importantAction);
        this._setConfirmDialog(dialogInfo);
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

    _getConfirmDialog() {
        if (this.state.confirmDialog) {
            return getConfirmDialog(this.state.confirmDialog);
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
                    this._getConfirmDialog()
                }
                {
                    this._render()
                }
            </>
        )
    }
}
