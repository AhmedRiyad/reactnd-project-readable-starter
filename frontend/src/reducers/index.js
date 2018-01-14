import {combineReducers} from 'redux';
import posts from './posts';
import categories from './categories';
import {reducer as formReducer} from 'redux-form'
import comments from './comments';


const rootReducer = combineReducers({
    posts,
    categories,
    comments,
    form: formReducer
});

export default rootReducer;