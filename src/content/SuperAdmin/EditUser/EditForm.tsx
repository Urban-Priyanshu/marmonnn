import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from 'react-select';
import { Grid, styled, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import EditIcon from '../../../assets/Icons/Edit.png';
import useFormControls from './Validations';
import { useDispatch } from 'react-redux';
import { getResendEmail } from 'src/redux/actions/userActions';
import { Dispatch } from 'redux';

const AddButton = styled(Button)(
  () => `
  :disabled {
    opacity: 0.8 !important;
    color: white
  }
  background: #15364A;
  border-radius: 3px;
  color: #FFFFFF;
  width: 102px;
  padding: 12px 32px 8px;

  height: 46px;

  
    
        :hover {
            background-color: black;
          }
        
        `
);
const CancelButton = styled(Button)(
  () => `
  background: #FFFFFF;
  border: 1px solid #15364A;
  border-radius: 3px;
  color: #15364A;
  width: 210px;
  padding: 12px 32px 8px;

  height: 46px;
          
          `
);

const CustomSelect = styled(Select)(
  () => `
  .select__control.select__control--is-disabled.css-1insrsq-control {

    width: 100% !important;
  background: #f4f7f9 !important;
  height: 40px !important;
  }

  .select__control {

    width: 100% !important;
  background: #f4f7f9 !important;
  height: 40px !important;
  }
  
      `
);

const CustomInput = styled(TextField)(
  () => `
  .MuiInputBase-root {
    height: 40px;
    width: 100%;
    background: #f4f7f9 !important;
  
    border: 0px solid #B8C2C8 !important;
    border-radius:0px !important;
    color: #15364A;
  
  }

        :after{
          border-bottom: unset !important;
          border: unset !important;

        }
        :before{
          border-bottom: unset !important;
          border:  0px solid #B8C2C8 !important;

        }
        .Mui-disabled {
          padding: 5px !important;
      }

        .Mui-disabled:after {
          border-bottom: unset !important;
          border-bottom-style: solid;
          background: white;
        }
        .Mui-disabled:before {
          border-bottom: unset !important;
          border-bottom-style: solid;
          background: white;
        }
        
        .css-trgup9-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
          // border-color: unset !important;
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

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'light' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#ffffff !important',
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}));

export default function EditForm({ userData, rolesData, authToken }) {
  const dispatch: Dispatch<any> = useDispatch();
  const rolesOption = rolesData
    ?.filter((d) => d?.id <= 3)
    ?.map((role) => {
      return {
        label: role?.description,
        value: role?.code
      };
    });

  const updateStatusToRS = () => {
    dispatch(
      getResendEmail(
        userData?.id,
        userData?.email,
        userData?.firstName,
        userData?.lastName,
        authToken,
        setresendButtonDisabled
      )
    );
  };

  const [edit, setEdit] = React.useState(false);
  // const [initialRender , setinitialRender] = React.useState(true);
  

  const handleEditClick = () => {
    setEdit(true);

    if (edit) {
      setEdit(false);
    }
  };

  const { handleInputValue, handleFormSubmit, formIsValid, resendButtonDisabled, setresendButtonDisabled ,errors } =
    useFormControls({ handleEditClick });

  

  return (
    <>
      <Box
        onClick={handleEditClick}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          cursor: 'pointer'
        }}
      >
        {!edit ? (
          <>
            <img style={{ width: '18px', height: '20px' }} src={EditIcon}></img>
            &nbsp;{' '}
            <span
              style={{
                color: '#20A2F3',
                margin: '2px',
                fontWeight: '400',
                fontSize: '16px',
                marginTop: '0px'
              }}
            >
              Edit
            </span>
          </>
        ) : (
          <span
            style={{
              color: '#20A2F3',
              margin: '2px',
              fontWeight: '400',
              fontSize: '16px',
              marginTop: '0px'
            }}
          >
            Cancel
          </span>
        )}
      </Box>
      <form onSubmit={handleFormSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4} sx={{ margin: '10px 0' }}>
            <LabelBox>First Name</LabelBox>{' '}
            <CustomInput
              disabled={!edit}
              key={userData?.firstName}
              name="firstName"
              onBlur={(e) => handleInputValue(e, 'string', '')}
              onChange={(e) => handleInputValue(e, 'string', '')}
              fullWidth
              autoComplete="none"
              defaultValue={userData?.firstName}
              {...(errors['firstName'] && {
                error: true,
                helperText: errors['firstName']
              })}
              type="text"
            />
          </Grid>
          <Grid item xs={4} sx={{ margin: '10px 0' }}>
            <LabelBox>Last Name</LabelBox>
            <CustomInput
              disabled={!edit}
              key={userData?.lastName}
              name="lastName"
              onBlur={(e) => handleInputValue(e, 'string', '')}
              onChange={(e) => handleInputValue(e, 'string', '')}
              fullWidth
              defaultValue={userData?.lastName}
              autoComplete="none"
              {...(errors['lastName'] && {
                error: true,
                helperText: errors['lastName']
              })}
              type="text"
            />
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4} sx={{ margin: '10px 0' }}>
            <LabelBox>Email</LabelBox>
            <CustomInput
              disabled={!edit}
              key={userData?.email}
              name="email"
              onBlur={(e) => handleInputValue(e, 'string', '')}
              onChange={(e) => handleInputValue(e, 'string', '')}
              fullWidth
              defaultValue={userData?.email}
              autoComplete="none"
              {...(errors['email'] && {
                error: true,
                helperText: errors['email']
              })}
              type="text"
            />
          </Grid>
          <Grid item xs={4} sx={{ margin: '10px 0', width: '376px' }}>
            <LabelBox>Role</LabelBox>
            <CustomSelect
              //  styles={customStyles}
              key={userData && userData?.roles?.map((role) => role?.id)}
              closeMenuOnSelect={false}
              isDisabled={!edit}
              isMulti
              name="roles"
              options={rolesOption}
              defaultValue={
                userData &&
                userData?.roles
                  ?.filter((d) => d?.id <= 3)
                  ?.map((role) => ({
                    label: role?.description,
                    value: role?.code
                  }))
              }
              className="basic-multi input_box"
              classNamePrefix="select"
              onChange={(e) => handleInputValue(e, 'array', 'roles')}
            />
          </Grid>
          {userData?.status?.code === 'RS' ? (
            <Grid item xs={12} sx={{ margin: '10px 0' }}>
              <LabelBox>Status</LabelBox>
              <div>
                <h3>Request Sent</h3>
              </div>
            </Grid>
          ) : (
            <Grid item xs={6} sx={{ margin: '10px 0' }}>
              <FormControlLabel
                label=""
                control={
                  <IOSSwitch
                    key={userData?.status?.code === 'A' ? 1 : 0}
                    disabled={!edit}
                    name="statusCode"
                    sx={{ m: 1 }}
                    defaultChecked={
                      userData?.status?.code === 'A' ? true : false
                    }
                    onBlur={(e) => handleInputValue(e, 'plug', 'statusCode')}
                    onChange={(e) => handleInputValue(e, 'plug', 'statusCode')}
                  />
                }
              />
              {userData?.status?.code === 'A' ? 'Active ' : 'Inactive '}
            </Grid>
          )}
        </Grid>
        <Box
          sx={{
            '& > :not(style)': { mr: 2 },
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Grid item xs={6} md={6}>
            <CancelButton
              onClick={updateStatusToRS}
              data-testid="text"
              disabled={resendButtonDisabled}
            >
              Resend Access Email
            </CancelButton>
          </Grid>
          <Grid item xs={6} md={6}>
            <AddButton
              name={'save'}
              type="submit"
              disabled={!formIsValid() || !edit}
            >
              Save
            </AddButton>
          </Grid>
        </Box>
      </form>
    </>
  );
}
