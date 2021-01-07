import { combineReducers } from 'redux';
import { reducer as user } from './user';
import { reducer as product } from './product';


const reducers = combineReducers({
    user,
    product
});

export default reducers;