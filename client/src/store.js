import { createStore, combineReducers } from "redux";
import notifyReducer from './Notify/reducer-notify';
import accountReducer from './Account/reducer-account'

const reducers = combineReducers({
    notify: notifyReducer,
    account:accountReducer
});

const store = createStore(reducers);
export default store;
