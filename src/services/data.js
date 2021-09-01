import {CONFIGS} from '../core/configs';


export function getListData(registerName, page=null, pageSize=null) {
    let url = `${CONFIGS.admin_api}${registerName}/?${CONFIGS.page_key}=${page}&${CONFIGS.page_size_key}=${pageSize}`;
    return fetch(url).then(response => response.json());
}
