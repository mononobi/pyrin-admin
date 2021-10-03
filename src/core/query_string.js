import { getClientTimezone } from './datetime';
import { CONFIGS, getConfigs } from './configs';


export const QUERY_STRING = require('query-string');

export function addQueryParams(url, query) {
    let result = QUERY_STRING.parseUrl(url);
    for (const [key, value] of Object.entries((query))) {
        result.query[key] = value;
    }
    return QUERY_STRING.stringifyUrl(result, {arrayFormat: 'none'});
}

export function addCommonQueryParams(url) {
    let query = {};
    let configs = getConfigs();
    let localeKey = configs['locale_key'];
    if (localeKey) {
        query[localeKey] = CONFIGS.api_locale;
    }

    let timezoneKey = configs['timezone_key'];
    if (timezoneKey) {
        query[timezoneKey] = getClientTimezone();
    }
    if (Object.keys(query).length > 0) {
        return addQueryParams(url, query);
    }
    return url;
}

export function addPagingQueryParam(url, page, pageSize) {
    let query = {};
    let configs = getConfigs();
    let pageKey = configs['page_key'];
    let pageSizeKey = configs['page_size_key'];
    if (pageKey) {
        query[pageKey] = page;
    }
    if (pageSizeKey) {
        query[pageSizeKey] = pageSize;
    }
    if (Object.keys(query).length > 0) {
        return addQueryParams(url, query);
    }
    return url;
}

export function addOrderingQueryParam(url, orderBy) {
    let query = {};
    let configs = getConfigs();
    let orderingKey = configs['ordering_key'];
    if (orderingKey) {
        query[orderingKey] = orderBy;
        return addQueryParams(url, query);
    }
    return url;
}

export function addSearchQueryParam(url, text) {
    let query = {};
    let configs = getConfigs();
    let searchParam = configs['search_param'];
    if (searchParam) {
        query[searchParam] = text;
        return addQueryParams(url, query);
    }
    return url;
}
