import { ActionTypes } from '../constants/action-types';

const initialState = {};

const clearCartFieldErrorFromState = (state, payload) => {

  const { id, partId } = payload;
  let customerCartResponse = state?.getCustomerCartResponse || [];

  customerCartResponse = customerCartResponse.map((item) => {
    if (item.partId == partId && item.errorsMap) {
      delete item.errorsMap[id];
    }
    return item;
  });
  return customerCartResponse;
};

const customerPortalReducer = (
  state = initialState,
  { type, payload } = []
) => {
  switch (type) {
    // case ActionTypes.GET_CUSTOMER_DATA_FOR_PORTAL:
    //   return { ...state, customerDataForPortal: { ...payload } };
    case ActionTypes.GET_CUSTOMERS_PORTAL:
      return { ...state, customersPortalData: [...payload] };

    case ActionTypes.GET_CUSTOMER_VIEW_PRODUCTS:
      return { ...state, getCustomerViewProducts: { ...payload } };

    case ActionTypes.GET_PRODUCT_DETAILS:
      return { ...state, getProductDetails: { ...payload } };

    case ActionTypes.GET_BRANCH_INVENTORY_DETAILS:
      return { ...state, getBranchInventoryDetails: [...payload] };

    case ActionTypes.GET_ORDER_HISTORY:
      return { ...state, getOrderHistoryDetails: {...payload} };

    case ActionTypes.GET_INVENTORY_TABLE_DATA:
      return { ...state, getInventoryTableData: { ...payload } };

    case ActionTypes.GET_CUSTOMER_ORDER_HISTORY:
      return { ...state, getCustomerOrderHistory: {...payload} };

    case ActionTypes.GET_MK_INVENTORY_DETAILS:
      return { ...state, getMKInventoryDetails: [...payload] };

    case ActionTypes.GET_OPEN_ORDERS_DETAILS:
      return { ...state, getOpenOrdersDetails: { ...payload } };

    case ActionTypes.GET_ALL_CART_ORDERS:
      return { ...state, getCustomerCartDetails: [...payload] };
    case ActionTypes.GET_ADD_CART_RESPONSE:
      return { ...state, getCustomerCartResponse: [...payload] };
    case ActionTypes.CLEAR_CART_FIELD_ERROR:
      return {
        ...state,
        cartErrorRemove: clearCartFieldErrorFromState(state, payload)
      };

      case ActionTypes.PART_NUMBER:
      return {
        ...state,
        getPartNumber:payload 
      };
    case ActionTypes.GET_CUSTOMER_SHIPPING_LOCATION:
      return { ...state, getCustomerShippingDetails: [...payload] };

    case ActionTypes.GET_CUSTOMER_OPEN_ORDERS:
      return { ...state, getCustomerOpenOrders: [...payload] };

    case ActionTypes.GET_CUSTOMER_BLANKET_PO:
      return { ...state, getCustomerBlanketPo: [...payload] };

    case ActionTypes.GET_BARCODE_LIST:
      return { ...state, getBarcodeList: { ...payload } };
    case ActionTypes.GET_BARCODE_ERRORS:
      return { ...state, getBarcodeErrors: [...payload] };
    case ActionTypes.GET_PART_FORECAST:
      return { ...state, getPartForecast: [...payload] };
    // case ActionTypes.SELECTED_PRODUCT_DATA:
    //   return { ...state, selectedProductData: [...payload] };
    case ActionTypes.GET_BARCODE_PROCESS_ERRORS:
      return { ...state, barcodeProcessErrors: [...payload] };
      case ActionTypes.GET_PRODUCTS_CSV_DATA:
        return { ...state, getCustomerProductsCsv: {...payload} };
        case ActionTypes.GET_MKINVENTORY_EXCEL_DATA:
          return { ...state, getMKInventoryExcel: {...payload} };
          case ActionTypes.GET_CUSTOMER_ORDER_HISTORY_CSV:
            return { ...state, getCustomerOrderExcel: {...payload} };
            case ActionTypes.GET_ORDER_HISTORY_EXCEL:
              return { ...state, getOrderHistoryExcel: {...payload} };

    default:
      return state;
  }
};

export default customerPortalReducer;
