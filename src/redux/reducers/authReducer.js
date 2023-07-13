import { ActionTypes } from '../constants/action-types';

const initialState = {};

const authReducer = (state = initialState, { type, payload } = []) => {
  switch (type) {
    case ActionTypes.AUTHENTICATE_USER:
      return { ...state, token: payload };
    case ActionTypes.GET_AUTH_USER:
      return { ...state, authUserData: { ...payload } };
    case ActionTypes.GET_VERIFY_USER:
      return { ...state, verifyUser: payload };
      case ActionTypes.GET_AUTH_USER_DETAIL:
      return { ...state, userData: payload };
    case ActionTypes.LOGOUT:
      return { state: undefined };
      
    default:
      return state;
  }
};

export default authReducer;
