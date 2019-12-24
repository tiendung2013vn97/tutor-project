import { createStore, combineReducers } from "redux";
import notifyReducer from './Notify/reducer-notify';
import accountReducer from './Account/reducer-account'
import adminReducer from './Admin/reducer-admin'


const reducers = combineReducers({
    notify: notifyReducer,
    account:accountReducer,
    adminReducer
});

const store = createStore(reducers);
export default store;
