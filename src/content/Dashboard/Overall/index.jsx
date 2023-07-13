import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from '@mui/lab/DatePicker';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import { DateRangePicker, Calendar } from 'react-date-range';
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { addDays, subDays } from 'date-fns';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import DeleteIcon from 'src/assets/Icons/Delete.png';
import CustomModal from '@mui/material/Modal';
import Select from 'react-select';

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
import BasicCard from '../portalCard/card';
import { Box, Button, styled, TextField, MenuItem, Grid } from '@mui/material';

import filterIcon from 'src/assets/Icons/Filter.png';
import exportIcon from 'src/assets/Icons/export.png';
import refreshIcon from 'src/assets/Icons/refresh.svg';

import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAllUsers, updateStatus } from 'src/redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredData, handleFilter } from 'src/services/Filter';
import { CSVLink, CSVDownload } from 'react-csv';
import { Helmet } from 'react-helmet-async';
import { AgGroupComponent } from 'ag-grid-community';
import {
  downloadLogo,
  getAllCustomers,
  getAllCustomersforPortal
} from 'src/redux/actions/sysAdminActions';
import {
  getAllCartOrderByUserId,
  getAllCustomerShippingLocations
} from 'src/redux/actions/customerCartActions';
import { ActionTypes } from 'src/redux/constants/action-types';
import { toast } from 'react-toastify';
import {
  dashboardData,
  dashboardTableData
} from 'src/redux/actions/DashboardActions';









const ModalButton = styled(Button)(
  () => `
    background-color: #15364a !important;
      color: white !important;
      height: 40px !important;
      border-radius: 3px !important;
      padding: 0 13px !important;
      font-weight: 600;
      font-size: 16px;
      min-width:100px;
      
  
      :hover {
          background-color: black !important;
        }
      `
);

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



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '40%', sm: '100%' },
  maxHeight: { md: '500px', sm: '100%' },
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.12)',
  p: 3,
  bordeRadius: '5px'
};

const placeOrderStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '60%', sm: '100%' },
  maxHeight: { md: '500px', sm: '100%' },
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.12)',
  p: 3,
  bordeRadius: '5px'
};




const TableContainer = styled(Box)(
  () => `
        padding: 15px 24px;
        background-color: white;
        box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.08);
        border-radius: 3px;
      
        
        `
);

const OverallDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [inventoryanchorEl, setinventoryAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [header, setheader] = React.useState(false);
  const [searchInventory, setsearchInventory] = React.useState('');
  const [searchOpenOrders, setSearchOpenOrders] = React.useState('');
  const [customerLabel, setcustomerLabel] = React.useState('');
  const [openPlaceOrderModal, setopenPlaceOrderModal] = React.useState(false);
  const [deactivated, setDeactivated] = React.useState(false);
  const [reduceHeader, setReduceHeader] = useState([]);
  const [values, setValues] = useState();
  const [singledate, setsingledate] = useState(null);
  const [viewAll, setviewAll] = useState(true);
  const [updatedLeadTime, setUpdatedLeadTime] = useState(false);
  const [quantity, setquantity] = useState('');
  const [data, setdata] = useState([]);
  const [excelToggle, setExcelToggle] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);

  const [viewdashboardTableData, setviewdashboardTableData] = useState();
  const [excelViewDashboardTableData, setexcelViewDashboardTableData] =
    useState();

  const [date, setDate] = useState(new Date());

  

  const getViewProducts = useSelector(
    (state) => state?.customerPortal?.getCustomerViewProducts
  );

  const getOpenOrders = useSelector(
    (state) => state?.customerPortal?.getCustomerOpenOrders
  );

  const getcustomerData = useSelector(
    (state) => state?.customerPortal?.customersPortalData
  );

  const getDashboardTableData = useSelector(
    (state) => state?.dashboard?.dashboardTableData
  );

 

  const dashboardPayload = useSelector(
    (state) => state?.dashboard?.portalchartData
  );

  

  const logoImage = useSelector((state) => state?.customers?.getLogo);
  const shippingLocations = useSelector(
    (state) => state?.customerPortal?.getCustomerShippingDetails
  );
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const customerData = useSelector((state) => state?.customers?.customerData);

  const [currentPage, setCurrentPage] = useState(1);
  const [customervalue, setCustomerValue] = useState();
  const isLoading = useSelector((state) => state?.loaderStatus?.showLoading);

  const [tableData, setTableData] = useState();
  const [tab, setTab] = useState('product list');
  const [paginationData, setPaginationData] = useState();
  const [selectedData, setSelectedData] = React.useState([]);

  const [filteredData, setFilteredData] = React.useState({
    status: [],
    jobType: [],
    date: {}
  });

  const [dateRange, setdateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);



  let [page, setPage] = useState(1);
  let [active, setActive] = useState(false);

  const PER_PAGE = 100;

  
 
  const gridStyle = useMemo(
    () => ({
      height: '100%',
      width: '96.5%',
      margin: '0px 35px 12px',
      padding: '36px 44px'
    }),
    []
  );

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  const onGridSizeChanged = (params) => {
    let columnCount = params.columnApi.columnModel.gridColumns.length;
    // width = params.clientWidth / columnCount;
    params.api.sizeColumnsToFit();
  };

  //BLUEPRINT of the incoming data for AG GRID

  const handleDateChange = (ranges) => {
    const { selection } = ranges;
    setdateRange([selection]);
    handleFilter(ranges, 'date', filteredData, setFilteredData);
  };

 

  const onClearFilter = () => {
    setFilteredData({
      status: [],
      jobType: [],
      date: {}
    });
    setdateRange([
      {
        startDate: null,
        endDate: null,
        key: 'selection'
      }
    ]);
  };

  function LinkComponent(props) {
    return (
      <div
        onClick={() =>
          navigate(
            `/customer-portal/${userID ?? customerData?.id}/product/${
              props?.data?.partNumber
            }?cp=true`,
            {
              state: {
                partNumber: props?.data?.partNumber
              }
            }
          )
        }
      >
        <span
          style={{
            fontWeight: '600',
            fontSize: '12px',
            lineHeight: '18px',
            /* identical to box height, or 150% */

            color: '#20A2F3'
          }}
        >
          {props?.value}
        </span>
      </div>
    );
  }
  const handleInputValue = (e) => {
  
    setCustomerValue(e?.value);
    setcustomerLabel(e?.label);
    setheader(false);
    setviewAll(true);
  };

 
  function inventoryComponent(props) {
   
    return (
      <div>
        <span>{props?.value + ' ' + props?.data?.uom}</span>
      </div>
    );
  }
  const BluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          customerName: d?.customerName,
          customerNumber: d?.customerNumber,
          dueDate: d?.dueDate
            ? moment.utc(d?.dueDate).format('MM/DD/YYYY')
            : '',
          orderCreatedAt: moment.utc(d?.orderCreatedAt).format('MM/DD/YYYY'),
          orderCreatedBy: d?.orderCreatedBy,
          orderPlacedBy: d?.orderPlacedBy,
          orderStatus: d?.orderStatus,
          placedOrdersCount: d?.placedOrdersCount
        };
      })
    );
  };

  const excelBluePrint = (data) => {

    return (
      data &&
      data?.map((d) => {
        return {
          customerNumber: d?.customerNumber,
          customerName: d?.customerName,
          orderPlacedBy: d?.orderPlacedBy,
          dueDate: d?.dueDate
            ? moment.utc(d?.dueDate).format('MM/DD/YYYY')
            : '',
          orderStatus: d?.orderStatus,
          orderCreatedAt: d?.orderCreatedAt
            ? moment.utc(d?.orderCreatedAt).format('MM/DD/YYYY')
            : ''
          // placedOrdersCount: d?.placedOrdersCount
        };
      })
    );
  };

  useEffect(() => {
    if (getDashboardTableData) {
      const tableBluePrint = BluePrint(getDashboardTableData);
      const exceltableBluePrint = excelBluePrint(getDashboardTableData);
      const filterData = getFilteredData(
        tableBluePrint,
        filteredData,
        'systemAdmin'
      );
      const excelfilterData = getFilteredData(
        exceltableBluePrint,
        filteredData,
        'systemAdmin'
      );

      const data = usePagination(
        filterData,
        PER_PAGE,
        currentPage,
        setCurrentPage
      );
      setPaginationData(data);

      setexcelViewDashboardTableData(excelfilterData);
      setviewdashboardTableData(
        toggle ? data?.currentData().splice(0, 10) : data?.currentData()
      );
    
    }
  }, [getDashboardTableData, page, filteredData, toggle, dashboardPayload]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: false
  }));

  
  // Example using Grid's API

 

  

  const handleClose = () => {
    setAnchorEl(null);
    setinventoryAnchorEl(null);
    setquantity(null);
    if (filteredData?.role?.length || filteredData?.status?.length) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

 

 

  useEffect(() => {
    dispatch(
      dashboardData(
        customervalue,
        authToken,
        date,
        setviewdashboardTableData,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        setExcelToggle
      )
    );

    setToggle(true);

    dispatch(
      dashboardTableData(
        customervalue,
        date,
        authToken,
        setviewAll,
        setExcelToggle,
        'firstRender'
      )
    );

    dispatch(getAllCustomersforPortal(authToken));
  }, [customerData, customervalue, date]);

  const handleViewAll = () => {
    setToggle(false);
    dispatch(
      dashboardTableData(
        customervalue,
        date,
        authToken,
        setviewAll,
        setExcelToggle,
        '!firstRender'
      )
    );
    setheader(true);
  };
  const handleRefresh = () => {
    setDate(new Date());

    setCustomerValue('');
    dispatch(
      dashboardData(
        undefined,
        authToken,
        new Date(),
        setviewdashboardTableData,
        setCustomerValue,
        setDate,
        setviewAll,
        setheader,
        setcustomerLabel,
        setExcelToggle
      )
    );

    setToggle(true);

    dispatch(
      dashboardTableData(
        undefined,
        new Date(),
        authToken,
        setviewAll,
        setExcelToggle,
        'firstRender'
      )
    );
    setheader(false);
    setcustomerLabel('');
  };

  const customerDataDropDown = getcustomerData?.map((d) => ({
    label: d?.customerName,
    value: d?.customerNumber
  }));

  const mkOpen = Boolean(inventoryanchorEl);
  const id1 = mkOpen ? 'simple-popover' : undefined;

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleLeadTimeChange = (e) => {
    let obj = values;

    obj = {
      ...obj,

      [e?.target.name]: e?.target.value
    };

    setValues(e?.target.value);
  };

  const handleClick = (event) => {
    setviewAll(true);
    setActive(true);
    setAnchorEl(event.currentTarget);

    if (filteredData?.role?.length || filteredData?.status) {
      setActive(true);
    }
  };

  const onDateChange = (e) => {
    setDate(e);
    setheader(false);
  };



  


  const today = new Date();
  const currentYear = today.getFullYear();

  const minYearDate = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate())
  const maxYearDate = today;
 
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 2);

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 0);

  return (
    <div>
      <Box
        sx={{
          '& > :not(style)': { ml: 1 },
          display: { md: 'flex', xs: 'box' },
          flexDirection: 'row',
          padding: '0 30px 45px;'
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <span style={{ fontSize: '20px', fontWeight: 700 }}>
            Marmon's Analytic Dashboard
          </span>
        </Box>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <Typography sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <DatePicker
                views={['year', 'month']}
                label="Year and Month"
                minDate={minDate}
                maxDate={maxDate}
                value={date}
                // onChange={setDate}
                onChange={onDateChange}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormControlLabel
                label="Current Month"
                control={
                  <Checkbox
                    name="Current Month"
                    checked={
                      moment(date).month() === moment(new Date()).month()
                    }
                    onChange={(e) => setDate(new Date())}
                  />
                }
              />
            </Box>
          </Typography>
          {/* <Typography sx={{ p: 2 }}>
                {filteredData?.status?.length ||
                filteredData?.jobType?.length ||
                filteredData?.date?.from ? (
                  <ClearButton
                    sx={{ cursor: 'pointer' }}
                    onClick={onClearFilter}
                  >
                    Clear All
                  </ClearButton>
                ) : (
                  ''
                )}

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Custom Date</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <DateRangePicker
                        onChange={handleDateChange}
                        showSelectionPreview={false}
                        moveRangeOnFirstSelection={true}
                        months={1}
                        showDateDisplay={false}
                        ranges={dateRange}
                        direction="vertical"
                        minDate={minYearDate}
                        maxDate={maxYearDate}
                      />
                    </Box>
                    <br></br>
                  </AccordionDetails>
                </Accordion>
              </Typography> */}
        </Popover>
        <Select
          options={customerDataDropDown}
          isClearable={true}
          placeholder="Search by customer name or select from the dropdown"
          name="byyyyy"
          className="basic-multi-select1 input_box customer_dropDown"
          classNamePrefix="select"
          value={
            customervalue ? customerDataDropDown[customervalue]?.label : ''
          }
          onChange={(e) => handleInputValue(e)}
        />

        <Box sx={{ paddingLeft: '15px' }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center' }}
            onClick={handleClick}
            className={'dashboardDate'}
          >
            <span>{moment.utc(date).format('MM/YYYY')}</span>
          </Box>
        </Box>

        {/*REFRESH BUTTON*/}
        {getDashboardTableData?.length > 0 && (
          <Box sx={{ paddingLeft: '15px' }}>
            <CustomButton disabled={!excelToggle}>
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
                  data={excelViewDashboardTableData ?? []}
                  filename={'Dashboard:All Orders'}
                  title="Export as CSV"
                >
                  <img src={exportIcon}></img>
                </CSVLink>
              )}
            </CustomButton>
          </Box>
        )}

        <Box sx={{ paddingLeft: '15px' }}>
          <CustomButton onClick={handleRefresh} title="Reset">
            <img src={refreshIcon}></img>
          </CustomButton>
        </Box>
      </Box>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}{' '}
      {/* MODAL AND POPOVERS */}
      <Grid container spacing={2} sx={{ padding: '0 40px' }}>
        <Grid item md={3} lg={3} xs={12}>
          <BasicCard
            dataLabels={dashboardPayload?.customerNames}
            dataData={dashboardPayload?.totalOrdersCount}
            chartName={'Total Orders'}
          />
        </Grid>
        <Grid item md={3} lg={3} xs={12}>
          <BasicCard
            dataLabels={dashboardPayload?.orderStatus}
            dataData={dashboardPayload?.ordersCountByStatus}
            chartName={'Orders Status'}
          />
        </Grid>
        <Grid item md={3} lg={3} xs={12}>
          <BasicCard
            dataLabels={dashboardPayload?.orderSources}
            dataData={dashboardPayload?.ordersCountBySource}
            chartName={'Order Source'}
          />
        </Grid>
        <Grid item md={3} lg={3} xs={12}>
          <BasicCard
            dataLabels={dashboardPayload?.features}
            dataData={dashboardPayload?.featureUsageTime?.map(
              (d) => +(d / 3600).toFixed(2)
            )}
            chartName={'Features Usage Trending'}
          />
        </Grid>
      </Grid>
      <br></br>
      <TableContainer style={gridStyle}>
        <>
          <Grid container spacing={2}>
            <Grid item md={10} lg={10} xs={12}>
              <span
                style={{
                  font: 'DIN Alternate',
                  fontWeight: '700',
                  color: '#343D42',
                  fontSize: '16px',
                  fontFamily: 'Open Sans'
                }}
              >
              
                {header
                  ? `All Orders ${
                      date
                        ? ` as of   ${moment(date).format(' MMMM  YYYY')}`
                        : ''
                    }`
                  : `Last 10 Orders ${
                      date
                        ? `  as of   ${moment(date).format(' MMMM  YYYY')}`
                        : ''
                    } `}
              </span>
            </Grid>
            {viewAll && (
              <Grid sx={{ textAlign: 'right' }} item md={2} lg={2} xs={12}>
                <ModalButton onClick={handleViewAll}>View All</ModalButton>
              </Grid>
            )}
          </Grid>
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
                // defaultColDef={defaultColDef} // Default Column Properties
                rowData={viewdashboardTableData}
                // suppressRowClickSelection={true}
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                // rowSelection="multiple" // Options - allows click selection of rows
                frameworkComponents={{ inventoryComponent, LinkComponent }}
              >
                <AgGridColumn
                  field="customerNumber"
                  resizable={true}
                ></AgGridColumn>
                <AgGridColumn
                  cellRenderer="LinkComponent"
                  resizable={true}
                  field="customerName"
                ></AgGridColumn>

                <AgGridColumn
                  resizable={true}
                  field="orderPlacedBy"
                ></AgGridColumn>
                <AgGridColumn
                  resizable={true}
                  field="dueDate"
                  headerName="Due Date"
                ></AgGridColumn>
                <AgGridColumn
                  resizable={true}
                  field="orderCreatedAt"
                  headerName="Created Date"
                ></AgGridColumn>
                <AgGridColumn
                  resizable={true}
                  field="orderStatus"
                ></AgGridColumn>
              </AgGridReact>
            </Box>
          )}
        </>
      </TableContainer>
    </div>
  );
};
export default OverallDashboard;
