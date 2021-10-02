import { getClientTimezone } from './datetime';
import { getConfigs } from './configs';


export const QUERY_STRING = require('query-string');

export function addQueryParams(url, query) {
    let result = QUERY_STRING.parseUrl(url);
    for (const [key, value] of Object.entries((query))) {
        result.query[key] = value;
    }

    return QUERY_STRING.stringifyUrl(result, {arrayFormat: 'none'});
}

export function addTimezoneQueryParam(url) {
    let query = {};
    let configs = getConfigs();
    let timezone_key = configs['timezone_key'];
    if (timezone_key) {
        query[timezone_key] = getClientTimezone();
        return addQueryParams(url, query);
    }
    return url;
}
