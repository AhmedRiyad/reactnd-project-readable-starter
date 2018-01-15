import {combineReducers} from 'redux';
import {
    COMMENT_UPDATE_SUCCESS,
    COMMENTS_FETCH_DATA_SUCCESS,
    COMMENTS_HAS_ERROR,
    COMMENTS_IS_LOADING,
    COMMENT_ADD_SUCCESS,
    COMMENT_DELETE_SUCCESS
} from '../actions/comments';

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
            return state
    }
}

function items(state = [], action) {
    switch (action.type) {
        case COMMENTS_FETCH_DATA_SUCCESS:
            return action.comments.reduce(function (acc, cur) {
                acc[cur.id] = cur;
                return acc;
            }, {});

        case COMMENT_UPDATE_SUCCESS:
        case COMMENT_ADD_SUCCESS: {
            return {...state, [action.comment.id]: action.comment}
        }
        case COMMENT_DELETE_SUCCESS: {
            let newState = {...state};
            delete newState[action.comment.id];
            return newState;
        }

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