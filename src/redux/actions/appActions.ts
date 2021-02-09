import { AppTypes } from '../actionTypes';
import { Dispatch } from "redux";

export const setLoader = (value: boolean) => {
  const type = value ? AppTypes.SHOW_LOADER : AppTypes.HIDE_LOADER
  return (dispatch: Dispatch) => {
    dispatch({ type });
  }
};
