import { ActionTypes } from '../constants/action-types';

const initialState = {};

const dashboardReducer = (state = initialState, { type, payload } = []) => {
  switch (type) {
    case ActionTypes.GET_DASHBOARD_DATA:
      return { ...state, portalchartData: { ...payload } };
      
      case ActionTypes.GET_EXTERNAL_USER_DASHBOARD:
        return { ...state, externalUserOrderStatus: { ...payload } };
    case ActionTypes.GET_DASHBOARD_TABLE_DATA:
      return { ...state, dashboardTableData: [...payload] };
    case ActionTypes.GET_MENU_ACTIVE:
      return { ...state, getMenuActive: payload };
      case ActionTypes.GET_DASHBOARD_REPORT:
        return { ...state, getReportData:[...payload]};
      

    default:
      return state;
  }
};

export default dashboardReducer;
