import axios from 'axios';
import { ActionTypes } from '../constants/action-types';
import SERVER_BASE_URL from '../../config/config';
import { toast } from 'react-toastify';
import store from '../store';
import { Navigate } from 'react-router';

export const getForecastData =
  (authToken, customerNumber) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/FConfiguration`,
        config
      );

      dispatch({
        type: ActionTypes.GET_FORECAST_DATA,
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

export const addOrUpdateForecastData =
  (
    authToken,
    name,
    format,
    customerNumber,
    ForecastDataAddData,
    existingFields
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      if (
        ForecastDataAddData?.find((d) => d?.headerName === name) ||
        existingFields?.find((d) => d.toUpperCase() === name.toUpperCase())
      ) {
        toast.error('Field Already Exists');
      } else {
        const response = await axios.post(
          `${SERVER_BASE_URL}/customer/FConfiguration/addAdditionalField`,
          [
            {
              customerNumber: customerNumber,
              headerName: name,
              headerDataType: format,
              value: ''
            }
          ],

          config
        );
      }

      const fetchForecastData = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/FConfiguration`,
        config
      );

      dispatch({
        type: ActionTypes.GET_FORECAST_DATA,
        payload: fetchForecastData.data
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

export const UploadAllValidOrder =
  (customerNumber, id, authToken, handleModalClose, gridRef) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/uploadAllValidForecast/${customerNumber}/${id}`,
        {},
        config
      );

      const responseHistory = await axios.get(
        `${SERVER_BASE_URL}/customer/getFConfiguration/UploadHistory/${customerNumber}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_FORECAST_HISTORY_DATA,
        payload: responseHistory.data
      });
      if (response) {
        gridRef.current.api.deselectAll();
        handleModalClose(true);
      }
      toast.success(response?.data);
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const deleteForecastConfig =
  (authToken, data, id) => async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` }
      };
      const response = await axios.delete(
        `${SERVER_BASE_URL}/customer/${data?.customerNumber}/AdditionalFConfiguration/delete?headerName=${data?.headerName}`,

        config
      );

      const getForecastConfig = await axios.get(
        `${SERVER_BASE_URL}/customer/${data?.customerNumber}/FConfiguration`,
        config
      );

      dispatch({
        type: ActionTypes.GET_FORECAST_DATA,
        payload: getForecastConfig.data
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

export const saveForecastConfig =
  (authToken, values, addValues, customerNumber) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/FConfiguration/addOrUpdate`,

        { ...values, customerNumber: customerNumber },

        config
      );

      const saveAddForecastConfig = await axios.post(
        `${SERVER_BASE_URL}/customer/FConfiguration/addAdditionalField`,
        addValues,
        config
      );

      const getForecastConfig = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/FConfiguration`,
        config
      );

      dispatch({
        type: ActionTypes.GET_FORECAST_DATA,
        payload: getForecastConfig.data
      });

      toast.success('Forecast configuration got updated successfully.');
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }

      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const getForecastHistory =
  (customerNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/customer/getFConfiguration/UploadHistory/${customerNumber}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_FORECAST_HISTORY_DATA,
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

export const deleteForecastHistory =
  (id, customerNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.delete(
        `${SERVER_BASE_URL}/customer/FConfiguration/UploadHistory/delete/${id}`,
        config
      );

      const getForecastHistoryData = await axios.get(
        `${SERVER_BASE_URL}/customer/getFConfiguration/UploadHistory/${customerNumber}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_FORECAST_HISTORY_DATA,
        payload: getForecastHistoryData.data
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

export const changePageExcelForecast =
  (
    customerNumber,
    spaces,
    file,
    authToken,
    setTableModalOpen,
    setLoader,
    pageSize,
    pageIndex,
    forecastHistoryId,
    filteredData,
    type
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      if (type === 'pageChange') {
        let data;
        data = await axios.post(
          `${SERVER_BASE_URL}/customer/forecastPagingList/${customerNumber}/${forecastHistoryId}`,
          {
            pageSize: pageSize,
            pageIndex: pageIndex - 1,
            statusList: filteredData?.status
          },
          config
        );

        dispatch({
          type: ActionTypes.GET_FORECAST_EXCEL_DATA,
          payload: data.data
        });
      } else {
        console.log('Not Page Change');
      }
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
    setLoader,
    pageSize,
    pageIndex,
    forecastHistoryId,
    filteredData,
    type
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      if (type === 'filterChange') {
        let data;
        data = await axios.post(
          `${SERVER_BASE_URL}/customer/forecastPagingList/${customerNumber}/${forecastHistoryId}`,
          {
            pageSize: pageSize,
            pageIndex: 0,
            statusList: filteredData?.status
          },
          config
        );

        dispatch({
          type: ActionTypes.GET_FORECAST_EXCEL_DATA,
          payload: data.data
        });
      } else {
        console.log('not Filter Change');
      }
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

export const uploadAndCompareForecast =
  (
    customerNumber,
    spaces,
    file,
    authToken,
    setopenCompareModal,
    navigate,
    file1,
    secondFile2,
    setErrorModalOpen,
    setErrorHistory
  ) =>
  async (dispatch) => {
  
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      setErrorHistory(false);
      setErrorModalOpen(true);
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/${customerNumber}/FConfiguration/compare?shouldSpaceBeRemoved=${spaces}`,
        file,
        config
      );
      const responseHistory = await axios.get(
        `${SERVER_BASE_URL}/customer/getFConfiguration/UploadHistory/${customerNumber}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_FORECAST_HISTORY_DATA,
        payload: responseHistory.data
      });

      dispatch({
        type: ActionTypes.GET_FORECAST_COMPARE_DATA,
        payload: response.data
      });

     

      if (response?.data?.errors?.length > 0) {
        dispatch({
          type: ActionTypes.FORECAST_COMPARE_ERROR,
          payload: response?.data?.errors
        });
      } else {
        toast.success('Compare Successfully');
        setopenCompareModal(false);
        navigate('/compare-forecast', {
          state: {
            file1: file1,
            file2: secondFile2
          }
        });
      }
    } catch (e) {
    
      if (typeof e?.response?.data?.error === 'string') {
        toast.error(e?.response?.data?.error);
      } else {
        dispatch({
          type: ActionTypes.FORECAST_COMPARE_ERROR,
          payload: e?.response?.data?.error
        });
      }
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
    }
  };

export const uploadAndCompareForecastHistory =
  (
    customerNumber,
    FileIds,
    authToken,
    setSelectedData,
    setopenCompareModal,
    navigate,
    selectedData,
    setErrorModalOpen,
    setErrorHistory
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
     
      if (FileIds.length > 2 || FileIds.length < 2) {
        toast.error('Two files has to be uploaded!');
      } else {
        setErrorHistory(true);
        const response = await axios.post(
          `${SERVER_BASE_URL}/customer/${customerNumber}/FConfiguration/${FileIds[0]}/${FileIds[1]}/compare`,
          {},
          config
        );
      

        const responseHistory = await axios.get(
          `${SERVER_BASE_URL}/customer/getFConfiguration/UploadHistory/${customerNumber}`,
          config
        );

        dispatch({
          type: ActionTypes.GET_FORECAST_HISTORY_DATA,
          payload: responseHistory.data
        });

        dispatch({
          type: ActionTypes.GET_FORECAST_COMPARE_DATA,
          payload: response.data
        });

        if (response?.data?.errors?.length > 0) {
          dispatch({
            type: ActionTypes.FORECAST_COMPARE_ERROR,
            payload: response?.data?.errors
          });
        } else {
          toast.success('Compared Successfully');
          setopenCompareModal(false);
          navigate('/compare-forecast', {
            state: {
              file1: selectedData[0]?.fileUploaded?.substring(
                selectedData[0]?.fileUploaded?.lastIndexOf('/') + 1
              ),
              file2: selectedData[1]?.fileUploaded?.substring(
                selectedData[1]?.fileUploaded?.lastIndexOf('/') + 1
              )
            }
          });
        }
      }
    } catch (e) {
   
      if (typeof e?.response?.data?.error === 'string') {
        toast.error(e?.response?.data?.error);
      } else {
        dispatch({
          type: ActionTypes.FORECAST_COMPARE_ERROR,
          payload: e?.response?.data?.error
        });
      }
    }
  };

export const uploadPartsForecast =
  (customerNumber, id, orders, authToken, handleModalClose, gridRef) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
  
    try {
      if (orders.length !== 0) {
        const response = await axios.post(
          `${SERVER_BASE_URL}/customer/${customerNumber}/FConfiguration/uploadParts/${id}`,
          orders,
          config
        );

        const responseHistory = await axios.get(
          `${SERVER_BASE_URL}/customer/getFConfiguration/UploadHistory/${customerNumber}`,
          config
        );

        dispatch({
          type: ActionTypes.GET_FORECAST_HISTORY_DATA,
          payload: responseHistory.data
        });
        if (response) {
          gridRef.current.api.deselectAll();
          handleModalClose(true);
        }

        dispatch({
          type: ActionTypes.GET_FORECAST_UPLOAD_HISTORY,
          payload: response.data
        });
        toast.success('Forecast parts are uploaded successfully.');
        setTableModalOpen(true);
      } else {
        toast.error('Please select the valid parts to upload');
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

export const uploadForecast =
  (
    customerNumber,
    spaces,
    file,
    authToken,
    setTableModalOpen,
    setLoader,
    pageSize,
    pageIndex,
    forecastHistoryId,
    type
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      if (type === 'pageChange') {
        let data;
        data = await axios.post(
          `${SERVER_BASE_URL}/customer/forecastPagingList/${customerNumber}/${forecastHistoryId}`,
          {
            pageSize: pageSize,
            pageIndex: pageIndex
          },
          config
        );

        dispatch({
          type: ActionTypes.GET_FORECAST_EXCEL_DATA,
          payload: data.data
        });
      } else {
        setTableModalOpen(true);
        let data;
        const response = await axios.post(
          `${SERVER_BASE_URL}/customer/${customerNumber}/FConfiguration/uploadExcel?shouldSpaceBeRemoved=${spaces}`,
          file,
          config
        );

        if (response && response?.data?.id) {
          data = await axios.post(
            `${SERVER_BASE_URL}/customer/forecastPagingList/${customerNumber}/${response?.data?.id}`,
            {
              pageSize: pageSize,
              pageIndex: pageIndex - 1
            },
            config
          );
        }

        const responseHistory = await axios.get(
          `${SERVER_BASE_URL}/customer/getFConfiguration/UploadHistory/${customerNumber}`,
          config
        );

        dispatch({
          type: ActionTypes.GET_FORECAST_HISTORYID,
          payload: response?.data
        });

        dispatch({
          type: ActionTypes.GET_FORECAST_HISTORY_DATA,
          payload: responseHistory.data
        });

        dispatch({
          type: ActionTypes.GET_FORECAST_EXCEL_DATA,
          payload: data.data
        });
        toast.success('File uploaded successfully.');
      }

      setTableModalOpen(true);
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

export const validateForecastConfig =
  (
    fcuhId,
    customerNumber,
    authToken,
    setOpenTableModal,
    setLoader,
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
        `${SERVER_BASE_URL}/customer/${customerNumber}/FConfiguration/validate/${fcuhId}`,
        config
      );

      const data = await axios.post(
        `${SERVER_BASE_URL}/customer/forecastPagingList/${customerNumber}/${fcuhId}`,
        {
          pageSize: pageSize,
          pageIndex: pageIndex - 1
        },
        config
      );

      const forecastResponse = await axios.get(
        `${SERVER_BASE_URL}/customer/getFConfiguration/UploadHistory/${customerNumber}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_FORECAST_HISTORYID,
        payload: { id: fcuhId }
      });

      dispatch({
        type: ActionTypes.GET_FORECAST_HISTORY_DATA,
        payload: forecastResponse.data
      });
      dispatch({
        type: ActionTypes.GET_FORECAST_EXCEL_DATA,
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
