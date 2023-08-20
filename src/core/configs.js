import axios from 'axios';
import * as storage from './local_storage';


const CONFIGS_KEY = 'configs';
const DEFAULT_CONFIGS = {
    panel_home_path: '/admin',
    panel_name: 'Admin Panel',
    base_api: 'http://127.0.0.1:5000/',
    admin_api: 'http://127.0.0.1:5000/admin/api/',
    api_timeout: '20000',
    api_locale: 'en'
};

Object.freeze(DEFAULT_CONFIGS);

export const CONFIGS = {
    panel_home_path: process.env.REACT_APP_PANEL_HOME_PATH || DEFAULT_CONFIGS.panel_home_path,
    panel_name: process.env.REACT_APP_PANEL_NAME || DEFAULT_CONFIGS.panel_name,
    base_api: process.env.REACT_APP_BASE_API || DEFAULT_CONFIGS.base_api,
    admin_api: process.env.REACT_APP_ADMIN_API || DEFAULT_CONFIGS.admin_api,
    api_timeout: process.env.REACT_APP_API_TIMEOUT || DEFAULT_CONFIGS.api_timeout,
    api_locale: process.env.REACT_APP_API_LOCALE || DEFAULT_CONFIGS.api_locale
};

Object.freeze(CONFIGS);

axios.defaults.timeout = Number(CONFIGS.api_timeout);
axios.defaults.responseType = 'json';
axios.defaults.timeoutErrorMessage = 'The request has been timed out.'
axios.defaults.withCredentials = false

export const axiosBaseAPI = axios.create({
    baseURL: CONFIGS.base_api
});

export const axiosAdminAPI = axios.create({
    baseURL: CONFIGS.admin_api
});

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

function loadConfigs() {
    let response = fetchResponse(axios.get('metadata/configs/'));
    response.then(([json, ok]) => {
        if (!ok) {
            console.error(`Failed to fetch configs from server: ${JSON.stringify(json)}`);
        }
        else {
            storage.set(CONFIGS_KEY, JSON.stringify(json));
        }
    });
}

export function getConfigs() {
    let configs = storage.get(CONFIGS_KEY);
    if (configs) {
        try {
            configs = JSON.parse(configs);
            return configs;
        }
        catch (error) {
            console.error(`Failed to parse configs from local storage: ${error}`);
        }
    }
    loadConfigs();
    return {};
}

export function setConfigs(configs) {
    storage.set(CONFIGS_KEY, JSON.stringify(configs));
}
