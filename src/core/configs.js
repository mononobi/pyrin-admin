import axios from 'axios';


const CONFIGS_KEY = 'configs';
export const CONFIGS = require('../settings/settings.json');
Object.freeze(CONFIGS);

axios.defaults.baseURL = CONFIGS.admin_api;
axios.defaults.timeout = CONFIGS.api_timeout;
axios.defaults.responseType = 'json';


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
            localStorage.setItem(CONFIGS_KEY, JSON.stringify(json));
        }
    });
}

export function getConfigs() {
    let configs = localStorage.getItem(CONFIGS_KEY);
    if (!configs) {
        loadConfigs();
        return {};
    }
    else {
        try {
            configs = JSON.parse(configs);
            return configs;
        }
        catch (error) {
            console.error(`Failed to load configs from local storage: ${error}`);
            loadConfigs();
        }
    }
    return {};
}
