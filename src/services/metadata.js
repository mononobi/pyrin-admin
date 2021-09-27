import axios from 'axios';
import { fetchResponse } from './request';


export function getMainMetadata() {
    return fetchResponse(axios.get('metadata/'));
}

export function getCreateMetadata(registerName) {
    return fetchResponse(axios.get(`metadata/${registerName}/create/`));
}

export function getUpdateMetadata(registerName) {
    return fetchResponse(axios.get(`metadata/${registerName}/update/`));
}

export function getFindMetadata(registerName) {
    return fetchResponse(axios.get(`metadata/${registerName}/find/`));
}
