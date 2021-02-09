import { AppTypes } from '../actionTypes';
import { appState } from "./../../types";

type actions = {
  type: string,
}

const INITIAL_STATE: appState = {
  loader:false
};

const appReducer = (state = INITIAL_STATE, action: actions) => {
  switch (action.type) {
    case AppTypes.SHOW_LOADER: {
      return {
        ...state,
        loader:true
      };
    }
    case AppTypes.HIDE_LOADER: {
      return {
        ...state,
        loader: false
      };
    }
    default:
      return state;
  }
}

export default appReducer;