import {combineReducers} from 'redux';
import {CATEGORIES_FETCH_DATA_SUCCESS, CATEGORIES_HAS_ERROR, CATEGORIES_IS_LOADING} from '../actions/category';

function isLoading(state = false, action) {
    switch (action.type) {
        case CATEGORIES_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

function hasError(state = false, action) {
    switch (action.type) {
        case CATEGORIES_HAS_ERROR:
            return action.hasError;

        default:
            return state;
    }
}

function items(state = [], action) {
    switch (action.type) {
        case CATEGORIES_FETCH_DATA_SUCCESS:
            return action.categories;

        default:
            return state;
    }
}

const categoriesReducer = combineReducers({
    isLoading,
    hasError,
    items
});

export default categoriesReducer;

