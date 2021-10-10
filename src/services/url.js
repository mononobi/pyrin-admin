import { CONFIGS } from '../core/configs';
import { STATE_KEY_HOLDER } from '../core/state';
import { addQueryParams } from '../core/query_string';


export function getListPage(registerName, stateKey=null, filters=null) {
    let url = `${CONFIGS.panel_home_path}/${registerName}`;
    if (filters) {
        url = addQueryParams(url, filters);
    }
    if (stateKey) {
        let stateHolder = {};
        stateHolder[STATE_KEY_HOLDER] = stateKey;
        url = addQueryParams(url, stateHolder);
    }
    return url;
}

export function getCreatePage(registerName) {
    return `${CONFIGS.panel_home_path}/${registerName}/add`;
}

export function getUpdatePage(registerName, pk) {
    return `${CONFIGS.panel_home_path}/${registerName}/${pk}`;
}
