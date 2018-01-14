import {api, headers} from './constants';


export const COMMENTS_IS_LOADING = 'COMMENTS_IS_LOADING';
export const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS';
export const COMMENTS_HAS_ERROR = 'COMMENTS_HAS_ERROR';

export function commentsIsLoading(isLoading) {
    return {
        type: COMMENTS_IS_LOADING,
        isLoading
    };
}

export function commentsFetchDataSuccess(comments) {
    return {
        type: COMMENTS_FETCH_DATA_SUCCESS,
        comments
    };
}

export function commentsHasError(hasError) {
    return {
        type: COMMENTS_HAS_ERROR,
        hasError
    };
}

export function fetchPostComments(postId) {
    return (dispatch) => {
        dispatch(commentsIsLoading(true));
        fetch(`${api}/posts/${postId}/comments`, {headers})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(commentsIsLoading(false));

                return response.json();
            })
            .then((data) => dispatch(commentsFetchDataSuccess(data)))
            .catch(() => dispatch(commentsHasError(true)));
    };
}