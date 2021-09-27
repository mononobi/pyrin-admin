import axios from 'axios';


export const CONFIGS = require('../settings/settings.json');
Object.freeze(CONFIGS);

axios.defaults.baseURL = CONFIGS.admin_api;
axios.defaults.timeout = CONFIGS.api_timeout;
axios.defaults.responseType = 'json';
