import axios from 'axios';
import { ActionTypes } from '../constants/action-types';
import SERVER_BASE_URL from '../../config/config';
import { toast } from 'react-toastify';
import store from '../store';
import moment from 'moment';

export const dashboardData =
  (
    customerNumber,
    authToken,
    date,
    setviewdashboardTableData,
    setCustomerValue,
    setDate,
    setviewAll,
    setheader,
    setcustomerLabel,
    setExcelToggle
  ) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
    
      setviewdashboardTableData(null);

      if (customerNumber) {
        setExcelToggle(false);
        const response = await axios.get(
          `${SERVER_BASE_URL}/dashboard/report?customerNumber=${customerNumber}&searchDate=${moment(
            date
          ).format('MM/DD/YYYY')}`,
          config
        );

        dispatch({
          type: ActionTypes.GET_DASHBOARD_DATA,
          payload: response.data
        });
        if (response.data.dashBoardOrders.length >= 0) {
          setExcelToggle(true);
        }
      } else {
        setExcelToggle(false);
        const response = await axios.get(
          `${SERVER_BASE_URL}/dashboard/report?searchDate=${moment(date).format(
            'MM/DD/YYYY'
          )}`,
          config
        );

        dispatch({
          type: ActionTypes.GET_DASHBOARD_DATA,
          payload: response.data
        });
        if (response.data.dashBoardOrders.length > 0) {
        
          setExcelToggle(true);
        }

        setCustomerValue();
        setDate(new Date());
        setviewAll(true);
        setheader(false);
        setcustomerLabel('');
      }
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
      setExcelToggle(true);
    }
  };

export const externalUserDashboard =
  (customerNumber, date ,authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/EU/report?searchDate=${moment(
          date
        ).format('MM/DD/YYYY')}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_EXTERNAL_USER_DASHBOARD,
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

 
  export const dashboardReportData =
  (email , date , authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/audit/time/user/?email=${email}&searchDate=${moment(
          date
        ).format('MM/DD/YYYY')}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_DASHBOARD_REPORT,
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

export const dashboardTableData =
  (customerNumber, date, authToken, setviewAll, setExcelToggle, renderType) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
    
      setExcelToggle(false);
      if (customerNumber) {
        const response = await axios.get(
          `${SERVER_BASE_URL}/dashboard/report/Orders/view?customerNumber=${customerNumber}&searchDate=${moment(
            date
          ).format('MM/DD/YYYY')}`,
          config
        );
        
        dispatch({
          type: ActionTypes.GET_DASHBOARD_TABLE_DATA,
          payload: response.data
        });
        if (response.data.length > 0) {
    
          setExcelToggle(true);
        }
      } else {
        const response = await axios.get(
          `${SERVER_BASE_URL}/dashboard/report/Orders/view?customerNumber&searchDate=${moment(
            date
          ).format('MM/DD/YYYY')}`,
          config
        );

        dispatch({
          type: ActionTypes.GET_DASHBOARD_TABLE_DATA,
          payload: response.data
        });
        if (response.data.length > 0) {
       
          setExcelToggle(true);
        }
      }
      if (renderType != 'firstRender') {
        setviewAll(false);
      } else {
        setviewAll(true);
      }
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
      }
      toast.error(e?.response?.data?.errorDescription);
      setExcelToggle(true);
    }
  };


  
export const timeCalculation =
(
  email , 
  pageName,
  timeSpent,
  customerId
 
) =>
async (dispatch) => {
 
  try {
    let data;
  
    data = await axios.post(
      `${SERVER_BASE_URL}/audit/time/save`,
      {
        email,
        pageName,
        timeSpent,
        customerId
      }
      
    );

   
  } catch (e) {
  
    toast.error(e?.response?.data?.errorDescription);
    setTableModalOpen(false);
  }
};