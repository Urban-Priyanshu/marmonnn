import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import AddIcon from '@mui/icons-material/Add';

import RemoveIcon from '@mui/icons-material/Remove';
import ButtonGroup from '@mui/material/ButtonGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TableContainer from '@mui/material/TableContainer';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MailIcon from '@mui/icons-material/Mail';
import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { Link, useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import ReportIcon from '@mui/icons-material/Report';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import DeleteIcon from 'src/assets/Icons/Delete.png';
import CustomModal from '@mui/material/Modal';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';

import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';

import customerPortalLogo from 'src/assets/Images/customerPortalLogo.svg';

import FormControlLabel from '@mui/material/FormControlLabel';
import moment from 'moment';
import usePagination from 'src/services/pagination/pagiantion.js';
import AppPagination from 'src/helpers/appPagination';
import {
  Box,
  styled,
  TextField,
  Select,
  MenuItem,
  Grid,
  useTheme
} from '@mui/material';

import filterIcon from '../../../../../assets/Icons/Filter.png';
import exportIcon from '../../../../../assets/Icons/export.png';

import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAllUsers, updateStatus } from 'src/redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredData, handleFilter } from 'src/services/Filter';
import { CSVLink, CSVDownload } from 'react-csv';
import { Helmet } from 'react-helmet-async';
import { getCustomerViewProducts } from '../../../../../redux/actions/CustomerPortalActions';
import { AgGroupComponent } from 'ag-grid-community';
import {
  downloadLogo,
  getPrefferedUom
} from 'src/redux/actions/sysAdminActions';
import { ActionTypes } from 'src/redux/constants/action-types';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {
  placeCartOrders,
  updateCartOrders,
  deleteCartOrders
} from 'src/redux/actions/customerCartActions';
import Breadcrumb from 'src/components/Breadcrumb';
import { timeCalculation } from 'src/redux/actions/DashboardActions';
import { advanceTime } from 'src/services/Time-tracking';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

function createData(cusNo, partNo, desc, quantity, poNumber, remark) {
  return { cusNo, partNo, desc, quantity, poNumber, remark };
}

const rows = [
  createData(213, 213213, 'dwqdwqdwqd', 2, 213213213, 'dwqdwqdwqd'),
  createData(213213, 213213, 'dwqdwqdwqd', 3, 213213213, 'dwqdwqdwqd'),
  createData(2133, 213213, 'dwqdwqdwqd', 4, 213213213, 'dwqdwqdwqd'),
  createData(232, 213213, 'dwqdwqdwqd', 1, 213213213, 'dwqdwqdwqd'),
  createData(2134213, 213213, 'dwqdwqdwqd', 5, 213213213, 'dwqdwqdwqd'),
  createData(213, 213213, 'dwqdwqdwqd', 2, 213213213, 'dwqdwqdwqd')
];

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

const ClearButton = styled(Button)(
  () => `
        color:  white !important;
        background: #022f53 !important;
        border-radius: 3px !important;
        padding: 0px 10px !important;
        
    
        :hover {
          color:  white !important;
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
const StatusDropdownSelect = styled(Select)(
  () => `
      .MuiOutlinedInput-notchedOutline {
        border: 0;
      }
    
      .MuiSvgIcon-root {
        margin-top: -10px;
      }
      
      `
);

const CartTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteIconDisabled, setDeleteIconDisabled] = React.useState(false);
  const [date, setDate] = React.useState();
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0
  });
  const userData = useSelector((state) => state?.users?.usersData);
  const logoImage = useSelector((state) => state?.customers?.getLogo);
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const customerData = useSelector((state) => state?.customers?.customerData);
  const cartData = useSelector(
    (state) => state?.customerPortal?.getCustomerCartDetails
  );
  const authUser = useSelector((state) => state?.auth?.authUserData);
  const cartError = useSelector(
    (state) => state?.customerPortal?.getCustomerCartResponse
  );



  const [values, setValues] = useState([]);

  const [filteredData, setFilteredData] = React.useState({
    role: [],
    status: []
  });

 

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [enableSubmit, setEnableSubmit] = React.useState(true);
  const uomData = useSelector((state) => state?.customers?.getUomData);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    dispatch(getPrefferedUom(authToken));
  }, []);



  

  const handleClickOpen = (i) => {
    setErrorOpen(`popupOpen${i}`);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

 

  const handleClick = (event) => {
    setActive(true);
    setAnchorEl(event.currentTarget);

    if (filteredData?.role?.length || filteredData?.status) {
      setActive(true);
    }
  };

 
  const deleteCustomerCart = (e, row) => {
    setDeleteIconDisabled(true);
    dispatch(
      deleteCartOrders(
        customerData?.id,
        row?.id,
        authToken,
        setDeleteIconDisabled
      )
    );
  };

  const onUpdateClick = () => {
    dispatch(
      updateCartOrders(customerData?.id, values, authToken, setEnableSubmit)
    );
  };

  const goBack = () => {
    navigate(`/customer-portal/${customerData?.id}/products?cp=true`);
  };

  const onSubmitClick = () => {
    dispatch(
      placeCartOrders(
        customerData?.id,
        customerData?.customerNumber,
        values,
        navigate,
        authToken
      )
    );
  };

  const cart = cartData?.forEach(function (item) {
    delete item.b;
  });

  const uomResult = uomData?.map((d) => ({
    label: d?.uomName,
    value: d?.uomCode
  }));

  const uomOption = [
    {
      label: 'Feet',
      value: 'FT'
    },
    {
      label: 'Inches',
      value: 'IN'
    },
    {
      label: 'Pieces',
      value: 'PCS'
    },
    {
      label: 'Eaches',
      value: 'EA'
    },
    {
      label: 'Pounds',
      value: 'LBS'
    },
    {
      label: 'Meters',
      value: 'M'
    },
    {
      label: 'Millimetres',
      value: 'MM'
    },
    {
      label: 'Kilograms',
      value: 'KG'
    },

    {
      label: 'Tons',
      value: 'TON'
    },
    {
      label: 'Square Feet - for sheet products',
      value: 'SFT'
    },
    {
      label: 'Square Inches - for sheet products',
      value: 'SIN'
    },
    {
      label: 'Parts',
      value: 'PARTS'
    }
  ];

  useEffect(() => {
    for (let i in cartData) {
      let obj = cartData[i];
      delete obj['status'];
    }

    setValues(cartData);
  }, [cartData]);

  const handleInputValue = (e, type, nm, i) => {
    let obj = values[i];

    if (type === 'string') {
      obj = {
        ...obj,
        [e?.target.name]: e?.target.value
        // .replace(/[^0-9a-z]/gi, '')
      };
      setEnableSubmit(false);
    }
    if (nm === 'quantity') {
    
      setEnableSubmit(false);

      obj = {
        ...obj,
        [e?.target.name]: e?.target.value
      };
    }

    if (nm === 'dueDate') {
    
      obj = {
        ...obj,
        dueDate: moment(e).format('MM/DD/YYYY')
      };
      setEnableSubmit(false);
      setDate(e);
    }

    values[i] = obj;
    const updatedArray = values.map((item) => {
      return { ...item, ['errorsMap']: null };
    });

    setValues([...updatedArray]);
  };

 
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Box
        sx={{
          '& > :not(style)': { ml: 1 },
          display: { md: 'flex', xs: 'box' },
          flexDirection: 'row'
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <span style={{ fontSize: '20px', fontWeight: 700 }}>
            Supply Chain Portal
          </span>
        </Box>
        {/* 
        <img src={customerPortalLogo}></img>
        <img src={`data:image/jpeg;base64,${logoImage}`}></img> */}
      </Box>
      <TableContainer style={{ margin: '20px 0', height: '500px' }}>
        <Table
          sx={{ minWidth: 700, backgroundColor: 'white' }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: 'white' }}>
              <StyledTableCell>Customer Number</StyledTableCell>
              <StyledTableCell>Part Number</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Date Required</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>PO Number</StyledTableCell>
              <StyledTableCell>Remark</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartData &&
              cartData.map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {row?.customerNumber}
                  </StyledTableCell>
                  <StyledTableCell>{row?.partNumber}</StyledTableCell>
                  <StyledTableCell>{row?.partDescription}</StyledTableCell>{' '}
                  <StyledTableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        borderRadius: 1
                      }}
                      className="cartDate"
                    >
                 
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          inputFormat="MM/dd/yyyy"
                          value={values && values[i]?.dueDate}
                          onFocus={(e) => e?.preventDefault()}
                          // onClose={(value)=>prev.value}
                          onChange={(e) =>
                            handleInputValue(e, '', 'dueDate', i)
                          }
                          renderInput={(params) => (
                            <TextField {...params} helperText={null} />
                          )}
                        />
                      </LocalizationProvider>
                   
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        borderRadius: 1
                      }}
                    >
                      <input
                        className={'increment_input'}
                        style={{
                          flexGrow: 1,
                          maxWidth: '70px'
                        }}
                        min={1}
                        type="number"
                        name={'quantity'}
                        value={values[i]?.quantity}
                        defaultValue={row?.quantity}
                        onChange={(e) =>
                          handleInputValue(e, 'string', 'quantity', i)
                        }
                      ></input>
                      <select
                        style={{
                          background: '#15364A',
                          color: 'white',
                          padding: '5px 0px'
                        }}
                        name={'uom'}
                        onChange={(e) => handleInputValue(e, 'string', '', i)}
                      >
                        <option selected disabled>
                          {row?.uom}
                        </option>
                        {uomResult &&
                          uomResult?.map((d) => (
                            <option key={d} value={d?.value}>
                              {d?.value}
                            </option>
                          ))}
                      </select>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        borderRadius: 1
                      }}
                    >
                      <input
                        className={'increment_input'}
                        style={{ flexGrow: 1, maxWidth: '70px' }}
                        name={'purchaseOrderNumber'}
                        type="string"
                        value={values[i]?.purchaseOrderNumber}
                        defaultValue={row?.purchaseOrderNumber}
                        onChange={(e) => handleInputValue(e, 'string', '', i)}
                      ></input>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        borderRadius: 1
                      }}
                    >
                      <input
                        className={'increment_input'}
                        style={{ flexGrow: 1 }}
                        type="text"
                        value={values[i]?.specialRemarks}
                        defaultValue={row?.specialRemarks}
                        name={'specialRemarks'}
                        onChange={(e) => handleInputValue(e, 'string', '', i)}
                      ></input>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <input
                      type="image"
                      className="Img"
                      style={{ cursor: 'pointer' }}
                      disabled={deleteIconDisabled}
                      onClick={(e) => deleteCustomerCart(e, row)}
                      src={DeleteIcon}
                    ></input>
                  </StyledTableCell>
                  {row?.errorsMap && row?.partNumber ? (
                    <IconButton>
                      <ReportIcon
                        sx={{
                          color: 'red'
                        }}
                        onClick={() => handleClickOpen(i)}
                      />
                      <Dialog
                        onClose={handleErrorClose}
                        open={errorOpen === `popupOpen${i}`}
                      >
                        <DialogTitle
                          style={{
                            color: 'white',
                            backgroundColor: '#102132'
                          }}
                        >
                          <ul>
                            {[
                              `${row?.errorsMap?.dueDate}`,
                              `${row?.errorsMap?.purchaseOrderNumber}`,
                              `${row?.errorsMap?.quantity}`,
                              `${row?.errorsMap?.shippingLocationId}`
                            ].map((item) => {
                              return item != 'undefined' ? (
                                <li>{item}</li>
                              ) : null;
                            })}
                          </ul>
                        </DialogTitle>
                      </Dialog>
                    </IconButton>
                  ) : (
                    ''
                  )}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <Box
          sx={{
            '& > :not(style)': { ml: 2, mt: 3 },
            display: 'flex',
            flexDirection: 'row-reverse'
          }}
        >
   
        </Box>
        <Box
          sx={{
            '& > :not(style)': { ml: 2, mt: 3 },
            display: 'flex',
            flexDirection: 'row-reverse'
          }}
        >
          <Grid item xs={6} md={6}>
            <AddButton disabled={!enableSubmit} onClick={onSubmitClick}>
              Submit
            </AddButton>
          </Grid>
          <Grid item xs={6} md={6}>
            <CancelButton onClick={onUpdateClick}>Update All</CancelButton>
          </Grid>
          <Grid item xs={6} md={6}>
            <CancelButton onClick={goBack}>Cancel</CancelButton>
          </Grid>
        </Box>
      </TableContainer>
    </div>
  );
};
export default CartTable;
