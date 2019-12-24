import { createStore, combineReducers } from "redux";
import notifyReducer from "./Notify/reducer-notify";
import accountReducer from "./Account/reducer-account";
import locationReducer from "./Location/reducer-location";
import contractReducer from "./Contract/reducer-contract";
import commentReducer from "./Comment/reducer-comment";
import skillReducer from "./Skill/reducer-skill";
import skillTagReducer from "./SkillTag/reducer-skillTag";
import studyRequestReducer from "./StudyRequest/reducer-studyRequest";
import loadingReducer from "./Loading/reducer-loading";
import adminReducer from "./Admin/reducer-admin";


const reducers = combineReducers({
  notify: notifyReducer,
  account: accountReducer,
  location: locationReducer,
  contract: contractReducer,
  skill: skillReducer,
  skillTag: skillTagReducer,
  studyRequest: studyRequestReducer,
  comment: commentReducer,
  loading:loadingReducer,
  admin: adminReducer
});

const store = createStore(reducers);
export default store;
