import axios from 'axios';
import { ActionTypes } from '../constants/action-types';
import SERVER_BASE_URL from '../../config/config';
import { toast } from 'react-toastify';
import store from '../store';

export const addOrUpdateBlanketPo =
  (authToken, name, format, customerNumber, BlanketPoData,existingFields) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      if (BlanketPoData?.find((d) => d?.headerName === name) ||existingFields?.find((d)=>d.toUpperCase()===name.toUpperCase())) {
        toast.error('Field Already Exists');
      } else {
        const response = await axios.post(
          `${SERVER_BASE_URL}/customer/BPOConfiguration/addAdditionalField`,
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

      const fetchBlanketPo = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BPOConfiguration`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BLANKET_PO_DATA,
        payload: fetchBlanketPo.data
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

export const getBlanketPoData =
  (authToken, customerNumber) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BPOConfiguration`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BLANKET_PO_DATA,
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

export const deleteBlanketPoConfig =
  (authToken, data, id) => async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` }
      };
      const response = await axios.delete(
        `${SERVER_BASE_URL}/customer/${data?.customerNumber}/AdditionalBPOConfiguration/delete?headerName=${data?.headerName}`,

        config
      );

      const getBlanketPoConfig = await axios.get(
        `${SERVER_BASE_URL}/customer/${data.customerNumber}/BPOConfiguration`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BLANKET_PO_DATA,
        payload: getBlanketPoConfig.data
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

export const saveBlanketPO =
  (authToken, values, addValues, customerNumber) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/BPOConfiguration/addOrUpdate`,

        { ...values, customerNumber: customerNumber },

        config
      );

      const saveAddBlanketPO = await axios.post(
        `${SERVER_BASE_URL}/customer/BPOConfiguration/addAdditionalField`,
        addValues,
        config
      );

      const getBlanketPoConfig = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BPOConfiguration`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BLANKET_PO_DATA,
        payload: getBlanketPoConfig.data
      });
      toast.success('Blanket PO configuration got updated successfully.');
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });

        
      }

      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const getBPOUploadHistory =
  (customerNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BPOUploadHistory`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BPO_UPLOAD_HISTORY,
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

export const deleteBPOHistory =
  (id, customerNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.delete(
        `${SERVER_BASE_URL}/customer/BPOUploadHistory/delete/${id}`,
        config
      );

      const getBPOUploadHistory = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BPOUploadHistory`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BPO_UPLOAD_HISTORY,
        payload: getBPOUploadHistory.data
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

export const uploadBlanketPO =
  (customerNumber, spaces, file, authToken, setTableModalOpen,  pageSize,
    pageIndex) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      setTableModalOpen(true);
      let data;
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BPOConfiguration/uploadExcel?shouldSpaceBeRemoved=${spaces}`,
        file,
        config
      );

      if (response && response?.data?.id) {
        data = await axios.post(
          `${SERVER_BASE_URL}/customer/bpoPagingList/${response?.data?.id}`,
          {
            pageSize: pageSize,
            pageIndex: pageIndex - 1
          },
          config
        );
      }

      const getBpoHistory = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BPOUploadHistory`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BPO_HISTORYID,
        payload: response?.data
      });

      dispatch({
        type: ActionTypes.GET_BPO_UPLOAD_HISTORY,
        payload: getBpoHistory.data
      });

      dispatch({
        type: ActionTypes.GET_BPO_EXCEL_DATA,
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
      setLoader(false);
    }
  };
  export const changePageExcelBpo =
  (
    customerNumber,
    spaces,
    file,
    authToken,
    setTableModalOpen,
    pageSize,
    pageIndex,
    BpoHistoryId,
    filteredData,
   
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
    
        let data;
        data = await axios.post(
          `${SERVER_BASE_URL}/customer/bpoPagingList/${BpoHistoryId}`,
          {
            pageSize: pageSize,
            pageIndex: pageIndex - 1,
            statusList: filteredData?.status
          },
          config
        );

        dispatch({
          type: ActionTypes.GET_BPO_EXCEL_DATA,
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
  BpoHistoryId,
  filteredData,
  
) =>
async (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${authToken}` }
  };
  try {
   
      let data;
      data = await axios.post(
        `${SERVER_BASE_URL}/customer/bpoPagingList/${BpoHistoryId}`,
        {
          pageSize: pageSize,
          pageIndex: 0,
          statusList: filteredData?.status
        },
        config
      );

      dispatch({
        type: ActionTypes.GET_BPO_EXCEL_DATA,
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

export const placeBlanketPO =
  (customerNumber, id, orders, handleTableModalClose, authToken) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BPOConfiguration/uploadParts/${id}`,
        orders,
        config
      );

      const getBpoHistory = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BPOUploadHistory`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BPO_UPLOAD_HISTORY,
        payload: getBpoHistory.data
      });
      toast.success('Blanket PO parts are uploaded successfully.');
      handleTableModalClose();
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const DownloadBlanketPo = (fileName, authToken) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Disposition': 'attachment; filename=template.xlsx',
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
    link.setAttribute('download', `${fileName}.xlsx`);
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

export const validateBlanketPo =
  (blanketPoHistoryId, customerNumber, authToken, setOpenTableModal , pageSize,
    pageIndex) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      setOpenTableModal(true);
      const response = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BPOConfiguration/validate/${blanketPoHistoryId}`,

        config
      );
      
      const data = await axios.post(
          `${SERVER_BASE_URL}/customer/bpoPagingList/${response?.data?.id}`,
          {
            pageSize: pageSize,
            pageIndex: pageIndex - 1
          },
          config
        );
      
      const getBpoHistory = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/BPOUploadHistory`,
        config
      );

      dispatch({
        type: ActionTypes.GET_BPO_HISTORYID,
        payload:  { id: blanketPoHistoryId }
      });
      dispatch({
        type: ActionTypes.GET_BPO_UPLOAD_HISTORY,
        payload: getBpoHistory.data
      });

      dispatch({
        type: ActionTypes.GET_BPO_EXCEL_DATA,
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
