import { CONFIGS } from './configs';


function getClientTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function formatDateTime(dateTime) {
    let options = {...CONFIGS.dateTimeFormat, timeZone: getClientTimezone()};
    return new Date(dateTime).toLocaleString([], options);
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString([], CONFIGS.dateFormat);
}

export function formatTime(time) {
    let options = {...CONFIGS.timeFormat, timeZone: getClientTimezone()};
    return new Date(time).toLocaleTimeString([], options);
}
