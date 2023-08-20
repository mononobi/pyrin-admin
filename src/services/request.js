import { addCommonQueryParams } from '../core/query_string';
import { axiosAdminAPI, axiosBaseAPI } from '../core/configs';


const METHOD_TO_FUNCTION_MAP = {
    'POST': post,
    'PATCH': patch,
    'PUT': put,
    'DELETE': delete_,
}

Object.freeze(METHOD_TO_FUNCTION_MAP)

function fetchResponse(request) {
    return request.then(response => {
        return [response.data, true];
    }).catch(error => {
        if (error.response) {
            return [error.response.data, false];
        }
        else {
            return [{message: error.message}, false];
        }
    });
}

function getRequestHeaders(data) {
    if (data instanceof FormData) {
        return {'Content-Type': 'multipart/form-data'};
    }

    return {'Content-Type': 'application/json'};
}

export function post(url, data, addCommonQuery=true, axiosAPI=null) {
    if (!axiosAPI) {
        axiosAPI = axiosAdminAPI
    }

    if (addCommonQuery) {
        url = addCommonQueryParams(url);
    }
    return fetchResponse(axiosAPI.post(url, data, { headers: getRequestHeaders(data)}));
}

export function patch(url, data, addCommonQuery=true, axiosAPI=null) {
    if (!axiosAPI) {
        axiosAPI = axiosAdminAPI
    }

    if (addCommonQuery) {
        url = addCommonQueryParams(url);
    }
    return fetchResponse(axiosAPI.patch(url, data, { headers: getRequestHeaders(data)}));
}

export function put(url, data, addCommonQuery=true, axiosAPI=null) {
    if (!axiosAPI) {
        axiosAPI = axiosAdminAPI
    }

    if (addCommonQuery) {
        url = addCommonQueryParams(url);
    }
    return fetchResponse(axiosAPI.put(url, data, { headers: getRequestHeaders(data)}));
}

export function get(url, addCommonQuery=true, axiosAPI=null) {
    if (!axiosAPI) {
        axiosAPI = axiosAdminAPI
    }

    if (addCommonQuery) {
        url = addCommonQueryParams(url);
    }
    return fetchResponse(axiosAPI.get(url));
}

export function delete_(url, addCommonQuery=true, axiosAPI=null) {
    if (!axiosAPI) {
        axiosAPI = axiosAdminAPI
    }

    if (addCommonQuery) {
        url = addCommonQueryParams(url);
    }
    return fetchResponse(axiosAPI.delete(url));
}


export function dynamicMethod(url, data, methodName, addCommonQuery=true, axiosAPI=null) {
    if (!axiosAPI) {
        axiosAPI = axiosBaseAPI
    }
    
    methodName = methodName?.toUpperCase()
    let method = METHOD_TO_FUNCTION_MAP[methodName]
    if (['POST', 'PUT', 'PATCH'].includes(methodName)) {
        return method(url, data, addCommonQuery, axiosAPI);
    }

    return method(url, addCommonQuery, axiosAPI);
}
