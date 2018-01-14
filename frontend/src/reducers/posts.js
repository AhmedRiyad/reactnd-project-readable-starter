import {combineReducers} from 'redux';
import {POST_UPDATE_SUCCESS, POSTS_FETCH_DATA_SUCCESS, POSTS_HAS_ERROR, POSTS_IS_LOADING} from '../actions/post';

function isLoading(state = false, action) {
    switch (action.type) {
        case POSTS_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

function hasError(state = false, action) {
    switch (action.type) {
        case POSTS_HAS_ERROR:
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

        case POST_UPDATE_SUCCESS: {
            return {...state,[action.post.id]: action.post}
        }

        default:
            return state;
    }
}


const postsReducer = combineReducers({
    isLoading,
    hasError,
    items
});

export default postsReducer;

