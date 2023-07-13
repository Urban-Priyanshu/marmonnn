import axios from 'axios';
import { ActionTypes } from '../constants/action-types';
import SERVER_BASE_URL from '../../config/config';
import { toast } from 'react-toastify';
import { REQUEST_SENT, USER_ADDED, USER_DEACTIVATED, USER_UPDATED  } from 'src/config/Toast Messages/userActionToasts';



export const getAllUsers = (authToken) => async (dispatch) => {
  
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    
    const response = await axios.get(`${SERVER_BASE_URL}/user/getUsersType?userTypeCode=I`, config);

    dispatch({
      type: ActionTypes.GET_USERS,
      payload: response.data
    });

   
  } catch (e) {
    

    if(e?.response?.status === 401){
      dispatch({
        type: ActionTypes.LOGOUT
      });
    }
    toast.error(e?.response?.data?.errorDescription);
   
  }
};

export const getActiveUsers = (authToken) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await axios.get(`${SERVER_BASE_URL}/user/getActiveUsers`, config);
    dispatch({
      type: ActionTypes.GET_ACTIVE_USERS,
      payload: response.data
    });
  } catch (e) {  
    
    if(e?.response?.status === 401){
    dispatch({
      type: ActionTypes.LOGOUT
    });
  }
  toast.error(e?.response?.data?.errorDescription);
  }
};

export const getUser = (id, authToken) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await axios.get(`${SERVER_BASE_URL}/user/${id}`, config);
    dispatch({
      type: ActionTypes.GET_USER,
      payload: response.data
    });
  } catch (e) {

    if(e?.response?.status === 401){
      dispatch({
        type: ActionTypes.LOGOUT
      });
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const addUser = (user, authToken,reset) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await axios.post(`${SERVER_BASE_URL}/user/addUser`, {...user, roles: user?.roles?.map((d)=> d?.value)}, config);
    const getUsers = await axios.get(`${SERVER_BASE_URL}/user/getUsersType?userTypeCode=I`, config);

    dispatch({
      type: ActionTypes.GET_USERS,
      payload: getUsers.data
    });
    toast.success(USER_ADDED);
    reset()
   
  } catch (e) {

    if(e?.response?.status === 401){
      dispatch({
        type: ActionTypes.LOGOUT
      });
    }
    
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const editUser = (user, authToken , isEmailChange ,setresendButtonDisabled) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await axios.post(`${SERVER_BASE_URL}/user/updateUser`, user, config);
    const getThisUser = await axios.get(`${SERVER_BASE_URL}/user/${user.id}`, config);
    dispatch({
      type: ActionTypes.GET_USER,
      payload: getThisUser.data
    });
    toast.success(USER_UPDATED);
    if(isEmailChange){
      setresendButtonDisabled(false);
    }
    
  } catch (e) {

    if(e?.response?.status === 401){
      dispatch({
        type: ActionTypes.LOGOUT
      });
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const deactivateUser = (id, authToken) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response =await axios.post(`${SERVER_BASE_URL}/user/updateStatus/${id}/D`,{}, config);
    const getUsers = await axios.get(`${SERVER_BASE_URL}/user/getUsersType?userTypeCode=I`, config);

    dispatch({
      type: ActionTypes.GET_USERS,
      payload: getUsers.data
    });
    toast.success(USER_DEACTIVATED);
  } catch (e) {

    if(e?.response?.status === 401){
      dispatch({
        type: ActionTypes.LOGOUT
      });
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const updateStatus = (id, status, authToken, type) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };
    const response = await axios.post(`${SERVER_BASE_URL}/user/updateStatus/${id}/${status}`,{}, config);
   

    if(type === 'getAllUsers') {
      
    const getAllUsers = await axios.get(`${SERVER_BASE_URL}/user/getUsersType?userTypeCode=I`, config);
      dispatch({
        type: ActionTypes.GET_USERS,
        payload: getAllUsers.data
      });

    }

    if(type === 'getAllExternalUsers') {
      const externalCustomer = await axios.get(
        `${SERVER_BASE_URL}/customer/${id}/EU`,
        config
      );
      dispatch({
        type: ActionTypes.GET_EXTERNAL_USERS,
        payload: externalCustomer.data
      });

    }

    
    else {
      
    const getThisUser = await axios.get(`${SERVER_BASE_URL}/user/${id}`, config);
      dispatch({
        type: ActionTypes.GET_USER,
        payload: getThisUser.data
      });
    }
    if(status === 'D') {
      toast.success('User Deactivated successfully');

    }

    if(status === 'A') {
      toast.success('User Activated successfully');

    }
   

    if(status === 'RS'){
      toast.success(REQUEST_SENT);
    }
  } catch (e) {

    if(e?.response?.status === 401){
      dispatch({
        type: ActionTypes.LOGOUT
      });
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const getUserRoles = (authToken) => async (dispatch) => {
  try {
    
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };   
    const response = await axios.get(`${SERVER_BASE_URL}/user/getAllRoles`, config);
    

    dispatch({
      type: ActionTypes.GET_ROLES,
      payload: response.data
    });

  
  } catch (e) {

    if(e?.response?.status === 401){
      dispatch({
        type: ActionTypes.LOGOUT
      });
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};



export const getResendEmail = (id, email , firstName , lastName , authToken,setresendButtonDisabled) => async (dispatch) => {
  try {
    
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };   
    const response = await axios.post(`${SERVER_BASE_URL}/email/sendResendAccessMail/${id}` ,{}, config);
    const getThisUser = await axios.get(`${SERVER_BASE_URL}/user/${id}`, config);
   

    
    

    dispatch({
      type: ActionTypes.GET_USER,
      payload: getThisUser.data
    });
    if(response){
      toast.success(REQUEST_SENT);
    }
    setresendButtonDisabled(true);
  } catch (e) {
    if(e?.response?.status === 401){
      dispatch({
        type: ActionTypes.LOGOUT
      });
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};





export const getSpecificUsersByRole = (role, status, authToken) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };   
    const response = await axios.get(`${SERVER_BASE_URL}/user/getAllUsers/${role}`, config);
    

    dispatch({
      type: ActionTypes.GET_SPECIFIC_USERS_BY_ROLE,
      payload: response.data
    });
  } catch (e) {
    if(e?.response?.status === 401){
      dispatch({
        type: ActionTypes.LOGOUT
      });
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};





