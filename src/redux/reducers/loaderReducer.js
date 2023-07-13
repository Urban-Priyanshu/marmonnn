import { ActionTypes } from '../constants/action-types';

const initialState = {};

const loaderReducer = (state = initialState, { type, payload } = []) => {
  switch (type) {
    case ActionTypes.LOADER_STATUS:
      return { ...state, showLoading: payload };
  
    default:
      return state;
  }
};

export default loaderReducer;