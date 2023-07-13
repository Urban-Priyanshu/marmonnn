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
import RegisterImage from '../../../assets/Auth/AuthResetPassword.svg';
import Background from '../../../assets/Auth/background.png';
import useFormControls from '../Validations';
import { useSelector } from 'react-redux';

const AddButton = styled(Button)(
  () => `
  font-family: 'DIN';
          
  font-weight: 400;
  font-size: 22px;
  color: white;
  background: #002B55 !important;
  border-radius: 3px !important;
  width: 102px;
  padding: 12px 32px 8px;

  height: 46px;

  :hover {
    background: #15364A !important;
    }
  :disabled {
    background: #15364A !important;
    color: gray;
  }
          `
);

const CustomInput = styled(TextField)(
  () => `
    .MuiInputBase-root {
      background: #F4F7F9;
      border-radius: 4px;
      width: 100%;
      padding: 10px;
    }
  
          :after{
            border-bottom: unset !important;
  
          }
          :before{
            border-bottom: unset !important;
  
          }
  
          .Mui-disabled:after {
            border-bottom: unset !important;
            border-bottom-style: solid;
          }
          .Mui-disabled:before {
            border-bottom: unset;
            border-bottom-style: solid;
          }
          .Mui-disabled {
            color: white !important;
            background: #f5f5f5;
          }
          .MuiOutlinedInput-input {
            padding: 0px
          }
        `
);

const LabelBox = styled(Box)(
  () => `
  font-family: 'DIN';
  font-weight: 400 !important;
  font-size: 16px !important;
    line-height: 16px;
    margin-bottom: 5px;
    color: white;
        `
);

const MainContent = styled(Box)(
  () => `
      height: 100%;
      padding: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-image: url(${Background});
      background-size: cover;
      
  `
);

const LoginText = styled(Box)(
  () => `
  font-family: 'DIN';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  color: white;
  padding: 0 0 20px 0;
  `
);

function ResetPassword() {
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search)
  let token= queryParameters.get("token")

 
  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls('Reset Password' , token);

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

  return (
    <>
      <MainContent>
        <Card
          sx={{
            textAlign: 'left',
            background: ' #0D6B97',
            boxShadow: ' 0px 12px 40px rgba(1, 53, 86, 0.32)',
            borderRadius: '16px',
            width: '384px'
          }}
        >
          <Box
            sx={{
              p: 2
            }}
          >
            <img style={{ width: '100%' }} src={RegisterImage}></img>
          </Box>

          <Box
            sx={{
              pl: 4,
              pr: 4,
              pb: 4
            }}
          >
            <LoginText>Reset Password</LoginText>

            <form onSubmit={handleFormSubmit}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    New Password<span style={{ color: '#b7081e' }}> *</span>
                  </LabelBox>
                  <CustomInput
                    name="credential"
                    fullWidth
                    autoComplete="none"
                    className="auth_validation"
                    {...(errors['credential'] && {
                      error: true,
                      helperText: errors['credential']
                    })}
                    type="password"
                    onBlur={(e) => handleInputValue(e, 'string', '')}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                </Grid>
                <Grid item xs={12} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    Confirm Password<span style={{ color: '#b7081e' }}> *</span>
                  </LabelBox>
                  <CustomInput
                    name="confirmPassword"
                    fullWidth
                    autoComplete="none"
                    className="auth_validation"
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

              <Box
                sx={{
                  '& > :not(style)': { mr: 2, mt: 3 },
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <Grid item xs={6} md={6}>
                  <AddButton disabled={!formIsValid()} type="submit">
                    Submit
                  </AddButton>
                </Grid>
              </Box>
            </form>
          </Box>
        </Card>
      </MainContent>
    </>
  );
}

export default ResetPassword;
