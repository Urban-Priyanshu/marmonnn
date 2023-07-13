import axios from 'axios';
import { ActionTypes } from '../constants/action-types';
import SERVER_BASE_URL from '../../config/config';
import { toast } from 'react-toastify';
import store from '../store';
import {
  CONFIRMATION_MAIL,
  PASSWORD_CREATED,
  PASSWORD_RESET,
  SUCCESSFUL_LOGIN
} from '../../config/Toast Messages/authActionToasts';
import { Navigate } from 'react-router';

export const registerUser = (values, password, navigate,token) => async () => {
  try {
    if (password != values.confirmPassword) {
      toast.error('Password is not matching');
    } else {
      const response = await axios.post(
        `${SERVER_BASE_URL}/login/register?token=${token}`,
        values
      );
      toast.success(PASSWORD_CREATED);
      navigate('/auth/login');
    }
  } catch (e) {
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const verifyUser = (values) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${SERVER_BASE_URL}/login/verify?email=${values.email}`
    );
    dispatch({
      type: ActionTypes.GET_VERIFY_USER,
      payload: response.data
    });
    toast.success(CONFIRMATION_MAIL);
    return response;
  } catch (e) {
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const duoCallBack =
  (state, duoCode, email, navigate) => async (dispatch) => {
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/login/web/callback?state=${state}&duo_code=${duoCode}&email=${email}`
      );
     
      dispatch({
        type: ActionTypes.AUTHENTICATE_USER,
        payload: response.data
      });
     
     
     
    //  window.location.replace(response.data.authURL);
     return response;

     
    } catch (e) {
      toast.error(e?.response?.data?.errorDescription);
    }
  };



export const userAuthenticateWeb = (values) => async (dispatch) => {
  try {
  
    const response = await axios.post(
      `${SERVER_BASE_URL}/login/web`,{
        email:values?.email,
        credential:values?.credential
      }
     
    );
    dispatch({
      type: ActionTypes.AUTHENTICATE_USER,
      payload: response.data
    });
    toast.success(SUCCESSFUL_LOGIN);
    localStorage.setItem('authEmail', values?.email);
    if (response && response?.data?.authURL) {
      window.location.replace(response?.data?.authURL);
    }

    return response.data;
  } catch (e) {
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const getAuthUser = (email, authToken, navigate) => async (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${authToken}` }
  };
  try {
    const response = await axios.get(
      `${SERVER_BASE_URL}/user/getUserDetail?email=${email}
    `,
      config
    );
    dispatch({
      type: ActionTypes.GET_AUTH_USER,
      payload: response.data
    });
    navigate('/auth/login');
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
};


export const getUserDetails = (authToken) => async (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${authToken}` }
  };
  try {
    const response = await axios.get(
      `${SERVER_BASE_URL}/user/token?token=${authToken} 
    `,
      config
    );
    dispatch({
      type: ActionTypes.GET_AUTH_USER_DETAIL,
      payload: response.data
    });
   
    // navigate('/auth/login');
  } catch (e) {
    toast.error(e?.response?.data?.message);
  }
};


export const resetUser = (email, credential, navigate, token) => async () => {
  try {
   
    const response = await axios.post(`${SERVER_BASE_URL}/login/reset?token=${token}`, {
     
      credential
    });
    toast.success(PASSWORD_RESET);
    navigate('/auth/login');
  } catch (e) {
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const logout = (authToken) => async (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${authToken}`, Logout: 'Logout' }
  };

  try {
    const response = await axios.post(
      `${SERVER_BASE_URL}/user/logout`,
      {},
      config
    );
  

    dispatch({
      type: ActionTypes.LOGOUT,
      payload: response.data
    });
   
  } catch (e) {
    toast.error(e?.response?.data?.message);
    dispatch({
      type: ActionTypes.LOGOUT
    });
  }
};
