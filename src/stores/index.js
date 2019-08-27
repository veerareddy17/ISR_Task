import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';

import authReducer from './reducer/login_reducer';
import opportunityReducer from './reducer/opportunity';
import commonReducer from './reducer/common';

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  opportunityReducer: opportunityReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
