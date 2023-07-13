import { ActionTypes } from '../constants/action-types';

const initialState = {};

const sysAdminReducer = (state = initialState, { type, payload } = []) => {
  switch (type) {
    case ActionTypes.GET_CUSTOMERS:
      return { ...state, customersData: [...payload] };
     
    case ActionTypes.GET_CUSTOMER:
      return { ...state, customerData: { ...payload } };

    case ActionTypes.GET_CUSTOMER_TABLE_DATA:
      return { ...state, customerTableData: { ...payload } };

    case ActionTypes.GET_BULK_ORDER_DATA:
      return { ...state, getBulkOrderData: { ...payload } };

    case ActionTypes.GET_LOGO_IMAGE:
      return { ...state, getLogo: payload };

    case ActionTypes.GET_FORECAST_DATA:
      return { ...state, getForecastData: { ...payload } };

    case ActionTypes.GET_BLANKET_PO_DATA:
      return { ...state, getBlanketPoData: { ...payload } };

    case ActionTypes.GET_BPO_UPLOAD_HISTORY:
      return { ...state, getBPOUploadHistory: [...payload] };

    case ActionTypes.GET_BULK_ORDER_UPLOAD_HISTORY:
      return { ...state, getBOUploadHistory: [...payload] };

    case ActionTypes.GET_FORECAST_HISTORY_DATA:
      return { ...state, getForecastHistory: [...payload] };

    case ActionTypes.GET_EXTERNAL_USERS:
      return { ...state, externalUsers: [...payload] };

    case ActionTypes.GET_ALL_UNASSOCIATED_CUSTOMERS:
      return { ...state, unAssociatedCustomers: [...payload] };

    case ActionTypes.GET_CUSTOMER_NUMBERS:
      return { ...state, customerNumbers: [...payload] };
    case ActionTypes.GET_CUSTOMERS_BY_ID:
      return { ...state, customersById: [...payload] };

    case ActionTypes.GET_ALL_JOB_TITLE:
      return { ...state, jobTitles: [...payload] };

    case ActionTypes.GET_ALL_USER_TYPES:
      return { ...state, usersType: [...payload] };

    case ActionTypes.GET_FEATURES:
      return { ...state, featuresData: [...payload] };

    case ActionTypes.GET_BPO_EXCEL_DATA:
      return { ...state, getBPOExcelData: { ...payload } };

    case ActionTypes.GET_FORECAST_COMPARE_DATA:
      return { ...state, getForecastCompareData: { ...payload } };

    case ActionTypes.FORECAST_COMPARE_ERROR:
      return { ...state, getForecastCompareErrors: [...payload] };

    case ActionTypes.GET_PREFFERED_UOM:
      return { ...state, getUomData: [...payload] };
    case ActionTypes.GET_PREFFERED_TIMEZONE:
      return { ...state, getTimezoneData: [...payload] };
    case ActionTypes.GET_FORECAST_EXCEL_DATA:
      return { ...state, getForecastExcelData: { ...payload } };
    case ActionTypes.GET_BULK_EXCEL_DATA:
      return { ...state, getBulkExcelData: { ...payload } };
      
    case ActionTypes.GET_FORECAST_HISTORYID:
      return { ...state, getForecastHistoryId: { ...payload } };
      
      case ActionTypes.GET_BPO_HISTORYID:
        return { ...state, getBpoHistoryId: { ...payload } };
      case ActionTypes.GET_BULK_HISTORYID:
        return { ...state, getBulkHistoryId: { ...payload } };
    case ActionTypes.GET_COUNT:
      return { ...state, getCount: payload };

    default:
      return state;
  }
};

export default sysAdminReducer;
