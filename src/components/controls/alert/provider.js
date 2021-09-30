import { JSTypeEnum } from '../../../validators/enumerations';
import { AlertTypeEnum } from '../../../core/enumerations';
import { ToastNotification } from './toast';
import { BannerNotification } from './banner';


export function getAlertInfo(alert, severity, type) {
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
        type: type
    };
}

export function getAlert(alert, closeHandler=null) {
    if (alert.type === AlertTypeEnum.TOAST) {
        return <ToastNotification alert={alert} closeHandler={closeHandler}/>
    }
    else if (alert.type === AlertTypeEnum.BANNER) {
        return <BannerNotification alert={alert}/>
    }
    return null;
}
