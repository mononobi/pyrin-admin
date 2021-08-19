import { CONFIGS } from '../configs';


export function getMainMetadata() {
    return fetch(CONFIGS.admin_api + 'metadata/')
        .then(response => response.json());
}

export function getCreateMetadata(register_name) {
    return fetch(CONFIGS.admin_api + 'metadata/' + register_name + '/create/')
        .then(response => response.json());
}

export function getUpdateMetadata(register_name) {
    return fetch(CONFIGS.admin_api + 'metadata/' + register_name + '/update/')
        .then(response => response.json());
}

export function getFindMetadata(register_name) {
    return fetch(CONFIGS.admin_api + 'metadata/' + register_name + '/find/')
        .then(response => response.json());
}
