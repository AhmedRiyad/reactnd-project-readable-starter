import {POSTS_SORTING_CHANGED} from '../actions/user-state';
import {combineReducers} from 'redux';


function postsSortingKey(state = '', action) {
    switch (action.type) {
        case POSTS_SORTING_CHANGED:
            return action.key;

        default:
            return state;
    }
}


const userStateReducer = combineReducers({
    postsSortingKey
});

export default userStateReducer;

