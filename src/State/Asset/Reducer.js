import {
  GET_ASSET_REQUEST,
  GET_ASSET_SUCCESS,
  GET_ASSET_FAILURE,
  GET_USER_ASSETS_REQUEST,
  GET_USER_ASSETS_SUCCESS,
  GET_USER_ASSETS_FAILURE,
  GET_ASSET_DETAILS_REQUEST,
  GET_ASSET_DETAILS_SUCCESS,
  GET_ASSET_DETAILS_FAILURE
} from "./ActonType";

const initialState = {
  loading: false,
  asset: null,
  userAssets: [],
  error: null,
  assetDetails:null
};

export const assetReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_ASSET_REQUEST:
    case GET_USER_ASSETS_REQUEST:
    case GET_ASSET_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_ASSET_SUCCESS:
      return { ...state, loading: false, asset: action.payload };

    case GET_ASSET_DETAILS_SUCCESS:
      return { ...state, loading: false, assetDetails: action.payload };

    case GET_USER_ASSETS_SUCCESS:
      return { ...state, loading: false, userAssets: action.payload };

    case GET_ASSET_FAILURE:
    case GET_USER_ASSETS_FAILURE:
    case GET_ASSET_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default assetReducer;