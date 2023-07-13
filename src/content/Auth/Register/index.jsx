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
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import RegisterImage from '../../../assets/Auth/AuthAccountCreation.svg';
import Background from '../../../assets/Auth/background.png';
import useFormControls from '../Validations';

import { getUserDetails } from 'src/redux/actions/authActions';

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



const LoginHere = styled(Button)(
  () => `
  font-family: 'DIN';
  background: #FFFFFF;
  border-radius: 4px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  height: 34px;
  color: #0D6B97;
  padding: 6px 16px 6px;
  :hover {
    background: #FFFFFF;
    }
  :disabled {
    background: #FFFFFF;
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




const BottomText = styled(Box)(
  () => `
  font-family: 'DIN';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: white;
  display:inline-block;
  margin-right: 8px;
  vertical-align: middle;
  line-height: 1;
  `
);

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryParameters = new URLSearchParams(window.location.search);
  let token = queryParameters.get('token');

  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls('Register', token);

  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }

  const authUser = useSelector((state) => state?.auth?.authUserData);
  const userData = useSelector((state) => state?.auth?.userData);


  useEffect(() => {
    if (authUser && authUser?.roles?.find((d) => d?.id === 1)) {
      navigate('/manage-users');
    } else if (authUser && authUser?.roles?.find((d) => d?.id === 2)) {
      navigate('/manage-customers');
    } else if (authUser && authUser?.roles?.find((d) => d?.id === 3)) {
      navigate('/manage-customers');
    }
  }, [authUser]);

  useEffect(() => {
    dispatch(getUserDetails(token));
  }, [token]);
  const onLoginClick = () => {
    navigate('/auth/login');
  };

  let query = useQuery();

  return (
    <>
      <MainContent className="login-pg">
        <Card className="login-form-sec registration-pg">
          <Box className="cus-top-sec-img">
            <img style={{ width: '100%' }} src={RegisterImage}></img>
          </Box>

          <Box className="cus-login-form-container">
            <label>Complete your profile!</label>

            <form className="cus-login-form" onSubmit={handleFormSubmit}>
              <Grid container className="cus-form">
                <Grid item xs={12} className="cus-form-field-row">
                  <LabelBox>
                    First Name<span style={{ color: '#FC8888' }}> *</span>
                  </LabelBox>
                  <CustomInput
                    name="firstName"
                    fullWidth
                    autoComplete="none"
                    disabled
                    {...(errors['firstName'] && {
                      error: true,
                      helperText: errors['firstName']
                    })}
                    type="text"
                    value={userData?.firstName}
                    onBlur={(e) => handleInputValue(e, 'string', '')}
                    // onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                </Grid>
                <Grid item xs={12} className="cus-form-field-row">
                  <LabelBox>
                    Last Name<span style={{ color: '#FC8888' }}> *</span>
                  </LabelBox>
                  <CustomInput
                    name="lastName"
                    fullWidth
                    autoComplete="none"
                    disabled
                    value={userData?.lastName}
                    {...(errors['lastName'] && {
                      error: true,
                      helperText: errors['lastName']
                    })}
                    type="text"
                    onBlur={(e) => handleInputValue(e, 'string', '')}
                    // onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                </Grid>

                {query.get('userType') === 'CE' && (
                  <Grid item xs={12} className="cus-form-field-row">
                    <LabelBox>Job Type</LabelBox>
                    <CustomInput
                      name="jobType"
                      fullWidth
                      value={userData?.jobType}
                      disabled
                      autoComplete="none"
                      type="text"
                      onBlur={(e) => handleInputValue(e, 'string', '')}
                      onChange={(e) => handleInputValue(e, 'string', '')}
                    />
                  </Grid>
                )}

                {query.get('userType') === 'CE' && (
                  <Grid item xs={12} className="cus-form-field-row">
                    <LabelBox>Job Title</LabelBox>
                    <CustomInput
                      name="jobTitle"
                      fullWidth
                      value={userData?.jobTitle}
                      disabled
                      autoComplete="none"
                      type="text"
                      onBlur={(e) => handleInputValue(e, 'string', '')}
                      onChange={(e) => handleInputValue(e, 'string', '')}
                    />
                  </Grid>
                )}
                <Grid item xs={12} className="cus-form-field-row">
                  <LabelBox>
                    Email <span style={{ color: '#FC8888' }}> *</span>
                  </LabelBox>
                  <CustomInput
                    name="email"
                    fullWidth
                    value={userData?.email}
                    disabled
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
                <Grid item xs={12} className="cus-form-field-row">
                  <LabelBox>
                    Password<span style={{ color: '#FC8888' }}> *</span>
                  </LabelBox>
                  <CustomInput
                    name="credential"
                    fullWidth
                    className="auth_validation"
                    autoComplete="none"
                    {...(errors['credential'] && {
                      error: true,
                      helperText: errors['credential']
                    })}
                    type="password"
                    onBlur={(e) => handleInputValue(e, 'string', '')}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                </Grid>
                <Grid item xs={12} className="cus-form-field-row">
                  <LabelBox>
                    Confirm Password<span style={{ color: '#FC8888' }}> *</span>
                  </LabelBox>
                  <CustomInput
                    name="confirmPassword"
                    fullWidth
                    className="auth_validation"
                    autoComplete="none"
                    {...(errors['confirmPassword'] && {
                      error: true,
                      helperText: errors['confirmPassword']
                    })}
                    type="password"
                    onBlur={(e) => handleInputValue(e, 'string', '')}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                className="cus-form-field-row cus-form-btn-row"
              >
                <AddButton onClick={onLoginClick}>Cancel</AddButton>

                <AddButton disabled={!formIsValid()} type="submit">
                  Submit
                </AddButton>
              </Grid>

              <Grid
                item
                xs={12}
                className="cus-form-field-row cus-form-btn-row"
              >
                <BottomText>Already have an account?</BottomText>
                <LoginHere onClick={onLoginClick}>Login Here</LoginHere>
              </Grid>
            </form>
          </Box>
        </Card>
      </MainContent>
    </>
  );
}

export default Register;
