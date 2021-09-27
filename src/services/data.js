import { CONFIGS } from '../core/configs';
import * as request from './request';


export function find(registerName, page=null,
                     pageSize=null, orderBy=null,
                     orderDirection='asc', search=null) {
    let url = `${registerName}/?${CONFIGS.page_key}=${page}&${CONFIGS.page_size_key}=${pageSize}`;
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

    return request.get(url);
}

export function create(registerName, inputs) {
    let url = `${registerName}/`;
    const data = new FormData();
    for (const [key, value] of Object.entries(inputs)) {
        data.append(key, value);
    }

    return request.post(url, data);
}

export function update(registerName, pk, inputs) {
    let url = `${registerName}/${pk}/`;
    const data = new FormData();
    for (const [key, value] of Object.entries(inputs)) {
        data.append(key, value);
    }

    return request.patch(url, data);
}

export function get(registerName, pk) {
    let url = `${registerName}/${pk}/`;
    return request.get(url);
}

export function delete_(registerName, pk) {
    let url = `${registerName}/${pk}/`;
    return request.delete_(url);
}

export function deleteAll(registerName) {
    let url = `${registerName}/`;
    return request.delete_(url);
}

export function deleteBulk(registerName, primaryKeys) {
    let url = `${registerName}/bulk/?`;
    let pk = '';
    for (let i = 0; i < primaryKeys.length; i++) {
        if (i === 0) {
            pk = `${pk}pk=${primaryKeys[i]}`;
        }
        else {
            pk = `${pk}&pk=${primaryKeys[i]}`;
        }
    }
    url = `${url}${pk}`;
    return request.delete_(url);
}
