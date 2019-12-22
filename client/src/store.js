import { createStore, combineReducers } from "redux";
import notifyReducer from "./Notify/reducer-notify";
import accountReducer from "./Account/reducer-account";
import locationReducer from "./Location/reducer-location";

const reducers = combineReducers({
  notify: notifyReducer,
  account: accountReducer,
  location: locationReducer
});

const store = createStore(reducers);
export default store;
