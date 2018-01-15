import {api, headers} from './constants';
import {guid} from './utils';


export const COMMENTS_IS_LOADING = 'COMMENTS_IS_LOADING';
export const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS';
export const COMMENTS_HAS_ERROR = 'COMMENTS_HAS_ERROR';
export const COMMENT_UPDATE_SUCCESS = 'COMMENT_UPDATE_SUCCESS';
export const COMMENT_ADD_SUCCESS = 'COMMENT_ADD_SUCCESS';

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

export function commentUpdateSuccess(comment) {
    return {
        type: COMMENT_UPDATE_SUCCESS,
        comment
    };
}

export function commentAddSuccess(comment) {
    return {
        type: COMMENT_ADD_SUCCESS,
        comment
    };
}

export function addComment(comment) {
    return (dispatch) => {
        fetch(`${api}/comments`, {
            method: 'POST',
            body: JSON.stringify({...comment, timestamp: Date.now(), id: guid()}),
            headers
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response.json();
            })
            .then((comment) => dispatch(commentAddSuccess(comment)))
    };
}

export function updateComment(comment) {
    return (dispatch) => {
        fetch(`${api}/comments/${comment.id}`, {
            method: 'PUT',
            body: JSON.stringify({...comment}),
            headers
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response.json();
            })
            .then((comment) => dispatch(commentUpdateSuccess(comment)))
    };
}

export function updateCommentVote(commentId, option) {
    return (dispatch) => {
        fetch(`${api}/comments/${commentId}`, {
            method: 'POST',
            body: JSON.stringify({
                option: option
            }),
            headers
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response.json();
            })
            .then((comment) => dispatch(commentUpdateSuccess(comment)))
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