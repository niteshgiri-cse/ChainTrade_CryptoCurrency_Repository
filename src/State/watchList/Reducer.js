import {
  GET_WATCHLIST_REQUEST,
  GET_WATCHLIST_SUCCESS,
  GET_WATCHLIST_FAILURE,
  ADD_TO_WATCHLIST_REQUEST,
  ADD_TO_WATCHLIST_SUCCESS,
  ADD_TO_WATCHLIST_FAILURE
} from "./ActionType";

const initialState = {
  loading: false,
  watchlist: null,
  error: null,
  item:[]
};

export const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_WATCHLIST_REQUEST:
    case ADD_TO_WATCHLIST_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_WATCHLIST_SUCCESS:
      return { ...state, loading: false, watchlist: action.payload };

   case ADD_TO_WATCHLIST_SUCCESS:
  return { ...state, loading: false, watchlist: action.payload };


    case GET_WATCHLIST_FAILURE:
    case ADD_TO_WATCHLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export default watchlistReducer;