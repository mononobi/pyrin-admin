import { CONFIGS } from '../core/configs';
import { addListFiltersQueryString, addQueryParams } from '../core/query_string';


export function getListPage(registerName, filters=null) {
    let url = `${CONFIGS.panel_home_path}/${registerName}`;
    if (filters) {
        url = addQueryParams(url, filters);
    }
    return url;
}

export function getCreatePage(registerName, listFilters=null) {
    let url = `${CONFIGS.panel_home_path}/${registerName}/add`;
    if (listFilters) {
        url = addListFiltersQueryString(url, listFilters);
    }
    return url;
}

export function getUpdatePage(registerName, pk, listFilters=null) {
    let url = `${CONFIGS.panel_home_path}/${registerName}/${pk}`;
    if (listFilters) {
        url = addListFiltersQueryString(url, listFilters);
    }
    return url;
}
