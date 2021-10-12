import { v4 as uuidv4 } from 'uuid';
import { deleteKey } from './helpers';


const GLOBAL_STATE = {};
export const STATE_KEY_HOLDER = '_k_';

function deleteGlobalState(key) {
    deleteKey(key, GLOBAL_STATE);
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
