import axios from 'axios';
import { Dispatch } from "redux";
import { AppTypes, SearchTypes } from '../actionTypes';
import { reposInfo, user } from "./../../types";
const baseURL = "https://api.github.com"

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application-type"
  },
  responseType: "json"
})

const getUrl:{[type:string]:string} = {
  user: "/search/users?q=",
  repository: "/search/repositories?q="
}

const getDispatchType: {[type:string]:string} = {
  user: SearchTypes.SEARCH_USER_SUCCESS,
  repository: SearchTypes.SEARCH_REPO_SUCCESS
}

export const updateReducer = (payload: reposInfo[] | user[]) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SearchTypes.SEARCH_IN_PROPS,
      payload: {items:payload,searchTerm:''}
    });
    dispatch({ type: AppTypes.HIDE_LOADER });
  }
}

export const githubSearch = (searchTerm: string, type: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: AppTypes.SHOW_LOADER });
    const dispatchType = getDispatchType[type];
    const url = getUrl[type];
    try {
      const response = await axiosInstance.get(`${url}${searchTerm}`);;
      const { items } = response.data;
      const isEmpty = items.length === 0;
      if (isEmpty) dispatch({ type: SearchTypes.DATA_EMPTY });
      else
        dispatch({
          type: dispatchType,
          payload: { items: items, searchTerm }
        });
    } catch (error) {
      dispatch({ type: SearchTypes.ERROR });
    }
    dispatch({ type: AppTypes.HIDE_LOADER });
  }
}