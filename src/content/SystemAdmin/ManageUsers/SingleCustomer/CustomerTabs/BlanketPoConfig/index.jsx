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
import {
  addOrUpdateBlanketPo,
  getBlanketPoData,
  saveBlanketPO,
  deleteBlanketPoConfig
} from 'src/redux/actions/BlanketPoActions';
import customerPortalLogo from 'src/assets/Images/customerPortalLogo.svg';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { CSVLink } from 'react-csv';
import DeleteIcon from '../../../../../../assets/Icons/Delete.png';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '@mui/material/Modal';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useFormControls from '../Validations';
import BPOHistoryTable from './Table';
import Breadcrumb from 'src/components/Breadcrumb';
import { timeCalculation } from 'src/redux/actions/DashboardActions';
import { advanceTime } from 'src/services/Time-tracking';

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

export default function BlanketPoConfig({ CustomerPortal }) {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state?.customers?.customerData);

  const TopBox = styled(Box)(
    () => `
    
     padding: ${CustomerPortal ? '0px' : '56px 0px 0 0'};
     
     background: ${CustomerPortal ? '' : 'white'};
     color: #EB4F0C;
     
  font-weight: 700;
  font-size: 16px;
      
      `
  );

  const BlanketPoData = useSelector(
    (state) => state?.customers?.getBlanketPoData
  );

  const authToken = useSelector((state) => state?.auth?.token?.token);
  const logoImage = useSelector((state) => state?.customers?.getLogo);
  const authUser = useSelector((state) => state?.auth?.authUserData);
  const [time, setTime] = React.useState({
    seconds: 0,
    minutes: 0,
    hours: 0
  });
  const [fields, setFields] = React.useState([]);
  const [headerName, setHeaderName] = React.useState();
  const [values, setValues] = React.useState({});
  const [addValues, setAddValues] = React.useState([]);
  const [defaultCsvValues, setDefaultCsvValues] = React.useState([]);
  const [csvData, setCsvData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [name, setName] = React.useState('');
  const [format, setFormat] = React.useState('');
  const [deleteField, setDeleteField] = React.useState('');
  const [headerDataType, setHeaderDataType] = React.useState(null);
  const [del, setDel] = React.useState(false);

  React.useEffect(() => {
    const initialFormValues = {
      firstDateColumn: BlanketPoData?.firstDateColumn,

      firstRow: BlanketPoData?.firstRow,

      partNumber: BlanketPoData?.partNumber,
      quantity: BlanketPoData?.quantity,
      poNumber: BlanketPoData?.poNumber,
      endDate: BlanketPoData?.endDate,
      price: BlanketPoData?.price,

      uom: BlanketPoData?.uom
    };

    const intitialCsvData =
      BlanketPoData && BlanketPoData?.exportData
        ? BlanketPoData?.exportData?.map((d) => ({
            headerName: d?.dataName,
            value: d?.dataValue
          }))
        : [
            {
              headerName: '',
              value: ''
            }
          ];

    // const intitialAddCsvValues =
    //   BlanketPoData &&
    //   BlanketPoData?.bpoAdditionalFields?.map((d) => {
    //     return { headerName: d?.headerName, value: d?.value };
    //   });

    // setDefaultCsvValues(intitialAddCsvValues);
    setValues(initialFormValues);
    setCsvData(intitialCsvData);
  }, [BlanketPoData]);

  // let finalCSVData = [];
  // if (csvData && defaultCsvValues) {
  //   finalCSVData = csvData.concat(defaultCsvValues);
  // }

  const { handleInputValue, formIsValid, errors, handleFormSubmit } =
    useFormControls(values, addValues, 'blanketPO');

  React.useEffect(() => {
    dispatch(getBlanketPoData(authToken, customerData?.customerNumber));
  }, []);


  
  React.useEffect(() => {
  
    if (authUser && authUser?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')) {
    let isCancelled = false;

    advanceTime(time, isCancelled, setTime , "Blanket Po" );
   
    return () => {
      
      isCancelled = true;
      localStorage.setItem('componentTime', JSON.stringify(time));
    };
  }
  }, [time]);
 

  React.useEffect(() => {
    return () => {
      const value = JSON.parse(localStorage.getItem('componentTime'));
      
     if(value?.seconds > 59){
      dispatch(timeCalculation(authUser?.email, "Blanket Po" , value?.seconds ,authUser?.associateCustomerId  ))
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
    if(value?.seconds > 59){
      dispatch(timeCalculation(authUser?.email, "Blanket Po"  , value?.seconds ,authUser?.associateCustomerId  ))
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

  React.useEffect(() => {}, []);

  const handleAdditionalFormValues = (e, i, fieldType) => {
    let arr = addValues;

    const index = arr.findIndex((a) => a.headerName === e?.target.name);

    if (index != -1) {
      arr[index] = {
        headerName: e?.target.name,
        value: e?.target.value,
        headerDataType: fieldType,
        customerNumber: customerData?.customerNumber
      };
    } else {
      arr = [
        ...arr,
        {
          headerName: e?.target.name,
          value: e?.target.value,
          headerDataType: fieldType,
          customerNumber: customerData?.customerNumber
        }
      ];
    }

    setAddValues(arr);
  };

  const onNewFormSubmit = (e) => {
    e?.preventDefault();

    const existingFields = [
      'First Date Column',
      'First Row of Data',
      'Part Number Column',
      'Quantity Column',
      'Po Number Column',
      'End Date Column',
      'UOM',
      'Due Date',
      'Price'
    ];

    handleFormSubmit(
      e,
      dispatch(
        addOrUpdateBlanketPo(
          authToken,
          name,
          format,
          customerData?.customerNumber,
          BlanketPoData?.bpoAdditionalFields,
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
      deleteBlanketPoConfig(authToken, data, customerData?.customerNumber)
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
      {' '}
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
            page={'Blanket PO'}
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
                <HeaderBulkOrder flexGrow={1}>Blanket PO</HeaderBulkOrder>
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
          </Box>{' '}
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
          <CSVLink data={csvData} filename={'BlanketPO_config.csv'}>
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
              {BlanketPoData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    First Date Column <snap style={{ color: 'red' }}>*</snap>
                  </LabelBox>

                  <CustomInput
                    key={BlanketPoData?.firstDateColumn}
                    name="firstDateColumn"
                    inputProps={{ min: '1' }}
                    fullWidth
                    disabled={CustomerPortal}
                    autoComplete="none"
                    {...(errors['firstDateColumn'] && {
                      error: true,
                      helperText: errors['firstDateColumn']
                    })}
                    className="basic-multi-select2 input_box"
                    type={'number'}
                    defaultValue={BlanketPoData?.firstDateColumn}
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

              {BlanketPoData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    First Row of Data <snap style={{ color: 'red' }}>*</snap>
                  </LabelBox>

                  <CustomInput
                    key={BlanketPoData?.firstRow}
                    name="firstRow"
                    inputProps={{ min: '1' }}
                    fullWidth
                    disabled={CustomerPortal}
                    {...(errors['firstRow'] && {
                      error: true,
                      helperText: errors['firstRow']
                    })}
                    autoComplete="none"
                    className="basic-multi-select3 input_box"
                    type={'number'}
                    defaultValue={BlanketPoData?.firstRow}
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
              {BlanketPoData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    Part Number Column <snap style={{ color: 'red' }}>*</snap>
                  </LabelBox>

                  <CustomInput
                    key={BlanketPoData?.partNumber}
                    name="partNumber"
                    inputProps={{ min: '1' }}
                    fullWidth
                    disabled={CustomerPortal}
                    {...(errors['partNumber'] && {
                      error: true,
                      helperText: errors['partNumber']
                    })}
                    autoComplete="none"
                    className="basic-multi-select4 input_box"
                    {...(errors['partNumber'] && {
                      error: true,
                      helperText: errors['partNumber']
                    })}
                    type={'number'}
                    defaultValue={BlanketPoData?.partNumber}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}

              {BlanketPoData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    Quantity Column <snap style={{ color: 'red' }}>*</snap>
                  </LabelBox>

                  <CustomInput
                    key={BlanketPoData?.quantity}
                    name="quantity"
                    inputProps={{ min: '1' }}
                    fullWidth
                    {...(errors['quantity'] && {
                      error: true,
                      helperText: errors['quantity']
                    })}
                    disabled={CustomerPortal}
                    autoComplete="none"
                    className="basic-multi-select5 input_box"
                    type={'number'}
                    {...(errors['quantity'] && {
                      error: true,
                      helperText: errors['quantity']
                    })}
                    defaultValue={BlanketPoData?.quantity}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}

              {BlanketPoData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    PO Number Column <snap style={{ color: 'red' }}>*</snap>
                  </LabelBox>

                  <CustomInput
                    key={BlanketPoData?.poNumber}
                    name="poNumber"
                    inputProps={{ min: '1' }}
                    fullWidth
                    disabled={CustomerPortal}
                    autoComplete="none"
                    className="basic-multi-select6 input_box"
                    type={'number'}
                    {...(errors['poNumber'] && {
                      error: true,
                      helperText: errors['poNumber']
                    })}
                    defaultValue={BlanketPoData?.poNumber}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}

              {BlanketPoData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    End Date Column <snap style={{ color: 'red' }}>*</snap>
                  </LabelBox>

                  <CustomInput
                    key={BlanketPoData?.endDate}
                    name="endDate"
                    inputProps={{ min: '1' }}
                    fullWidth
                    {...(errors['endDate'] && {
                      error: true,
                      helperText: errors['endDate']
                    })}
                    disabled={CustomerPortal}
                    autoComplete="none"
                    className="basic-multi-select7 input_box"
                    type={'number'}
                    {...(errors['endDate'] && {
                      error: true,
                      helperText: errors['endDate']
                    })}
                    defaultValue={BlanketPoData?.endDate}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}
              {BlanketPoData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    UOM <snap style={{ color: 'red' }}>*</snap>
                  </LabelBox>

                  <CustomInput
                    key={BlanketPoData?.uom}
                    name="uom"
                    inputProps={{ min: '1' }}
                    fullWidth
                    {...(errors['uom'] && {
                      error: true,
                      helperText: errors['uom']
                    })}
                    disabled={CustomerPortal}
                    autoComplete="none"
                    className="basic-multi-select5 input_box"
                    type={'number'}
                    defaultValue={BlanketPoData?.uom}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}

              {BlanketPoData && (
                <Grid item xs={4} sx={{ margin: '10px 0' }}>
                  <LabelBox>
                    Price <snap style={{ color: 'red' }}>*</snap>
                  </LabelBox>

                  <CustomInput
                    key={BlanketPoData?.price}
                    name="price"
                    inputProps={{ min: '1' }}
                    fullWidth
                    disabled={CustomerPortal}
                    {...(errors['price'] && {
                      error: true,
                      helperText: errors['price']
                    })}
                    autoComplete="none"
                    className="basic-multi-select5 input_box"
                    type={'number'}
                    defaultValue={BlanketPoData?.price}
                    onChange={(e) => handleInputValue(e, 'string', '')}
                  />
                  <Grid item xs={2}></Grid>
                </Grid>
              )}

              {BlanketPoData &&
                BlanketPoData?.bpoAdditionalFields?.map((field, i) => (
                  <Grid key={i} item xs={4} sx={{ margin: '10px 0' }}>
                    <LabelBox>{field?.headerName} </LabelBox>

                    <CustomInput
                      name={field?.headerName}
                      fullWidth
                      className="Bulk-order input_box"
                      type={'number'}
                      key={field?.value}
                      defaultValue={field?.value}
                      onChange={(e) =>
                        handleAdditionalFormValues(e, i, field?.headerDataType)
                      }
                      InputProps={{
                        endAdornment: (
                          <img
                            className="Img"
                            style={{
                              cursor: 'pointer'
                            }}
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
                          className="On-delete"
                          onClick={(e) => onDelete(e, i, deleteField)}
                          autoFocus
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                ))}

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
          <BPOHistoryTable />
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
                  type="text"
                  value={name}
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ margin: '10px 0' }}>
                <LabelBox>Field Format</LabelBox>
                <Select
                  name="preferredUOM"
                  value={{ label: format, value: format }}
                  options={inputTypeOption}
                  className="select1 input_box"
                  classNamePrefix="select"
                  onChange={(e) => setFormat(e?.value)}
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
              <div>
                <AddButton
                  className="Add-Button"
                  onClick={(e) => onNewFormSubmit(e)}
                  disabled={!format || !name ? true : false}
                  type="submit"
                >
                  Add
                </AddButton>
              </div>
              <div>
                <CancelButton type="reset" onClick={handleModalClose}>
                  Cancel
                </CancelButton>
              </div>
            </Box>
          </div>
        </Box>
      </CustomModal>
    </>
  );
}
