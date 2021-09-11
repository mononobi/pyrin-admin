import {CONFIGS} from '../core/configs';


export function find(registerName, page=null,
                     pageSize=null, orderBy=null,
                     orderDirection='asc', search=null) {
    let url = `${CONFIGS.admin_api}${registerName}/?${CONFIGS.page_key}=${page}&${CONFIGS.page_size_key}=${pageSize}`;
    if (orderBy) {
        let name = orderBy.field;
        if (name) {
            let sign = '';
            if (orderDirection === 'desc') {
                sign = '-';
            }
            name = `${sign}${name}`;
            url = `${url}&${CONFIGS.ordering_key}=${name}`;
        }
    }
    if (search) {
        url = `${url}&${CONFIGS.query_param}=${search}`
    }

    return fetch(url).then(response => response.json());
}
