export function getMaxHeight(reducer, forSelectReducer, forSelect) {
    let height = window.screen.availHeight;
    if (!forSelect) {
        return `${height - (reducer * height)}px`;
    }
    return `${height - (forSelectReducer * height)}px`;
}
