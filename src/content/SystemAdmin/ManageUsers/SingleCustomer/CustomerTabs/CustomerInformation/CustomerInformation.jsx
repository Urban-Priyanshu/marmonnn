import * as React from 'react';
import Box from '@mui/material/Box';
import Select from 'react-select';
import DeleteIcon from '../../../../../../assets/Icons/Delete.png';
import CustomModal from '@mui/material/Modal';
import DateFnsUtils from '@date-io/date-fns';
import { FileUploader } from 'react-drag-drop-files';

import { Helmet } from 'react-helmet-async';

import trashIcon from 'src/assets/Icons/trashRed.svg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import {
  FormControlLabel,
  Button,
  FormLabel,
  Grid,
  styled,
  TextField
} from '@mui/material';
import Switch, { SwitchProps } from '@mui/material/Switch';
import useFormControls from './Validations';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import BranchTable from './BranchTable';
import ShipToLocTable from './ShipToLocTable';
import CustomerInfo from './CustomerInfo';
import moment from 'moment';
import Resizer from 'react-image-file-resizer';

import {
  deleteLogo,
  downloadLogo,
  getPrefferedTimeZone,
  getPrefferedUom,
  uploadLogo
} from 'src/redux/actions/sysAdminActions';
import { DownloadBlanketPo } from 'src/redux/actions/BlanketPoActions';
import { useParams } from 'react-router';
window.Buffer = window.Buffer || require('buffer').Buffer;

const TopBox = styled(Box)(
  () => `
  
   padding: 40px 0 22px 0;
   
   background: #FFFFFF
    
    `
);

const CustomLabel = styled(FormControlLabel)(
  () => `
    margin: 0
    `
);

const AddButton = styled(Button)(
  () => `
          color: white !important;
          background: #15364A  !important;
          border-radius: 3px  !important;
          height: 38px !important;
          width: 63px !important;
        
  
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

const TruckScheduleButton = styled(Button)(
  () => `
    padding: 8px 16px !important;
    background: #15364A !important;
    border-radius: 3px !important;
    color: white !important;
  
    :hover {
      padding: 8px 16px !important;
      background: black !important;
      border-radius: 3px !important;
      color: white !important;
    }
    `
);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '40%', sm: '100%' },
  bgcolor: 'background.paper',
  boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.12)',
  p: 4,
  bordeRadius: '5px'
};

const SubContentContainer = styled(Box)(
  () => `
    padding-bottom: 48px;
      border-bottom: 2px solid #D9D9D9;
    `
);

const Header = styled(Box)(
  () => `
    font-family: 'Open Sans';
    font-weight: 700;
    font-size: 16px;
    padding: 34px 0 16px 0;
    `
);

const LogoHeader = styled(Box)(
  () => `
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
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
const TimeInput = styled(KeyboardTimePicker)(
  () => `
    .MuiInputBase-root {
      padding-left: 10px;
      height: 40px !important;
      border-radius: 4px !important;
      width: 100% !important;
      background: #F4F7F9 !important;
      border: 1px solid #B8C2C8 !important;
      color: #15364A !important;
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
            background: white;
          }
          .Mui-disabled:before {
            border-bottom: unset;
            border-bottom-style: solid;
            background: white;
          }
          .Mui-disabled {
            background: white;
          }
          .css-trgup9-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
            // border-color: unset;
          }
        `
);

const CustomInput = styled(TextField)(
  () => `
    .MuiInputBase-root {
      height: 40px !important;
      border-radius: 4px !important;
      width: 100% !important;
      background: #F4F7F9 !important;
      color: #15364A !important;
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
            background: white;
          }
          .Mui-disabled:before {
            border-bottom: unset;
            border-bottom-style: solid;
            background: white;
          }
          .Mui-disabled {
            background: white;
          }
          .css-trgup9-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
            // border-color: unset;
          }
        `
);

const CustomInput1 = styled(TextField)(
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

export default function Example({ scheduleData }) {
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
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
          backgroundColor:
            theme.palette.mode === 'light' ? '#2ECA45' : '#65C466',
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSchedule(initialState);
    setDay(undefined);
    setTime(new Date().setHours(0, 0, 0, 0));
    setOpen(false);
  };
  const authUser = useSelector((state) => state?.auth?.authUserData);
  const getAllUnAssociatedCustomers = useSelector(
    (state) => state?.customers?.unAssociatedCustomers
  );
  

  const featuresData = useSelector((state) => state?.customers?.featuresData);

  const salesUsers = useSelector((state) => state?.users?.usersByRole);
  const featuresOption = featuresData?.map((d) => ({
    label: d?.description,
    value: d?.id
  }));

  const AllUnAssociatedCustomers = getAllUnAssociatedCustomers?.map((d) => ({
    label: d?.customerNumber,
    value: d?.id
  }));

  const salesUserOption = salesUsers?.map((user) => {
    return {
      label: user?.email,
      value: user?.id
    };
  });

  const dispatch = useDispatch();
  const { id } = useParams();
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const logoImage = useSelector((state) => state?.customers?.getLogo);
  const logoData = useSelector((state) => state?.customers?.customerTableData);

  const customerData = useSelector((state) => state?.customers?.customerData);
  const uomData = useSelector((state) => state?.customers?.getUomData);
  const timeZoneData = useSelector(
    (state) => state?.customers?.getTimezoneData
  );

  const [data, setData] = React.useState();
  const [del, setDel] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [index, setindex] = React.useState();
  const [finalSchedule, setFinalSchedule] = React.useState();
  const [theArray, setTheArray] = React.useState(false);
  const [status, setStatus] = React.useState();
  const [time, setTime] = React.useState(new Date().setHours(0, 0, 0, 0));
  const [day, setDay] = React.useState();
  const [logoDelete, setLogoDelete] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [logo, setLogo] = React.useState(null);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        192,
        52,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'file',
        192,
        52
      );
    });

  const handleFileChange = async (file) => {
    const image = await resizeFile(file);
  
    const fd = new FormData();
    fd.append('file', image);
    const response = await dispatch(
      uploadLogo(customerData?.customerNumber, customerData?.id, authToken, fd)
    );

 
    dispatch(
      downloadLogo(
        customerData?.customerNumber,
        customerData?.id,
        response?.data,
        authToken,
        setFile,
        fd
      )
    );
  };
  React.useEffect(() => {
    fileUploaderElement();
  }, [file]);

  React.useEffect(() => {
    dispatch(getPrefferedUom(authToken));
    dispatch(getPrefferedTimeZone(authToken));
  }, []);

  const fileUploaderElement = () => {
    if (logoData && !logoData?.logo) {
      return (
        <Box className="image_upload">
          <FileUploader
            handleChange={handleFileChange}
            name="file"
            types={fileTypes}
          />
        </Box>
      );
    }
  };

 

  const onLogoDelete = () => {

    setLogoDelete(true);
    dispatch(
      deleteLogo(
        customerData?.id,
        customerData?.customerNumber,
        logoData?.logo,
        authToken
      )
    );
    setFile(null);
    setLogo(null);
  };

  const [schedule, setSchedule] = React.useState();

  const onFormSubmit = (e) => {
    e?.preventDefault();
    const initialState = {
      day: '',
      time: ''
    };
    setTheArray(true);
    setFinalSchedule({ ...schedule, time: schedule?.time.toISOString() });
    setSchedule(initialState);
    setDay(undefined);
    setTime(new Date().setHours(0, 0, 0, 0));
    setTheArray(false);
    handleClose();
  };

  const onStatusChange = (e) => {
   
    setStatus(e.target.checked);
    handleFormSubmit(e, 'Status');
  };


  const initialState = {
    day: '',
    time: ''
  };

  React.useEffect(() => {
  
    if (customerData?.logo) {
      const fd = new FormData();
      fd.append('file', customerData?.logo);

      dispatch(
        downloadLogo(
          customerData?.customerNumber,
          id,
          logoData?.logo,
          authToken,
          fd
        )
      );
    }
  }, [customerData?.customerNumber, customerData?.logo, logoData?.logo]);

  React.useEffect(() => {
    setSchedule(initialState);
  }, [theArray]);

 

  const handleChange = (e, type) => {
    let obj = schedule;
    if (type === 'string') {
      obj = { ...obj, [e?.target.name]: e?.target.value };
    }

    if (type === 'day') {
      setDay(e?.value);
      obj = { ...obj, day: e?.value };
    }

    if (type === 'time') {
      setTime(e);
      obj = { ...obj, time: e ? e : new Date().setHours(0, 0, 0, 0) };
    }

    if (type === 'select') {
      obj = { ...obj, day: e?.value };
    }

    setSchedule(obj);
  };



  React.useEffect(() => {

    if (customerData && customerData?.truckSchedules) {
      setData([...customerData?.truckSchedules]);
    }
  }, [customerData]);

  React.useEffect(() => {
    if (finalSchedule && data) {
      setData([...data, finalSchedule]);
    }
  }, [finalSchedule]);

  const onDelete = (index) => {
 
    setDel(false);
    data.splice(index, 1);
    setData([...data]);
    setDel(true);
  };

  const onEdit = (index) => {
    setEdit(true);
    setindex(index);

    if (edit) {
      setEdit(false);
      setindex(null);
    }
  };


  const onEditChange = (e, i) => {
    let value = {
      time: '',
      day: ''
    };

    
    let constNewData = data?.find((d, index) => index === i);

    value = { ...value, [e?.target.name]: e?.target.value };
  
  };

  const daysOption = [
    {
      label: 'Monday',
      value: 'Monday'
    },
    {
      label: 'Tuesday',
      value: 'Tuesday'
    },
    {
      label: 'Wednesday',
      value: 'Wednesday'
    },
    {
      label: 'Thursday',
      value: 'Thursday'
    },
    {
      label: 'Friday',
      value: 'Friday'
    },
    {
      label: 'Saturday',
      value: 'Saturday'
    },
    {
      label: 'Sunday',
      value: 'Sunday'
    }
  ];

  const timeZone = timeZoneData?.map((d) => ({
    label: d?.timezoneName,
    value: d?.timezoneCode
  }));

  const uomResult = uomData?.map((d) => ({
    label: d?.uomName,
    value: d?.uomCode
  }));

  const fileTypes = ['JPEG', 'JPG', 'PNG', 'GIF'];

  const { handleInputValue, handleFormSubmit, values, formIsValid, errors } =
    useFormControls(data, undefined);

  let uomDefaultLabel = uomResult?.find(
    (d) => d?.value === customerData?.preferredUOM?.toUpperCase() && d?.label
  );

  

  let customerTimeZoneLabel = timeZone?.find(
    (d) => d?.value === customerData?.timeZone?.toUpperCase() && d?.label
  );

  return (
    <>
      <form
        onSubmit={(e) =>
          handleFormSubmit(
            e,
            'Customer Information',
            logoData?.logo,
            logoDelete,
            setLogoDelete
          )
        }
      >
        <TopBox>
          <Box
            sx={{
              display: { md: 'flex', xs: 'box' },
              flexDirection: 'row'
            }}
          >
            {' '}
            <Box sx={{ flexGrow: 1 }}>
              <CustomLabel
                label={
                  customerData?.status?.code === 'A' ? 'Active' : 'Inactive'
                }
                control={
                  <IOSSwitch
                    defaultChecked={
                      customerData?.status?.code === 'A' ? true : false
                    }
                    checked={status}
                    onChange={(e) => onStatusChange(e)}
                    name="statusCode"
                    sx={{ mr: 1 }}
                  />
                }
              />
            </Box>
            <button
              type="submit"
              style={{
                backgroundColor: '#15364A',
                color: 'white',
                padding: '10px 15px',
                cursor: 'pointer',
                borderRadius: '3px'
              }}
            >
              Save
            </button>
          </Box>{' '}
        </TopBox>
        <CustomerInfo />
        <SubContentContainer>
          <Header>Customer Information</Header>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={3} sx={{ margin: '10px 0' }}>
              <LabelBox>Sales Contact</LabelBox>
              <Select
                closeMenuOnSelect={false}
                isMulti
                fullWidth
                fullHeight
                key={
                  customerData &&
                  customerData?.associatedUsers
                    ?.filter((f) => f?.userType === 'I')
                    ?.map((d) => {
                      return {
                        label: <div title={d?.email}>{d?.email}</div>,
                        value: d?.userId
                      };
                    })
                }
                name="associatedUsers"
                options={salesUserOption}
                className="basic-multi-select overFlow_dropdown select_multi input_box"
                defaultValue={
                  customerData &&
                  customerData?.associatedUsers
                    ?.filter((f) => f?.userType === 'I')
                    ?.map((d) => {
                      return {
                        label: <div title={d?.email}>{d?.email}</div>,
                        value: d?.userId
                      };
                    })
                }
                classNamePrefix="select"
                onChange={(e) =>
                  handleInputValue(e, 'array', 'associatedUsers')
                }
              />
            </Grid>

            <Grid item xs={12} md={3} sx={{ margin: '10px 0' }}>
              <LabelBox>Preferred UOM</LabelBox>
              <Select
                name="preferredUOM"
                options={uomResult}
                key={customerData?.preferredUOM}
                defaultValue={{
                  label: uomDefaultLabel && uomDefaultLabel?.label,
                  value: customerData?.preferredUOM
                }}
                className="basic-multi-select1 input_box"
                classNamePrefix="select"
                onChange={(e) =>
                  handleInputValue(e, 'select_string', 'preferredUOM')
                }
              />
            </Grid>
            <Grid item xs={12} md={3} sx={{ margin: '10px 0' }}>
              <LabelBox>Inventory ROS %</LabelBox>

              <CustomInput1
                name="inventoryROS"
                key={customerData?.inventoryROS}
                fullWidth
                defaultValue={customerData?.inventoryROS}
                autoComplete="none"
                className="basic-multi-select2 "
                {...(errors['inventoryROS'] && {
                  error: true,
                  helperText: errors['inventoryROS']
                })}
                onChange={(e) => handleInputValue(e, 'string', 'inventoryROS')}
                type="number"
              />
            </Grid>

            <Grid item xs={12} md={3} sx={{ margin: '10px 0' }}>
              <LabelBox>Features</LabelBox>
              <Select
                closeMenuOnSelect={false}
                isMulti
                key={
                  customerData &&
                  customerData?.features?.map((d) => {
                    return {
                      label: d?.featureDescription,
                      value: d?.featureId
                    };
                  })
                }
                name="features"
                options={featuresOption}
                defaultValue={
                  customerData &&
                  customerData?.features?.map((d) => {
                    return {
                      label: (
                        <div title={d?.featureDescription}>
                          {d?.featureDescription}
                        </div>
                      ),
                      value: d?.featureId
                    };
                  })
                }
                className="basic-multi-select3 select_multi input_box"
                classNamePrefix="select"
                onChange={(e) => handleInputValue(e, 'array', 'features')}
              />
            </Grid>

            <Grid item xs={12} md={3} sx={{ margin: '10px 0' }}>
              <LabelBox>Customer Time Zone</LabelBox>
              <Select
                key={customerData?.timeZone}
                name="timeZone"
                onChange={(e) =>
                  handleInputValue(e, 'select_string', 'timeZone')
                }
                options={timeZone}
                defaultValue={{
                  label: customerTimeZoneLabel && customerTimeZoneLabel.label,
                  value: customerData?.timeZone
                }}
                className="basic-multi-select4 input_box"
                classNamePrefix="select"
              />
            </Grid>
            <Grid item xs={12} md={3} sx={{ margin: '10px 0' }}>
              <LabelBox>Associate Customers</LabelBox>
              <Select
                closeMenuOnSelect={false}
                key={
                  getAllUnAssociatedCustomers &&
                  getAllUnAssociatedCustomers?.map((d) => d?.id)
                }
                name="customersToAssociate"
                isMulti
                onChange={(e) =>
                  handleInputValue(e, 'array', 'customersToAssociate')
                }
                options={AllUnAssociatedCustomers}
                className="basic-multi-select5 input_box"
                classNamePrefix="select"
              />
            </Grid>
          </Grid>{' '}
        </SubContentContainer>{' '}
        <SubContentContainer>
          <Header>
            <Box
              sx={{
                display: { md: 'flex', xs: 'box' },
                flexDirection: 'row'
              }}
            >
              <Box sx={{ flexGrow: 1 }}>Truck Schedule</Box>
              <>
                <TruckScheduleButton
                  sx={{ textTransform: 'none !important' }}
                  onClick={handleOpen}
                  title="Add User"
                >
                  Schedule Truck
                </TruckScheduleButton>

                <CustomModal open={open} onClose={handleClose}>
                  <form>
                    <Box sx={style}>
                      <Grid>
                        <Grid>
                          <div style={{ color: 'black' }}>Day</div>
                          <div>
                            <Select
                              name="day"
                              options={daysOption}
                              onChange={(e) => handleChange(e, 'day')}
                            />
                          </div>
                        </Grid>
                        <br></br>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid
                            style={{ fontFamily: 'DIN' }}
                            className={'time-Input'}
                            container
                            justifyContent="space-around"
                          >
                            <TimeInput
                              margin="normal"
                              id="time-picker"
                              fullWidth
                              okLabel="Ok"
                              label="Time"
                              value={time}
                              ampm={false}
                              disableToolbar={true}
                              onChange={(e) => handleChange(e, 'time')}
                              KeyboardButtonProps={{
                                'aria-label': 'change time'
                              }}
                              keyboardIcon={<AccessTimeIcon />}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Grid>{' '}
                      <Box
                        sx={{
                          '& > :not(style)': { mr: 2, mt: 3 },
                          display: 'flex',
                          flexDirection: 'row'
                        }}
                      >
                        <Grid item xs={6} md={2}>
                          <AddButton
                            sx={{ textTransform: 'none !important' }}
                            disabled={
                              time === new Date().setHours(0, 0, 0, 0) || !day
                            }
                            onClick={onFormSubmit}
                          >
                            Add
                          </AddButton>
                        </Grid>
                        <Grid item xs={6} md={2}>
                          <CancelButton
                            sx={{ textTransform: 'none !important' }}
                            onClick={handleClose}
                          >
                            Cancel
                          </CancelButton>
                        </Grid>
                      </Box>
                    </Box>
                  </form>
                </CustomModal>
              </>
            </Box>
          </Header>
          <Grid container spacing={3}>
            {data?.length > 0 ? (
              data?.map((d, i) => (
                <Grid key={i} item xs={12} md={3}>
                  <Box
                    sx={{
                      background: '#F5F5F5',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                      borderRadius: '3px',
                      padding: '12px',
                      alignItems: 'center',
                      display: 'flex'
                    }}
                  >
                    <Grid spacing={3} container>
                      <Grid item xs={12} md={6} sx={{ margin: '0px 0' }}>
                        <Box>
                          <span
                            style={{
                              fontWeight: '700',
                              fontSize: '12px'
                            }}
                          >
                            Day of the week
                          </span>
                        </Box>
                        <Box>
                          {edit && index === i ? (
                            <input
                              type="text"
                              name="day"
                              onChange={(e) => onEditChange(e, i)}
                            ></input>
                          ) : (
                            <span
                              style={{
                                fontWeight: '400',
                                fontSize: '12px'
                              }}
                            >
                              {d?.day}
                            </span>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={4} sx={{ margin: '0px 0' }}>
                        <Box>
                          <span
                            style={{
                              fontWeight: '700',
                              fontSize: '12px',
                              color: '#15364A'
                            }}
                          >
                            Time
                          </span>
                        </Box>
                        <Box>
                          {edit && index === i ? (
                            <input
                              type="time"
                              name="time"
                              onChange={(e) => onEditChange(e, i)}
                            ></input>
                          ) : (
                            <span
                              style={{
                                fontWeight: '400',
                                fontSize: '12px',
                                color: '#343D42'
                              }}
                            >
                              {moment(d?.time).format('LT')}
                            </span>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <img
                          className="Img"
                          style={{ cursor: 'pointer' }}
                          onClick={() => onDelete(i)}
                          src={DeleteIcon}
                        ></img>{' '}
                        <br></br>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              ))
            ) : (
              <Grid item xs={4}>
                <Box sx={{ flexGrow: 1 }}>
                  <span> No Data Found</span>
                </Box>
              </Grid>
            )}
          </Grid>
        </SubContentContainer>
        <SubContentContainer>
          <Header>Branches</Header>
          <BranchTable />
        </SubContentContainer>
        <SubContentContainer>
          <Header>Ship To Location</Header>
          <ShipToLocTable />
        </SubContentContainer>{' '}
        <SubContentContainer>
          <Header>Shipping Container Program</Header>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={4} sx={{ margin: '10px 0' }}>
              <LabelBox>Container Program</LabelBox>
              <CustomInput
                key={customerData?.containerProgram}
                name="containerProgram"
                fullWidth
                defaultValue={customerData?.containerProgram}
                onChange={(e) =>
                  handleInputValue(e, 'string', 'containerProgram')
                }
                autoComplete="none"
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ margin: '10px 0' }}>
              <LabelBox>Container Home Location</LabelBox>
              <CustomInput
                name="containerHomeLocation"
                key={customerData?.containerHomeLocation}
                fullWidth
                defaultValue={customerData?.containerHomeLocation}
                onChange={(e) =>
                  handleInputValue(e, 'string', 'containerHomeLocation')
                }
                autoComplete="none"
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ margin: '10px 0' }}>
              <LabelBox>Visible Container Locations</LabelBox>
              <CustomInput
                name="visibleContainerLocations"
                key={customerData?.visibleContainerLocations}
                fullWidth
                defaultValue={customerData?.visibleContainerLocations}
                onChange={(e) =>
                  handleInputValue(e, 'string', 'visibleContainerLocations')
                }
                autoComplete="none"
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ margin: '10px 0' }}>
              <LabelBox>Customer Default Recieve from Location</LabelBox>
              <CustomInput
                name="containerDefaultReceiveFromLocation"
                key={customerData?.containerDefaultReceiveFromLocation}
                fullWidth
                defaultValue={customerData?.containerDefaultReceiveFromLocation}
                onChange={(e) =>
                  handleInputValue(
                    e,
                    'string',
                    'containerDefaultReceiveFromLocation'
                  )
                }
                autoComplete="none"
                type="text"
              />
            </Grid>{' '}
            <Grid item xs={12} md={4} sx={{ margin: '10px 0' }}>
              <LabelBox>Customer Default Ship To Location</LabelBox>
              <CustomInput
                name="containerDefaultShipToLocation"
                key={customerData?.containerDefaultShipToLocation}
                fullWidth
                defaultValue={customerData?.containerDefaultShipToLocation}
                onChange={(e) =>
                  handleInputValue(
                    e,
                    'string',
                    'containerDefaultShipToLocation'
                  )
                }
                autoComplete="none"
                type="text"
              />
            </Grid>
          </Grid>
        </SubContentContainer>
        <SubContentContainer>
          <Header>Logo Upload/Update</Header>
          <Box sx={{ marginBottom: '16px' }}>{fileUploaderElement()}</Box>
          {logoData && logoData?.logo && (
            <>
             
              <LogoHeader>Files</LogoHeader>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  mt: 1,
                  alignItems: 'center'
                }}
              >
                <Box style={{ marginRight: '12px' }}>
                  {logoImage !== null && (
                    <img
                      width={192}
                      height={52}
                      src={`data:image/jpeg;base64,${logoImage}`}
                    ></img>
                  )}
                </Box>
                <Box>
                  <Box>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: '12px',
                        lineHeight: '16px'
                      }}
                    >
                      {logoData?.logo?.substring(
                        logoData?.logo?.lastIndexOf('/') + 1
                      )}
                    </span>
                  </Box>
                  <Box>{file?.date}</Box>
                  <Box style={{ cursor: 'pointer' }} onClick={onLogoDelete}>
                    {/* <img src={trashIcon}></img> */}
                    <span
                      style={{
                        color: '#FF0018',
                        fontWeight: '700',
                        fontSize: '10px'
                      }}
                    >
                      Delete
                    </span>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </SubContentContainer>
      </form>
    </>
  );
}
