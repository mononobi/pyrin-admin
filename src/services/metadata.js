import { CONFIGS } from '../configs'


export function getMainMetadata() {
    return fetch(CONFIGS.admin_api + 'metadata/')
        .then(response => response.json());
}
