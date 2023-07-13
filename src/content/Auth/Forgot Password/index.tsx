import {
  Card,
  Container,
  Button,
  TextField,
  Grid,
  FormControlLabel
} from '@mui/material';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet-async';
import Checkbox from '@mui/material/Checkbox';

import { styled } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import RegisterImage from '../../../assets/Auth/AuthForgotPassword.svg';
import Background from '../../../assets/Auth/background.png';
import useFormControls from '../Validations';
import { useSelector } from 'react-redux';

const MainContent = styled(Box)(
  () => `
      background-image: url(${Background});
      background-size: cover;      
  `
);

const LabelBox = styled(Box)(
  () => `
        font-family: 'DIN Alternate';
        font-weight: 400 !important;
        font-size: 16px !important;
        line-height: 1;
        margin-bottom: 5px;
        color: white;
        `
);


const AddButton = styled(Button)(
  () => `
          font-family: 'DIN Condensed';          
          font-weight: 400;
          font-size: 22px;
          line-height:1;
          color: white;
          background: #002B55 !important;
          border-radius: 4px !important;
          width: 112px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          height: 46px;
          margin:14px 4px 0 4px;
          :hover {
            color:#668099;
            }
          :disabled {
            color: #668099;
          }
          `
);





const CustomInput = styled(TextField)(
  () => `
    // .MuiInputBase-root {
    //   background: #F4F7F9;
    //   border-radius: 4px;
    //   width: 100%;
    //   padding: 10px;
    // }
  
    //       :after{
    //         border-bottom: unset !important;
  
    //       }
    //       :before{
    //         border-bottom: unset !important;
  
    //       }
  
    //       .Mui-disabled:after {
    //         border-bottom: unset !important;
    //         border-bottom-style: solid;
    //       }
    //       .Mui-disabled:before {
    //         border-bottom: unset;
    //         border-bottom-style: solid;
    //       }
    //       .Mui-disabled {
    //         color: white !important;
    //         background: #f5f5f5;
    //       }
    //       .MuiOutlinedInput-input {
    //         padding: 0px
    //       }
        `
);



function ForgotPassword() {
  const navigate = useNavigate();
  const [disable, setDisable] = useState('Request');
  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls('Forgot Password');

  interface RootState {
    auth: { authUserData: { roles: [{ id: Number }] } };
  }

  const authUser = useSelector((state: RootState) => state?.auth?.authUserData);

  useEffect(() => {
    if (authUser && authUser?.roles?.find((d) => d?.id === 1)) {
      navigate('/manage-users');
    } else if (authUser && authUser?.roles?.find((d) => d?.id === 2)) {
      navigate('/manage-customers');
    } else if (authUser && authUser?.roles?.find((d) => d?.id === 3)) {
      navigate('/manage-customers');
    }
  }, [authUser]);

  const onLoginClick = () => {
    navigate('/auth/login');
  };

  return (
    <>
      <MainContent className='login-pg'>
        <Card className='login-form-sec' >
          <Box className='cus-top-sec-img'>
            <img style={{ width: '100%' }} src={RegisterImage}></img>
          </Box>

          <Box className='cus-login-form-container'>
          <label>Forgot Password</label>

            <form className='cus-login-form'  onSubmit={(e) => handleFormSubmit(e, setDisable)}>

              <Grid className='cus-form' container>
                <Grid className='cus-form-field-row'  item xs={12}>
                  <LabelBox>
                    Email<span style={{ color: '#FC8888' }}> *</span>
                  </LabelBox>
                  <CustomInput
                    name="email"
                    fullWidth
                    className="auth_validation"
                    autoComplete="none"
                    {...(errors['email'] && {
                      error: true,
                      helperText: errors['email']
                    })}
                    type="text"
                    onBlur={(e) => handleInputValue(e, 'string', '')}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                </Grid>

                <Grid container className='cus-form-field-row cus-form-btn-row' >
                  <Grid item xs={12} >
                  <AddButton onClick={onLoginClick}>Cancel</AddButton>
                    <AddButton
                      disabled={!formIsValid() || disable === 'disable'}
                      type="submit"
                    >
                      {disable === 'Request' ? 'Request' : 'Resend'}
                    </AddButton>
                    
                  </Grid>

                </Grid>
              </Grid>

            </form>
          </Box>
        </Card>
      </MainContent>
    </>
  );
}

export default ForgotPassword;
