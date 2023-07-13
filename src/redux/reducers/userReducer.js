import { ActionTypes } from '../constants/action-types';

const initialState = {};

const userReducer = (state = initialState, { type, payload } = []) => {
  switch (type) {
    case ActionTypes.GET_USERS:
      return { ...state, usersData: [...payload] };
    case ActionTypes.GET_USER:
      return { ...state, userData: { ...payload } };


      // case ActionTypes.GET_RESEND_EMAIL:
      // return { ...state, resendEmailData: { ...payload } };
  
    case ActionTypes.GET_ROLES:
      return { ...state, roles: [...payload] };
    case ActionTypes.GET_SPECIFIC_USERS_BY_ROLE:
      return { ...state, usersByRole: [...payload] };
    default:
      return state;
  }
};

export default userReducer;
