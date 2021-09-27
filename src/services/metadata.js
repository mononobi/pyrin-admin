import * as request from './request';


export function getMainMetadata() {
    return request.get('metadata/');
}

export function getCreateMetadata(registerName) {
    return request.get(`metadata/${registerName}/create/`);
}

export function getUpdateMetadata(registerName) {
    return request.get(`metadata/${registerName}/update/`);
}

export function getFindMetadata(registerName) {
    return request.get(`metadata/${registerName}/find/`);
}
