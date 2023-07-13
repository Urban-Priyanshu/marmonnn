import * as React from 'react';
import Box from '@mui/material/Box';
import Select from 'react-select';
import {
  Button,
  Grid,
  Input,
  styled,
  TextField,
  Typography
} from '@mui/material';

import Switch, { SwitchProps } from '@mui/material/Switch';
import customerPortalLogo from 'src/assets/Images/customerPortalLogo.svg';
import DeleteIcon from '../../../../../../assets/Icons/Delete.png';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import CustomModal from '@mui/material/Modal';
import $ from 'jquery';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BulkOrderHistoryTable from './Table';
import {
  addOrUpdateBulkOrder,
  getBulkOrderData,
  deleteBulkOrderConfig,
  saveBulkOrderData
} from 'src/redux/actions/BulkOrderActions';
import { advanceTime } from 'src/services/Time-tracking';
import useFormControls from '../Validations';
import Breadcrumb from 'src/components/Breadcrumb';
import { timeCalculation } from 'src/redux/actions/DashboardActions';

const DownloadButton = styled(Button)(
  () => `
          color: white !important;
          background: #15364A  !important;
          border-radius: 3px  !important;
          height: 38px !important;
          width: 130px !important;
  
          :hover {
              background-color:  #022f53  !important;
            }
          :disabled {
            color: #aeaeae !important;
          }
          `
);

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

const LabelBox = styled(Box)(
  () => `
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 5px;
      `
);

const AddMoreButton = styled(Button)(
  () => `
  background: #FFFFFF !important;
border: 1px solid #15364A !important;
border-radius: 3px !important;
color: #15364A !important;

height: 36px; !important;
  `
);

const ContentContainer = styled(Box)(
  () => `
    padding: 0px 31px 0px 31px;
    background-color:#FFFFFF;
    
    `
);

const Header = styled(Box)(
  () => `
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    padding: 28px 0 16px 0;
    `
);
const SubContentContainer = styled(Box)(
  () => `
      border-bottom: 2px solid #D9D9D9;
    `
);

const IOSSwitch = styled((props) => (
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
const HeaderBulkOrder = styled(Box)(
  () => `

  
  
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;

  
  color: #343D42;
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

export default function BulkOrderConfig({ CustomerPortal }) {
  const [time, setTime] = React.useState({
    seconds: 0,
    minutes: 0,
    hours: 0
  });

  const dispatch = useDispatch();
  const customerData = useSelector((state) => state?.customers?.customerData);

  const BulkOrderData = useSelector(
    (state) => state?.customers?.getBulkOrderData
  );

  const logoImage = useSelector((state) => state?.customers?.getLogo);

  const authToken = useSelector((state) => state?.auth?.token?.token);
  const authUser = useSelector((state) => state?.auth?.authUserData);

  const [fields, setFields] = React.useState([]);
  const [headerName, setHeaderName] = React.useState();
  const [values, setValues] = React.useState({});
  const [csvData, setCsvData] = React.useState([]);
  const [defaultCsvValues, setDefaultCsvValues] = React.useState([]);
  const [addValues, setAddValues] = React.useState([]);
  const [browserClosed, setBrowserClosed] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [name, setName] = React.useState('');
  const [format, setFormat] = React.useState('');
  const [deleteField, setDeleteField] = React.useState('');
  const [headerDataType, setHeaderDataType] = React.useState(null);
  const [del, setDel] = React.useState(false);
  const [startTime, setStartTime] = React.useState(0);
  const [endtime, setendTime] = React.useState(0);
  const TopBox = styled(Box)(
    () => `
    
     padding: ${CustomerPortal ? '0px' : '56px 0px 0 0'};
     
     background: ${CustomerPortal ? '' : 'white'};
     color: #EB4F0C;
     
  font-weight: 700;
  font-size: 16px;
      
      `
  );

  React.useEffect(() => {
    const initialFormValues = {
      asnNumber: BulkOrderData?.asnNumber,

      asnQuantity: BulkOrderData?.asnQuantity,

      dueDate: BulkOrderData?.dueDate,
      firstRow: BulkOrderData?.firstRow,
      partNumber: BulkOrderData?.partNumber,
      poLine: BulkOrderData?.poLine,

      poStatus: BulkOrderData?.poStatus,
      quantity: BulkOrderData?.quantity,
      uom: BulkOrderData?.uom,
      poNumber: BulkOrderData?.poNumber
    };
    const intitialCsvData =
      BulkOrderData && BulkOrderData?.exportData
        ? BulkOrderData?.exportData?.map((d) => ({
            headerName: d?.dataName,
            value: d?.dataValue
          }))
        : [
            {
              headerName: '',
              value: ''
            }
          ];

    setValues(initialFormValues);
    setCsvData(intitialCsvData);
  }, [BulkOrderData]);

  const { handleInputValue, formIsValid, errors, handleFormSubmit } =
    useFormControls(values, addValues, 'bulkOrder');

  React.useEffect(() => {
    if (CustomerPortal) {
      dispatch(getBulkOrderData(authToken, customerData?.customerNumber));
    } else {
      dispatch(getBulkOrderData(authToken, customerData?.customerNumber));
    }
  }, []);
  
  React.useEffect(() => {
    if (authUser && authUser?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')) {
      let isCancelled = false;

      advanceTime(time, isCancelled, setTime, 'Bulk Order');

      return () => {
        isCancelled = true;
        localStorage.setItem('componentTime', JSON.stringify(time));
      };
    }
  }, [time]);

  React.useEffect(() => {
    return () => {
      const value = JSON.parse(localStorage.getItem('componentTime'));

      if (value?.seconds > 59) {
        dispatch(
          timeCalculation(
            authUser?.email,
            'Bulk Order',
            value?.seconds,
            authUser?.associateCustomerId
          )
        );
      }

     
      localStorage.clear();
    };
  }, []);

  React.useEffect(() => {
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
          'Bulk Order',
          value?.seconds,
          authUser?.associateCustomerId
        )
      );
      localStorage.clear();
    }
  }

  const handleClickOpen = (field, i) => {
    setOpen(true);
    setDeleteField(field);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setName('');
    setFormat('');
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdditionalFormValues = (e, i, dataType) => {
    let arr = addValues;

    const index = arr.findIndex((a) => a.headerName === e?.target.name);

    if (index != -1) {
      arr[index] = {
        headerName: e?.target.name,
        value: e?.target.value,
        headerDataType: dataType,
        customerNumber: customerData?.customerNumber
      };
    } else {
      arr = [
        ...arr,
        {
          headerName: e?.target.name,
          value: e?.target.value,
          headerDataType: dataType,
          customerNumber: customerData?.customerNumber
        }
      ];
    }

    setAddValues(arr);
  };

  const onNewFormSubmit = (e) => {
    e?.preventDefault();
    const existingFields = [
      'UOM',
      'Quantity',
      'PO Status',
      'PO Number',
      'PO Line',
      'Part Number',
      'First Row',
      'Due Date',
      'ASN Quantity',
      'ASN Number'
    ];

    handleFormSubmit(
      e,
      dispatch(
        addOrUpdateBulkOrder(
          authToken,
          name,
          format,
          customerData?.customerNumber,
          BulkOrderData?.bulkOrderAdditionalConfigurationDtoList,
          existingFields
        )
      )
    );

    setOpenModal(false);
    setName('');
    setFormat('');
  };

  const onDelete = (e, i, data) => {
    dispatch(
      deleteBulkOrderConfig(authToken, data, customerData?.customerNumber)
    );
    setAddValues([]);

    handleClose();
  };

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

  const inputTypeOption = [
    { label: 'Numeric', value: 'integer' },
    { label: 'Date', value: 'date' },
    { label: 'Text', value: 'text' }
  ];

  // const resetFields =()=>{
  //   setValues({})

  // }
  //

  return (
    <>
      {CustomerPortal && (
        <Box sx={{ margin: '32px 0 10px 0' }}>
          <Breadcrumb
            userData={customerData}
            location={[
              {
                location: 'Home',
                to: `/customer-portal/${customerData?.id}/products`
              }
            ]}
            page={'Bulk Order'}
          />
        </Box>
      )}

      <TopBox>
        <Box
          sx={{
            display: { md: 'flex', xs: 'box' },
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {!CustomerPortal ? (
              <div>
                <span style={{ fontWeight: '400', fontSize: '20px' }}>
                  {/* Customer Number : {customerData?.customerNumber} Customer Name
                  |{' ' + customerData?.customerName} */}
                </span>
              </div>
            ) : (
              <Box
                sx={{
                  display: { md: 'flex', xs: 'box' },
                  flexDirection: 'row'
                }}
              >
                <HeaderBulkOrder flexGrow={1}>Bulk Order</HeaderBulkOrder>
                <Box
                  sx={{
                    '& > :not(style)': { ml: 1 },
                    display: { md: 'flex', xs: 'box' },
                    flexDirection: 'row'
                  }}
                >
                  {!CustomerPortal && <img src={customerPortalLogo}></img>}
                  {customerData?.logo && !CustomerPortal && (
                    <img
                      src={`data:image/jpeg;base64,${logoImage}`}
                      style={{ paddingRight: '8px' }}
                    ></img>
                  )}
                </Box>
              </Box>
            )}
          </Box>
          <Box style={{ marginRight: CustomerPortal ? 'unset' : '18px' }}>
            {!CustomerPortal && (
              <AddButton
                className="save-Button"
                type="submit"
                onClick={handleFormSubmit}
                disabled={!formIsValid()}
              >
                Save
              </AddButton>
            )}
          </Box>
          {/* <Box
            sx={{
              '& > :not(style)': { ml: 2 }
            }}
          > */}
          <CSVLink data={csvData} filename={'BulkUpload_config.csv'}>
            <DownloadButton>Download Config </DownloadButton>
          </CSVLink>
          {/* </Box> */}
        </Box>
      </TopBox>
      <div>
        <Header>Field Name</Header>
        <SubContentContainer>
          <form>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {BulkOrderData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>ASN Number</LabelBox>

                  <CustomInput
                    key={BulkOrderData?.asnNumber}
                    oninput="validity.valid||(value='')"
                    name="asnNumber"
                    fullWidth
                    inputProps={{ min: 1 }}
                    autoComplete="none"
                    {...(errors['asnNumber'] && {
                      error: true,
                      helperText: errors['asnNumber']
                    })}
                    className="basic-multi-select2 input_box"
                    disabled={CustomerPortal}
                    type={'number'}
                    defaultValue={BulkOrderData?.asnNumber}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  {/* {resultQuantity ? (
                      <span style={{ color: 'red' }}>
                        Quantity cannot be in decimal
                      </span>
                    ) : (
                      ''
                    )} */}
                  <Grid item xs={2}>
                    {/* <ModeEditIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => onEdit(i)}
                    ></ModeEditIcon> */}
                  </Grid>
                </Grid>
              )}

              {BulkOrderData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>ASN Quantity</LabelBox>

                  <CustomInput
                    key={BulkOrderData?.asnQuantity}
                    name="asnQuantity"
                    fullWidth
                    inputProps={{ min: '1' }}
                    autoComplete="none"
                    {...(errors['asnQuantity'] && {
                      error: true,
                      helperText: errors['asnQuantity']
                    })}
                    disabled={CustomerPortal}
                    className="basic-multi-select3 input_box"
                    defaultValue={BulkOrderData?.asnQuantity}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}>
                    {/* <ModeEditIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => onEdit(i)}
                  ></ModeEditIcon> */}
                  </Grid>
                </Grid>
              )}
              {BulkOrderData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    Due Date <snap style={{ color: 'red' }}>*</snap>
                  </LabelBox>

                  <CustomInput
                    key={BulkOrderData?.dueDate}
                    name="dueDate"
                    fullWidth
                    inputProps={{ min: '1' }}
                    {...(errors['dueDate'] && {
                      error: true,
                      helperText: errors['dueDate']
                    })}
                    autoComplete="none"
                    disabled={CustomerPortal}
                    className="basic-multi-select4 input_box"
                    type={'number'}
                    defaultValue={BulkOrderData?.dueDate}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}

              {BulkOrderData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    First Row <snap style={{ color: 'red' }}>*</snap>
                  </LabelBox>

                  <CustomInput
                    key={BulkOrderData?.firstRow}
                    name="firstRow"
                    fullWidth
                    inputProps={{ min: '1' }}
                    autoComplete="none"
                    {...(errors['firstRow'] && {
                      error: true,
                      helperText: errors['firstRow']
                    })}
                    className="basic-multi-select5 input_box"
                    disabled={CustomerPortal}
                    type={'number'}
                    defaultValue={BulkOrderData?.firstRow}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}

              {BulkOrderData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    Part Number <snap style={{ color: 'red' }}>*</snap>
                  </LabelBox>

                  <CustomInput
                    key={BulkOrderData?.partNumber}
                    name="partNumber"
                    fullWidth
                    inputProps={{ min: '1' }}
                    autoComplete="none"
                    disabled={CustomerPortal}
                    className="basic-multi-select6 input_box"
                    {...(errors['partNumber'] && {
                      error: true,
                      helperText: errors['partNumber']
                    })}
                    type={'number'}
                    defaultValue={BulkOrderData?.partNumber}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}

              {BulkOrderData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>PO Line</LabelBox>

                  <CustomInput
                    key={BulkOrderData?.poLine}
                    name="poLine"
                    fullWidth
                    inputProps={{ min: '1' }}
                    autoComplete="none"
                    {...(errors['poLine'] && {
                      error: true,
                      helperText: errors['poLine']
                    })}
                    disabled={CustomerPortal}
                    className="basic-multi-select7 input_box"
                    type={'number'}
                    defaultValue={BulkOrderData?.poLine}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}

              {BulkOrderData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>PO Number</LabelBox>

                  <CustomInput
                    name="poNumber"
                    key={BulkOrderData?.poNumber}
                    fullWidth
                    inputProps={{ min: '1' }}
                    autoComplete="none"
                    {...(errors['poNumber'] && {
                      error: true,
                      helperText: errors['poNumber']
                    })}
                    disabled={CustomerPortal}
                    className="basic-multi-select11 input_box"
                    type={'number'}
                    defaultValue={BulkOrderData?.poNumber}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}

              {BulkOrderData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>PO Status</LabelBox>

                  <CustomInput
                    key={BulkOrderData?.poStatus}
                    name="poStatus"
                    fullWidth
                    inputProps={{ min: '1' }}
                    {...(errors['poStatus'] && {
                      error: true,
                      helperText: errors['poStatus']
                    })}
                    autoComplete="none"
                    disabled={CustomerPortal}
                    className="basic-multi-select8 input_box"
                    type={'number'}
                    defaultValue={BulkOrderData?.poStatus}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}

              {BulkOrderData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    Quantity <snap style={{ color: 'red' }}>*</snap>
                  </LabelBox>

                  <CustomInput
                    key={BulkOrderData?.quantity}
                    name="quantity"
                    fullWidth
                    inputProps={{ min: '1' }}
                    autoComplete="none"
                    disabled={CustomerPortal}
                    className="basic-multi-select9 input_box"
                    {...(errors['quantity'] && {
                      error: true,
                      helperText: errors['quantity']
                    })}
                    type={'number'}
                    defaultValue={BulkOrderData?.quantity}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}

              {BulkOrderData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    UOM <snap style={{ color: 'red' }}>*</snap>
                  </LabelBox>

                  <CustomInput
                    key={BulkOrderData?.uom}
                    name="uom"
                    {...(errors['uom'] && {
                      error: true,
                      helperText: errors['uom']
                    })}
                    fullWidth
                    inputProps={{ min: '1' }}
                    autoComplete="none"
                    disabled={CustomerPortal}
                    className="basic-multi-select10 input_box"
                    {...(errors['uom'] && {
                      error: true,
                      helperText: errors['uom']
                    })}
                    type={'number'}
                    defaultValue={BulkOrderData?.uom}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}

              {BulkOrderData &&
                BulkOrderData?.bulkOrderAdditionalConfigurationDtoList?.map(
                  (field, i) => (
                    <Grid key={i} item xs={4} sx={{ margin: '10px 0' }}>
                      <LabelBox>{field?.headerName}</LabelBox>

                      <CustomInput
                        key={field?.value}
                        name={field?.headerName}
                        fullWidth
                        className="Bulk-order input_box"
                        type={'number'}
                        disabled={CustomerPortal}
                        defaultValue={field?.value}
                        onChange={(e) =>
                          handleAdditionalFormValues(
                            e,
                            i,
                            field?.headerDataType
                          )
                        }
                        InputProps={{
                          endAdornment: !CustomerPortal && (
                            <img
                              className="Img"
                              style={{
                                cursor: 'pointer'
                              }}
                              disabled={CustomerPortal}
                              src={DeleteIcon}
                              onClick={() => handleClickOpen(field, i)}
                            ></img>
                          )
                        }}
                      />
                      <Dialog
                        className="On-close"
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {'Field Name: ' + deleteField?.headerName}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this field?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button
                            className="on-Delete"
                            onClick={(e) => onDelete(e, i, deleteField)}
                            autoFocus
                          >
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  )
                )}

              <Grid item xs={4} sx={{ margin: '10px 0' }}>
                <br></br>
                {!CustomerPortal && (
                  <AddMoreButton
                    className="Add-more"
                    onClick={handleModalOpen}
                    style={{
                      backgroundColor: '#15364A',
                      color: 'white',
                      padding: '10px 15px',
                      cursor: 'pointer'
                    }}
                  >
                    Add new field
                  </AddMoreButton>
                )}
              </Grid>
            </Grid>{' '}
            <Box sx={{ mt: 2, mb: 3 }}></Box>
          </form>
        </SubContentContainer>
        <Box sx={{ margin: '40px 0' }}>
          <BulkOrderHistoryTable />
        </Box>
      </div>
      <CustomModal
        className="custom-model"
        open={openModal}
        onClose={handleModalClose}
      >
        <Box sx={style}>
          <div>
            <Typography variant="h3" component="h2">
              Add New Field
            </Typography>
          </div>
          <div style={{ marginTop: '30px' }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sx={{ margin: '10px 0' }}>
                <LabelBox>Field Name</LabelBox>
                <CustomInput
                  value={name}
                  type="text"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ margin: '10px 0' }}>
                <LabelBox>Field Format</LabelBox>
                <Select
                  value={{ label: format, value: format }}
                  name="preferredUOM"
                  options={inputTypeOption}
                  className="basic-multi-select1 input_box"
                  classNamePrefix="select"
                  onChange={(e) => setFormat(e.value)}
                />
              </Grid>
            </Grid>{' '}
            <Box
              sx={{
                '& > :not(style)': { mt: 3 },
                display: 'flex',
                flexDirection: 'row',
                gap: '10px'
              }}
            >
              <Grid item xs={6} md={6}>
                <AddButton
                  className="Add-Button"
                  onClick={(e) => onNewFormSubmit(e)}
                  disabled={!format || !name ? true : false}
                  type="submit"
                >
                  Add
                </AddButton>
              </Grid>
              <Grid item xs={6} md={6}>
                <CancelButton type="reset" onClick={handleModalClose}>
                  Cancel
                </CancelButton>
              </Grid>
            </Box>
          </div>
        </Box>
      </CustomModal>
    </>
  );
}
