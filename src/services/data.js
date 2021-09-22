import { CONFIGS } from '../core/configs';


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


export function create(registerName, inputs) {
    let url = `${CONFIGS.admin_api}${registerName}/`;
    const data = new FormData();
    for (const [key, value] of Object.entries(inputs)) {
        data.append(key, value);
    }

    return fetch(url, {
        method: 'POST',
        body: data
    });
}


export function update(registerName, pk, inputs) {
    let url = `${CONFIGS.admin_api}${registerName}/${pk}/`;
    const data = new FormData();
    for (const [key, value] of Object.entries(inputs)) {
        data.append(key, value);
    }

    return fetch(url, {
        method: 'PATCH',
        body: data
    });
}


export function get(registerName, pk) {
    let url = `${CONFIGS.admin_api}${registerName}/${pk}/`;
    return fetch(url).then(response => response.json());
}
