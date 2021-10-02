function getClientTimezone() {
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
