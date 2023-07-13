import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { loaderAction } from './redux/actions/loaderAction';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './router';
import './App.css';
import { useCallback, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import Footer from './components/Footer';
import axios from 'axios';

import { ActionTypes } from './redux/constants/action-types';
import { useNavigate } from 'react-router';

function App() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const authUser = useSelector((state) => state?.auth?.authUserData);


  const customId = 'custom-id-yes';

  axios.interceptors.request.use(
    (request) => {
      if (request.method === 'get' || request.method === 'post') {
        dispatch(loaderAction(true));
      }

      return request;
    },
    function (error) {
      dispatch(loaderAction(false));
      return Promise.reject(error);
    }
  );
  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      dispatch(loaderAction(false));

 
      return response;
    },
    function (error) {
      dispatch(loaderAction(false));
      if (error?.response?.status === 401) {
        toast.error(
          'Your login session has been expired, please login again!',
          {
            toastId: customId
          }
        );
      }
      return Promise.reject(error);
    }
  );
  const addHelmet = useCallback(() => {
    switch (true) {
      case authUser && authUser?.roles?.find((d) => d?.id === 1)?.id === 1:
        return <title>M/K - Super Admin</title>;

      case authUser && authUser?.roles?.find((d) => d?.id === 2)?.id === 2:
        return <title>M/K - System Admin</title>;

      case authUser && authUser?.roles?.find((d) => d?.id === 3)?.id === 3:
        return <title>M/K - Sales User</title>;

      default:
        return;
    }
  }, [authUser]);
  return (
    

    <div className="outer-wrapper">
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <div className="inner-wrapper">
            <div className="header-section"> </div>

            <div className="sidenav-section"> </div>

            <div className="page-content">
              <div className="content">
                <AppRoutes />
              </div>
            </div>

            <div className="footer-section">{authUser && <Footer />}</div>

            <ToastContainer
              position="bottom-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
            />
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}
export default App;
