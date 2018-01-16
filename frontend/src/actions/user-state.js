export const POSTS_SORTING_CHANGED = 'POSTS_SORTING_CHANGED';

export function postsSortingChanged(key) {
    return {
        type: POSTS_SORTING_CHANGED,
        key
    };
}


export function changeSortingKey(key) {
    return (dispatch) => {
        dispatch(postsSortingChanged(key));
    };
}