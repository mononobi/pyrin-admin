export function set(key, value) {
    try {
        localStorage.setItem(key, value);
    }
    catch (error) {
        console.error(`Failed to set item in local storage: [${key}] [${error}]`);
    }
}

export function get(key) {
    try {
        return localStorage.getItem(key);
    }
    catch (error) {
        console.error(`Failed to get item from local storage: [${key}] [${error}]`);
        return undefined;
    }
}

export function remove(key) {
    try {
        localStorage.removeItem(key);
    }
    catch (error) {
        console.error(`Failed to remove item from local storage: [${key}] [${error}]`);
    }
}
