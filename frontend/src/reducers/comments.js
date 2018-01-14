import {combineReducers} from 'redux';
import {COMMENTS_FETCH_DATA_SUCCESS, COMMENTS_HAS_ERROR, COMMENTS_IS_LOADING} from '../actions/comments';

function isLoading(state = false, action) {
    switch (action.type) {
        case COMMENTS_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

function hasError(state = false, action) {
    switch (action.type) {
        case COMMENTS_HAS_ERROR:
            return action.hasError;

        default:
            return state;
    }
}

function items(state = [], action) {
    switch (action.type) {
        case COMMENTS_FETCH_DATA_SUCCESS:
            return action.comments;

        default:
            return state;
    }
}

const commentsReducer = combineReducers({
    isLoading,
    hasError,
    items
});

export default commentsReducer;