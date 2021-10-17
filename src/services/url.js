import { CONFIGS } from '../core/configs';
import { addQueryParams } from '../core/query_string';


export function getListPage(registerName, filters=null) {
    let url = `${CONFIGS.panel_home_path}/${registerName}`;
    if (filters) {
        url = addQueryParams(url, filters);
    }
    return url;
}

export function getCreatePage(registerName) {
    return `${CONFIGS.panel_home_path}/${registerName}/add`;
}

export function getUpdatePage(registerName, pk) {
    return `${CONFIGS.panel_home_path}/${registerName}/${pk}`;
}
