import {combineReducers} from 'redux';
import posts from './posts';
import categories from './categories';
import {reducer as formReducer} from 'redux-form'


const rootReducer = combineReducers({
    posts,
    categories,
    form: formReducer
});

export default rootReducer;