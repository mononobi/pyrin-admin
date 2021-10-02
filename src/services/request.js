import axios from 'axios';
import { addTimezoneQueryParam } from '../core/query_string';


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

function getRequestHeaders() {
    return {'Content-Type': 'multipart/form-data'};
}

export function post(url, data) {
    url = addTimezoneQueryParam(url);
    return fetchResponse(axios.post(url, data, { headers: getRequestHeaders()}));
}

export function patch(url, data) {
    url = addTimezoneQueryParam(url);
    return fetchResponse(axios.patch(url, data, { headers: getRequestHeaders()}));
}

export function get(url) {
    url = addTimezoneQueryParam(url);
    return fetchResponse(axios.get(url));
}

export function delete_(url) {
    url = addTimezoneQueryParam(url);
    return fetchResponse(axios.delete(url));
}
