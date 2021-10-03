import * as request from './request';


export function getMainMetadata() {
    return request.get('metadata/', false);
}

export function getCreateMetadata(registerName) {
    return request.get(`metadata/${registerName}/create/`, false);
}

export function getUpdateMetadata(registerName) {
    return request.get(`metadata/${registerName}/update/`, false);
}

export function getFindMetadata(registerName) {
    return request.get(`metadata/${registerName}/find/`, false);
}
