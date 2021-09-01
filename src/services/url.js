import { CONFIGS } from '../core/configs';


export function getListPage(registerName) {
    return `${CONFIGS.panel_home_path}/${registerName}`;
}

export function getCreatePage(registerName) {
    return `${CONFIGS.panel_home_path}/${registerName}/add`;
}

export function getUpdatePage(registerName, pk) {
    return `${CONFIGS.panel_home_path}/${registerName}/${pk}`;
}
