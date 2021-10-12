import { getClientTimezone } from './datetime';
import { CONFIGS, getConfigs } from './configs';


export const QUERY_STRING = require('query-string');

export function getPageKey(configs) {
    return configs['page_key'];
}

export function getPageSizeKey(configs) {
    return configs['page_size_key'];
}

export function getLocaleKey(configs) {
    return configs['locale_key'];
}

export function getTimezoneKey(configs) {
    return configs['timezone_key'];
}

export function getOrderingKey(configs) {
    return configs['ordering_key'];
}

export function getSearchParamKey(configs) {
    return configs['search_param'];
}

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
    let localeKey = getLocaleKey(configs);
    if (localeKey) {
        query[localeKey] = CONFIGS.api_locale;
    }

    let timezoneKey = getTimezoneKey(configs);
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
    let pageKey = getPageKey(configs);
    let pageSizeKey = getPageSizeKey(configs);
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
    let orderingKey = getOrderingKey(configs);
    if (orderingKey) {
        query[orderingKey] = orderBy;
        return addQueryParams(url, query);
    }
    return url;
}

export function addSearchQueryParam(url, text) {
    let query = {};
    let configs = getConfigs();
    let searchParam = getSearchParamKey(configs);
    if (searchParam) {
        query[searchParam] = text;
        return addQueryParams(url, query);
    }
    return url;
}
