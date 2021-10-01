import { v4 as uuidv4 } from 'uuid';


const GLOBAL_STATE = {};
export const STATE_KEY_HOLDER = '_k_';

function deleteGlobalState(key) {
    if (GLOBAL_STATE[key] !== undefined) {
        delete GLOBAL_STATE[key];
    }
}

export function setGlobalState(value) {
    let key = uuidv4();
    GLOBAL_STATE[key] = value;
    return key;
}

export function getGlobalState(key) {
    let state = GLOBAL_STATE[key] || null;
    deleteGlobalState(key);
    return state;
}
