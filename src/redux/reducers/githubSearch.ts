import { SearchTypes } from '../actionTypes';
import { reposInfo, user, searchState } from '../../types';

type actions = {
  type: string
  payload: { searchTerm: string, items: reposInfo[] | user[] }
}

const INITIAL_STATE: searchState = {
  allRepos: {},
  allUsers: {},
  error: false,
  emptyData:false,
  searchedData: []
};

const githubSearchReducer = (state = INITIAL_STATE, action: actions) => {
  switch (action.type) {
    case SearchTypes.SEARCH_USER_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        error: false,
        emptyData: false,
        allUsers: { ...state.allUsers, [payload.searchTerm]: payload.items },
        searchedData: payload.items
      };
    }
    case SearchTypes.SEARCH_REPO_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        error: false,
        emptyData: false,
        allRepos: { ...state.allRepos, [payload.searchTerm]: payload.items },
        searchedData: payload.items
      };
    }
    case SearchTypes.SEARCH_IN_PROPS: {
      const { payload } = action;
      return {
        ...state,
        error: false,
        emptyData: false,
        searchedData: payload.items
      };
    }
    case SearchTypes.DATA_EMPTY: {
      return {
        ...state,
        error: false,
        emptyData:true,
        searchedData: []
      };
    }
    case SearchTypes.ERROR: {
      return {
        ...state,
        error: true,
        emptyData: false,
        searchedData: []
      };
    }
    default:
      return state;
  }
}

export default githubSearchReducer;