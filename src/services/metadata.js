import { CONFIGS } from '../core/configs';


export function getMainMetadata() {
    return fetch(`${CONFIGS.admin_api}metadata/`)
        .then(response => response.json());
}

export function getCreateMetadata(registerName) {
    return fetch(`${CONFIGS.admin_api}metadata/${registerName}/create/`)
        .then(response => response.json());
}

export function getUpdateMetadata(registerName) {
    return fetch(`${CONFIGS.admin_api}metadata/${registerName}/update/`)
        .then(response => response.json());
}

export function getFindMetadata(registerName) {
    return fetch(`${CONFIGS.admin_api}metadata/${registerName}/find/`)
        .then(response => response.json());
}
