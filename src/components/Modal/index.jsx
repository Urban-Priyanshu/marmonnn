import * as React from 'react';
import Box from '@mui/material/Box';
import CustomModal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { spacing } from '@mui/system';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import {
  FilledInput,
  FormControl,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  styled,
  TextField
} from '@mui/material';
import UserForm from 'src/content/SuperAdmin/ManageUsers/AddUserForm';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import AddExtUserForm from 'src/content/SystemAdmin/ManageUsers/SingleCustomer/CustomerTabs/ExternalUsers/AddExternalUserForm/AddUserForm';
import plusIcon from '../../assets/Icons/Plus.png';
import useFormControls from 'src/content/SuperAdmin/ManageUsers/AddUserForm/Validations';
import { withWidth } from '@material-ui/core';
import Pencil from '../../assets/Icons/Shape.svg';
import { addCustomers } from 'src/redux/actions/sysAdminActions';
import InfoIcon from '../../assets/Icons/infoIcon.svg';
// import { getAutoHeightDuration } from '@mui/material/styles/createTransitions';

const ModalButton = styled(Button)(
  () => `
  background-color: #15364a !important;
    color: white !important;
    height: 40px !important;
    border-radius: 3px !important;
    padding: 0 13px !important;
    font-weight: 600;
    font-size: 16px;

    :hover {
        background-color: black !important;
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

const ValidateButton = styled(Button)(
  () => `
  cursor: pointer;
  background: #102132 !important;
  color: white !important;
  padding: 4px 15px !important;
  height: 22px !important;
  cursor: pointer;
  border-radius: 30px !important;
    

    :hover {
        background-color: black !important;
      }

    :disabled {
      opacity: 0.7;
      cursor:not-allowed;
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

export default function Modal({
  type,
  sendDataToMain,
  extUserData,
  barcodeData,
  UpdateBarcodeList,
  edit
}) {
  
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const [quantity, setquantity] = React.useState();
  const [poNumber, setpoNumber] = React.useState();
  const [remarks, setremarks] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState();
  const [values, setValues] = React.useState();
  const [customerNumber, setCustomerNumber] = React.useState('');


  const handleOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    const initialValues = {
      quantity: barcodeData?.quantity,
      purchaseOrderNumber: barcodeData?.purchaseOrderNumber,
      specialRemarks: barcodeData?.specialRemarks
    };
    setValues(initialValues);
    setquantity(
      parseInt(initialValues?.quantity?.replaceAll('[^a-zA-Z0-9]', ' '))
    );
    setpoNumber(initialValues?.purchaseOrderNumber);
    setremarks(initialValues?.specialRemarks);
  }, [barcodeData]);

 

  var resultQuantity = quantity - Math.floor(quantity) !== 0;

  const handleClose = () => {
   
    setCustomerNumber('');
    setOpen(false);
  };
  const customerData = useSelector((state) => state?.customers?.customerData);
  const userData = useSelector((state) => state?.users?.usersData);

  const sendDataToParent = (data) => {
    setData(data);
  };

  if (customerData || userData) {
    try {
      sendDataToMain(data);
    } catch {}
  }
 

  const handleAddCustomer = (e) => {
    e.preventDefault();
    dispatch(
      addCustomers(customerNumber, setOpen, setCustomerNumber, authToken)
    );
  };

 
  return (
    <div>
      {type === 'addUser' && (
        <>
          <ModalButton onClick={handleOpen} title="Add User">
            <img src={plusIcon}></img>&nbsp; Add User
          </ModalButton>

          <CustomModal keepMounted open={open} onClose={handleClose}>
            <Box sx={style}>
              <div>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h3"
                  component="h2"
                >
                  Add User
                </Typography>
                <span>
                  All fields with <span style={{ color: 'red' }}> *</span> are
                  mandatory
                </span>
              </div>
              <div style={{ marginTop: '30px' }}>
                <UserForm close={handleClose} />
              </div>
            </Box>
          </CustomModal>
        </>
      )}

      {type === 'addCustomer' && (
        <>
          <ModalButton onClick={handleOpen} title="Add User">
            <img src={plusIcon}></img>&nbsp; Add Customer
          </ModalButton>

          <CustomModal keepMounted open={open} onClose={handleClose}>
            <Box sx={style}>
              <div>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h3"
                  component="h2"
                >
                  Add Customer
                </Typography>
              </div>
              <div style={{ marginTop: '30px' }}>
                <form onSubmit={handleAddCustomer}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={12} sx={{ margin: '10px 0' }}>
                      <Box sx={{ display: 'flex' }}>
                        <LabelBox sx={{ flexGrow: 1 }}>
                          Enter Customer Number
                          <span style={{ color: 'red' }}> *</span>
                        </LabelBox>
                        <Tooltip
                          title={
                            <ul>
                              <li>
                                Add by comma seperated to load more customer
                                numbers
                              </li>
                              <li>Only numbers are allowed to enter!</li>
                            </ul>
                          }
                          disableInteractive
                        >
                          <img src={InfoIcon}></img>
                        </Tooltip>
                      </Box>

                      <CustomInput
                        name="firstName"
                        onChange={(e) => setCustomerNumber(e.target.value)}
                        fullWidth
                        value={customerNumber}
                        autoComplete="none"
                        type="text"
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
                        disabled={!customerNumber}
                        // onClick={(e) => handleSaveClick(e)}
                        type="submit"
                      >
                        Add
                      </AddButton>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      {/* <CancelButton onClick={handleCancelClick */}
                      <CancelButton onClick={handleClose}>Cancel</CancelButton>
                    </Grid>
                  </Box>
                </form>
              </div>
            </Box>
          </CustomModal>
        </>
      )}

      {type === 'addExternalUser' && (
        <>
          <ModalButton onClick={handleOpen} title="Add User">
            + Add User
          </ModalButton>

          <CustomModal
            className="edit_external_modal"
            keepMounted
            open={open}
            onClose={handleClose}
          >
            <Box sx={style}>
              <div>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h3"
                  component="h2"
                >
                  Add External User for {customerData?.customerName}
                </Typography>
                <span>
                  All fields with <span style={{ color: 'red' }}> *</span> are
                  mandatory
                </span>
              </div>
              <div style={{ marginTop: '30px' }}>
                <AddExtUserForm close={handleClose} />
              </div>
            </Box>
          </CustomModal>
        </>
      )}

      {type === 'editExternalUser' && (
        <>
        
         
        <div>
        <img
          style={{ cursor: 'pointer' }}
          onClick={handleOpen}
          src={Pencil}
        ></img>
      </div>

          <CustomModal
            className="edit_external_modal"
            open={open}
            onClose={handleClose}
          >
            <Box sx={style}>
              <div>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h3"
                  component="h2"
                >
                  Edit External User for {customerData?.customerName}
                </Typography>
                <span>
                  All fields with <span style={{ color: 'red' }}> *</span> are
                  mandatory
                </span>
              </div>
              <div style={{ marginTop: '30px' }}>
                <AddExtUserForm
                  extUserData={extUserData}
                  close={handleClose}
                  edit={true}
                />
              </div>
            </Box>
          </CustomModal>
        </>
      )}
      {type === 'update' && (
        <>
          <ValidateButton onClick={handleOpen} title="Add User">
            Update
          </ValidateButton>
          <CustomModal open={open} onClose={handleClose}>
            <Box className="update_Barcode" sx={style} style={{ width: '25%' }}>
              <div>
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h3"
                  component="h2"
                >
                  Update Part Number
                </Typography>

                <span>
                  All fields with <span style={{ color: 'red' }}>*</span> are
                  mandatory{' '}
                </span>
                <br></br>
                <div style={{ marginTop: '30px' }}>
                  <Typography
                    className="edit_external"
                    id="keep-mounted-modal-title"
                    variant="h3"
                    component="h2"
                    sx={{ fontSize: '15px' }}
                  >
                    Part No:
                    <span style={{ fontWeight: 'lighter' }}>
                      &nbsp;&nbsp;{barcodeData?.partNumber}
                    </span>
                  </Typography>

                  <Typography
                    className="edit_external"
                    id="keep-mounted-modal-title"
                    variant="h3"
                    component="h2"
                    sx={{ fontSize: '15px' }}
                  >
                    Description:
                    <span style={{ fontWeight: 'lighter' }}>
                      &nbsp;&nbsp;{barcodeData?.partDescription}
                    </span>
                  </Typography>
                  <br></br>

                  <Typography
                    className="edit_external"
                    id="keep-mounted-modal-title"
                    variant="h5"
                    component="h2"
                    sx={{ fontSize: '12px' }}
                  >
                    Quantity<span style={{ color: 'red' }}>*</span>
                  </Typography>

                  <Box
                    sx={{
                      width: 500,
                      maxWidth: '100%'
                    }}
                  >
                    <CustomInput
                      name="quantity"
                      onChange={(e) => setquantity(e.target.value)}
                      defaultValue={parseInt(
                        barcodeData?.quantity?.replaceAll('[^a-zA-Z0-9]', ' ')
                      )}
                      id="outlined-search"
                      fullWidth
                      type="number"
                    />
                    {quantity === '' ? (
                      <span style={{ color: 'red' }}>Quantity is required</span>
                    ) : (
                      ''
                    )}
                    {resultQuantity ? (
                      <span style={{ color: 'red' }}>
                        Quantity cannot be in decimal
                      </span>
                    ) : (
                      ''
                    )}
                  </Box>

                  {/* <Typography
                  className="edit_external"
                  id="keep-mounted-modal-title"
                  variant="h5"
                  component="h5"
                >
                  Quantity
                </Typography>

                <Box
                  sx={{
                    width: 500,
                    maxWidth: '100%'
                  }}
                >
                  <TextField id="outlined-search" fullWidth type="search" />
                </Box> */}
                  <br></br>

                  <Typography
                    className="edit_external"
                    id="keep-mounted-modal-title"
                    variant="h5"
                    component="h2"
                    sx={{ fontSize: '12px' }}
                  >
                    PO Number
                  </Typography>

                  <Box
                    sx={{
                      width: 500,
                      maxWidth: '100%'
                    }}
                  >
                    <CustomInput
                      name="purchaseOrderNumber"
                      onChange={(e) => setpoNumber(e.target.value)}
                      defaultValue={barcodeData?.purchaseOrderNumber}
                      id="outlined-search"
                      fullWidth
                      type="string"
                    />
                 
                  </Box>
                  <br></br>

                  <Typography
                    className="edit_external"
                    id="keep-mounted-modal-title"
                    variant="h5"
                    component="h2"
                    sx={{ fontSize: '12px' }}
                  >
                    Special Remark
                  </Typography>

                  <Box
                    sx={{
                      width: 500,
                      maxWidth: '100%'
                    }}
                  >
                    <CustomInput
                      name="specialRemarks"
                      onChange={(e) => setremarks(e.target.value)}
                      defaultValue={barcodeData?.specialRemarks}
                      id="outlined-search"
                      fullWidth
                      type="search"
                    />
                  
                  </Box>
                </div>
                <Box
                  sx={{
                    '& > :not(style)': { mr: 2, mt: 3 },
                    display: 'flex',
                    flexDirection: 'row',
                    //  ml: 34
                    justifyContent: 'flex-start'
                  }}
                >
                  <Box>
                    <CancelButton onClick={handleClose}>Cancel</CancelButton>
                  </Box>
                  <Box>
                    <AddButton
                      onClick={(e) =>
                        UpdateBarcodeList({
                          ...barcodeData,
                          quantity: quantity ? quantity : values?.quantity,
                          purchaseOrderNumber: poNumber,
                         
                        
                          specialRemarks: remarks,
                           
                          updatedDate: undefined,
                          createdDate: undefined
                        })
                      }
                      disabled={
                        !quantity  || resultQuantity
                      }
                      type="submit"
                    >
                      Save
                    </AddButton>
                  </Box>
                </Box>
              </div>
            </Box>
          </CustomModal>
        </>
      )}
      {type === 'uploadBulk' && (
        <>
          <ModalButton onClick={handleOpen} title="Add User">
            Upload Bulk
          </ModalButton>

          <CustomModal keepMounted open={open} onClose={handleClose}>
            <Box sx={style}>
              <div>
                {/* <Typography
                  id="keep-mounted-modal-title"
                  variant="h3"
                  component="h2"
                >
                  Add Internal User for{' '}
                  {customerData?.firstName + ' ' + customerData?.lastName}
                </Typography>
                <span>
                  All fields with <span style={{ color: 'red' }}> *</span> are
                  mandatory
                </span> */}
              </div>
              <div style={{ marginTop: '30px' }}>
                {/* <AddIntUserForm close={handleClose} /> */}
              </div>
            </Box>
          </CustomModal>
        </>
      )}
    </div>
  );
}
