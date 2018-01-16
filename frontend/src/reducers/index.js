import {combineReducers} from 'redux';
import posts from './posts';
import categories from './categories';
import {reducer as formReducer} from 'redux-form'
import comments from './comments';
import userState from './user-state';


const rootReducer = combineReducers({
    posts,
    categories,
    comments,
    userState,
    form: formReducer
});

export default rootReducer;