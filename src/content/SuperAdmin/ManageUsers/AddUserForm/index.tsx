import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from 'react-select';

import { Grid, styled, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useFormControls from './Validations';
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



export default function UserForm({ close }) {
  const dispatch: Dispatch<any> = useDispatch();
  interface RoleState {
    users: { roles: [{ id: number; description: ''; code: '' }] };
  }

  interface TokenState {
    auth: { token: { token: '' } };
  }

  const rolesData = useSelector((state: RoleState) => state?.users?.roles);
  const authToken = useSelector(
    (state: TokenState) => state?.auth?.token?.token
  );

  const rolesOption = rolesData
    ?.filter((d) => d?.id <= 3)
    .map((role) => {
      return {
        label: role?.description,
        value: role?.code
      };
    });

  useEffect(() => {
    dispatch(getUserRoles(authToken));
  }, []);

  useEffect(() => {
    resetFields();
  }, [close]);

  const {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors,
    resetFields,
    values
  } = useFormControls();

  const handleSaveClick = (e) => {
    close();
    handleFormSubmit(e, resetFields());
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
            <CustomInput
              name="firstName"
              onBlur={(e) => handleInputValue(e, 'string', '')}
              onChange={(e) => handleInputValue(e, 'string', '')}
              fullWidth
              inputProps={{ maxLength: 20 }}
              value={values?.firstName}
              autoComplete="none"
              {...(errors['firstName'] && {
                error: true,
                helperText: errors['firstName']
              })}
              type="text"
            />
          </Grid>
          <Grid item xs={12} sx={{ margin: '10px 0' }}>
            <LabelBox>
              Last Name<span style={{ color: 'red' }}> *</span>
            </LabelBox>
            <CustomInput
              name="lastName"
              onBlur={(e) => handleInputValue(e, 'string', '')}
              onChange={(e) => handleInputValue(e, 'string', '')}
              fullWidth
              value={values?.lastName}
              inputProps={{ maxLength: 20 }}
              autoComplete="none"
              {...(errors['lastName'] && {
                error: true,
                helperText: errors['lastName']
              })}
              type="text"
            />
          </Grid>
          <Grid item xs={12} sx={{ margin: '10px 0' }}>
            <LabelBox>
              Email<span style={{ color: 'red' }}> *</span>
            </LabelBox>
            <CustomInput
              name="email"
              onBlur={(e) => handleInputValue(e, 'string', '')}
              onChange={(e) => handleInputValue(e, 'string', '')}
              fullWidth
              value={values?.email}
              inputProps={{ maxLength: 50 }}
              autoComplete="none"
              {...(errors['email'] && {
                error: true,
                helperText: errors['email']
              })}
              type="text"
            />
          </Grid>
          <Grid item xs={12} sx={{ margin: '10px 0' }}>
            <LabelBox>
              Role<span style={{ color: 'red' }}> *</span>
            </LabelBox>
            <Select
              closeMenuOnSelect={false}
              isMulti
              {...(errors['roles'] && {
                error: true,
                helperText: errors['roles']
              })}
              name="roles"
              value={values?.roles?.map((d) => {
                return { label: d.label, value: d.value };
              })}
              options={rolesOption}
              className="basic-multi-select input_box"
              classNamePrefix="select"
              onChange={(e) => handleInputValue(e, 'array', 'roles')}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            '& > :not(style)': { ml: 2, mt: 3 },
            display: 'flex',
            flexDirection: 'row-reverse'
          }}
        >
          <Grid item xs={6} md={6}>
            <AddButton
              onClick={(e) => handleSaveClick(e)}
              disabled={!formIsValid()}
              type="submit"
            >
              Add
            </AddButton>
          </Grid>
          <Grid item xs={6} md={6}>
            <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
          </Grid>
        </Box>
      </form>
    </>
  );
}
