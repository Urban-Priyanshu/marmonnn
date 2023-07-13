import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from 'react-select';
import React from 'react';

import { Grid, styled, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useFormControls from './validation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserRoles } from 'src/redux/actions/userActions';
import { Dispatch } from 'redux';

const AddButton = styled(Button)(
  () => `
        color: white !important;
        background: #15364A  !important;
        border-radius: 3px  !important;
        height: 38px !important;
        width: 63px !important

        :hover {
            background-color:  #022f53  !important;
          }
        :disabled {
          color: #aeaeae !important;
        }
        `
);
const CancelButton = styled(Button)(
  () => `
  background: #FFFFFF  !important;
  border: 1px solid #15364A  !important;
  border-radius: 3px  !important;
  color: #15364A  !important;
  height: 38px !important;
  width: 84px !important
      
          :hover {
              background-color: white  !important;
            }
          
          `
);
const CustomInput = styled(TextField)(
  () => `
  .MuiInputBase-root {
    height: 36px;
    background: #F4F7F9 ;
    border-radius: 4px;
    width: 100%;
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
      `
);

const LabelBox = styled(Box)(
  () => `
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 5px;
      `
);

const RoleSelect = styled(Select)(
  () => `
  border: 1px solid #B8C2C8;
  background: #F4F7F9;
  border: 1px solid #B8C2C8;
  border-radius: 4px;
  width: 100%;
  height: 36px;

  input:focus {
    border: 2px #6fc1f5 solid;
  }

  input:hover {
    border: unset;
  }
  
  :disabled {
    background: black;
  }

  .Mui-disabled::after {
    border-bottom: unset;
  }
  .Mui-disabled:before {
    border-bottom: unset;
    border-bottom-style: solid;
  }
  .Mui-disabled {
    color: white !important;
  }
  
      `
);

export default function AddExtUserForm({ close, extUserData, edit }) {
 

  const inputRef = React.useRef(null);

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state?.auth?.token?.token);
  const customerData = useSelector((state) => state?.customers?.customerData);

  const customerNumbers = useSelector(
    (state) => state?.customers?.customerNumbers
  );

  const jobTitles = useSelector((state) => state?.customers?.jobTitles);
  const usersType = useSelector((state) => state?.customers?.usersType);

  const allFeatures = useSelector((state) => state?.customers?.featuresData);

  const usersTypeOption = usersType?.map((d) => {
    return {
      label: d?.description,
      value: d?.code
    };
  });

  const jobTitleOption = jobTitles?.map((d) => {
    return {
      label: d?.description,
      value: d?.code
    };
  });

  const customerNumbersOption = customerNumbers?.map((d) => {
    return {
      label: d?.customerNumber,
      value: d?.customerNumber
    };
  });

  const featuresOption = customerData?.features?.map((d) => {
    return {
      label: d?.featureDescription,
      value: d?.featureCode
    };
  });

  useEffect(() => {
    dispatch(getUserRoles(authToken));
  }, []);

  useEffect(() => {
    if (!edit) {
      resetFields();
    }
  }, [close]);

  const {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors,
    resetFields,
    values
  } = useFormControls(edit, extUserData);
 

  const handleSaveClick = (e) => {
    close();
    handleFormSubmit(e, resetFields);
  };

  const handleCancelClick = () => {
    close();
    resetFields();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sx={{ margin: '10px 0' }}>
            <LabelBox>
              First Name<span style={{ color: 'red' }}> *</span>
            </LabelBox>{' '}
            {edit ? (
              <CustomInput
                name="firstName"
                onBlur={(e) => handleInputValue(e, 'string', '')}
                onChange={(e) => handleInputValue(e, 'string', '')}
                fullWidth
                key={extUserData?.firstName}
                inputProps={{ maxLength: 20 }}
                defaultValue={extUserData?.firstName}
                {...(errors['firstName'] && {
                  error: true,
                  helperText: errors['firstName']
                })}
                type="text"
              />
            ) : (
              <CustomInput
                name="firstName"
                onBlur={(e) => handleInputValue(e, 'string', '')}
                onChange={(e) => handleInputValue(e, 'string', '')}
                fullWidth
                ref={inputRef}
                inputProps={{ maxLength: 20 }}
                value={values?.firstName}
                {...(errors['firstName'] && {
                  error: true,
                  helperText: errors['firstName']
                })}
                type="text"
              />
            )}
          </Grid>
          <Grid item xs={12} sx={{ margin: '10px 0' }}>
            <LabelBox>
              Last Name<span style={{ color: 'red' }}> *</span>
            </LabelBox>
            {edit ? (
              <CustomInput
                name="lastName"
                onBlur={(e) => handleInputValue(e, 'string', '')}
                onChange={(e) => handleInputValue(e, 'string', '')}
                fullWidth
                inputProps={{ maxLength: 20 }}
                key={extUserData?.lastName}
                defaultValue={extUserData?.lastName}
                autoComplete="none"
                {...(errors['lastName'] && {
                  error: true,
                  helperText: errors['lastName']
                })}
                type="text"
              />
            ) : (
              <CustomInput
                name="lastName"
                onBlur={(e) => handleInputValue(e, 'string', '')}
                onChange={(e) => handleInputValue(e, 'string', '')}
                fullWidth
                inputProps={{ maxLength: 20 }}
                value={values?.lastName}
                autoComplete="none"
                ref={inputRef}
                {...(errors['lastName'] && {
                  error: true,
                  helperText: errors['lastName']
                })}
                type="text"
              />
            )}
          </Grid>
          <Grid item xs={12} sx={{ margin: '10px 0' }}>
            <LabelBox>
              Email<span style={{ color: 'red' }}> *</span>
            </LabelBox>
            {edit ? (
              <CustomInput
                name="email"
                inputProps={{ maxLength: 50 }}
                disabled={extUserData ? true : false}
                key={extUserData?.email}
                defaultValue={extUserData?.email}
                onBlur={(e) => handleInputValue(e, 'string', '')}
                onChange={(e) => handleInputValue(e, 'string', '')}
                fullWidth
                autoComplete="none"
                {...(errors['email'] && {
                  error: true,
                  helperText: errors['email']
                })}
                type="text"
              />
            ) : (
              <CustomInput
                name="email"
                ref={inputRef}
                inputProps={{ maxLength: 50 }}
                disabled={extUserData ? true : false}
                value={values?.email}
                onBlur={(e) => handleInputValue(e, 'string', '')}
                onChange={(e) => handleInputValue(e, 'string', '')}
                fullWidth
                autoComplete="none"
                {...(errors['email'] && {
                  error: true,
                  helperText: errors['email']
                })}
                type="text"
              />
            )}
          </Grid>
          <Grid item xs={12} sx={{ margin: '10px 0' }}>
            <LabelBox>Features</LabelBox>
            {edit ? (
              <Select
                closeMenuOnSelect={false}
                isMulti
                name="roles"
                options={featuresOption}
                defaultValue={extUserData?.features?.map((res) => {
                  return {
                    label: res?.label,

                    value: res?.code
                  };
                })}
                className=" input_box basic-multi-select input_box"
                classNamePrefix="select"
                onChange={(e) => handleInputValue(e, 'array', 'features')}
              />
            ) : (
              <Select
                closeMenuOnSelect={false}
                isMulti
                name="roles"
                value={values?.features?.map((res) => {
                  return {
                    label: res.label,
                    value: res.value
                  };
                })}
                options={featuresOption}
                defaultValue={extUserData?.features?.map((res) => {
                  return {
                    label: res?.label,

                    value: res?.code
                  };
                })}
                className="basic-multi-select input_box"
                classNamePrefix="select"
                onChange={(e) => handleInputValue(e, 'array', 'features')}
              />
            )}
          </Grid>
          <Grid item xs={12} sx={{ margin: '10px 0' }}>
            <LabelBox>Type</LabelBox>
            {edit ? (
              <Select
                name="type"
                options={usersTypeOption}
                defaultValue={{
                  label: extUserData?.type,
                  value: extUserData?.jobType
                }}
                className="basic-multi-select input_box"
                classNamePrefix="select"
                onChange={(e) =>
                  handleInputValue(e, 'select_object', 'jobType')
                }
              />
            ) : (
              <Select
                name="jobType"
                options={usersTypeOption}
                value={{
                  label: values?.jobType?.label,

                  value: values?.jobType?.code
                }}
                className="basic-multi-select input_box"
                classNamePrefix="select"
                onChange={(e) =>
                  handleInputValue(e, 'select_object', 'jobType')
                }
              />
            )}
          </Grid>

          <Grid item xs={12} sx={{ margin: '10px 0' }}>
            <LabelBox>Job Title</LabelBox>
            {edit ? (
              <CustomInput
                name="jobTitle"
                inputProps={{ maxLength: 20 }}
                onBlur={(e) => handleInputValue(e, 'string', 'jobTitle')}
                onChange={(e) => handleInputValue(e, 'string', 'jobTitle')}
                fullWidth
                defaultValue={extUserData?.jobTitle}
                ref={inputRef}
                autoComplete="none"
                type="text"
              />
            ) : (
              <CustomInput
                name="jobTitle"
                inputProps={{ maxLength: 20 }}
                onBlur={(e) => handleInputValue(e, 'string', 'jobTitle')}
                onChange={(e) => handleInputValue(e, 'string', 'jobTitle')}
                fullWidth
                value={values?.jobTitle}
                ref={inputRef}
                autoComplete="none"
                type="text"
              />
            )}
          </Grid>
          {/* value.some(v => !v.isFixed) */}
          <Grid item xs={12} sx={{ margin: '10px 0' }}>
         
            <LabelBox>Customer Number</LabelBox>
            {edit ? (
              <Select
                closeMenuOnSelect={false}
                isMulti
                name="associatedCustomerNumbers "
                options={customerNumbersOption}
                ref={inputRef}
                defaultValue={extUserData?.associatedCustomers?.map((d) => {
                  return { label: d, value: d };
                })}
                className="basic-multi-select input_box"
                classNamePrefix="select"
                onChange={(e) =>
                  handleInputValue(e, 'array', 'associatedCustomerNumbers')
                }
              />
            ) : (
              <Select
                closeMenuOnSelect={false}
                isMulti
                name="associatedCustomerNumbers"
                options={customerNumbersOption}
                ref={inputRef}
                value={values?.associatedCustomerNumbers?.map((d) => {
                  return { label: d?.label, value: d?.value };
                })}
                defaultValue={extUserData?.associatedCustomerNumbers?.map(
                  (d) => {
                    return { label: d?.label, value: d?.value };
                  }
                )}
                className="basic-multi-select input_box"
                classNamePrefix="select"
                onChange={(e) =>
                  handleInputValue(e, 'array', 'associatedCustomerNumbers')
                }
              />
            )}
          </Grid>
        </Grid>
        <Box
          sx={{
            '& > :not(style)': { mr: 2, mt: 3 },
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Box>
            <AddButton
              onClick={handleSaveClick}
              disabled={!formIsValid()}
              type="submit"
            >
              {edit === true ? 'Save' : 'Add'}
            </AddButton>
          </Box>
          <Box>
            <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
          </Box>
        </Box>
      </form>
    </>
  );
}
