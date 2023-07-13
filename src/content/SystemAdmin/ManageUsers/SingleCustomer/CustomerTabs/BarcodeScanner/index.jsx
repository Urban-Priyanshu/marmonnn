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
import Trash from '../../../../../../assets/Icons/trashRed.svg';
import DeleteIcon from '../../../../../../assets/Icons/Delete.png';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '@mui/material/Modal';
import { FileUploader } from 'react-drag-drop-files';
import { ColorRing } from 'react-loader-spinner';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from 'src/components/Modal';

import BarcodeTable from './Table';
import Breadcrumb from 'src/components/Breadcrumb';
import { uploadBarcodeFile } from 'src/redux/actions/CustomerPortalActions';
import { ActionTypes } from 'src/redux/constants/action-types';


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





export default function BarCodeScannerConfig({ CustomerPortal }) {
  const [file, setFile] = React.useState(null);
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

  const barcodeErrors = useSelector(
    (state) => state?.customerPortal?.getBarcodeErrors
  );

  const isLoading = useSelector((state) => state?.loaderStatus?.showLoading);

  const [fields, setFields] = React.useState([]);
  const [headerName, setHeaderName] = React.useState();
  const [spaces, setSpaces] = React.useState(false);
  const [values, setValues] = React.useState({});
  const [errorModalOpen, setErrorModalOpen] = React.useState(false);
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

    const intitialCsvData = [
      {
        headerName: 'firstDateColumn',
        value: BlanketPoData?.firstDateColumn
      },
      {
        headerName: 'firstRow',
        value: BlanketPoData?.firstRow
      },
      {
        headerName: 'partNumberColumn',
        value: BlanketPoData?.partNumber
      },
      {
        headerName: 'quantity',
        value: BlanketPoData?.quantity
      },
      {
        headerName: 'poNumber',
        value: BlanketPoData?.poNumber
      },
      {
        headerName: 'endDate',
        value: BlanketPoData?.endDate
      },
      {
        headerName: 'price',
        value: BlanketPoData?.price
      },

      {
        headerName: 'uom',
        value: BlanketPoData?.uom
      }
    ];

    const intitialAddCsvValues =
      BlanketPoData &&
      BlanketPoData?.bpoAdditionalFields?.map((d) => {
        return { headerName: d?.headerName, value: d?.value };
      });

    setDefaultCsvValues(intitialAddCsvValues);
    setValues(initialFormValues);
    setCsvData(intitialCsvData);
  }, [BlanketPoData]);
  const fileTypes = ['CSV', 'XLSX', 'XLS'];
  let finalCSVData = [];
  if (csvData && defaultCsvValues) {
    finalCSVData = csvData.concat(defaultCsvValues);
  }
  const handleFileChange = (file) => {
    setFile(file);
  };

 

 

  const handleErrorModalClose = () => {
    setErrorModalOpen(false);
    dispatch({
      type: ActionTypes.GET_BARCODE_ERRORS,
      payload: []
    });
    // setOpenTableModal(true);
  };
 

  const handleFileUpload = () => {
    const fd = new FormData();
    fd.append('file', file);
    dispatch(
      uploadBarcodeFile(
        customerData?.customerNumber,

        fd,
        setErrorModalOpen,
        authToken
      )
    );
    setFile(null);
  };

  const onTrashClick = () => {
    setFile(null);
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
                  <Header>Upload Default Part Configuration</Header>
                </span>
              </div>
            ) : (
              <Box
                sx={{
                  display: { md: 'flex', xs: 'box' },
                  flexDirection: 'row'
                }}
              >
                <HeaderBulkOrder flexGrow={1}>
                  Blanket PO Configuration
                </HeaderBulkOrder>
                <Box
                  sx={{
                    '& > :not(style)': { ml: 1 },
                    display: { md: 'flex', xs: 'box' },
                    flexDirection: 'row'
                  }}
                >
                  <img src={customerPortalLogo}></img>
                  {customerData?.logo && (
                    <img src={`data:image/jpeg;base64,${logoImage}`}></img>
                  )}
                </Box>
              </Box>
            )}
          </Box>{' '}
          <Box>
            {!CustomerPortal && (
              <AddButton
                className="save-Button"
                type="submit"
                onClick={handleFileUpload}
                disabled={!file}
              >
                Save
              </AddButton>
            )}
          </Box>
          <Box
            sx={{
              '& > :not(style)': { ml: 2 }
            }}
          ></Box>
        </Box>
      </TopBox>
      <div>
        <SubContentContainer>
          <form>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <div style={{ marginTop: '20px', marginLeft: '30px' }}>
                <Box className="file_Upload">
                  {!file && (
                    <>
                      <FileUploader
                        onTypeError={(err) => toast.error(err)}
                        handleChange={handleFileChange}
                        name="file"
                        types={fileTypes}
                      />{' '}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          textAlign: 'center',
                          padding: '8px 0 0 0'
                        }}
                      >
                        <Grid item xs={6} md={6} sm={12}>
                          {'Max File Size: 50MB'}
                        </Grid>
                      </Box>
                    </>
                  )}
                </Box>

                {file && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '25px 0',
                      fontWeight: '500',
                      fontSize: '14px',
                      color: '#343D42'
                    }}
                  >
                    {file && file?.name}
                    <span style={{ margin: '5px 10px 0 10px' }}>
                      {' '}
                      <img
                        width="20px"
                        className="Img"
                        style={{ cursor: 'pointer' }}
                        onClick={onTrashClick}
                        src={Trash}
                      ></img>
                    </span>
                  </Box>
                )}

                <Box
                  sx={{
                    '& > :not(style)': { mr: 2, mt: 3 },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}
                ></Box>
              </div>
            </Grid>{' '}
            <Box sx={{ mt: 2, mb: 3 }}></Box>
          </form>
        </SubContentContainer>
        <Box sx={{ margin: '40px 0' }}>
          <BarcodeTable />
        </Box>
      </div>
      <Dialog
        className="On-close"
        open={errorModalOpen}
        onClose={handleErrorModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ fontWeight: '900' }} id="alert-dialog-title">
          Errors:
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {barcodeErrors &&
              barcodeErrors?.map((d) =>
                d?.errorsSet?.map((err) => (
                  <div style={{ color: 'red' }} key={err}>{`${
                    d?.partNumber ? d?.partNumber : 'Empty Part Number'
                  } : ${err}`}</div>
                ))
              )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorModalClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
