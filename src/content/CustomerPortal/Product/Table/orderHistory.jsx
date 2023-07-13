import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sortIcon from '../../../../assets/Icons/sort.svg';

import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { ColorRing } from 'react-loader-spinner';
import Breadcrumb from 'src/components/Breadcrumb';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import moment from 'moment';
import { Pagination } from '@material-ui/lab';
import usePagination from 'src/services/pagination/pagiantion.js';
import {
  Box,
  Button,
  styled,
  TextField,
  Select,
  MenuItem
} from '@mui/material';

import filterIcon from '../../../../assets/Icons/Filter.png';
import exportIcon from '../../../../assets/Icons/export.png';

import SearchIcon from '@mui/icons-material/Search';
import IosShareIcon from '@mui/icons-material/IosShare';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Modal from 'src/components/Modal';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//   import './DataGrid.css';

import customerPortalLogo from 'src/assets/Images/customerPortalLogo.svg';
import { getAllUsers, updateStatus } from 'src/redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredData, handleFilter } from 'src/services/Filter';
import { CSVLink, CSVDownload } from 'react-csv';
import {
  getCustomerOrderHistory,
  getCustomerOrderHistoryCsv
} from 'src/redux/actions/CustomerPortalActions';
import AppPagination from 'src/helpers/appPagination';
import { downloadOrderHistory } from 'src/redux/actions/customerCartActions';
import { advanceTime } from 'src/services/Time-tracking';
import { timeCalculation } from 'src/redux/actions/DashboardActions';

const CustomButton = styled(Button)(
  () => `
      background-color: #15364a !important;
      color: white !important;
      height: 40px !important;
      width: 35px !important;
      border-radius: 3px !important;
      font-size: 12px !important;
      padding: 0px !important;
      min-width: 40px;
      
  
      :hover {
          background-color: black !important;
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
const TableContainer = styled(Box)(
  () => `
    padding: 15px 24px;
    background-color: white;
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.08);
    border-radius: 3px;
  
    
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

const MainContainer = styled(Box)(
  () => `
  padding: 0px 32px 0px 32px;
  `
);

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = React.useState(false);
  const [csvData, setCsvData] = React.useState([]);
  const [csvExport, setCsvExport] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [deactivated, setDeactivated] = React.useState(false);
  const userData = useSelector((state) => state?.users?.usersData);
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const customerData = useSelector((state) => state?.customers?.customerData);
  const logoImage = useSelector((state) => state?.customers?.getLogo);

  const [sort, setSort] = useState('');
  const [sortType, setSortType] = useState();

  const getCustomerOrderExcel = useSelector(
    (state) => state?.customerPortal?.getCustomerOrderExcel
  );

  const authUser = useSelector((state) => state?.auth?.authUserData);
  const customerOrderHistory = useSelector(
    (state) => state?.customerPortal?.getCustomerOrderHistory
  );
  const [currentPage, setCurrentPage] = useState(1);
  let [historyPage, setHistoryPage] = useState(1);
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0
  });
  const [tableData, setTableData] = useState();
  const [excelToggle, setExcelToggle] = React.useState(false);
  const [paginationData, setPaginationData] = useState();

  const isLoading = useSelector((state) => state?.loaderStatus?.showLoading);

  const [filteredData, setFilteredData] = React.useState({
    role: [],
    status: []
  });

  let [active, setActive] = useState(false);
  useEffect(() => {
    navigate('?cp=true');
  }, []);

  const gridStyle = useMemo(() => ({ height: '100%' }), []);
  const PER_PAGE = 13;

  const options = [10, 20, 50, 100];
  const [itemsPerPage, setItemsPerPage] = useState(options[0]);
  const [openOrderItemsPerPage, setOpenOrderItemsPerPage] = useState(
    options[0]
  );

  const handleCountChange = (e) => {
    
    setItemsPerPage(e.target.value);
    // do something with the new itemsPerPage value, e.g. fetch new data from a server
  };

  const bluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          partNumber: d?.partNumber,
          mtrFilePath: d?.mtrFilePath,
          packingListFilePath: d?.packingListFilePath,
          podFilePath: d?.podFilePath,
          invoiceFilePath: d?.invoiceFilePath,
          customerNumber: d?.customerNumber,
          partDescription: d?.partDescription,
          salesOrderNumber: d?.salesOrderNumber,
          customerOrderNumber: d?.customerOrderNumber,
          uom: d?.uom,
          quantity: d?.quantity,
          dueDate: moment.utc(d?.invoiceDate).format('MM/DD/YYYY'),

          // roles: d?.roles?.map((r) => r?.description),
          status: d?.status
        };
      })
    );
  };

  const excelbluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          partDescription: d?.partDescription,
          salesOrderNumber: d?.salesOrderNumber,
          poNumber: d?.customerOrderNumber,
          quantity: d?.quantity,
          dueDate: moment.utc(d?.invoiceDate).format('MM/DD/YYYY'),
          status: d?.status
        };
      })
    );
  };

  useEffect(() => {
    if (getCustomerOrderExcel?.content?.length) {
      const intitialCsvData =
        getCustomerOrderExcel &&
        getCustomerOrderExcel?.content &&
        getCustomerOrderExcel?.content?.map((d) => ({
          partDescription: d?.partDescription,
          salesOrderNumber: d?.salesOrderNumber,
          poNumber: d?.customerOrderNumber,
          quantity: d?.quantity,
          dueDate: moment.utc(d?.invoiceDate).format('MM/DD/YYYY'),
          status: d?.status
        }));
      setCsvData(intitialCsvData);
    }
  }, [getCustomerOrderExcel]);

  useEffect(() => {
    if (customerOrderHistory) {
      const tableBluePrint = bluePrint(customerOrderHistory?.content);
      const exceltableBluePrint = excelbluePrint(customerOrderHistory?.content);
      const filterData = getFilteredData(
        tableBluePrint,
        filteredData,
        'superAdmin'
      );

      const excelfilterData = getFilteredData(
        exceltableBluePrint,
        filteredData,
        'superAdmin'
      );

      const data = usePagination(
        filterData,
        itemsPerPage,
        currentPage,
        setCurrentPage
      );
      setPaginationData(data);

     
      setTableData(data?.currentData());
      // setCsvData(excelfilterData);
    }
  }, [
    customerOrderHistory,
    historyPage,
    searchValue,
    filteredData,
    itemsPerPage
  ]);

  useEffect(() => {

    if (authUser && authUser?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')) {
    let isCancelled = false;

    advanceTime(time, isCancelled, setTime , "Base Feature" );
   
    return () => {
      
      isCancelled = true;
      localStorage.setItem('componentTime', JSON.stringify(time));
    };
  }
  }, [time]);
 

  useEffect(() => {
    return () => {
      const value = JSON.parse(localStorage.getItem('componentTime'));
      
     if(value?.seconds > 59){
      dispatch(timeCalculation(authUser?.email, "Base Feature" , value?.seconds ,authUser?.associateCustomerId  ))
     }
      
     
      localStorage.clear();
    
    };
  }, []);

  useEffect(() => {
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
      dispatch(timeCalculation(authUser?.email, "Base Feature"  , value?.seconds ,authUser?.associateCustomerId  ))
      localStorage.clear();
     }
    
  }

  //BLUEPRINT of the incoming data for AG GRID

  //  load data from sever

  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(
        getCustomerOrderHistory(
          customerData?.customerNumber,
          itemsPerPage,
          historyPage,
          sort,
          searchValue,
          authToken,
          sortType
        )
      );
    }, 100);
    return () => clearTimeout(getData);
  }, [historyPage, searchValue, customerData, itemsPerPage, sort, sortType]);

  useEffect(() => {
    const getData = setTimeout(() => {
      dispatch(
        getCustomerOrderHistoryCsv(
          customerData?.customerNumber,
          99999,
          historyPage,
          'DSC',
          searchValue,
          setExcelToggle,
          authToken
        )
      );
    }, 100);
    return () => clearTimeout(getData);
  }, [customerData?.id]);

  function EmailComponent(props) {
    return <div style={{ width: '100%' }}>{props?.value}</div>;
  }

  const handleInvoiceDownload = (fileName, data) => {
    dispatch(
      downloadOrderHistory(
        data?.customerNumber,
        data?.partNumber,
        data?.salesOrderNumber,
        fileName,
        authToken
      )
    );
  };

  function QuantityComponent(props) {
    return (
      <div>
        <span style={{ color: 'black' }}>
          {props.value + ' ' + props?.data?.uom}
        </span>
      </div>
    );
  }

  function LinkComponent(props) {

    return (
      <Box
        sx={{
          '& > :not(style)': { mr: 3 }
        }}
      >
        <div style={{ cursor: 'pointer', color: '#20A2F3' }}>
          {props?.data?.invoiceFilePath && (
            <span
              onClick={() => handleInvoiceDownload('INVOICE', props?.data)}
              style={{ marginRight: '6px' }}
            >
              Invoice
            </span>
          )}
          {props?.data?.mtrFilePath && (
            <span
              onClick={() => handleInvoiceDownload('MTR', props?.data)}
              style={{ marginRight: '6px' }}
            >
              | MTR{' '}
            </span>
          )}
          {props?.data?.packingListFilePath && (
            <span
              onClick={() =>
                handleInvoiceDownload('PACKAGING_LIST', props?.data)
              }
              style={{ marginRight: '6px' }}
            >
              | Packing List{' '}
            </span>
          )}
          {props?.data?.podFilePath && (
            <span
              onClick={() => handleInvoiceDownload('POD', props?.data)}
              style={{ marginRight: '6px' }}
            >
              | POD
            </span>
          )}
        </div>
      </Box>
    );
  }

  function StatusComponent(props) {
    return (
      <div>
        <span style={{ color: 'black' }}>{props.value}</span>
      </div>
    );
  }

  function ActionComponent(props) {
    return (
      <div style={{ margin: '5px 0 0 0', textAlign: 'center' }}>
        <StatusDropdownSelect
          style={{ color: 'black', width: '100% !important' }}
          IconComponent={MoreVertIcon}
        >
          <div id="item1">
            <MenuItem
              onClick={() => navigate(`/manage-users/${props?.data?.id}`)}
            >
              <Box
                style={{
                  color: '#52bcf5'
                }}
              >
                Edit
              </Box>
            </MenuItem>
          </div>
          {props?.data?.status === 'Active' && (
            <>
              <br></br>
              <MenuItem
                id="item2"
                onClick={() => onDeactivate(props?.data?.id)}
              >
                <Box
                  style={{
                    color: 'red'
                  }}
                >
                  {'Deactivate'}
                </Box>
              </MenuItem>
            </>
          )}
          {props?.data?.status === 'Deactivated' && (
            <>
              <br></br>
              <MenuItem id="item3" onClick={() => onActivate(props?.data?.id)}>
                <span style={{ color: 'green' }}>{'Activate'}</span>
              </MenuItem>
            </>
          )}
        </StatusDropdownSelect>
      </div>
    );
  }

  const onDeactivate = (user) => {
    setDeactivated(false);
    dispatch(updateStatus(user, 'D', authToken, 'getAllUsers'));
    setDeactivated(true);
  };

  const onActivate = (user) => {
    setDeactivated(false);
    dispatch(updateStatus(user, 'A', authToken, 'getAllUsers'));
    setDeactivated(true);
  };

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: false
  }));

  // Example using Grid's API

  const onFilterTextBoxChanged = useCallback(() => {
    setSearch(true);
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );

    if (document.getElementById('filter-text-box').value === '') {
      setSearch(false);
    }
  }, []);

  const onSearch = (e) => {
    setSearchValue(e?.target?.value);
  };
  // const handleClick = (event) => {
  //   setActive(true);
  //   setAnchorEl(event.currentTarget);

  //   if (filteredData?.role?.length || filteredData?.status) {
  //     setActive(true);
  //   }
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  //   if (filteredData?.role?.length || filteredData?.status?.length) {
  //     setActive(true);
  //   } else {
  //     setActive(false);
  //   }
  // };
  const onBtnExport = useCallback((params) => {
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  let width = 100;

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  const onGridSizeChanged = (params) => {
    let columnCount = params.columnApi.columnModel.gridColumns.length;
    width = params.clientWidth / columnCount;
    params.api.sizeColumnsToFit();
  };

  // const onClearFilter = () => {
  //   setFilteredData({
  //     role: [],
  //     status: []
  //   });
  // };

  const customSort = (e) => {
    setSort(e[1]);
    setSortType(e[0]);
    // setPage(1);
    // if (paginationData) {
    //   paginationData?.jump(1);
    // }
  };

  const sorthandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const sorthandleClose = () => {
    setAnchorEl(null);
  };

  const sortopen = Boolean(anchorEl);
  const sortid = sortopen ? 'simple-popover' : undefined;

  return (
    <MainContainer>
      <div className="custom-pg-content-sec">
        <Box
          className="custom-pg-titlesticky-sec"
          component="form"
          sx={{
            '& > :not(style)': { ml: 0 },
            display: { md: 'flex', xs: 'box' },
            flexDirection: 'row'
          }}
          noValidate
          autoComplete="off"
        >
          <Box className="custom-heading-container-sec" sx={{}}>
            <Breadcrumb
              className="custom-heading-sec"
              userData={customerData}
              location={[
                {
                  location: 'Home',
                  to: `/customer-portal/${customerData?.id}/products`
                }
              ]}
              page={'Order History'}
            />
            <label
              style={{
                fontSize: '15px',
                fontWeight: '600',
                lineHeight: '1',
                marginTop: '12px'
              }}
            >
              Order History
            </label>
          </Box>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { ml: 1, mt: '5px' },
              display: { md: 'flex', xs: 'box' },
              flexDirection: 'row',
              padding: '0 33px'
            }}
            noValidate
            autoComplete="off"
          >
            <Box sx={{ padding: '0 20px !important;' }}>
              {' '}
              <TextField
                id="filter-text-box"
                label="Search by po number, order number, duedate "
                size="small"
                type="text"
                onChange={(e) => onSearch(e)}
                sx={{
                  backgroundColor: 'white',
                  width: '340px',
                  border: '1px solid #E6E6E6',
                  borderRadius: '0px !important',
                  fontWeight: '400',
                  fontStyle: 'italic',
                  fontSize: '12px !important'
                }}
                alt="Search"
                InputProps={{
                  endAdornment: <SearchIcon />
                }}
              />
            </Box>
            {/* <img src={customerPortalLogo}></img> */}
            {/* {customerData?.logo && (
          <img src={`data:image/jpeg;base64,${logoImage}`}></img>
        )}{' '} */}

            <Box sx={{ pr: 2 }}>
              <CustomButton
                aria-describedby={sortid}
                variant="contained"
                onClick={sorthandleClick}
                title="Sort"
                sx={{ background: active && 'black !important' }}
              >
                <img src={sortIcon}></img>
              </CustomButton>
            </Box>
            <Popover
              id={sortid}
              open={sortopen}
              anchorEl={anchorEl}
              onClose={sorthandleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
            >
              <Box className={'sortText'} sx={{ mr: 2, pl: 2, pt: 4, pb: 2 }}>
                <div
                  onClick={(e) => customSort(['quantity', 'ASC'])}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  Quantity: Asc - Dec
                </div>
                <div
                  onClick={(e) => customSort(['quantity', 'DESC'])}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  {' '}
                  Created By: Dec - Asc
                </div>
                <div
                  onClick={(e) => customSort(['dueDate', 'ASC'])}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  Due Date: Asc - Dec
                </div>
                <div
                  onClick={(e) => customSort(['dueDate', 'DESC'])}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  Due Date: Dec - Asc
                </div>
              </Box>
            </Popover>
            <Box>
              <CustomButton>
                {!excelToggle ? (
                  <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['white', 'white', 'white', 'white', 'white']}
                  />
                ) : (
                  <CSVLink
                    data={csvData}
                    filename={'Order History.csv'}
                    title="Export as CSV"
                  >
                    <img src={exportIcon}></img>
                  </CSVLink>
                )}
              </CustomButton>
            </Box>
          </Box>{' '}
        </Box>
        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="custom-pg-tables-content-sec">
          <TableContainer style={gridStyle}>
            {isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                //  minHeight="100vh"
              >
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[]}
                />

                <span>Loading...</span>
              </Box>
            ) : (
              <>
                <Box
                  className="ag-theme-alpine"
                  style={{
                    maxWidth: '100%',
                    width: '100%'
                  }}
                >
                  <AgGridReact
                    ref={gridRef} // Ref for accessing Grid's API
                    onFirstDataRendered={onFirstDataRendered}
                    domLayout={'autoHeight'}
                    onGridSizeChanged={onGridSizeChanged}
                    defaultColDef={defaultColDef} // Default Column Properties
                    rowData={!search ? tableData : bluePrint}
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection="multiple" // Options - allows click selection of rows
                    frameworkComponents={{
                      LinkComponent,
                      StatusComponent,
                      ActionComponent,
                      QuantityComponent,
                      EmailComponent
                    }}
                  >
                    <AgGridColumn
                      width="170"
                      field="partDescription"
                      headerName="Product"
                    ></AgGridColumn>
                    <AgGridColumn
                      width="200"
                      cellRenderer="EmailComponent"
                      field="salesOrderNumber"
                      headerName="Order Number"
                    ></AgGridColumn>
                    <AgGridColumn
                      width="150"
                      cellRenderer="RoleComponent"
                      field="customerOrderNumber"
                      headerName="P.O Number"
                    ></AgGridColumn>
                    <AgGridColumn
                      width="100px"
                      field="quantity"
                      headerName="Quantity"
                      cellRenderer="QuantityComponent"
                    ></AgGridColumn>
                    <AgGridColumn
                      width="100px"
                      field="dueDate"
                      headerName="Due Date"
                    ></AgGridColumn>
                    <AgGridColumn
                      width={width}
                      cellRenderer="StatusComponent"
                      field="status"
                    ></AgGridColumn>
                    <AgGridColumn
                      width="200px"
                      cellRenderer="LinkComponent"
                      field="documents"
                      headerName="Documents"
                    ></AgGridColumn>
                    {/* <AgGridColumn
              field=""
              cellRenderer="ActionComponent"
              width={'50'}
            ></AgGridColumn> */}
                  </AgGridReact>
                </Box>
              </>
            )}
            <Box
              sx={{
                '& > :not(style)': { mr: 2, mt: 2 },
                display: { md: 'flex', xs: 'box' },
                flexDirection: 'row-reverse'
              }}
            >
              <AppPagination
                setPage={setHistoryPage}
                {...customerOrderHistory}
              />
              <div>
                Items per page:{' '}
                <select value={itemsPerPage} onChange={handleCountChange}>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </Box>
          </TableContainer>
        </div>
      </div>
    </MainContainer>
  );
};

export default OrderHistory;
