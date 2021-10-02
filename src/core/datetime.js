export function getClientTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || undefined;
}

export function formatDateTime(dateTime, format, locale) {
    let options = {...format, timeZone: getClientTimezone()};
    return new Date(dateTime).toLocaleString(locale || [], options);
}

export function formatDate(date, format, locale) {
    return new Date(date).toLocaleDateString(locale || [], format);
}

export function formatTime(time, format, locale) {
    let options = {...format, timeZone: getClientTimezone()};
    return new Date(time).toLocaleTimeString(locale || [], options);
}

export function isValidDate(value) {
    if (!value) {
        return false;
    }

    if (Object.prototype.toString.call(value) === '[object Date]') {
        return !isNaN(value.getTime());
    }
    else {
        return false;
    }
}

export function getTimeString(time) {
    return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;
}

export function getDateString(date) {
    return `${date.getFullYear().toString().padStart(4, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

export function getDateTimeString(datetime) {
    return `${getDateString(datetime)}T${getTimeString(datetime)}`;
}
