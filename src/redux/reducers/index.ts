import { combineReducers } from 'redux';
import githubSearchReducer from './githubSearch';
import appReducer from "./app";

const rootReducer = combineReducers({
  app: appReducer,
  githubSearch: githubSearchReducer,
});

export default rootReducer;