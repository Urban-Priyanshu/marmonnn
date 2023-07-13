import axios from 'axios';
import { ActionTypes } from '../constants/action-types';
import SERVER_BASE_URL from '../../config/config';
import { toast } from 'react-toastify';
import store from '../store';

export const loaderAction =
  (loaderStatus) =>
  async (dispatch) => {
   
      dispatch({
        type: ActionTypes.LOADER_STATUS,
        payload: loaderStatus
      });

  };