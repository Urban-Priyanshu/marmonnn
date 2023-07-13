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
import useFormControls from '../Validations';

import { styled } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import RegisterImage from '../../../assets/Auth/AuthLogin.svg';
import Background from '../../../assets/Auth/background.png';
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
    .MuiInputBase-root {
      // background: #F4F7F9;
      // border-radius: 4px;
      // width: 100%;
      // height:36px;
      // padding:0 8px;
      
    }
  
          // :after{
          //   border-bottom: unset !important;
  
          // }
          // :before{
          //   border-bottom: unset !important;
  
          // }
  
          // .Mui-disabled:after {
          //   border-bottom: unset !important;
          //   border-bottom-style: solid;
          // }
          // .Mui-disabled:before {
          //   border-bottom: unset;
          //   border-bottom-style: solid;
          // }
          // .Mui-disabled {
          //   color: white !important;
          //   background: #f5f5f5;
          // }
          // .MuiOutlinedInput-input {
          //   padding: 0px
          // }
        `
);



function Login() {
  const navigate = useNavigate();
  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls('Login');

  interface RootState {
    auth: {
      authUserData: {
        id: Number;
        associateCustomerId: Number;
        roles: [{ id: Number }];
      };
    };
  }

  const authUser = useSelector((state: RootState) => state?.auth?.authUserData);

  useEffect(() => {
    if (authUser && authUser?.roles?.find((d) => d?.id === 1)) {
      navigate('/portal');
    } else if (authUser && authUser?.roles?.find((d) => d?.id === 2)) {
      navigate('/portal');
    } else if (authUser && authUser?.roles?.find((d) => d?.id === 3)) {
      navigate('/portal');
    } else if (authUser && authUser?.roles?.find((d) => d?.id >= 3)) {
      navigate(
        `/customer-portal/${authUser?.associateCustomerId}/products?cp=true`
      );
    }
  }, [authUser]);

  return (
    <>
      <MainContent className="login-pg">
        <Card className="login-form-sec">
          <Box className="cus-top-sec-img">
            <img style={{ width: '100%' }} src={RegisterImage}></img>
          </Box>

          <Box className="cus-login-form-container">
            <label>Login</label>

            <form className="cus-login-form" onSubmit={handleFormSubmit}>
              <Grid container className="cus-form">
                <Grid className="cus-form-field-row" item xs={12}>
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

                <Grid className="cus-form-field-row" item xs={12}>
                  <LabelBox>
                    Password<span style={{ color: '#FC8888' }}> *</span>
                  </LabelBox>
                  <CustomInput
                    name="credential"
                    fullWidth
                    className="auth_validation"
                    autoComplete="none"
                    type="password"
                    onBlur={(e) => handleInputValue(e, 'string', '')}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                </Grid>

                <Grid
                  className="cus-form-field-row cus-form-link-row"
                  item
                  xs={12}
                >
                  <Link to="/auth/forgot-password"> Forgot Password? </Link>
                </Grid>

                <Grid className="cus-form-field-row" item xs={12}>
                  <AddButton type="submit">Login</AddButton>
                </Grid>
              </Grid>

              {/* <Box
                sx={{
                  '& > :not(style)': { mr: 2, mt: 3 },
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <Grid item xs={6} md={6}>
                  <BottomText>Don't have an acc
                  ount?</BottomText>
                </Grid>
                <Grid item xs={6} md={6}>
                  <LoginHere onClick={onLoginClick}>Register Here</LoginHere>
                </Grid>
              </Box> */}
            </form>
          </Box>
        </Card>
      </MainContent>
    </>
  );
}

export default Login;
