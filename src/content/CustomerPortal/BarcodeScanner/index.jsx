import { Helmet } from 'react-helmet-async';
import {
  Box,
  styled,
  Grid,
  Typography,
  TextField,
  Button,
  TableContainer,
  Card,
  CardContent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import customerPortalLogo from 'src/assets/Images/customerPortalLogo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Breadcrumb from 'src/components/Breadcrumb';
import { useHistory, useLocation } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { BarcodeProcess } from 'src/redux/actions/CustomerPortalActions';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { ActionTypes } from 'src/redux/constants/action-types';
import { map } from 'jquery';
import { timeCalculation } from 'src/redux/actions/DashboardActions';
import { advanceTime } from 'src/services/Time-tracking';

// import ForestOrderConfig from 'src/content/SystemAdmin/ManageUsers/SingleCustomer/CustomerTabs/ForestOrderConfig';

const MainContainer = styled(Box)(
  () => `
  padding: 0px 32px 0px 32px;
  `
);

/* identical to box height */

function BarCodeScanner() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state?.auth?.authUserData);
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0
  });
  const customerData = useSelector((state) => state?.customers?.customerData);
  const logoImage = useSelector((state) => state?.customers?.getLogo);
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const barcodeProcessErrors = useSelector(
    (state) => state?.customerPortal?.barcodeProcessErrors
  );
  const location = useLocation();
  
  useEffect(() => {
    navigate('?cp=true');
  }, []);

  useEffect(() => {
    if (authUser && authUser?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')) {
      let isCancelled = false;

      advanceTime(time, isCancelled, setTime, 'Barcode Scanner');

      return () => {
        isCancelled = true;
        localStorage.setItem('componentTime', JSON.stringify(time));
      };
    }
  }, [time]);

  useEffect(() => {
    return () => {
      const value = JSON.parse(localStorage.getItem('componentTime'));

      if (value?.seconds > 59) {
        dispatch(
          timeCalculation(
            authUser?.email,
            'Barcode Scanner',
            value?.seconds,
            authUser?.associateCustomerId
          )
        );
      }

     
      localStorage.clear();
    };
  }, []);

  useEffect(() => {
    if (authUser && authUser?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')) {
      window.addEventListener('beforeunload', handleUnload);
      return () => {
        window.removeEventListener('beforeunload', handleUnload);
      };
    }
  }, []);

  function handleUnload(event) {
    event.preventDefault();
    event.returnValue = '';

    // Make API call here
    const value = JSON.parse(localStorage.getItem('componentTime'));
    if (value?.seconds > 59) {
      dispatch(
        timeCalculation(
          authUser?.email,
          'Barcode Scanner',
          value?.seconds,
          authUser?.associateCustomerId
        )
      );
      localStorage.clear();
    }
  }

  const handleErrorModalClose = () => {
    dispatch({
      type: ActionTypes.GET_BARCODE_PROCESS_ERRORS,
      payload: []
    });
    setErrorModalOpen(false);

    // setOpenTableModal(true);
  };

  const handleValue = (e) => {
    const arr = e?.target.value;
   
    setData(arr);
  };



  const handleSubmit = () => {
    dispatch(
      BarcodeProcess(
        customerData?.id,
        data?.split(/\r?\n/),
        setErrorModalOpen,
        setErrors,
        authToken,
        setData
      )
    );
  };


  return (
    <div style={{ paddingBottom: '400px' }}>
      <Box sx={{ margin: '32px 0 10px 35px' }}>
        <Breadcrumb
          userData={customerData}
          location={[
            {
              location: 'Home',
              to: `/customer-portal/${customerData?.id}/products`
            }
          ]}
          page={'Barcode Scanner'}
        />
        <label
          style={{
            fontSize: '15px',
            fontWeight: '600',
            lineHeight: '1',
            marginTop: '12px'
          }}
        >
          Barcode Scanning
        </label>
      </Box>

      <MainContainer>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { ml: 0 },
            display: { md: 'flex', xs: 'box' },
            flexDirection: 'row'
          }}
          noValidate
          autoComplete="off"
        >
          {/* <img src={customerPortalLogo} style={{ paddingRight: '8px' }}></img>
          {customerData?.logo && (
            <img src={`data:image/jpeg;base64,${logoImage}`}></img>
          )} */}
        </Box>{' '}
        <br></br>
        <Card sx={{ minWidth: 100 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Use this form to search for parts to add to the cart, please enter
              one part number per line.
            </Typography>
            <br></br>

            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 'light', m: 1, marginLeft: '0px' }}
            >
              Enter Part Number below
            </Typography>

            <Box
              sx={{
                width: 500,
                maxWidth: '100%'
              }}
            >
              <TextareaAutosize
                onChange={(e) => handleValue(e)}
                id="outlined-search"
                aria-label="minimum height"
                minRows={3}
                style={{ width: 200 }}
                value={data}
              />
            </Box>

            <br></br>

            <Button
              variant="contained"
              onClick={handleSubmit}
              size="medium"
              style={{ backgroundColor: '#15364A', width: 100, border: '3px' }}
            >
              Process
            </Button>
          </CardContent>
        </Card>
        {/* <ForestOrderConfig CustomerPortal={true} /> */}
      </MainContainer>
      <Dialog
        className="On-close"
        open={errorModalOpen}
        onClose={handleErrorModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ fontWeight: '900' }} id="alert-dialog-title">
          Errors:
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {errors && (
              <div style={{ color: 'red' }}>
                {errors?.response?.data?.errorDescription}
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorModalClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        className="On-close"
        open={errorModalOpen}
        onClose={handleErrorModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ fontWeight: '900' }} id="alert-dialog-title">
          Errors:
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {errors && (
              <div style={{ color: 'red' }}>
                {errors?.response?.data?.errorDescription}
              </div>
            )}

          

            {barcodeProcessErrors &&
              barcodeProcessErrors?.map((d) => (
                <div key={d} style={{ color: 'red' }}>
                 
                  {!d?.errorsMap
                    ? ''
                    : d?.partNumber + ': ' + Object.values(d?.errorsMap)}
                </div>
              ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorModalClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BarCodeScanner;
