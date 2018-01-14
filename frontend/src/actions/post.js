import {api, headers} from './constants';


export const POSTS_IS_LOADING = 'POSTS_IS_LOADING';
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS';
export const POSTS_HAS_ERROR = 'POSTS_HAS_ERROR';
export const POST_UPDATE_SUCCESS = 'POST_UPDATE_SUCCESS';

export function postsIsLoading(isLoading) {
    return {
        type: POSTS_IS_LOADING,
        isLoading
    };
}

export function postsFetchDataSuccess(posts) {
    return {
        type: POSTS_FETCH_DATA_SUCCESS,
        posts
    };
}

export function postsHasError(hasError) {
    return {
        type: POSTS_HAS_ERROR,
        hasError
    };
}

export function postUpdateSuccess(post) {
    return {
        type: POST_UPDATE_SUCCESS,
        post
    };
}

export function fetchCategoryPosts(category) {
    return (dispatch) => {
        dispatch(postsIsLoading(true));
        fetch(`${api}/${category}/posts`, {headers})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(postsIsLoading(false));

                return response.json();
            })
            .then((posts) => dispatch(postsFetchDataSuccess(posts)))
            .catch(() => dispatch(postsHasError(true)));
    };
}

export function fetchPosts() {
    return (dispatch) => {
        dispatch(postsIsLoading(true));
        fetch(`${api}/posts`, {headers})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(postsIsLoading(false));

                return response.json();
            })
            .then((posts) => dispatch(postsFetchDataSuccess(posts)))
            .catch(() => dispatch(postsHasError(true)));
    };
}

export function updatePostVote(postId, option) {
    return (dispatch) => {
        dispatch(postsIsLoading(true));
        fetch(`${api}/posts/${postId}`, {
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

                dispatch(postsIsLoading(false));

                return response.json();
            })
            .then((post) => dispatch(postUpdateSuccess(post)))
    };
}