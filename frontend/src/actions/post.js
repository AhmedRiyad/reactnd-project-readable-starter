import {api, headers} from './constants';
import {guid} from './utils';


export const POSTS_IS_LOADING = 'POSTS_IS_LOADING';
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS';
export const POSTS_HAS_ERROR = 'POSTS_HAS_ERROR';
export const POST_IS_LOADING = 'POST_IS_LOADING';
export const POST_HAS_ERROR = 'POST_HAS_ERROR';
export const POST_UPDATE_SUCCESS = 'POST_UPDATE_SUCCESS';
export const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';
export const POST_ADD_SUCCESS = 'POST_ADD_SUCCESS';

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

export function postIsLoading(isLoading) {
    return {
        type: POST_IS_LOADING,
        isLoading
    };
}

export function postFetchDataSuccess(post) {
    return {
        type: POST_UPDATE_SUCCESS,
        post
    };
}

export function postHasError(hasError) {
    return {
        type: POST_HAS_ERROR,
        hasError
    };
}

export function postDeleteSuccess(post) {
    return {
        type: POST_DELETE_SUCCESS,
        post
    };
}

export function postUpdateSuccess(post) {
    return {
        type: POST_UPDATE_SUCCESS,
        post
    };
}

export function postAddSuccess(post) {
    return {
        type: POST_ADD_SUCCESS,
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

export function fetchPost(id) {
    return (dispatch) => {
        dispatch(postIsLoading(true));
        dispatch(postHasError(false));
        fetch(`${api}/posts/${id}`, {headers})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(postIsLoading(false));

                return response.json();
            })
            .then((posts) => dispatch(postFetchDataSuccess(posts)))
            .catch((e) => dispatch(postHasError(true)));
    };
}

export function addPost(post) {
    return (dispatch) => {
        fetch(`${api}/posts`, {
            method: 'POST',
            body: JSON.stringify({...post, timestamp: Date.now(), id: guid()}),
            headers
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response.json();
            })
            .then((post) => dispatch(postAddSuccess(post)))
    };
}

export function deletePost(id) {
    return (dispatch) => {
        fetch(`${api}/posts/${id}`, {
            method: 'DELETE',
            headers
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response.json();
            })
            .then((posts) => dispatch(postDeleteSuccess(posts)))
    };
}

export function updatePost(post) {
    return (dispatch) => {
        fetch(`${api}/posts/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify({...post}),
            headers
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response.json();
            })
            .then((post) => dispatch(postUpdateSuccess(post)))
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

                return response.json();
            })
            .then((post) => dispatch(postUpdateSuccess(post)))
    };
}