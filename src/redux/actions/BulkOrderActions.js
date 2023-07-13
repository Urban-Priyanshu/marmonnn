import axios from 'axios';
import { ActionTypes } from '../constants/action-types';
import SERVER_BASE_URL from '../../config/config';
import { toast } from 'react-toastify';
import store from '../store';
import fileDownload from 'js-file-download';

export const getBulkOrderData =
  (authToken, customerNumber) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BOConfiguration`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BULK_ORDER_DATA,
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

export const addOrUpdateBulkOrder =
  (
    authToken,
    name,
    format,
    customerNumber,
    BulkOrderDataAddData,
    existingFields
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      let response;

      if (
        BulkOrderDataAddData?.find(
          (d) => d?.headerName === name.replace(/\s\s+/g, ' ')
        ) ||
        existingFields?.find(
          (d) => d.toUpperCase() === name.toUpperCase().replace(/\s\s+/g, ' ')
        )
      ) {
        toast.error('Field Already Exists');
      } else {
        response = await axios.post(
          `${SERVER_BASE_URL}/customer/BOConfiguration/addAdditionalField`,
          [
            {
              customerNumber: customerNumber,
              headerName: name.replace(/\s\s+/g, ' '),
              headerDataType: format,
              value: ''
            }
          ],

          config
        );
      }

      const fetchBulkOrder = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BOConfiguration`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BULK_ORDER_DATA,
        payload: fetchBulkOrder.data
      });
      return response;
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }

      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const deleteBulkOrderConfig =
  (authToken, data, id) => async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` }
      };

      const response = await axios.delete(
        `${SERVER_BASE_URL}/customer/${data?.customerNumber}/additionalBOConfiguration/delete?headerName=${data?.headerName}`,

        config
      );

      const getBulkOrderConfig = await axios.get(
        `${SERVER_BASE_URL}/customer/${data?.customerNumber}/BOConfiguration`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BULK_ORDER_DATA,
        payload: getBulkOrderConfig.data
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

export const saveBulkOrderData =
  (authToken, values, addValues, customerNumber) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/BOConfiguration/addOrUpdate`,

        { ...values, customerNumber: customerNumber },

        config
      );

      const saveAddBulkOrderData = await axios.post(
        `${SERVER_BASE_URL}/customer/BOConfiguration/addAdditionalField`,
        addValues,
        config
      );

      const getBulkOrderConfig = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BOConfiguration`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BULK_ORDER_DATA,

        payload: getBulkOrderConfig.data
      });
      toast.success('Bulk order configuration got updated successfully.');
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }

      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const getBulkOrderUploadHistory =
  (customerNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BOUploadHistory`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BULK_ORDER_UPLOAD_HISTORY,
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

export const deleteBOUploadHistory =
  (id, customerNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.delete(
        `${SERVER_BASE_URL}/customer/BOUploadHistory/delete/${id}`,
        config
      );

      const getBOUploadHistory = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BOUploadHistory`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BULK_ORDER_UPLOAD_HISTORY,
        payload: getBOUploadHistory.data
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

// http://localhost:8181/customer/{customerNumber}/BOConfiguration/validate/{bulkhistoryId}

export const validateBulkOrder =
  (
    bulkhistoryId,
    customerNumber,
    authToken,
    setOpenTableModal,
    pageSize,
    pageIndex
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      setOpenTableModal(true);
      const response = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BOConfiguration/validate/${bulkhistoryId}`,
        config
      );

      const data = await axios.post(
        `${SERVER_BASE_URL}/customer/boPagingList/${customerNumber}/${bulkhistoryId}`,
        {
          pageSize: pageSize,
          pageIndex: pageIndex - 1
        },
        config
      );

      const BOHistoryresponse = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BOUploadHistory`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BULK_HISTORYID,
        payload: { id: bulkhistoryId }
      });

      dispatch({
        type: ActionTypes.GET_BULK_ORDER_UPLOAD_HISTORY,
        payload: BOHistoryresponse.data
      });

      dispatch({
        type: ActionTypes.GET_BULK_EXCEL_DATA,
        payload: data.data
      });
      // toast.success('File Uploaded Successfully');
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
      setOpenTableModal(false);
    }
  };

export const uploadBulkOrder =
  (
    customerNumber,
    spaces,
    file,
    authToken,
    setOpenTableModal,
    pageSize,
    pageIndex
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      setOpenTableModal(true);
      let data;
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BOConfiguration/uploadExcel?shouldSpaceBeRemoved=${spaces}`,
        file,
        config
      );

      if (response && response?.data?.id) {
        data = await axios.post(
          `${SERVER_BASE_URL}/customer/boPagingList/${customerNumber}/${response?.data?.id}`,
          {
            pageSize: pageSize,
            pageIndex: pageIndex - 1
          },
          config
        );
       
      }

      const BOHistoryresponse = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BOUploadHistory`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BULK_HISTORYID,
        payload: response?.data
      });
      dispatch({
        type: ActionTypes.GET_BULK_ORDER_UPLOAD_HISTORY,
        payload: BOHistoryresponse.data
      });

      dispatch({
        type: ActionTypes.GET_BULK_EXCEL_DATA,
        payload: data.data
      });
      toast.success('File uploaded successfully.');
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const changePageExcelBulkOrder =
  (
    customerNumber,
    spaces,
    file,
    authToken,
    setTableModalOpen,
    pageSize,
    pageIndex,
    BulkHistoryId,
    filteredData
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      let data;
      data = await axios.post(
        `${SERVER_BASE_URL}/customer/boPagingList/${customerNumber}/${BulkHistoryId}`,
        {
          pageSize: pageSize,
          pageIndex: pageIndex - 1,
          statusList: filteredData?.status
        },
        config
      );

      dispatch({
        type: ActionTypes.GET_BULK_EXCEL_DATA,
        payload: data.data
      });
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
      setTableModalOpen(false);
    }
  };

export const changePageFilter =
  (
    customerNumber,
    spaces,
    file,
    authToken,
    setTableModalOpen,
    pageSize,
    pageIndex,
    BulkHistoryId,
    filteredData
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      let data;
      data = await axios.post(
        `${SERVER_BASE_URL}/customer/boPagingList/${customerNumber}/${BulkHistoryId}`,
        {
          pageSize: pageSize,
          pageIndex: 0,
          statusList: filteredData?.status
        },
        config
      );

      dispatch({
        type: ActionTypes.GET_BULK_EXCEL_DATA,
        payload: data.data
      });
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
      setTableModalOpen(false);
    }
  };
//   http://localhost:8181/file/download?fileName=Marmon/Customer/21908/Orders/BPO/Maxon_Blanket_PO_example_422779_b (1)10-07-2022-16-31.xlsx
// http://localhost:8181/customer/placeAllValidOrders/46030/152

export const placeAllValidBulkOrder =
  (customerNumber, id, authToken, handleModalClose, gridRef) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/placeAllValidOrders/${customerNumber}/${id}`,
        {},
        config
      );

      const responsehistory = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BOUploadHistory`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BULK_ORDER_UPLOAD_HISTORY,
        payload: responsehistory.data
      });
      if (response) {
        gridRef.current.api.deselectAll();
        handleModalClose(true);
      }
      toast.success('Orders are placed successfully.');
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };
export const placeBulkOrder =
  (customerNumber, id, orders, authToken, handleModalClose, gridRef) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      
      if (orders.length !== 0) {
        const response = await axios.post(
          `${SERVER_BASE_URL}/customer/${customerNumber}/BOConfiguration/placeOrder/${id}`,
          orders,
          config
        );

        const responsehistory = await axios.get(
          `${SERVER_BASE_URL}/customer/${customerNumber}/BOUploadHistory`,
          config
        );

        dispatch({
          type: ActionTypes.GET_BULK_ORDER_UPLOAD_HISTORY,
          payload: responsehistory.data
        });
        if (response) {
          gridRef.current.api.deselectAll();
          handleModalClose(true);
        }

        // dispatch({
        //   type: ActionTypes.GET_FORECAST_UPLOAD_HISTORY,
        //   payload: response.data
        // });
        toast.success('Orders are placed successfully.');
      } else {
        toast.error('No valid orders selected.');
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

export const DownloadBulkOrder =
  (fileName, extension, authToken) => async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Disposition': `attachment; filename=template.${extension}`,
          'Content-Type':
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        responseType: 'arraybuffer'
      };
      const response = await axios.get(
        `${SERVER_BASE_URL}/file/download?fileName=${fileName}`,
        config
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}`);
      document.body.appendChild(link);
      link.click();
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };
