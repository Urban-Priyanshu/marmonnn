import axios from 'axios';
import { ActionTypes } from '../constants/action-types';
import SERVER_BASE_URL from '../../config/config';
import { toast } from 'react-toastify';
import store from '../store';
import { array } from 'prop-types';
import moment from 'moment';

// export const getCustomerCusPortal = (id, authToken) => async (dispatch) => {
//   const config = {
//     headers: { Authorization: `Bearer ${authToken}` }
//   };
//   try {
//     const response = await axios.get(
//       `${SERVER_BASE_URL}/customer/${id}`,
//       config
//     );

//     dispatch({
//       type: ActionTypes.GET_CUSTOMER_DATA_FOR_PORTAL,
//       payload: response.data
//     });
//   } catch (e) {
//     toast.error(e?.response?.data?.message);
//   }
// };

export const getCustomerViewProducts =
  (
    customerNumber,
    pageSize,
    pageIndex,
    sortOrder,
    authToken,
    searchValue,
    sortType
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
  
    try {
    
      let response;
      if (searchValue) {
        response = await axios.get(
          `${SERVER_BASE_URL}/part/list/cn/${customerNumber}?pageSize=${pageSize}&pageIndex=0&sortOrder=${
            sortOrder ?? ''
          }&search=${searchValue}&sortType=${sortType}`,
          config
        );
      } else {
       
        response = await axios.get(
          `${SERVER_BASE_URL}/part/list/cn/${customerNumber}?pageSize=${pageSize}&pageIndex=${
            pageIndex - 1
          }&sortOrder=${
            sortOrder ?? ''
          }&search=${searchValue}&sortField=${sortType}`,
          config
        );
      }

      dispatch({
        type: ActionTypes.GET_CUSTOMER_VIEW_PRODUCTS,
        payload: response.data
      });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

export const getProductsCsv =
  (
    customerNumber,
    pageSize,
    pageIndex,
    sortOrder,
    authToken,
    searchValue,
    type,
    toggle
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
  
    try {
      toggle(false);
      let response;
      response = await axios.get(
        `${SERVER_BASE_URL}/part/list/cn/${customerNumber}?pageSize=${1000000}&pageIndex=${0}&sortOrder=${sortOrder}&search=${searchValue}`,
        config
      );

      if (type === 'csv') {
        dispatch({
          type: ActionTypes.GET_PRODUCTS_CSV_DATA,
          payload: response.data
        });

        if (response.data.content.length) toggle(true);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

export const updateLeadTime =
  (
    customerNumber,
    data,
    authToken,
    setValues,
    handleModalClose,
    pageIndex,
    sortOrder,
    searchValue,
    gridRef,
    setSelectedData
  ) =>
  async (dispatch) => {
  
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      let response, getCustomerProducts;
      response = await axios.post(
        `${SERVER_BASE_URL}/part/leadtime/cn/${customerNumber}`,
        data,
        config
      );

      if (searchValue) {
        getCustomerProducts = await axios.get(
          `${SERVER_BASE_URL}/part/list/cn/${customerNumber}?pageSize=10&pageIndex=${
            pageIndex - 1
          }&sortOrder=${sortOrder}&search=${searchValue}`,
          config
        );
      } else {
        getCustomerProducts = await axios.get(
          `${SERVER_BASE_URL}/part/list/cn/${customerNumber}?pageSize=10&pageIndex=${
            pageIndex - 1
          }&sortOrder=${sortOrder}&search=`,
          config
        );
      }

      dispatch({
        type: ActionTypes.GET_CUSTOMER_VIEW_PRODUCTS,
        payload: getCustomerProducts.data
      });
      if (response) {
        toast.success('Leads time updated!');
        setValues(null);
        handleModalClose();
      }
      setUpdatedLeadTime(true);
      gridRef.current.api.deselectAll();
    } catch (e) {
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const getCustomerOpenOrders =
  (customerNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      let response;

      response = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/OpenOrders`,
        config
      );

      dispatch({
        type: ActionTypes.GET_CUSTOMER_OPEN_ORDERS,
        payload: response.data
      });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

export const getProductDetails =
  (customerNumber, partNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      let response;

      response = await axios.get(
        `${SERVER_BASE_URL}/product/${partNumber}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_PRODUCT_DETAILS,
        payload: response.data
      });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

export const getBranchInventoryDetails =
  (customerNumber, partNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      let response;

      response = await axios.get(
        `${SERVER_BASE_URL}/product/${customerNumber}/BranchInventory?partNumber=${partNumber}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BRANCH_INVENTORY_DETAILS,
        payload: response.data
      });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

export const getMkInventoryDetails =
  (customerNumber, partNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      let response;

      response = await axios.get(
        `${SERVER_BASE_URL}/mkpart/listByPartNumber/${customerNumber}?partNumber=${partNumber}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_MK_INVENTORY_DETAILS,
        payload: response.data
      });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

export const getOpenOrdersDetails =
  (customerNumber, partNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      let response;

      response = await axios.get(
        `${SERVER_BASE_URL}/product/${customerNumber}/OpenOrders?partNumber=${partNumber}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_OPEN_ORDERS_DETAILS,
        payload: response.data
      });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

export const getOrderHistory =
  (
    customerNumber,
    partNumber,
    pageSize,
    pageIndex,
    searchValue,
    authToken,
    sort,
    sortType
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      let response;
      if (searchValue) {
        response = await axios.get(
          `${SERVER_BASE_URL}/product/${customerNumber}/OrderHistoryByPart?partNumber=${partNumber}&pageSize=${pageSize}&pageIndex=0&sortOrder=${sort}&search=${searchValue}&sortType=${sortType}`,
          config
        );
      } else {
        response = await axios.get(
          `${SERVER_BASE_URL}/product/${customerNumber}/OrderHistoryByPart?partNumber=${partNumber}&pageSize=${pageSize}&pageIndex=${
            pageIndex - 1
          }&sortOrder=${sort}&search=${searchValue}&sortType=${sortType}`,
          config
        );
      }

      dispatch({
        type: ActionTypes.GET_ORDER_HISTORY,
        payload: response.data
      });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

export const getOrderHistoryCsv =
  (customerNumber, partNumber, pageSize, pageIndex, searchValue, authToken) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      let response;
      if (searchValue) {
        response = await axios.get(
          `${SERVER_BASE_URL}/product/${customerNumber}/OrderHistoryByPart?partNumber=${partNumber}&pageSize=${99999}&pageIndex=0&sortOrder=DESC&search=${searchValue}`,
          config
        );
      } else {
        response = await axios.get(
          `${SERVER_BASE_URL}/product/${customerNumber}/OrderHistoryByPart?partNumber=${partNumber}&pageSize=${99999}&pageIndex=${
            pageIndex - 1
          }&sortOrder=DESC&search=${searchValue}`,
          config
        );
      }

      dispatch({
        type: ActionTypes.GET_ORDER_HISTORY_EXCEL,
        payload: response.data
      });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

export const getCustomerOrderHistory =
  (
    customerNumber,
    pageSize,
    pageIndex,
    sortOrder,
    searchValue,
    authToken,
    sortType
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      let response;
      if (searchValue) {
        response = await axios.get(
          `${SERVER_BASE_URL}/product/${customerNumber}/OrderHistory?pageSize=${pageSize}&pageIndex=0&sortOrder=${sortOrder}&search=${searchValue}&sortType=${sortType}`,
          config
        );
      } else {
        response = await axios.get(
          `${SERVER_BASE_URL}/product/${customerNumber}/OrderHistory?pageSize=${pageSize}&pageIndex=${
            pageIndex - 1
          }&sortOrder=${sortOrder}&search=${searchValue}&sortType=${sortType}`,
          config
        );
      }

      dispatch({
        type: ActionTypes.GET_CUSTOMER_ORDER_HISTORY,
        payload: response.data
      });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

export const getCustomerOrderHistoryCsv =
  (
    customerNumber,
    pageSize,
    pageIndex,
    sortOrder,
    searchValue,
    setExcelToggle,
    authToken
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      setExcelToggle(false);
      let response;
      if (searchValue) {
        response = await axios.get(
          `${SERVER_BASE_URL}/product/${customerNumber}/OrderHistory?pageSize=${99999}&pageIndex=0&sortOrder=DESC&search=${searchValue}`,
          config
        );
      } else {
        response = await axios.get(
          `${SERVER_BASE_URL}/product/${customerNumber}/OrderHistory?pageSize=${99999}&pageIndex=${
            pageIndex - 1
          }&sortOrder=DESC&search=${searchValue}`,
          config
        );
      }

      dispatch({
        type: ActionTypes.GET_CUSTOMER_ORDER_HISTORY_CSV,
        payload: response.data
      });
      setExcelToggle(true);
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

export const BarcodeProcess =
  (customerID, data, setErrorModalOpen, setErrors, authToken, setData) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      dispatch({
        type: ActionTypes.GET_BARCODE_PROCESS_ERRORS,
        payload: []
      });
      let response;
      response = await axios.post(
        `${SERVER_BASE_URL}/cart/processBarcodeParts/${customerID}`,
        data,
        config
      );

      const CartDataresponse = await axios.get(
        `${SERVER_BASE_URL}/cart/getAllCartOrderByUserId/${customerID}`,
        config
      );

      if (
        response?.data?.find(
          (d) =>
            d?.errorsMap?.customerId ||
            d?.errorsMap?.dueDate ||
            d?.errorsMap?.partNumber ||
            d?.errorsMap?.purchaseOrderNumber ||
            d?.errorsMap?.quantity ||
            d?.errorsMap?.shippingLocationId ||
            d?.errorsMap?.PartNumber
        )
      ) {
        dispatch({
          type: ActionTypes.GET_BARCODE_PROCESS_ERRORS,
          payload: response.data
        });

        setErrors(null);
        setErrorModalOpen(true);
      } else {
        toast.success('Parts are added to the cart successfully.');
        setData([]);

        dispatch({
          type: ActionTypes.GET_ADD_CART_RESPONSE,
          payload: CartDataresponse.data
        });
      }
    } catch (e) {
      setErrors(e);
      setErrorModalOpen(true);
    }
  };

// https://marmon-dev.compunnel.com/api/mkpart/list/32339
export const MKInventoryTable =
  (
    customerNumber,
    searchValue,
    quantity,
    dateRange,
    authToken,
    pageIndex,
    itemsPerPage,
    mksort,
    mksortType
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };


    try {
      let response;

      if (dateRange[0].startDate === null && !searchValue) {
      
        response = await axios.post(
          `${SERVER_BASE_URL}/mkpart/list/${customerNumber}`,
          {
            search: `${searchValue}`,
            quantity: `${quantity}`,
            sortField: mksortType,
            sortOrder: mksort,
            pageSize: parseInt(itemsPerPage),
            pageIndex: pageIndex - 1
          },
          config
        );

        dispatch({
          type: ActionTypes.GET_INVENTORY_TABLE_DATA,
          payload: response.data
        });
      } else if (searchValue.length > 0) {
        response = await axios.post(
          `${SERVER_BASE_URL}/mkpart/list/${customerNumber}`,
          {
            search: `${searchValue}`,
            quantity: `${quantity}`,

            sortField: mksortType,
            sortOrder: mksort,
            pageSize: 9999,
            pageIndex: 0
          },
          config
        );

        dispatch({
          type: ActionTypes.GET_INVENTORY_TABLE_DATA,
          payload: response.data
        });
      } else {
        response = await axios.post(
          `${SERVER_BASE_URL}/mkpart/list/${customerNumber}`,
          {
            search: `${searchValue}`,
            quantity: `${quantity}`,
            startDueDate: `${moment(dateRange[0].startDate).format(
              'MM-DD-YYYY'
            )}`,
            endDueDate: `${moment(dateRange[0].endDate).format('MM-DD-YYYY')}`,
            sortField: mksortType,
            sortOrder: mksort,
            pageSize: parseInt(itemsPerPage),
            pageIndex: 0
          },
          config
        );

        dispatch({
          type: ActionTypes.GET_INVENTORY_TABLE_DATA,
          payload: response.data
        });
      }

      // toast.success('Part Number Added Successfully');
    } catch (e) {
      
    }
  };

export const MKInventoryExcelData =
  (
    customerNumber,
    searchValue,
    quantity,
    dateRange,
    authToken,
    pageIndex,
    excelToggle
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      excelToggle(false);
      let response;

      response = await axios.post(
        `${SERVER_BASE_URL}/mkpart/list/${customerNumber}`,
        {
          search: `${searchValue}`,
          sortOrder: 'DESC',
          pageSize: 99999,
          pageIndex: 0
        },
        config
      );

      dispatch({
        type: ActionTypes.GET_MKINVENTORY_EXCEL_DATA,
        payload: response.data
      });

      excelToggle(true);

      // toast.success('Part Number Added Successfully');
    } catch (e) {
      console.log(e, 'eee');
    }
  };
export const BarcodeList =
  (customerNumber, searchValue, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/barcode/list/${customerNumber}`,
        { search: `${searchValue}`, pageSize: 10000 },
        config
      );
      dispatch({
        type: ActionTypes.GET_BARCODE_LIST,
        payload: response.data
      });

      setTableModalOpen(true);
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const uploadBarcodeFile =
  (customerNumber, file, setErrorModalOpen, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/barcode/uploadBarcodeParts/${customerNumber}`,
        file,
        config
      );
      const listData = await axios.post(
        `${SERVER_BASE_URL}/barcode/list/${customerNumber}`,
        { pageSize: 10000 },
        config
      );
      if (response?.data?.find((d) => d?.errorsSet != null)) {
        setErrorModalOpen(true);
        dispatch({
          type: ActionTypes.GET_BARCODE_ERRORS,
          payload: response.data
        });
      } else {
        dispatch({
          type: ActionTypes.GET_BARCODE_LIST,
          payload: listData.data
        });
        if (response?.data?.length != 0) {
          toast.success('Parts uploaded successfully.');
        } else {
          toast.error('File has no parts.');
        }
      }

      setTableModalOpen(true);
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const deleteBarcodeListData =
  (customerNumber, customerId, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.delete(
        `${SERVER_BASE_URL}/barcode/deleteBarcodePart/${customerId}`,

        config
      );
      const listData = await axios.post(
        `${SERVER_BASE_URL}/barcode/list/${customerNumber}`,
        { pageSize: 10000 },
        config
      );
      dispatch({
        type: ActionTypes.GET_BARCODE_LIST,
        payload: listData.data
      });
      toast.success('Deleted successfully.');
      setTableModalOpen(true);
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const UpdateBarcodeListData =
  (customerNumber, data, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.put(
        `${SERVER_BASE_URL}/barcode/updateBarcodePart`,
        data,
        config
      );
      const listData = await axios.post(
        `${SERVER_BASE_URL}/barcode/list/${customerNumber}`,
        { pageSize: 10000 },
        config
      );
      dispatch({
        type: ActionTypes.GET_BARCODE_LIST,
        payload: listData.data
      });
      toast.success('Barcode parts details are updated successfully.');
      setTableModalOpen(true);
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };
// http://localhost:8181/product/46030/T159212/BlanketPO

export const getCustomerBlanketPOData =
  (customerNumber, partNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      let response;

      response = await axios.get(
        `${SERVER_BASE_URL}/product/${customerNumber}/BlanketPO?partNumber=${partNumber}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_CUSTOMER_BLANKET_PO,
        payload: response.data
      });
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

export const getPartForecast =
  (customerNumber, partNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/part/forecast/${customerNumber}?partNumber=${partNumber}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_PART_FORECAST,
        payload: response.data.forecasts
      });
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };
