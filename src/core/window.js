const BASE_RATIO = 1.6;
const BASE_HEIGHT = 1200;
const BASE_WIDTH = 1920;

export function getMaxHeight(reducer, forSelectReducer, forSelect) {
    let height = window.screen.availHeight;
    let factor = window.screen.height / BASE_HEIGHT;
    reducer = reducer / factor;
    forSelectReducer = forSelectReducer / factor;

    let result = 0;
    if (!forSelect) {
        result = height - (reducer * height);
    }
    else {
        result = height - (forSelectReducer * height);
    }

    if (factor < 0.8) {
        result = result - 12;
    }
    else if (factor > 1.2) {
        result = result + 12;
    }

    return `${result}px`;
}
