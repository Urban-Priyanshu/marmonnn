import axios from 'axios';
import { ActionTypes } from '../constants/action-types';
import SERVER_BASE_URL from '../../config/config';
import { toast } from 'react-toastify';
import store from '../store';

export const addToCart =
  (
    values,
    id,
    authToken,
    handlePlaceOrderModalClose,
    handleDeselect,
    setSelectedData,
    setSubmit,
    setPage
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/cart/addCartOrders`,
        values,
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
            d?.errorsMap?.uom
        )
      ) {
        toast.error('Parts cannot be added to cart');
        dispatch({
          type: ActionTypes.GET_ADD_CART_RESPONSE,
          payload: []
        });
      } else {
        toast.success('Parts added to cart!');
        handleDeselect.current.api.deselectAll();
        setSelectedData({});
        setPage(1);
        setSubmit(true);
        dispatch({
          type: ActionTypes.GET_ADD_CART_RESPONSE,
          payload: response.data
        });

        return response;
      }

      const CartDataresponse = await axios.get(
        `${SERVER_BASE_URL}/cart/getAllCartOrderByUserId/${id}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_ADD_CART_RESPONSE,
        payload: response.data
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

export const updateCartOrders =
  (customerId, cartData, authToken, setEnableSubmit) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.put(
        `${SERVER_BASE_URL}/cart/updateCartOrders`,
        cartData,
        config
      );

      dispatch({
        type: ActionTypes.GET_ALL_CART_ORDERS,
        payload: response.data
      });

      if (
        response?.data?.find(
          (d) =>
            d?.errorsMap?.customerId ||
            d?.errorsMap?.dueDate ||
            d?.errorsMap?.partNumber ||
            d?.errorsMap?.purchaseOrderNumber ||
            d?.errorsMap?.quantity ||
            d?.errorsMap?.shippingLocationId
        )
      ) {
        setEnableSubmit(false);
      } else {
       
        setEnableSubmit(true);
        toast.success('Updated cart order successfully.');
      }
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const getAllCartOrderByUserId =
  (customerId, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/cart/getAllCartOrderByUserId/${customerId}`,

        config
      );

      dispatch({
        type: ActionTypes.GET_ALL_CART_ORDERS,
        payload: response.data
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
// /product/{{customerNumber}}/{{partNumber}}/OrderHistory/{{salesOrderNumber}}/{{TYPE}}

export const downloadOrderHistoryForAll =
  (customerNumber, partNumber, salesOrderNumber, authToken) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const downloadFile = (blob, fileName) => {
        const link = document.createElement('a');
        // create a blobURI pointing to our Blob
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        // some browser needs the anchor to be in the doc
        document.body.append(link);
        link.click();
        link.remove();
        // in case the Blob uses a lot of memory
        setTimeout(() => URL.revokeObjectURL(link.href), 7000);
      };

      fetch(
        `${SERVER_BASE_URL}/product/${customerNumber}/${partNumber}/OrderHistory/${salesOrderNumber}/INVOICE`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authToken
          }
        }
      )
        .then((response) => response.blob())
        .then((response) => {
          downloadFile(response, 'INVOICE');
        });

      fetch(
        `${SERVER_BASE_URL}/product/${customerNumber}/${partNumber}/OrderHistory/${salesOrderNumber}/MTR`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authToken
          }
        }
      )
        .then((response) => response.blob())
        .then((response) => {
          downloadFile(response, 'MTR');
        });

      fetch(
        `${SERVER_BASE_URL}/product/${customerNumber}/${partNumber}/OrderHistory/${salesOrderNumber}/PACKAGING_LIST`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authToken
          }
        }
      )
        .then((response) => response.blob())
        .then((response) => {
          downloadFile(response, 'PACKAGING_LIST');
        });

      fetch(
        `${SERVER_BASE_URL}/product/${customerNumber}/${partNumber}/OrderHistory/${salesOrderNumber}/POD`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authToken
          }
        }
      )
        .then((response) => response.blob())
        .then((response) => {
          downloadFile(response, 'POD');
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

export const downloadOrderHistory =
  (customerNumber, partNumber, salesOrderNumber, TYPE, authToken) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const downloadFile = (blob, fileName) => {
        const link = document.createElement('a');
        // create a blobURI pointing to our Blob
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        // some browser needs the anchor to be in the doc
        document.body.append(link);
        link.click();
        link.remove();
        // in case the Blob uses a lot of memory
        setTimeout(() => URL.revokeObjectURL(link.href), 7000);
      };

      fetch(
        `${SERVER_BASE_URL}/product/${customerNumber}/${partNumber}/OrderHistory/${salesOrderNumber}/${TYPE}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + authToken
          }
        }
      )
        .then((response) => response.blob())
        .then((response) => {
          downloadFile(response, TYPE);
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

export const deleteCartOrders =
  (customerId, id, authToken, setDeleteIconDisabled) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/cart/deleteCartOrders`,

        [id],

        config
      );

      const responseCart = await axios.get(
        `${SERVER_BASE_URL}/cart/getAllCartOrderByUserId/${customerId}`,

        config
      );

      setDeleteIconDisabled(false);

      dispatch({
        type: ActionTypes.GET_ALL_CART_ORDERS,

        payload: responseCart.data
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

export const placeCartOrders =
  (customerId, customerNumber, orders, navigate, authToken) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/${customerNumber}/placeCartOrders`,
        orders,
        config
      );

      const CartDataresponse = await axios.get(
        `${SERVER_BASE_URL}/cart/getAllCartOrderByUserId/${customerId}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_ALL_CART_ORDERS,
        payload: CartDataresponse.data
      });

      toast.success('Order placed successfully.');
      navigate(`customer-portal/${customerId}/cart?cp=true`);
      navigate(`/customer-portal/${customerId}/products?cp=true`);
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const getAllCustomerShippingLocations =
  (customerId, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/customer/getAllCustomerShippingLocations/${customerId}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_CUSTOMER_SHIPPING_LOCATION,
        payload: response.data
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

export const clearCartFieldError = (args) => (dispatch) => {

  dispatch({
    type: ActionTypes.CLEAR_CART_FIELD_ERROR,
    payload: args
  });
};
export const partNumberState = (partNumber, id) => (dispatch) => {
  dispatch({
    type: ActionTypes.PART_NUMBER,
    payload: { partNumber, id }
  });
};
