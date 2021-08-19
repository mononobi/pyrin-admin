import { CONFIGS } from '../configs';


export function getListPage(register_name) {
    return CONFIGS.panel_home_path + '/' + register_name;
}

export function getCreatePage(register_name) {
    return CONFIGS.panel_home_path + '/' + register_name + '/add';
}

export function getUpdatePage(register_name, pk) {
    return CONFIGS.panel_home_path + '/' + register_name + '/' + pk;
}
