const BASE_AVAILABLE_HEIGHT = 1127;
const MIN_HEIGHT = 300;
const BASE_RATIO = 1.6;
const BASE_HEIGHT = 1200;
const BASE_WIDTH = 1920;

export function getMaxHeight(reducer, forSelectReducer, forSelect) {
    let height = window.screen.availHeight;
    let factor = height / BASE_AVAILABLE_HEIGHT;
    reducer = reducer / factor;
    forSelectReducer = forSelectReducer / factor;
    let result = 0;
    if (!forSelect) {
        result = height - (reducer * height);
    }
    else {
        result = height - (forSelectReducer * height);
    }

    if (result < MIN_HEIGHT) {
        result = MIN_HEIGHT;
    }

    return `${result}px`;
}
