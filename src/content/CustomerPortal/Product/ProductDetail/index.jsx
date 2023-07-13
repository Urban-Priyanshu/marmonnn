import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import { useParams } from 'react-router';
import sortIcon from '../../../../assets/Icons/sort.svg';
import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { ColorRing } from 'react-loader-spinner';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
  Button,
  styled,
  TextField,
  Select,
  MenuItem,
  Grid
} from '@mui/material';

import filterIcon from '../../../../assets/Icons/Filter.png';
import exportIcon from '../../../../assets/Icons/export.png';

import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAllUsers, updateStatus } from 'src/redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredData, handleFilter } from 'src/services/Filter';
import { CSVLink, CSVDownload } from 'react-csv';
import { Helmet } from 'react-helmet-async';
import {
  getCustomerOpenOrders,
  getCustomerViewProducts,
  updateLeadTime,
  getProductDetails,
  getBranchInventoryDetails,
  getMkInventoryDetails,
  getOpenOrdersDetails,
  getOrderHistory,
  getCustomerBlanketPOData,
  getPartForecast,
  getOrderHistoryCsv
} from '../../../../redux/actions/CustomerPortalActions';
import { AgGroupComponent } from 'ag-grid-community';
import { downloadLogo } from 'src/redux/actions/sysAdminActions';
import {
  downloadOrderHistory,
  downloadOrderHistoryForAll,
  getAllCartOrderByUserId,
  getAllCustomerShippingLocations,
  partNumberState
} from 'src/redux/actions/customerCartActions';
import { ActionTypes } from 'src/redux/constants/action-types';
import { toast } from 'react-toastify';
import Breadcrumb from 'src/components/Breadcrumb';
import { advanceTime } from 'src/services/Time-tracking';
import { timeCalculation } from 'src/redux/actions/DashboardActions';

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

const TabItem = styled(Box)(
  () => `
  
    font-family: Open Sans;
    
    padding: 22px;
    cursor: pointer;
    color: #72869A;
    
  font-weight: 700;
  font-size: 18px;
    
  height: 61px;
  margin-right: 12px;
  
    
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '40%', sm: '100%' },
  height: { md: 'auto', sm: '100%' },
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
  height: { md: 'auto', sm: '100%' },
  bgcolor: 'background.paper',
  boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.12)',
  p: 3,
  bordeRadius: '5px'
};

const RowHeader = styled(Box)(
  () => `
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    /* identical to box height */
    
    
    color: #15364A;
          
          `
);

const MainContainer = styled(Box)(
  () => `
    padding: 32px 32px 0px 32px;
    `
);
const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const authUser = useSelector((state) => state?.auth?.authUserData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0
  });
  const [openModal, setOpenModal] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [openPlaceOrderModal, setopenPlaceOrderModal] = React.useState(false);
  const [deactivated, setDeactivated] = React.useState(false);
  const [reduceHeader, setReduceHeader] = useState([]);
  const [values, setValues] = useState();
  const [data, setdata] = useState([]);

  const [sort, setSort] = useState('');
  const [sortType, setSortType] = useState();

  const [forecastSort, setForecastSort] = useState('');
  const [forecastSortType, setForecastSortType] = useState();

  const [bpoSort, setBpoSort] = useState('');
  const [bpoSortType, setBpoSortType] = useState();

  const { partNumber } = useParams();

  const isLoading = useSelector((state) => state?.loaderStatus?.showLoading);

  const userData = useSelector((state) => state?.users?.usersData);
  const getViewProducts = useSelector(
    (state) => state?.customerPortal?.getCustomerViewProducts
  );

  const partForecast = useSelector(
    (state) => state?.customerPortal?.getPartForecast
  );

  const getOpenOrders = useSelector(
    (state) => state?.customerPortal?.getCustomerOpenOrders
  );

  const getBpoData = useSelector(
    (state) => state?.customerPortal?.getCustomerBlanketPo
  );

  const getOpenOrderProductInfo = useSelector(
    (state) => state?.customerPortal?.getOpenOrdersDetails
  );
  const getOrderHistoryData = useSelector(
    (state) => state?.customerPortal?.getOrderHistoryDetails
  );

  const getOrderHistoryExcel = useSelector(
    (state) => state?.customerPortal?.getOrderHistoryExcel
  );

  const getBranchInventory = useSelector(
    (state) => state?.customerPortal?.getBranchInventoryDetails
  );

  const getProductDetail = useSelector(
    (state) => state?.customerPortal?.getProductDetails
  );

  const getMKInventory = useSelector(
    (state) => state?.customerPortal?.getMKInventoryDetails
  );

  const logoImage = useSelector((state) => state?.customers?.getLogo);
  const shippingLocations = useSelector(
    (state) => state?.customerPortal?.getCustomerShippingDetails
  );
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const customerData = useSelector((state) => state?.customers?.customerData);

  const [currentPage, setCurrentPage] = useState(1);

  const [tableData, setTableData] = useState();
  const [bpoTableData, setBpoTableData] = useState();
  const [forecastTableData, setForecastTableData] = useState();
  const [tab, setTab] = useState('product list');
  const [paginationData, setPaginationData] = useState();
  const [paginationDataOpenOrder, setpaginationDataOpenOrder] = useState();
  const [openOrderTableData, setopenOrderTableData] = useState();
  const [csvData, setCsvData] = useState([]);
  const [selectedData, setSelectedData] = React.useState([]);

  const [filteredData, setFilteredData] = React.useState({
    role: [],
    status: []
  });
  const customerPartDetails = useSelector(
    (state) => state?.customerPortal?.getPartNumber
  );

  useEffect(() => {
    navigate('?cp=true');
  }, []);

  useEffect(() => {
    if (authUser && authUser?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')) {
      let isCancelled = false;

      advanceTime(time, isCancelled, setTime, 'Base Feature');

      return () => {
        isCancelled = true;
        localStorage.setItem('componentTime', JSON.stringify(time));
      };
    }
  }, [time]);

  useEffect(() => {
    return () => {
      const value = JSON.parse(localStorage.getItem('componentTime'));

      if (value?.seconds > 59) {
        dispatch(
          timeCalculation(
            authUser?.email,
            'Base Feature',
            value?.seconds,
            authUser?.associateCustomerId
          )
        );
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
    if (value?.seconds > 59) {
      dispatch(
        timeCalculation(
          authUser?.email,
          'Base Feature',
          value?.seconds,
          authUser?.associateCustomerId
        )
      );
      localStorage.clear();
    }
  }
  useEffect(() => {
    if (state?.partNumber != undefined && state?.id != undefined) {
      dispatch(partNumberState(state?.partNumber, state?.id));
    }
  }, [state?.partNumber, state?.id]);

  let [page, setPage] = useState(1);
  let [OrderPage, setOrderPage] = useState(1);

  let [active, setActive] = useState(false);

  const PER_PAGE = 10;

  const gridStyle = useMemo(
    () => ({ height: '100%', width: '100%', margin: '0 0 12px 0' }),
    []
  );

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  const onGridSizeChanged = (params) => {
    let columnCount = params.columnApi.columnModel.gridColumns.length;
    width = params.clientWidth / columnCount;
    params.api.sizeColumnsToFit();
  };
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

  const handleInvoiceDownloadAll = (data) => {
    dispatch(
      downloadOrderHistoryForAll(
        data?.customerNumber,
        data?.partNumber,
        data?.salesOrderNumber,

        authToken
      )
    );
  };
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
  const handleChange = (e, p) => {
    setPage(p);
    if (paginationDataOpenOrder) {
      paginationDataOpenOrder?.jump(p);
    }
  };

  const deleteRecord = (e, i) => {
    selectedData.splice(i, 1);

    if (selectedData.length === 0) {
      handleModalClose();
    }
    setdata(...selectedData);
  };
  //BLUEPRINT of the incoming data for AG GRID

  React.useEffect(async () => {
    if (customerData?.logo) {
      const fd = new FormData();
      fd.append('file', customerData?.logo);

      dispatch(
        downloadLogo(
          customerData?.customerNumber,
          customerData?.id,
          customerData?.logo,
          authToken,
          fd
        )
      );
    }

    if (customerPartDetails?.partNumber && customerPartDetails?.id) {
      dispatch(
        getProductDetails(
          customerData?.customerNumber,
          customerPartDetails?.id,
          authToken
        )
      );
      dispatch(
        getMkInventoryDetails(
          customerData?.customerNumber,
          customerPartDetails?.partNumber,
          authToken
        )
      );

      dispatch(
        getOpenOrdersDetails(
          customerData?.customerNumber,
          customerPartDetails?.partNumber,
          authToken
        )
      );

      dispatch(
        getBranchInventoryDetails(
          customerData?.customerNumber,
          customerPartDetails?.partNumber,
          authToken
        )
      );

      dispatch(
        getCustomerBlanketPOData(
          customerData?.customerNumber,
          customerPartDetails?.partNumber,
          authToken
        )
      );
    }
  }, [customerData, customerPartDetails?.id, customerPartDetails?.partNumber]);

  useEffect(() => {
    dispatch(
      getOrderHistory(
        customerData?.customerNumber,
        customerPartDetails?.partNumber,
        '10',
        OrderPage,
        searchValue,
        authToken,
        sort,
        sortType
      )
    );
  }, [
    customerData,
    customerPartDetails?.id,
    customerPartDetails?.partNumber,
    searchValue,
    OrderPage,
    sort,
    sortType
  ]);

  useEffect(() => {
    dispatch(
      getOrderHistoryCsv(
        customerData?.customerNumber,
        customerPartDetails?.partNumber,
        '99999',
        OrderPage,
        searchValue,
        authToken
      )
    );
  }, [customerData, customerPartDetails?.id, customerPartDetails?.partNumber]);

  useEffect(() => {
    dispatch(
      getPartForecast(customerData?.customerNumber, partNumber, authToken)
    );
  }, []);

  //    // Example using Grid's API
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
          quantity: d?.quantity + ' ' + d?.uom,
          dueDate: moment.utc(d?.invoiceDate).format('MM/DD/YYYY'),

          // roles: d?.roles?.map((r) => r?.description),
          status: d?.status
        };
      })
    );
  };

  const forecastBluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          id: d?.id,
          weekOf: moment.utc(d?.weekOf).format('MM/DD/YYYY'),
          onHand: d?.onHand + ' ' + d?.uom,
          usage: d?.usage + ' ' + d?.uom,
          incoming: d?.incoming + ' ' + d?.uom,
          reorderDate: partForecast?.part?.reorderDate,
          runOutDate: partForecast?.part?.runOutDate
        };
      })
    );
  };

  const bluePrintBpo = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          bpoQty: d?.bpoQty + ' ' + d?.bpoUom,
          bpoUom: d?.bpoUom,
          effectiveDate: moment.utc(d?.effectiveDate).format('MM/DD/YYYY'),
          endDate: moment.utc(d?.endDate).format('MM/DD/YYYY'),
          orderQty: d?.orderQty,
          poNumber: d?.poNumber
        };
      })
    );
  };

  // bpoQty: d?.bpoQty + ' ' + d?.bpoUom,
  // bpoUom: d?.bpoUom,
  // effectiveDate: moment.utc(d?.effectiveDate).format('MM/DD/YYYY'),
  // endDate: moment.utc(d?.endDate).format('MM/DD/YYYY'),
  // orderQty: d?.orderQty,
  // poNumber: d?.poNumber

  useEffect(() => {
    if (getBpoData) {
      const tableBluePrint = bluePrintBpo(getBpoData);
      const filterData = getFilteredData(
        bpoSortType === 'bpoQty:asc'
          ? tableBluePrint.sort((a, b) => (a.bpoQty > b.bpoQty ? 1 : -1))
          : bpoSortType === 'bpoQty:dec'
          ? tableBluePrint.sort((a, b) => (a.bpoQty < b.bpoQty ? 1 : -1))
          : bpoSortType === 'orderQty:asc'
          ? tableBluePrint.sort((a, b) => a.orderQty - b.orderQty)
          : bpoSortType === 'orderQty:dec'
          ? tableBluePrint.sort((a, b) => b.orderQty - a.orderQty)
          : tableBluePrint,
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

      setBpoTableData(data?.currentData());
    }
  }, [getBpoData, page, filteredData, bpoSort, bpoSortType]);

  useEffect(() => {
    if (getOpenOrderProductInfo?.openOrders) {
      const filterData = getFilteredData(
        getOpenOrderProductInfo?.openOrders,
        filteredData,
        'systemAdmin'
      );

      const data = usePagination(
        filterData,
        PER_PAGE,
        currentPage,
        setCurrentPage
      );
      setpaginationDataOpenOrder(data);

      setopenOrderTableData(data?.currentData());
    }
  }, [getOpenOrderProductInfo?.openOrders, page, filteredData]);

  useEffect(() => {
    const tableBluePrint = bluePrint(getOrderHistoryData?.content);
    const filterData = getFilteredData(
      tableBluePrint,
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

    setTableData(data?.currentData());
  }, [
    getOrderHistoryData?.content,
    searchValue,
    OrderPage,
    filteredData,
    sort,
    sortType
  ]);

  // id: d?.id,
  // weekOf: moment.utc(d?.weekOf).format('MM/DD/YYYY'),
  // onHand: d?.onHand + ' ' + d?.uom,
  // usage: d?.usage + ' ' + d?.uom,
  // incoming: d?.incoming + ' ' + d?.uom,
  // reorderDate: partForecast?.part?.reorderDate,
  // runOutDate: partForecast?.part?.runOutDate

  useEffect(() => {
    const tableBluePrint = forecastBluePrint(partForecast);
    const filterData = getFilteredData(
      forecastSortType === 'onHand:asc'
        ? tableBluePrint.sort((a, b) => (a.onHand > b.onHand ? 1 : -1))
        : forecastSortType === 'onHand:dec'
        ? tableBluePrint.sort((a, b) => (a.onHand < b.onHand ? 1 : -1))
        : forecastSortType === 'usage:asc'
        ? tableBluePrint.sort((a, b) => a.usage - b.usage)
        : forecastSortType === 'usage:dec'
        ? tableBluePrint.sort((a, b) => b.usage - a.usage)
        : forecastSortType === 'incoming:asc'
        ? tableBluePrint.sort((a, b) => (a.incoming > b.incoming ? 1 : -1))
        : forecastSortType === 'incoming:dec'
        ? tableBluePrint.sort((a, b) => (a.incoming < b.incoming ? 1 : -1))
        : tableBluePrint,
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

    setForecastTableData(data?.currentData());
  }, [page, filteredData, partForecast, forecastSort, forecastSortType]);

  // const reduceTableData = tableData?.reduce((a, b) => {
  //   const newArr = b?.branchInventories?.map((d) => d?.branchName);
  //   a = [...new Set([...a, ...newArr])];
  //   return a;
  // }, []);

  // setReduceHeader(reduceTableData);

  // useEffect(() => {
  //   if (customerData) {
  //     dispatch(
  //       getCustomerViewProducts(
  //         customerData?.customerNumber,
  //         10,
  //         page,
  //         'DESC',
  //         authToken,
  //         searchValue
  //       )
  //     );
  //   }
  // }, [page, searchValue, customerData]);

  useEffect(() => {
    if (getOrderHistoryExcel) {
      const intitialCsvData =
        getOrderHistoryExcel && getOrderHistoryExcel?.content
          ? getOrderHistoryExcel?.content?.map((d) => ({
              partDescription: d?.partDescription,
              orderNumber: d?.salesOrderNumber,
              poNumber: d?.customerOrderNumber,
              quantity: d?.quantity,
              dueDate: moment.utc(d?.invoiceDate).format('MM/DD/YYYY'),
              status: d?.status
            }))
          : [
              {
                headerName: '',
                value: ''
              }
            ];
      setCsvData(intitialCsvData);
    }
  }, [getOrderHistoryExcel]);

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

            marginTop: '-2px'
          }}
        >
          {props?.value && props?.value === 'Deactivated'
            ? 'Inactive'
            : props?.value}
        </span>
      </div>
    );
  }

  function RoleComponent(props) {
    return (
      <div>
        {props?.value?.map((role, i) => (
          <span key={role?.id}>
            {role} {i < props?.value?.length - 1 ? ', ' : ''}
          </span>
        ))}
      </div>
    );
  }

  function ActionComponent(props) {
    return (
      <div style={{ cursor: 'pointer', color: '#20A2F3' }}>
        <span
          onClick={() => handleInvoiceDownloadAll(props?.data)}
          style={{ marginRight: '6px' }}
        >
          Download All
        </span>
      </div>
    );
  }

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: false
  }));

  // Example using Grid's API

  const onBtnExport = useCallback((params) => {
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  const handleClick = (event) => {
    setActive(true);
    setAnchorEl(event.currentTarget);

    if (filteredData?.role?.length || filteredData?.status) {
      setActive(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (filteredData?.role?.length || filteredData?.status?.length) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };
  let width = 100;

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllCustomerShippingLocations(customerData?.id, authToken));
  }, [customerData]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const customSort = (e) => {
    setSort(e[1]);
    setSortType(e[0]);
  };

  const forecastcustomSort = (e) => {
    setForecastSort(true);
    setForecastSortType(e);
  };

  const bpocustomSort = (e) => {
    setBpoSort(true);
    setBpoSortType(e);
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
      <div>
        <Box sx={{ margin: '0px 0 10px 0' }}>
          <Breadcrumb
            userData={customerData}
            location={[
              {
                location: 'Home',
                to: `/customer-portal/${customerData?.id}/products`
              }
            ]}
            page={getProductDetail && getProductDetail?.partNumber}
          />
        </Box>
        <Box
          sx={{
            '& > :not(style)': {},
            display: { md: 'flex', xs: 'box' },
            flexDirection: 'row'
          }}
        >
          <Box sx={{ flexGrow: 1, marginBottom: '20px' }}>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 700
              }}
            >
              Supply Chain Portal
            </span>{' '}
            <Box sx={{ fontSize: '12px' }}>
              <Box>
                {filteredData.role.length > 0 &&
                  'Applied Filters (Roles): ' + filteredData.role.map((d) => d)}
              </Box>
              <Box>
                {filteredData.status.length > 0 &&
                  'Applied Filters (Status): ' +
                    filteredData.status.map((d) => d)}
              </Box>
            </Box>
          </Box>
          {tab === 'order history' && (
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
          )}
          {/* 
          <Box sx={{ paddingLeft: '15px' }}>
            <img src={customerPortalLogo} style={{ paddingRight: '8px' }}></img>
            {customerData?.logo && (
              <img src={`data:image/jpeg;base64,${logoImage}`}></img>
            )}
          </Box> */}

          <Box
            sx={{
              display: { md: 'flex', xs: 'box' },
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}
          >
            {tab == 'order history' && (
              <>
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
                  anchorEl={anchorEl}
                  onClose={sorthandleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                >
                  <Box
                    className={'sortText'}
                    sx={{ mr: 2, pl: 2, pt: 4, pb: 2 }}
                  >
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
                <Box sx={{ paddingLeft: '15px' }}>
                  <CustomButton>
                    <CSVLink
                      data={csvData}
                      filename={'Order History'}
                      title="Export as CSV"
                    >
                      <img src={exportIcon}></img>
                    </CSVLink>
                  </CustomButton>
                </Box>
              </>
            )}
            {tab == 'forecast' && (
              <>
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
                  anchorEl={anchorEl}
                  onClose={sorthandleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                >
                  <Box
                    className={'sortText'}
                    sx={{ mr: 2, pl: 2, pt: 4, pb: 2 }}
                  >
                    <div
                      onClick={(e) => forecastcustomSort('onHand:asc')}
                      style={{ cursor: 'pointer', fontSize: '12px' }}
                    >
                      Onhand: Asc - Dec
                    </div>
                    <div
                      onClick={(e) => forecastcustomSort('onHand:dec')}
                      style={{ cursor: 'pointer', fontSize: '12px' }}
                    >
                      Onhand: Dec - Asc
                    </div>
                    <div
                      onClick={(e) => forecastcustomSort('usage:asc')}
                      style={{ cursor: 'pointer', fontSize: '12px' }}
                    >
                      Usage: Asc - Dec
                    </div>
                    <div
                      onClick={(e) => forecastcustomSort('usage:dec')}
                      style={{ cursor: 'pointer', fontSize: '12px' }}
                    >
                      Usage: Dec - Asc
                    </div>

                    <div
                      onClick={(e) => forecastcustomSort('incoming:asc')}
                      style={{ cursor: 'pointer', fontSize: '12px' }}
                    >
                      Incoming: Asc - Dec
                    </div>
                    <div
                      onClick={(e) => forecastcustomSort('incoming:dec')}
                      style={{ cursor: 'pointer', fontSize: '12px' }}
                    >
                      Incoming: Dec - Asc
                    </div>
                  </Box>
                </Popover>
                <Box sx={{ paddingLeft: '15px' }}>
                  <CustomButton
                    onClick={() => onBtnExport({ fileName: 'Forecast' })}
                    title="Export as CSV"
                  >
                    <img src={exportIcon}></img>
                  </CustomButton>
                </Box>
              </>
            )}
            {tab == 'inventory' && (
              <>
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
                  anchorEl={anchorEl}
                  onClose={sorthandleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                >
                  <Box
                    className={'sortText'}
                    sx={{ mr: 2, pl: 2, pt: 4, pb: 2 }}
                  >
                    <div
                      onClick={(e) => bpocustomSort('bpoQty:asc')}
                      style={{ cursor: 'pointer', fontSize: '12px' }}
                    >
                      BPO: Asc - Dec
                    </div>
                    <div
                      onClick={(e) => bpocustomSort('bpoQty:dec')}
                      style={{ cursor: 'pointer', fontSize: '12px' }}
                    >
                      {' '}
                      BPO: Dec - Asc
                    </div>
                    <div
                      onClick={(e) => bpocustomSort('orderQty:asc')}
                      style={{ cursor: 'pointer', fontSize: '12px' }}
                    >
                      Orders: Asc - Dec
                    </div>
                    <div
                      onClick={(e) => bpocustomSort('orderQty:dec')}
                      style={{ cursor: 'pointer', fontSize: '12px' }}
                    >
                      Orders: Dec - Asc
                    </div>
                  </Box>
                </Popover>
                <Box sx={{ paddingLeft: '15px' }}>
                  <CustomButton
                    onClick={() => onBtnExport({ fileName: 'Blanket POs' })}
                    title="Export as CSV"
                  >
                    <img src={exportIcon}></img>
                  </CustomButton>
                </Box>
              </>
            )}
          </Box>
        </Box>{' '}
        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}{' '}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
          }}
        >
          <TabItem
            className={`TEST` && tab === 'product list' && 'tabActive'}
            id="TEST"
            onClick={() => setTab('product list')}
          >
            Product Info
          </TabItem>
          <TabItem
            className={`TEST2` && tab === 'order history' && 'tabActive'}
            id="TEST2"
            onClick={() => setTab('order history')}
          >
            Order History
          </TabItem>
          <TabItem
            className={`TEST5` && tab === 'forecast' && 'tabActive'}
            id="TEST5"
            onClick={() => setTab('forecast')}
          >
            Forecast
          </TabItem>
          <TabItem
            className={`TEST5` && tab === 'inventory' && 'tabActive'}
            id="TEST5"
            onClick={() => setTab('inventory')}
          >
            Blanket POs
          </TabItem>
        </Box>
        {/* MODAL AND POPOVERS */}
        {tab && tab === 'product list' && (
          <>
            <TableContainer
              style={{
                padding: '0px 10px'
              }}
            >
              <Table
                sx={{ minWidth: '100%', backgroundColor: 'white' }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'white' }}>
                    <StyledTableCell width="100px">Part Number</StyledTableCell>
                    <StyledTableCell width="100px">SKU</StyledTableCell>
                    <StyledTableCell width="100px">LB/PCS</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow
                    style={{ backgroundColor: 'white' }}
                    id={'partDescription'}
                  >
                    <StyledTableCell width="100px">
                      {getProductDetail && getProductDetail?.partNumber}
                    </StyledTableCell>
                    <StyledTableCell width="100px">
                      {(getProductDetail && getProductDetail?.sku) || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell width="100px">
                      {(getProductDetail && getProductDetail?.qty) || 'N/A'}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
              <Box
                sx={{
                  '& > :not(style)': { ml: 2, mt: 3 },
                  display: 'flex',
                  flexDirection: 'row-reverse'
                }}
              ></Box>
            </TableContainer>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 1,
                ml: 1,

                background: '#DFDFDF'
              }}
            >
              <RowHeader>Inventory</RowHeader>
            </Box>{' '}
            <TableContainer
              style={{
                padding: '30px 10px'
              }}
            >
              {getBranchInventory && getBranchInventory?.length ? (
                <Table
                  sx={{ minWidth: '100%', backgroundColor: 'white' }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'white' }}>
                      <StyledTableCell width="100px">Location</StyledTableCell>
                      <StyledTableCell width="100px">On Hand</StyledTableCell>
                      <StyledTableCell width="100px">On Order</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getBranchInventory &&
                      getBranchInventory?.map((d) => (
                        <StyledTableRow key={d?.id}>
                          <StyledTableCell width="100px">
                            {d?.location ?? 'N/A'}
                          </StyledTableCell>
                          <StyledTableCell width="100px">
                            {d?.onHand ?? 'N/A'}
                          </StyledTableCell>

                          <StyledTableCell width="100px">
                            {d?.onOrder ?? 'N/A'}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <span style={{ marginLeft: '15px' }}>No Data Found</span>
              )}

              <Box
                sx={{
                  '& > :not(style)': { ml: 2, mt: 3 },
                  display: 'flex',
                  flexDirection: 'row-reverse'
                }}
              ></Box>
            </TableContainer>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 1,
                ml: 1,

                background: '#DFDFDF'
              }}
            >
              <RowHeader>Incoming M/K Inventory</RowHeader>
            </Box>{' '}
            <TableContainer
              style={{
                padding: '30px 10px',
                bgcolor: 'background.paper'
              }}
            >
              {getMKInventory && getMKInventory?.length ? (
                <Table
                  sx={{ minWidth: 700, backgroundColor: 'white' }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'white' }}>
                      <StyledTableCell>P.O Number</StyledTableCell>
                      <StyledTableCell>P.O Line Items</StyledTableCell>
                      <StyledTableCell>Quantity</StyledTableCell>
                      <StyledTableCell>Due Date</StyledTableCell>
                      <StyledTableCell>UOM</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getMKInventory &&
                      getMKInventory?.map((d) => (
                        <StyledTableRow key={d?.id}>
                          <StyledTableCell component="th" scope="row">
                            {d?.purchaseOrderNumber}
                          </StyledTableCell>
                          <StyledTableCell>
                            {d?.purchaseLineNumber}
                          </StyledTableCell>
                          <StyledTableCell>{d?.quantity}</StyledTableCell>
                          <StyledTableCell>
                            {moment.utc(d?.dueDate).format('MM/DD/YYYY')}
                          </StyledTableCell>{' '}
                          <StyledTableCell>{d?.uom}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <span style={{ marginLeft: '15px' }}>No Data Found</span>
              )}

              <Box
                sx={{
                  '& > :not(style)': { ml: 2, mt: 3 },
                  display: 'flex',
                  flexDirection: 'row-reverse'
                }}
              ></Box>
            </TableContainer>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                p: 1,
                ml: 1,

                background: '#DFDFDF'
              }}
            >
              <RowHeader>Open Order</RowHeader>
            </Box>{' '}
            <TableContainer
              style={{ padding: '30px 10px', bgcolor: 'background.paper' }}
            >
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
                  {openOrderTableData && openOrderTableData?.length ? (
                    <>
                      <Table
                        sx={{ minWidth: 700, backgroundColor: 'white' }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow
                            sx={{
                              backgroundColor: 'white',
                              fontSize: '14px !important'
                            }}
                          >
                            <StyledTableCell>P.O Number</StyledTableCell>
                            <StyledTableCell>M/K S.O Number</StyledTableCell>
                            <StyledTableCell>Due Date</StyledTableCell>

                            <StyledTableCell>Quantity</StyledTableCell>
                            <StyledTableCell>UOM</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {openOrderTableData &&
                            openOrderTableData?.map((d) => (
                              <StyledTableRow key={d?.partNumber}>
                                <>
                                  <StyledTableCell component="th" scope="row">
                                    {d?.poNumber}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {d?.mkSONumber}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {moment
                                      .utc(d?.dueDate)
                                      .format('MM/DD/YYYY')}
                                  </StyledTableCell>{' '}
                                  <StyledTableCell component="th" scope="row">
                                    {d?.quantity}
                                  </StyledTableCell>
                                  <StyledTableCell>{d?.uom}</StyledTableCell>
                                  <StyledTableCell>
                                    {d?.status}
                                  </StyledTableCell>{' '}
                                </>

                                <StyledTableCell>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      borderRadius: 1
                                    }}
                                  ></Box>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      borderRadius: 1
                                    }}
                                  ></Box>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      borderRadius: 1
                                    }}
                                  ></Box>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      borderRadius: 1
                                    }}
                                  ></Box>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>

                      <Box
                        sx={{
                          '& > :not(style)': { mr: 2, mt: 2 },
                          display: { md: 'flex', xs: 'box' },
                          flexDirection: 'row-reverse'
                        }}
                      >
                        <Pagination
                          count={paginationDataOpenOrder?.maxPage}
                          size="large"
                          page={page}
                          variant="outlined"
                          shape="rounded"
                          onChange={handleChange}
                        />
                      </Box>
                    </>
                  ) : (
                    <span style={{ marginLeft: '15px' }}>No Data Found</span>
                  )}

                  <Box
                    sx={{
                      '& > :not(style)': { ml: 2, mt: 3 },
                      display: 'flex',
                      flexDirection: 'row-reverse'
                    }}
                  ></Box>
                </>
              )}
            </TableContainer>
          </>
        )}
        {tab && tab === 'order history' && (
          <TableContainer style={gridStyle}>
            {isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                q
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
                      ActionComponent
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
                    <AgGridColumn
                      field=""
                      headerName="Action"
                      cellRenderer="ActionComponent"
                      width={'100px'}
                    ></AgGridColumn>
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
              <AppPagination setPage={setOrderPage} {...getOrderHistoryData} />
            </Box>{' '}
          </TableContainer>
        )}
        {tab && tab === 'inventory' && (
          <TableContainer style={gridStyle}>
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
                defaultColDef={defaultColDef} // Default Column Properties
                rowData={!search ? bpoTableData : bluePrintBpo}
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection="multiple" // Options - allows click selection of rows
                // frameworkComponents={{}}
              >
                <AgGridColumn
                  field="effectiveDate"
                  headerName="Effective Date"
                ></AgGridColumn>
                <AgGridColumn
                  field="endDate"
                  headerName="End Date"
                ></AgGridColumn>
                <AgGridColumn
                  field="bpoQty"
                  headerName="Blanket POs"
                ></AgGridColumn>
                <AgGridColumn
                  field="orderQty"
                  headerName="Orders"
                ></AgGridColumn>
              </AgGridReact>
            </Box>
            <Box
              sx={{
                '& > :not(style)': { mr: 2, mt: 2 },
                display: { md: 'flex', xs: 'box' },
                flexDirection: 'row-reverse'
              }}
            ></Box>
          </TableContainer>
        )}
        {tab && tab === 'forecast' && (
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
                    defaultColDef={defaultColDef} // Default Column Properties
                    rowData={!search ? forecastTableData : forecastBluePrint}
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection="multiple" // Options - allows click selection of rows
                    // frameworkComponents={{}}
                  >
                    <AgGridColumn
                      field="weekOf"
                      headerName="Week Of"
                    ></AgGridColumn>
                    <AgGridColumn
                      field="onHand"
                      headerName="On Hand"
                    ></AgGridColumn>
                    <AgGridColumn
                      field="usage"
                      headerName="Usage"
                    ></AgGridColumn>
                    <AgGridColumn
                      field="incoming"
                      headerName="Incoming"
                    ></AgGridColumn>
                  </AgGridReact>
                </Box>
                <Box
                  sx={{
                    '& > :not(style)': { mr: 2, mt: 2 },
                    display: { md: 'flex', xs: 'box' },
                    flexDirection: 'row-reverse'
                  }}
                ></Box>
              </>
            )}
          </TableContainer>
        )}
        {tab && tab === 'Forecast' && (
          <TableContainer style={gridStyle}>
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
                defaultColDef={defaultColDef} // Default Column Properties
                rowData={!search ? tableData : bluePrint}
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection="multiple" // Options - allows click selection of rows
                // frameworkComponents={{}}
              >
                <AgGridColumn field="PoNumber"></AgGridColumn>
                <AgGridColumn field="partNumber"></AgGridColumn>
                <AgGridColumn field="product"></AgGridColumn>
                <AgGridColumn field="poLineItem"></AgGridColumn>
                <AgGridColumn field="dueDate"></AgGridColumn>
                <AgGridColumn field="UOM"></AgGridColumn>
                <AgGridColumn field="runOutDate"></AgGridColumn>
                <AgGridColumn field="reorderDate"></AgGridColumn>
                <AgGridColumn field="status"></AgGridColumn>
              </AgGridReact>
            </Box>
            <Box
              sx={{
                '& > :not(style)': { mr: 2, mt: 2 },
                display: { md: 'flex', xs: 'box' },
                flexDirection: 'row-reverse'
              }}
            >
              <AppPagination setPage={setPage} {...getViewProducts} />
            </Box>
          </TableContainer>
        )}
      </div>
    </MainContainer>
  );
};
export default ProductDetail;
