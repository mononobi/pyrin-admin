import * as request from './request';
import { addOrderingQueryParam, addPagingQueryParam,
    addQueryParams, addSearchQueryParam
} from '../core/query_string';


export function find(registerName, page=null,
                     pageSize=null, orderBy=null,
                     orderDirection='asc', search=null,
                     filters=null) {
    let url = `${registerName}/`;
    if (filters) {
        url = addQueryParams(url, filters);
    }
    url = addPagingQueryParam(url, page, pageSize);
    if (orderBy) {
        let name = orderBy.field;
        if (name) {
            let sign = '';
            if (orderDirection === 'desc') {
                sign = '-';
            }
            name = `${sign}${name}`;
            url = addOrderingQueryParam(url, name);
        }
    }
    if (search) {
        url = addSearchQueryParam(url, search);
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
    let url = `${registerName}/bulk/`;
    let query = {pk: primaryKeys};
    url = addQueryParams(url, query);
    return request.delete_(url);
}
