import { CONFIGS } from '../core/configs';
import { STATE_KEY_HOLDER } from '../core/state';


export function getListPage(registerName, stateKey=null) {
    return `${CONFIGS.panel_home_path}/${registerName}${Boolean(stateKey)? `?${STATE_KEY_HOLDER}=${stateKey}`: ''}`;
}

export function getCreatePage(registerName) {
    return `${CONFIGS.panel_home_path}/${registerName}/add`;
}

export function getUpdatePage(registerName, pk) {
    return `${CONFIGS.panel_home_path}/${registerName}/${pk}`;
}
