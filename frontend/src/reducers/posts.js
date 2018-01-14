import {combineReducers} from 'redux';
import {
    POST_FETCH_DATA_SUCCESS,
    POST_HAS_ERROR,
    POST_IS_LOADING,
    POST_UPDATE_SUCCESS,
    POSTS_FETCH_DATA_SUCCESS,
    POSTS_HAS_ERROR,
    POSTS_IS_LOADING
} from '../actions/post';

function isPostsLoading(state = false, action) {
    switch (action.type) {
        case POSTS_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

function isPostLoading(state = false, action) {
    switch (action.type) {
        case POST_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

function postsHasError(state = false, action) {
    switch (action.type) {
        case POSTS_HAS_ERROR:
            return action.hasError;

        default:
            return state;
    }
}

function postHasError(state = false, action) {
    switch (action.type) {
        case POST_HAS_ERROR:
            return action.hasError;

        default:
            return state;
    }
}

function items(state = [], action) {
    switch (action.type) {
        case POSTS_FETCH_DATA_SUCCESS:
            return action.posts.reduce(function (acc, cur) {
                acc[cur.id] = cur;
                return acc;
            }, {});

        case POST_FETCH_DATA_SUCCESS: {
            return {...state, [action.post.id]: action.post}
        }

        case POST_UPDATE_SUCCESS: {
            return {...state, [action.post.id]: action.post}
        }

        default:
            return state;
    }
}


const postsReducer = combineReducers({
    isPostsLoading,
    postsHasError,
    isPostLoading,
    postHasError,
    items
});

export default postsReducer;

