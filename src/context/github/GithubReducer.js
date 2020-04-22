import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USER,
  GET_USER,
  GET_REPOS,
  CLEAR_USERS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false, // setLoading(false);
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false, // setLoading(false);
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false, // setLoading(false);
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false, // setLoading(false);
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true, // setLoading(false);
      };
  }
};
