import axios from 'axios';
import { CONFIGS } from '../core/configs';
import { fetchResponse, getRequestHeaders } from './request';


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

    return fetchResponse(axios.get(url));
}

export function create(registerName, inputs) {
    let url = `${registerName}/`;
    const data = new FormData();
    for (const [key, value] of Object.entries(inputs)) {
        data.append(key, value);
    }

    return fetchResponse(axios.post(url, data, { headers: getRequestHeaders()}));
}

export function update(registerName, pk, inputs) {
    let url = `${registerName}/${pk}/`;
    const data = new FormData();
    for (const [key, value] of Object.entries(inputs)) {
        data.append(key, value);
    }

    return fetchResponse(axios.patch(url, data, { headers: getRequestHeaders()}));
}

export function get(registerName, pk) {
    let url = `${registerName}/${pk}/`;
    return fetchResponse(axios.get(url));
}
