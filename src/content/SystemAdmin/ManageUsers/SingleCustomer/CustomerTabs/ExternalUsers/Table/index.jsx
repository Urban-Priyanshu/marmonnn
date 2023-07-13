import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar } from 'react-date-range';
import sortIcon from '../../../../../../../assets/Icons/sort.svg';

import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import filterIcon from '../../../../../../../assets/Icons/Filter.png';
import exportIcon from '../../../../../../../assets/Icons/export.png';
import Pencil from '../../../../../../../assets/Icons/Shape.svg';

import report_icon from '../../../../../../../assets/Icons/report_icon.svg';
import { Pagination } from '@material-ui/lab';

import BasicCard from 'src/content/Dashboard/portalCard/card';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DateRangePicker } from 'react-date-range';
import { addDays, subDays } from 'date-fns';
import { ColorRing } from 'react-loader-spinner';
import { Grid } from '@mui/material';

import { getFilteredData, handleFilter } from 'src/services/Filter';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
  Box,
  Button,
  styled,
  TextField,
  Select,
  MenuItem
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import IosShareIcon from '@mui/icons-material/IosShare';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DatePicker from '@mui/lab/DatePicker';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './DataGrid.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCustomers,
  getAllFeatures,
  getAllJobTitle,
  getAllJobTypes,
  getCustomerNumbers,
  updateStatusByEmail
} from 'src/redux/actions/sysAdminActions';
import { getExternalUser } from 'src/redux/actions/sysAdminActions';
import Switch, { SwitchProps } from '@mui/material/Switch';

import moment from 'moment';
import Modal from 'src/components/Modal';
import CustomModal from '@mui/material/Modal';

import { updateStatus } from 'src/redux/actions/userActions';
import {
  dashboardReportData,
  externalUserDashboard
} from 'src/redux/actions/DashboardActions';
import usePagination from 'src/services/pagination/pagiantion';
// import { Grid } from 'ag-grid-community';
const CustomButton = styled(Button)(
  () => `
    background-color: #022f53 !important;
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




const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '88%', sm: '100%' },
  bgcolor: 'background.paper',
  boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.12)',
  pr: 4,
  pl: 4,
  pb: 4,
  bordeRadius: '5px',
  maxHeight: '70%',
  overflowY: 'scroll'
};

const TableContainer = styled(Box)(
  () => `
  padding: 15px 24px;
  background-color: white;
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.08);
  border-radius: 3px;

  
  `
);

const ExternalUserTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popoveranchorEl, setpopoveranchorEl] = React.useState(null);
  const [openTableModal, setOpenTableModal] = React.useState(false);

  const [deactivated, setDeactivated] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [sortanchorEl, setsortAnchorEl] = useState(null);
  const [tableData, setTableData] = useState();
  const [status, setStatus] = React.useState();
  const [reporttableData, setReportTableData] = useState();
  const [sort, setSort] = useState(false);
  const [sortType, setSortType] = useState('');
  const [date, setDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  let [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState();
  

  const externalUsersData = useSelector(
    (state) => state?.customers?.externalUsers
  );
  const getDashboardReportData = useSelector(
    (state) => state?.dashboard?.getReportData
  );
  const customerData = useSelector((state) => state?.customers?.customerData);
  const externalDashboard = useSelector(
    (state) => state?.dashboard?.externalUserOrderStatus
  );
  const authUser = useSelector((state) => state?.auth?.authUserData);
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const isLoading = useSelector((state) => state?.loaderStatus?.showLoading);

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
 

  const gridStyle = useMemo(
    () => ({ height: '100%', width: '100%', margin: '0px 0 12px 0' }),
    []
  );

  const handleChange = (e, p) => {
    setPage(p);
    if (paginationData) {
      paginationData?.jump(p);
    }
  };

  const [filteredData, setFilteredData] = React.useState({
    status: [],
    jobType: [],
    date: {}
  });

  //  load data from sever
  useEffect(() => {
    dispatch(getExternalUser(customerData?.customerNumber, authToken));
    dispatch(getAllJobTypes(authToken));
    dispatch(getAllFeatures(authToken));
    dispatch(getCustomerNumbers(customerData?.customerNumber, authToken));
  }, []);
  useEffect(() => {
    dispatch(
      externalUserDashboard(customerData?.customerNumber, date, authToken)
    );
  }, [externalUsersData, date]);

  let width = 100;

 

  const onGridSizeChanged = (params) => {
    let columnCount = params?.columnApi?.columnModel?.gridColumns?.length;
    width = params?.clientWidth / columnCount;
    params?.api?.sizeColumnsToFit();
  };



  //BLUEPRINT of the incoming data for AG GRID

  const reportbluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          loggedDate: moment(d?.loggedDate).format('MM-DD-YYYY'),
          totalUsageSeconds: d?.totalUsageSeconds
            ? (d?.totalUsageSeconds / 3600).toFixed(2) + ' h'
            : 0,
          baseFeature: d?.featureUsageTime['Base Feature']
            ? Math.floor(d?.featureUsageTime['Base Feature'] / 60) + ' m'
            : 0,
          forecastFeature: d?.featureUsageTime['Forecast']
            ? Math.floor(d?.featureUsageTime['Forecast'] / 60) + ' m'
            : 0,
          bulkOrderFeature: d?.featureUsageTime['Bulk Order']
            ? Math.floor(d?.featureUsageTime['Bulk Order'] / 60) + ' m'
            : 0,
          blanketPoFeature: d?.featureUsageTime['Blanket Po']
            ? Math.floor(d?.featureUsageTime['Blanket Po'] / 60) + ' m'
            : 0,
          barCodeScannerFeature: d?.featureUsageTime['Barcode Scanner']
            ? Math.floor(d?.featureUsageTime['Barcode Scanner'] / 60) + ' m'
            : 0
        };
      })
    );
  };

  useEffect(() => {
    if (getDashboardReportData) {
      const tableBluePrint = reportbluePrint(getDashboardReportData);

      const data = usePagination(
        tableBluePrint,
        10,
        currentPage,
        setCurrentPage
      );
      setPaginationData(data);
      setReportTableData(data?.currentData());
    }
  }, [getDashboardReportData, filteredData]);

 

  //BLUEPRINT of the incoming data for AG GRID

  const bluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          id: d?.id,
          firstName: d?.firstName,
          lastName: d?.lastName,
          email: d?.email,
          jobTitle: d?.jobTitle ?? 'N/A',
          type: d?.jobType?.description || 'N/A',
          jobType: d?.jobType?.code || 'N/A',
          features: d?.features?.map((res) => {
            return {
              label: res?.featureDescription,
              code: res?.featureCode
            };
          }),
          associatedCustomers: d?.associatedCustomers?.map((res) => {
            return res;
          }),
          lastLogin: d?.lastLogin
            ? moment.utc(d?.lastLogin).format('MM/DD/YYYY HH:mm')
            : 'N/A',
          customerNumber: d?.customerNumber,

          status: d?.status?.description
        };
      })
    );
  };
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 2);

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 0);

  useEffect(() => {
    if (externalUsersData) {
      const tableBluePrint = bluePrint(externalUsersData);
      const filterData = getFilteredData(
        sortType === 'firstName:asc'
          ? tableBluePrint.sort((a, b) => (a.firstName > b.firstName ? 1 : -1))
          : sortType === 'firstName:dec'
          ? tableBluePrint.sort((a, b) => (a.firstName < b.firstName ? 1 : -1))
          : sortType === 'lastName:asc'
          ? tableBluePrint.sort((a, b) => (a.lastName > b.lastName ? 1 : -1))
          : sortType === 'lastName:dec'
          ? tableBluePrint.sort((a, b) => (a.lastName < b.lastName ? 1 : -1))
          : tableBluePrint,
        filteredData,
        'externalUser'
      );
      setTableData(filterData);
    }
  }, [externalUsersData, filteredData, sort, sortType]);

 

  const sorthandleClick = (event) => {
    setsortAnchorEl(event.currentTarget);
  };

  const sorthandleClose = () => {
    setsortAnchorEl(null);
  };

  const customSort = (e) => {
    setSort(true);
    setSortType(e);
  };

 

  function LinkComponent(props) {
    return (
      <Link to="/portal">
        <span>{props?.value}</span>
      </Link>
    );
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    if (filteredData?.role?.length || filteredData?.status) {
      setActive(true);
    }
  };
  function StatusComponent(props) {
    return (
      <div>
        <span
          style={{
            borderRadius: '30px',
            textAlign: 'center',
            padding: '4px 20px',
            height: '22px',
            color: 'white',
            background:
              (props.value === 'Active' && '#46bd60') ||
              (props.value === 'Deactivated' && '#FF4A4A') ||
              (props.value === 'Request Sent' && '#555555'),

            marginTop: '-5px'
          }}
        >
          {props?.value && props?.value === 'Deactivated'
            ? 'Inactive'
            : props?.value}
        </span>
      </div>
    );
  }

  function AssociateCusNoComponent(props) {
    return (
      <div>
        {props.value}
        &nbsp; &nbsp;
      </div>
    );
  }

  function ActionComponent(props) {
    return (
      <div style={{ margin: '5px 0 0 0', textAlign: 'left' }}>
        <div id="item1">
          <div>
            <Modal
              type={'editExternalUser'}
              extUserData={props?.data}
              edit={true}
            />
          </div>
        </div>
      
      </div>
    );
  }

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: false
  }));

  // Example using Grid's API

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document?.getElementById('filter-text-box')?.value
    );
  }, []);

  const handleClickPicker = (event) => {
    setpopoveranchorEl(event?.currentTarget);

    setActive(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setpopoveranchorEl(null);
  };

  const onBtnExport = useCallback((params) => {
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  
  const onStatusChange = (e, props) => {
  

    if (e.target.checked) {
      dispatch(
        updateStatusByEmail(
          props?.data?.customerNumber,
          props?.data?.email,
          'A',
          authToken,
          'getAllExternalUsers'
        )
      );
    } else {
      dispatch(
        updateStatusByEmail(
          props?.data?.customerNumber,
          props?.data?.email,
          'D',
          authToken,
          'getAllExternalUsers'
        )
      );
    }
  };

 

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  };

  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 0),
      endDate: addDays(new Date(), 0),
      key: 'selection'
    }
  ]);
  const handleTableModalClose = () => {
    setOpenTableModal(false);
  };
  const handleReportData = (email) => {
    setOpenTableModal(true);
    dispatch(dashboardReportData(email, date, authToken));
  };

  function ReportComponent(props) {
   
    return (
      <div>
        <img
          style={{ cursor: 'pointer' }}
          onClick={() => handleReportData(props?.data?.email)}
          src={report_icon}
        ></img>
      </div>
    );
  }
  function switchComponent(props) {
  
    return (
      <div>
        {props?.data?.status === 'Active' ||
        props?.data?.status === 'Deactivated' ? (
          <IOSSwitch
            defaultChecked={props?.data?.status === 'Active'}
            checked={status}
            onChange={(e) => onStatusChange(e, props)}
            name="statusCode"
            sx={{ mr: 1 }}
          />
        ) : (
          ''
        )}
      </div>
    );
  }


  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    setState([selection]);

    handleFilter(ranges, 'date', filteredData, setFilteredData);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const sortopen = Boolean(sortanchorEl);
  const sortid = sortopen ? 'simple-popover' : undefined;
  const popoveropen = Boolean(popoveranchorEl);
  const popoverid = open ? 'simple-popover' : undefined;

  const getExternalUserTable = useCallback(() => {
    return (
      <AgGridReact
        ref={gridRef} // Ref for accessing Grid's API
        domLayout={'autoHeight'}
        rowData={tableData}
        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        rowSelection="multiple" // Options - allows click selection of rows
        frameworkComponents={{
          LinkComponent,
          StatusComponent,
          ActionComponent,
          ReportComponent,
          switchComponent,
          AssociateCusNoComponent
        }}
      >
        <AgGridColumn
          width={'200px'}
          field="email"
          cellRenderer="LinkComponent"
        ></AgGridColumn>
        <AgGridColumn field="firstName"></AgGridColumn>
        <AgGridColumn field="lastName"></AgGridColumn>
        <AgGridColumn field="jobTitle"></AgGridColumn>
        <AgGridColumn field="type"></AgGridColumn>
        <AgGridColumn field="lastLogin"></AgGridColumn>
        <AgGridColumn field="associatedCustomers"></AgGridColumn>
        <AgGridColumn
          field="status"
          width={'190px'}
          cellRenderer="StatusComponent"
        ></AgGridColumn>
        <AgGridColumn
          field=""
          width={'120px'}
          headerName="View Report"
          cellRenderer="ReportComponent"
        ></AgGridColumn>
        <AgGridColumn
          field=""
          width={'50px'}
          cellRenderer="ActionComponent"
        ></AgGridColumn>
        <AgGridColumn
          field=""
          width={'80px'}
          cellRenderer="switchComponent"
        ></AgGridColumn>
      </AgGridReact>
    );
  }, [sort, filteredData, tableData]);

  return (
    <Box>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}

      <TableContainer style={gridStyle}>
        <div style={{ padding: 20 }}>
          <Grid
            className="ext_user_chart"
            container
            spacing={2}
            style={{ marginBottom: '30px' }}
            alignItems="center"
            justifyContent="space-around"
          >
            <Grid item md={3} lg={3} xs={12}>
              <BasicCard
                dataLabels={externalDashboard?.statusNames?.map((d) => d)}
                dataData={externalDashboard?.statusCount?.map((d) => d)}
                chartName={'Total Users'}
              />
            </Grid>
            <Grid item md={3} lg={3} xs={12}>
              <BasicCard
                dataLabels={externalDashboard?.features?.map((d) => d)}
                dataData={externalDashboard?.featureUsageTime?.map(
                  (d) => +(d / 3600).toFixed(2)
                )}
                chartName={'Features Usage Trending'}
              />
            </Grid>
          </Grid>
        </div>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
            display: { md: 'flex', xs: 'box' },
            flexDirection: 'row'
          }}
          noValidate
          autoComplete="off"
        >
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ fontSize: '12px' }}>
              <Box>
                {filteredData.status.length > 0 &&
                  'Applied Filters (Status): ' +
                    filteredData.status.map((d) => d)}
              </Box>
            </Box>
          </Box>
          <TextField
            id="filter-text-box"
            label="Search by name, email id"
            size="small"
            type="text"
            onInput={() => onFilterTextBoxChanged()}
            sx={{
              backgroundColor: 'white',
              width: '300px',
              border: '1px solid #E6E6E6',
              borderRadius: '0px !important',
              fontStyle: 'italic',
              fontWeight: '400',
              fontSize: '12px !important'
            }}
            alt="Search"
            InputProps={{
              endAdornment: <SearchIcon />
            }}
          />
          <Box sx={{ paddingLeft: '15px' }}>
            <Popover
              id={popoverid}
              open={popoveropen}
              anchorEl={popoveranchorEl}
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
                    onChange={setDate}
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
            </Popover>
            <Box
              sx={{ display: 'flex', alignItems: 'center' }}
              onClick={handleClickPicker}
              className={'dashboardDate'}
            >
              <span>{moment.utc(date).format('MM/YYYY')}</span>
            </Box>
          </Box>
          <Modal type={'addExternalUser'} />
          <CustomButton
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            title="Filters"
            style={{ backgroundColor: active ? 'green !important' : '' }}
          >
            <img src={filterIcon}></img>
          </CustomButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          ></Popover>
          <Box sx={{}}>
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
            anchorEl={sortanchorEl}
            onClose={sorthandleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <Box className={'sortText'} sx={{ mr: 2, pl: 2, pt: 4, pb: 2 }}>
              <div
                onClick={(e) => customSort('firstName:asc')}
                style={{ cursor: 'pointer', fontSize: '12px' }}
              >
                First Name: A - Z
              </div>
              <div
                onClick={(e) => customSort('firstName:dec')}
                style={{ cursor: 'pointer', fontSize: '12px' }}
              >
                First Name: Z - A
              </div>
              <div
                onClick={(e) => customSort('lastName:asc')}
                style={{ cursor: 'pointer', fontSize: '12px' }}
              >
                Last Name: A - Z
              </div>
              <div
                onClick={(e) => customSort('lastName:dec')}
                style={{ cursor: 'pointer', fontSize: '12px' }}
              >
                Last Name: Z - A
              </div>
            </Box>
          </Popover>{' '}
          <CustomButton
            onClick={() => onBtnExport({ fileName: 'External User List' })}
            title="Export as CSV"
          >
            <img src={exportIcon}></img>
          </CustomButton>
        </Box>{' '}
        <>
          <Box
            className="ag-theme-alpine"
            style={{
              maxWidth: '100%',
              width: '100%'
            }}
          >
            {getExternalUserTable()}
          </Box>
          <Box
            sx={{
              '& > :not(style)': { mr: 2 },
              display: { md: 'flex', xs: 'box' },
              flexDirection: 'row-reverse'
            }}
          ></Box>
        </>
      </TableContainer>
      <CustomModal open={openTableModal} onClose={handleTableModalClose}>
        <Box sx={modalStyle}>
          <div
            style={{
              fontWeight: 700,
              fontSize: '16px',
              margin: '25px 0',
              color: '#15364A'
            }}
          >
            Report
          </div>

          <Box
            className="ag-theme-alpine"
            style={{
              maxWidth: '100%',
              width: '100%'
            }}
          >
            <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API
             
              domLayout={'autoHeight'}
              onGridSizeChanged={onGridSizeChanged}
              // defaultColDef={defaultColDef} // Default Column Properties
              rowData={reporttableData}
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              frameworkComponents={{
                LinkComponent,
                StatusComponent,
                ActionComponent,
                ReportComponent,
                AssociateCusNoComponent
              }}
            >
              <AgGridColumn headerName="Access Log Report">
                <AgGridColumn headerName="" field="loggedDate"></AgGridColumn>
              </AgGridColumn>
              <AgGridColumn headerName="No of Features">
                <AgGridColumn
                  field="bulkOrderFeature"
                  headerName="Bulkupload"
                ></AgGridColumn>
                <AgGridColumn
                  field="baseFeature"
                  headerName="Base Feature"
                ></AgGridColumn>
                <AgGridColumn
                  field="barCodeScannerFeature"
                  headerName="Barcode Scanner"
                ></AgGridColumn>
                <AgGridColumn
                  field="forecastFeature"
                  headerName="Forecast"
                ></AgGridColumn>
                <AgGridColumn
                  field="blanketPoFeature"
                  headerName="Blanket PO"
                ></AgGridColumn>
              </AgGridColumn>
              <AgGridColumn headerName="Total No. of Hours Spent">
                <AgGridColumn
                  field="totalUsageSeconds"
                  headerName=""
                ></AgGridColumn>
              </AgGridColumn>
            </AgGridReact>{' '}
            <Box
              sx={{
                '& > :not(style)': { mr: 2, mt: 2 },
                display: { md: 'flex', xs: 'box' },
                flexDirection: 'row-reverse'
              }}
            >
              <Pagination
                count={paginationData?.maxPage}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default ExternalUserTable;
