import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import sortIcon from '../../../../assets/Icons/sort.svg';
import { ColorRing } from 'react-loader-spinner';
import 'react-datepicker/dist/react-datepicker.css';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import { DateRangePicker, Calendar } from 'react-date-range';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { addDays, subDays } from 'date-fns';
import { Backdrop, Hidden } from '@mui/material';

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
import PlaceOrderForm from './PlaceOrderForm';
import {
  getCustomerOpenOrders,
  getCustomerViewProducts,
  getProductsCsv,
  MKInventoryExcelData,
  MKInventoryTable,
  updateLeadTime
} from '../../../../redux/actions/CustomerPortalActions';
import { AgGroupComponent } from 'ag-grid-community';
import { downloadLogo } from 'src/redux/actions/sysAdminActions';
import {
  getAllCartOrderByUserId,
  getAllCustomerShippingLocations
} from 'src/redux/actions/customerCartActions';
import { ActionTypes } from 'src/redux/constants/action-types';
import { toast } from 'react-toastify';
import { grid } from '@mui/system';
import SortingCount from 'src/services/sortingCount/SortingCount';

const CustomInput = styled(TextField)(
  () => `
  .MuiInputBase-root {
    height: 40px;
    border-radius: 0px;
    width: 100%;
    background: #F4F7F9;

    border: 1px solid #B8C2C8;
    color: #15364A;
  }

        :after{
          border-bottom: unset !important;
          border: 1px solid #20A2F3 !important;

        }
        :before{
          border-bottom: unset !important;
          border: 1px solid #20A2F3 !important;

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

const LabelBox = styled(Box)(
  () => `
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 5px;
      `
);

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

const PartNameText = styled(Box)(
  () => `

  font-weight: 700;
  font-size: 14px;
  `
);

const InputBox = styled(Box)(
  () => `
  background: #15364A;
  border: 1px solid #15364A;
  color: white;
  width: 52px;

  
  `
);

const CustomerSetup = styled(Box)(
  () => `

font-weight: 700;
font-size: 16px;
line-height: 22px;
color: #343D42;
padding: 22px 0 32px 0;
font-family: 'Open Sans';

  `
);
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
const ModalHeader = styled(Box)(
  () => `
    font-weight: 700;
     font-size: 20px;
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
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.12)',
  p: 3,
  bordeRadius: '5px'
};

const CancelButton = styled(Button)(
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
      opacity: 0.8 !important;
      color: white
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

const TableContainer = styled(Box)(
  () => `
      padding: 15px 24px;
      background-color: white;
      box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.08);
      border-radius: 3px;
    
      
      `
);

const CustomerPortalTable = ({ userID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [inventoryanchorEl, setinventoryAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [excelToggle, setExcelToggle] = React.useState(false);
  const [mkExcelToggle, setMKExcelToggle] = React.useState(false);
  const [searchInventory, setsearchInventory] = React.useState('');
  const [searchOpenOrders, setSearchOpenOrders] = React.useState('');
  const [openPlaceOrderModal, setopenPlaceOrderModal] = React.useState(false);
  const [deactivated, setDeactivated] = React.useState(false);
  const [reduceHeader, setReduceHeader] = useState([]);
  const [values, setValues] = useState();
  const [singledate, setsingledate] = useState(null);
  const [updatedLeadTime, setUpdatedLeadTime] = useState(false);
  const [quantity, setquantity] = useState('');
  const [openOrderData, setopenOrderData] = useState();
  const [inventoryExcel, setInventoryExcel] = useState([]);

  const [inventoryTableData, setinventoryTableData] = useState();
  const [data, setData] = useState([]);

  const getCustomerProductsCsv = useSelector(
    (state) => state?.customerPortal?.getCustomerProductsCsv
  );

  const getViewProducts = useSelector(
    (state) => state?.customerPortal?.getCustomerViewProducts
  );

  const getOpenOrders = useSelector(
    (state) => state?.customerPortal?.getCustomerOpenOrders
  );

  const getMKInventoryExcel = useSelector(
    (state) => state?.customerPortal?.getMKInventoryExcel
  );

  const getInventoryData = useSelector(
    (state) => state?.customerPortal?.getInventoryTableData
  );

  const logoImage = useSelector((state) => state?.customers?.getLogo);
  const shippingLocations = useSelector(
    (state) => state?.customerPortal?.getCustomerShippingDetails
  );
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const authUserRole = useSelector((state) => state?.auth?.authUserData);
  const customerData = useSelector((state) => state?.customers?.customerData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState('');
  const [mksortType, setMkSortType] = useState('');
  const [sort, setSort] = useState('DESC');
  const [mksort, setMkSort] = useState();

  const [openOrderSortType, setOpenOrderSortType] = useState('');
  const [openOrderSort, setOpenOrderSort] = useState();

  const [tableData, setTableData] = useState();
  const [rerender, setRerender] = useState(false);
  const [tab, setTab] = useState('product list');
  const [paginationData, setPaginationData] = useState();
  const [csvData, setCsvData] = useState([]);
  const [productCsvData, setProductCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = React.useState({});
  const [placeOrderData, setPlaceOrderData] = React.useState({});
  const [rerenderer, setRerenderer] = React.useState(true);
  const [sortanchorEl, setsortAnchorEl] = useState(null);

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
  let [openOrderpage, setOpenOrderPage] = useState(1);
  let [inventorypage, setInventoryPage] = useState(1);
  let [active, setActive] = useState(false);

  const options = [10, 20, 50, 100];
  const [itemsPerPage, setItemsPerPage] = useState(options[0]);
  const [openOrderItemsPerPage, setOpenOrderItemsPerPage] = useState(
    options[0]
  );

  const sorthandleClick = (event) => {
    setsortAnchorEl(event.currentTarget);
  };
  const sorthandleClose = () => {
    setsortAnchorEl(null);
  };

  const customSort = (e) => {
    setSort(e[1]);
    setSortType(e[0]);
    setSelectedData([]);

    setPage(1);
  };

  const openOrdercustomSort = (e) => {
    setOpenOrderSort(true);
    setOpenOrderSortType(e);
  };

  const mkcustomSort = (e) => {
    setMkSort(e[1]);
    setMkSortType(e[0]);

    setPage(1);
  };

  const handleCountChange = (e) => {
    setItemsPerPage(e.target.value);
    // do something with the new itemsPerPage value, e.g. fetch new data from a server
  };

  const handleOpenOrderCountChange = (newItemsPerPage) => {
    setOpenOrderItemsPerPage(newItemsPerPage);
    // do something with the new itemsPerPage value, e.g. fetch new data from a server
  };
  useEffect(() => {
    setItemsPerPage(options[0]);
    setPage(1);
    setOpenOrderItemsPerPage(options[0]);
    setOpenOrderPage(1);
    if (paginationData) {
      paginationData?.jump(1);
    }
  }, [tab]);

  useEffect(() => {
    dispatch(
      getCustomerViewProducts(
        customerData?.customerNumber,
        itemsPerPage,
        page,
        sort,
        authToken,
        searchValue,
        sortType
      )
    );

    dispatch(
      MKInventoryTable(
        customerData?.customerNumber,
        searchInventory,
        quantity,
        dateRange,
        authToken,
        inventorypage,
        itemsPerPage,
        mksort,
        mksortType
      )
    );
  }, [itemsPerPage]);

  useEffect(() => {
    dispatch(
      getCustomerViewProducts(
        customerData?.customerNumber,
        itemsPerPage,
        1,
        sort,
        authToken,
        searchValue,
        sortType
      )
    );

    dispatch(
      MKInventoryTable(
        customerData?.customerNumber,
        searchInventory,
        quantity,
        dateRange,
        authToken,
        1,
        itemsPerPage,
        mksort,
        mksortType
      )
    );
  }, [sort, sortType, mksort, mksortType]);

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };
  const gridStyle = useMemo(
    () => ({ height: '100%', width: '100%', margin: '0 0 12px 0' }),
    []
  );

  const onRerender = useCallback(
    (params) => {
      setTimeout(function () {
        if (params && params.api && selectedData[page]) {
          const ids = selectedData[page]?.map((d) => d?.id);
          params.api.forEachNode((node, i) => {
            node.setSelected(ids?.includes(node?.data?.id));
          });
        }
      }, 100);
    },
    [page, selectedData]
  );

  const inventoryTable = useCallback(() => {
    return (
      <AgGridReact
        ref={gridRef} // Ref for accessing Grid's API
        onFirstDataRendered={onFirstDataRendered}
        domLayout={'autoHeight'}
        defaultColDef={defaultColDef} // Default Column Properties
        rowData={!search ? inventoryTableData : bluePrintInventory}
        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        rowSelection="multiple" // Options - allows click selection of rows
        frameworkComponents={{ LinkComponent, QuantityComponent }}
      >
        <AgGridColumn
          resizable={true}
          field="purchaseOrderNumber"
        ></AgGridColumn>
        <AgGridColumn resizable={true} field="partNumber"></AgGridColumn>
        <AgGridColumn
          cellRenderer="LinkComponent"
          resizable={true}
          field="partDescription"
        ></AgGridColumn>
        <AgGridColumn
          resizable={true}
          field="purchaseLineNumber"
        ></AgGridColumn>
        <AgGridColumn resizable={true} field="dueDate"></AgGridColumn>
        <AgGridColumn
          resizable={true}
          field="quantity"
          cellRenderer="QuantityComponent"
        ></AgGridColumn>
      </AgGridReact>
    );
  }, [page, inventoryTableData, itemsPerPage, mksort, mksortType]);

  const productTable = useCallback(() => {
    return (
      <AgGridReact
        ref={gridRef} // Ref for accessing Grid's API
        // onGridReady={onFirstDataRendered}
        onSelectionChanged={onSelectionChanged}
        domLayout={'autoHeight'}
        defaultColDef={defaultColDef} // Default Column Properties
        rowData={tableData}
        suppressRowClickSelection={true}
        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        rowSelection="multiple" // Options - allows click selection of rows
        frameworkComponents={{ inventoryComponent, LinkComponent }}
      >
        <AgGridColumn
          field="partNumber"
          headerCheckboxSelection={true}
          resizable={true}
          checkboxSelection={true}
        ></AgGridColumn>
        <AgGridColumn
          cellRenderer="LinkComponent"
          resizable={true}
          field="description"
        ></AgGridColumn>
        {reduceHeader &&
          reduceHeader?.map((d) => (
            <AgGridColumn
              key={d}
              headerName={d}
              resizable={true}
              field={d}
              cellRenderer="inventoryComponent"
            ></AgGridColumn>
          ))}
        <AgGridColumn
          resizable={true}
          field="totalStockQuantity"
        ></AgGridColumn>
        <AgGridColumn resizable={true} field="inboundQuantity"></AgGridColumn>
        <AgGridColumn resizable={true} field="leadTimeWeeks"></AgGridColumn>
        <AgGridColumn resizable={true} field="reorderDate"></AgGridColumn>
        <AgGridColumn resizable={true} field="runOutDate"></AgGridColumn>
        <AgGridColumn resizable={true} field="onHand"></AgGridColumn>
        <AgGridColumn resizable={true} field="usage"></AgGridColumn>
        <AgGridColumn resizable={true} field="incoming"></AgGridColumn>
      </AgGridReact>
    );
  }, [page, tableData, itemsPerPage, sort, sortType]);

  const handlePageChange = (e, p) => {
    setPage(p);
    if (paginationData) {
      paginationData?.jump(p);
    }
  };

  const handleChange = (e, p) => {
    setOpenOrderPage(p);
    if (paginationData) {
      paginationData?.jump(p);
    }
  };

  const handleDeselect = useCallback(() => {
    gridRef.current.api.deselectAll();
  }, []);

  const onSelectionChanged = useCallback(() => {
    let selectedRows = gridRef.current.api.getSelectedRows();

    setSelectedData({
      ...selectedData,
      [page.toString()]: selectedRows
    });
  }, [selectedData, page]);

  useEffect(() => {
    setData(placeOrderData);
  }, [placeOrderData]);

  const deleteRecord = useCallback(
    (event, pageNo, data) => {
      const page = Object.keys(selectedData)[pageNo];

      setPage((prev) => {
        if (page != pageNo) {
          return prev;
        }
      });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);

      const select = gridRef.current.api.getSelectedNodes();

      // const arr = [...data];
      const arr = [...selectedData[page]]?.filter((f) => f?.id != data?.id);

      select.forEach((s, index) => {
        if (s?.data?.id === data?.id) {
          s?.setSelected(false);
        }
      });

      if (Object.values(selectedData)?.flat()?.length === 1) {
        // setData([...arr]);
        gridRef.current.api.deselectAll();
        setSelectedData({});
        setPage(1);
        handleModalClose();
        return;
      }
      setSelectedData({ ...selectedData, [page]: [...arr] });

      // setData([...arr]);
    },
    [selectedData, page, loading]
  );

  const PaginationProduct = useCallback(() => {
    return (
      <AppPagination
        sort={sort}
        page={page}
        setPage={setPage}
        {...getViewProducts}
      />
    );
  }, [sort, sortType, page, getViewProducts]);

  //BLUEPRINT of the incoming data for AG GRID

  React.useEffect(async () => {
    if (customerData && customerData?.logo) {
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
  }, [customerData?.id]);

  React.useEffect(async () => {
    if (customerData)
      dispatch(getCustomerOpenOrders(customerData?.customerNumber, authToken));
  }, []);

  React.useEffect(async () => {
    dispatch(
      MKInventoryTable(
        customerData?.customerNumber,
        searchInventory,
        quantity,
        dateRange,
        authToken,
        inventorypage,
        itemsPerPage,
        mksort,
        mksortType
      )
    );
  }, [quantity, searchInventory, inventorypage]);

  React.useEffect(async () => {
    dispatch(
      MKInventoryTable(
        customerData?.customerNumber,
        searchInventory,
        quantity,
        dateRange,
        authToken,
        inventorypage,
        itemsPerPage,
        mksort,
        mksortType
      )
    );
  }, [dateRange, inventorypage]);

  React.useEffect(async () => {
    dispatch(
      MKInventoryExcelData(
        customerData?.customerNumber,
        searchInventory,
        quantity,
        dateRange,
        authToken,
        10000,
        setMKExcelToggle
      )
    );
  }, [customerData?.id]);

  const bluePrintInventory = (data) => {
    return (
      data &&
      data?.content?.map((d) => {
        return {
          id: d?.id,
          partDescription: d?.partDescription,
          partNumber: d?.partNumber,
          purchaseLineNumber: d?.purchaseLineNumber,
          purchaseOrderId: d?.purchaseOrderId,
          purchaseOrderNumber: d?.purchaseOrderNumber,
          quantity: d?.quantity,
          uom: d?.uom,

          dueDate: moment.utc(d?.dueDate).format('MM/DD/YYYY')
        };
      })
    );
  };

  const excelbluePrintInventory = (data) => {
    return (
      data &&
      data?.content?.map((d) => {
        return {
          purchaseOrderNumber: d?.purchaseOrderNumber,
          partNumber: d?.partNumber,
          partDescription: d?.partDescription,
          purchaseLineNumber: d?.purchaseLineNumber,
          dueDate: moment.utc(d?.dueDate).format('MM/DD/YYYY'),
          quantity: d?.quantity
        };
      })
    );
  };

  useEffect(() => {
    if (getInventoryData) {
      const InventoryData = bluePrintInventory(getInventoryData);
      const excelInventoryData = excelbluePrintInventory(getInventoryData);
      const filterData = getFilteredData(
        InventoryData,
        filteredData,
        'systemAdmin'
      );

      const excelfilterData = getFilteredData(
        excelInventoryData,
        filteredData,
        'systemAdmin'
      );

      const data = usePagination(
        filterData,
        itemsPerPage,
        currentPage,
        setCurrentPage
      );
      setPaginationData(data);
      setInventoryExcel(excelfilterData);

      setinventoryTableData(data?.currentData());
    }
  }, [getInventoryData, page, filteredData, itemsPerPage, mksort, mksortType]);

  function QuantityComponent(props) {
    return (
      <div>
        <span style={{ color: 'black' }}>
          {props?.data?.quantity + ' ' + props?.data?.uom}
        </span>
      </div>
    );
  }

  const bluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          partNumber: d?.partNumber,
          purchaseOrderNumber: d?.purchaseOrderNumber,
          product: d?.product,
          poLineNumber: d?.poLineNumber,
          mkSONumber: d?.mkSONumber,
          dueDate: moment.utc(d?.dueDate).format('MM/DD/YYYY'),
          createdBy: d?.createdBy,
          createdDate: moment(d?.createdDate).format('MM/DD/YYYY'),
          source: d?.source,
          status: d?.status,
          uom: d?.uom,
          qty: d?.qty
        };
      })
    );
  };

  const excelbluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          purchaseOrderNumber: d?.purchaseOrderNumber,
          partNumber: d?.partNumber,
          product: d?.product,
          mkSONumber: d?.mkSONumber,
          dueDate: moment.utc(d?.dueDate).format('MM/DD/YYYY'),
          createdBy: d?.createdBy,
          createdDate: moment(d?.createdDate).format('MM/DD/YYYY'),
          qty: d?.qty,
          source: d?.source,
          status: d?.status
        };
      })
    );
  };

  useEffect(() => {
    if (getOpenOrders) {
      const tableBluePrint = bluePrint(getOpenOrders);
      const exceltableBluePrint = excelbluePrint(getOpenOrders);
      const filterData = getFilteredData(
        openOrderSortType === 'createdBy:asc'
          ? tableBluePrint.sort((a, b) => (a.createdBy > b.createdBy ? 1 : -1))
          : openOrderSortType === 'createdBy:dec'
          ? tableBluePrint.sort((a, b) => (a.createdBy < b.createdBy ? 1 : -1))
          : openOrderSortType === 'qty:asc'
          ? tableBluePrint.sort((a, b) => a.qty - b.qty)
          : openOrderSortType === 'qty:dec'
          ? tableBluePrint.sort((a, b) => b.qty - a.qty)
          : openOrderSortType === 'dueDate:asc'
          ? tableBluePrint.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1))
          : openOrderSortType === 'dueDate:dec'
          ? tableBluePrint.sort((a, b) => (a.dueDate < b.dueDate ? 1 : -1))
          : tableBluePrint,
        filteredData,
        'createdDate'
      );

      const excelfilterData = getFilteredData(
        exceltableBluePrint,
        filteredData,
        'createdDate'
      );

      const data = usePagination(
        filterData,
        openOrderItemsPerPage,
        currentPage,
        setCurrentPage
      );
      setPaginationData(data);
      setCsvData(excelfilterData);

      setopenOrderData(data?.currentData());
    }
  }, [
    getOpenOrders,
    openOrderpage,
    filteredData,
    openOrderItemsPerPage,
    openOrderSort,
    openOrderSortType
  ]);

  useEffect(() => {
    dispatch(
      getCustomerViewProducts(
        customerData?.customerNumber,
        itemsPerPage,
        page,
        sort,
        authToken,
        searchValue,
        sortType
      )
    );

    if (getViewProducts) {
      const reduceTableData = getViewProducts?.content?.reduce((a, b) => {
        const newArr = b?.branchInventories?.map((d) => d?.branchName);
        a = [...new Set([...a, ...newArr])];
        return a;
      }, []);

      const viewProductData = getViewProducts?.content?.map((d) => {
        let obj = {
          id: d?.id,
          partNumber: d?.partNumber,
          description: d?.description,
          totalStockQuantity: d?.totalStockQuantity + ' ' + d?.uom,
          inboundQuantity: d?.inboundQuantity,
          leadTimeWeeks: d?.leadTimeWeeks,
          reorderDate: d?.reorderDate,
          runOutDate: d?.runOutDate,
          onHand: d?.forecast?.onHand,
          usage: d?.forecast?.usage,
          incoming: d?.forecast?.incoming,
          uom: d?.uom,
          weekOf: d?.forecast?.weekOf
        };
        let headerObj = reduceTableData?.reduce((a, b) => {
          a = { ...a, [b]: 0 };
          return a;
        }, {});
        let obj2 = d?.branchInventories?.reduce(
          (a, b) => {
            if (a[b?.branchName]) {
              a = {
                ...a,
                [b?.branchName]: a?.[b?.branchName] + b?.quantity ?? 0
              };
            } else {
              a = { ...a, [b?.branchName]: b?.quantity ?? 0 };
            }

            return a;
          },
          { ...headerObj }
        );

        return { ...obj, ...obj2 };
      });

      setTableData(viewProductData);
      setReduceHeader(reduceTableData);
    }
  }, [page, searchValue, customerData]);

  useEffect(() => {
    if (getViewProducts) {
      const reduceTableData = getViewProducts?.content?.reduce((a, b) => {
        const newArr = b?.branchInventories?.map((d) => d?.branchName);
        a = [...new Set([...a, ...newArr])];
        return a;
      }, []);

      const viewProductData = getViewProducts?.content?.map((d) => {
        let obj = {
          id: d?.id,
          partNumber: d?.partNumber,
          description: d?.description,
          totalStockQuantity: d?.totalStockQuantity
            ? d?.totalStockQuantity + ' ' + d?.uom
            : 0,
          inboundQuantity: d?.inboundQuantity
            ? d?.inboundQuantity + ' ' + d?.uom
            : 0,
          leadTimeWeeks: d?.leadTimeWeeks,
          reorderDate: d?.reorderDate,
          runOutDate: d?.runOutDate,
          onHand: d?.forecast?.onHand ? d?.forecast?.onHand + ' ' + d?.uom : '',
          usage: d?.forecast?.usage ? d?.forecast?.usage + ' ' + d?.uom : '',
          incoming: d?.forecast?.incoming
            ? d?.forecast?.incoming + ' ' + d?.uom
            : '',
          uom: d?.uom,
          weekOf: d?.forecast?.weekOf
        };
        let headerObj = reduceTableData?.reduce((a, b) => {
          a = { ...a, [b]: 0 };
          return a;
        }, {});
        let obj2 = d?.branchInventories?.reduce(
          (a, b) => {
            if (a[b?.branchName]) {
              a = {
                ...a,
                [b?.branchName]:
                  +a?.[b?.branchName].replaceAll(d?.uom, '') +
                    b?.quantity +
                    d?.uom ?? 0
              };
            } else {
              a = { ...a, [b?.branchName]: b?.quantity + d?.uom ?? 0 };
            }
            return a;
          },
          { ...headerObj }
        );

        return { ...obj, ...obj2 };
      });

      setTableData(viewProductData);
      setReduceHeader(reduceTableData);
    }
  }, [getViewProducts, sort, sortType]);

  useEffect(() => {
    dispatch(
      getProductsCsv(
        customerData?.customerNumber,
        9999,
        page,
        'DESC',
        authToken,
        searchValue,
        'csv',
        setExcelToggle
      )
    );

    if (getCustomerProductsCsv) {
      const reduceTableData = getCustomerProductsCsv?.content?.reduce(
        (a, b) => {
          const newArr = b?.branchInventories?.map((d) => d?.branchName);
          a = [...new Set([...a, ...newArr])];
          return a;
        },
        []
      );

      const viewProductData = getCustomerProductsCsv?.content?.map((d) => {
        let obj = {
          partNumber: d?.partNumber,
          description: d?.description,
          totalStockQuantity: d?.totalStockQuantity + ' ' + d?.uom,
          inboundQuantity: d?.inboundQuantity,
          leadTimeWeeks: d?.leadTimeWeeks,
          reorderDate: d?.reorderDate,
          runOutDate: d?.runOutDate,
          onHand: d?.forecast?.onHand,
          usage: d?.forecast?.usage,
          incoming: d?.forecast?.incoming
        };
        let headerObj = reduceTableData?.reduce((a, b) => {
          a = { ...a, [b]: 0 };
          return a;
        }, {});
        let obj2 = d?.branchInventories?.reduce(
          (a, b) => {
            if (a[b?.branchName]) {
              a = {
                ...a,
                [b?.branchName]: a?.[b?.branchName] + b?.quantity ?? 0
              };
            } else {
              a = { ...a, [b?.branchName]: b?.quantity ?? 0 };
            }

            return a;
          },
          { ...headerObj }
        );

        return { ...obj, ...obj2 };
      });

      setProductCsvData(viewProductData);
    }
  }, [customerData]);

  useEffect(() => {
    if (getCustomerProductsCsv) {
      const reduceTableData = getCustomerProductsCsv?.content?.reduce(
        (a, b) => {
          const newArr = b?.branchInventories?.map((d) => d?.branchName);
          a = [...new Set([...a, ...newArr])];
          return a;
        },
        []
      );

      const viewProductData = getCustomerProductsCsv?.content?.map((d) => {
        let obj = {
          partNumber: d?.partNumber,
          description: d?.description,
          totalStockQuantity: d?.totalStockQuantity
            ? d?.totalStockQuantity + ' ' + d?.uom
            : 0,
          inboundQuantity: d?.inboundQuantity
            ? d?.inboundQuantity + ' ' + d?.uom
            : 0,
          leadTimeWeeks: d?.leadTimeWeeks,
          reorderDate: d?.reorderDate,
          runOutDate: d?.runOutDate,
          onHand: d?.forecast?.onHand ? d?.forecast?.onHand + ' ' + d?.uom : '',
          usage: d?.forecast?.usage ? d?.forecast?.usage + ' ' + d?.uom : '',
          incoming: d?.forecast?.incoming
            ? d?.forecast?.incoming + ' ' + d?.uom
            : ''
        };
        let headerObj = reduceTableData?.reduce((a, b) => {
          a = { ...a, [b]: 0 };
          return a;
        }, {});
        let obj2 = d?.branchInventories?.reduce(
          (a, b) => {
            if (a[b?.branchName]) {
              a = {
                ...a,
                [b?.branchName]:
                  +a?.[b?.branchName].replaceAll(d?.uom, '') +
                    b?.quantity +
                    d?.uom ?? 0
              };
            } else {
              a = { ...a, [b?.branchName]: b?.quantity + d?.uom ?? 0 };
            }
            return a;
          },
          { ...headerObj }
        );

        return { ...obj, ...obj2 };
      });

      setProductCsvData(viewProductData);
    }
  }, [getCustomerProductsCsv]);

  function quantityComponent(props) {
    return (
      <div>
        <span style={{ color: 'black' }}>
          {props?.data?.qty + ' ' + props?.data?.uom}
        </span>
      </div>
    );
  }

  function LinkComponent(props) {
    return (
      <div
        onClick={() =>
          navigate(
            `/customer-portal/${
              userID ?? customerData?.id
            }/product/${encodeURIComponent(props?.data?.partNumber)}?cp=true`,
            {
              state: {
                partNumber: props?.data?.partNumber,
                partName:
                  props?.data?.description ?? props?.data?.partDescription,
                id: props?.data?.id
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

  const calculateInventory = (data, value, headerName) => {
    return value?.reduce((a, b) => {
      if (headerName === b?.branchName) {
        return a + b?.quantity + ' ' + data?.uom;
      }
      return a;
    }, 0);
  };

  function inventoryComponent(props) {
    let numsStr;
    let finalNumber;
    if (typeof props?.value === 'string') {
      numsStr = props?.value.split(/(\d+)/);
      finalNumber = parseInt(numsStr[1] + '.' + numsStr[3]);
    }

    return (
      <div>
        <span>
          {finalNumber
            ? numsStr[0] + Math.floor(finalNumber) + ' ' + props?.data?.uom
            : 0}
        </span>
      </div>
    );
  }
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
        </StatusDropdownSelect>
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

  const onFilterTextBoxChanged = useCallback(() => {
    setSearch(true);
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );

    if (document.getElementById('filter-text-box').value === '') {
      setSearch(false);
    }
  }, []);

  const handleClick = (event) => {
    setActive(true);
    setAnchorEl(event.currentTarget);

    if (filteredData?.role?.length || filteredData?.status) {
      setActive(true);
    }
  };

  const handleMkInventoryClick = (event) => {
    setActive(true);
    setinventoryAnchorEl(event.currentTarget);

    if (filteredData?.role?.length || filteredData?.status) {
      setActive(true);
    }
  };

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

  const handlePlaceOrderModalClose = () => {
    dispatch({
      type: ActionTypes.GET_ADD_CART_RESPONSE,
      payload: []
    });

    setopenPlaceOrderModal(false);
  };

  const handleOpen = () => {
    if (Object.values(selectedData).flat().length) {
      setOpenModal(true);
      setPlaceOrderData(Object.values(selectedData).flat());
    } else {
      toast.error('Please choose the part number to edit');
    }
  };

  const handleOpenPlaceOrder = () => {
    if (Object.values(selectedData).flat().length) {
      const shippingLoc = shippingLocations?.find((d) => d?.primary);
      const values = {};
      Object.keys(selectedData).forEach((page) => {
        values[page] = selectedData[page].map((sd) => ({
          ...sd,
          shippingLocationId: shippingLoc?.id,
          uom: customerData?.preferredUOM
        }));
      });

      setPlaceOrderData({ ...values });

      setopenPlaceOrderModal(true);
    } else {
      toast.error('Please choose the part number to place order');
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };
  let width = 100;

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
  const onSearch = (e) => {
    setSearchValue(e?.target.value);
  };

  const searchOnInventory = (e) => {
    setsearchInventory(e?.target.value);
  };

  const searchOnOpenOrders = (e) => {
    setSearchOpenOrders(e?.target.value);
  };

  useEffect(() => {
    if (customerData) {
      dispatch(getAllCustomerShippingLocations(customerData?.id, authToken));
    }
  }, [customerData]);

  const mkOpen = Boolean(inventoryanchorEl);
  const id1 = mkOpen ? 'simple-popover' : undefined;

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const sortopen = Boolean(sortanchorEl);
  const sortid = sortopen ? 'simple-popover' : undefined;

  const handleLeadTimeChange = (e) => {
    let obj = values;

    obj = {
      ...obj,

      [e?.target.name]: e?.target.value
    };

    setValues(e?.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const leadsTimeData = Object.values(selectedData)
      .flat()
      ?.map((d) => {
        return {
          id: d?.id,
          partNumber: d?.partNumber,
          leadTime: parseInt(values)
        };
      });
    setUpdatedLeadTime(false);
    dispatch(
      updateLeadTime(
        customerData?.customerNumber,
        leadsTimeData,
        authToken,
        setValues,
        handleModalClose,
        page,
        sort,
        searchValue,
        setUpdatedLeadTime,
        gridRef
      )
    );

    setSelectedData({});
  };

  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ]);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    setState([selection]);

    handleFilter(ranges, 'date', filteredData, setFilteredData);
  };

  const handleDateChange = (ranges) => {
    const { selection } = ranges;
    setdateRange([selection]);
    handleFilter(ranges, 'date', filteredData, setFilteredData);
  };

  const editLeadsModal = useCallback(() => {
    return (
      <>
        {selectedData &&
          Object.values(selectedData)?.map((val, i) =>
            val?.map((d, j) => (
              <Box
                key={d}
                sx={{
                  '& > :not(style)': { mr: 2, mt: 3 },
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <Grid sx={{ flexGrow: 1 }}>
                  <PartNameText>Part Number: {d?.partNumber}</PartNameText>
                </Grid>
                <Grid>
                  {loading ? (
                    '...'
                  ) : (
                    <img
                      className="Img"
                      width="20px"
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => deleteRecord(e, i, d)}
                      src={DeleteIcon}
                    ></img>
                  )}
                </Grid>
              </Box>
            ))
          )}
      </>
    );
  }, [selectedData, loading, page]);

  return (
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
        <Box flexGrow={1} className="custom-heading-container-sec" sx={{}}>
          {customerData?.logo && (
            <img
              width={192}
              height={52}
              src={`data:image/jpeg;base64,${logoImage}`}
            ></img>
          )}
        </Box>
        <Box className="custom-heading-actionable-sec" sx={{}}>
          <Box sx={{ paddingLeft: '15px' }}>
            {tab === 'open orders' ? (
              <TextField
                id="filter-text-box"
                label="Search by po number, part number, mk/so number"
                size="small"
                type="text"
                onInput={() => onFilterTextBoxChanged()}
                sx={{
                  backgroundColor: 'white',
                  width: '350px',
                  border: '1px solid #E6E6E6',
                  borderRadius: '0px !important',
                  fontWeight: '400',
                  fontSize: '12px !important'
                }}
                InputLabelProps={{
                  style: {
                    fontStyle: 'italic',
                    background: '#fff',
                    paddingLeft: '6px'
                  }
                }}
                alt="Search"
                InputProps={{
                  endAdornment: <SearchIcon />
                }}
              />
            ) : tab === 'inventory' ? (
              <TextField
                id="filter-text-box"
                label="Search by po number, part number"
                size="small"
                type="text"
                onChange={(e) => searchOnInventory(e)}
                sx={{
                  backgroundColor: 'white',
                  width: '350px',
                  border: '1px solid #E6E6E6',
                  borderRadius: '0px !important',
                  fontWeight: '400',
                  fontSize: '12px !important'
                }}
                InputLabelProps={{
                  style: {
                    fontStyle: 'italic',
                    background: '#fff',
                    paddingLeft: '6px'
                  }
                }}
                alt="Search"
                InputProps={{
                  endAdornment: <SearchIcon />
                }}
              />
            ) : (
              <TextField
                id="filter-text-box"
                label="Search by part number, product description"
                size="small"
                type="text"
                onChange={(e) => onSearch(e)}
                sx={{
                  backgroundColor: 'white',
                  width: '350px',
                  border: '1px solid #E6E6E6',
                  borderRadius: '0px !important',
                  fontWeight: '400',
                  fontSize: '12px !important'
                }}
                InputLabelProps={{
                  style: {
                    fontStyle: 'italic'
                  }
                }}
                alt="Search"
                InputProps={{
                  endAdornment: <SearchIcon />
                }}
              />
            )}
          </Box>

          {/* <img src={customerPortalLogo}></img> */}
        </Box>{' '}
        <Box
          sx={{
            display: { md: 'flex', xs: 'box' },
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          {tab === 'product list' && (
            <>
              {authUserRole &&
                authUserRole?.roles?.find(
                  (d) => d?.code !== 'ROLE_CUSTOMER'
                ) && (
                  <Box sx={{ paddingLeft: '15px' }}>
                    <ModalButton onClick={handleOpen}>
                      Edit Part Number
                    </ModalButton>
                  </Box>
                )}

              {authUserRole &&
              authUserRole?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')
                ? authUserRole &&
                  authUserRole?.features?.find(
                    (d) => d?.featureCode === 'PO'
                  ) && (
                    <Box sx={{ paddingLeft: '15px' }}>
                      <ModalButton onClick={handleOpenPlaceOrder}>
                        Place Order
                      </ModalButton>
                    </Box>
                  )
                : customerData &&
                  customerData?.features?.find(
                    (d) => d?.featureCode === 'PO'
                  ) && (
                    <Box sx={{ paddingLeft: '15px' }}>
                      <ModalButton onClick={handleOpenPlaceOrder}>
                        Place Order
                      </ModalButton>
                    </Box>
                  )}
            </>
          )}

          <Box sx={{ paddingLeft: '15px' }}>
            {tab === 'open orders' && (
              <CustomButton
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                title="Filters"
                sx={{ background: active && 'black !important' }}
              >
                <img src={filterIcon}></img>
              </CustomButton>
            )}
            {tab === 'inventory' && (
              <CustomButton
                aria-describedby={id}
                variant="contained"
                onClick={handleMkInventoryClick}
                title="Filters"
                sx={{ background: active && 'black !important' }}
              >
                <img src={filterIcon}></img>
              </CustomButton>
            )}
          </Box>

          {tab === 'inventory' && (
            <Popover
              id={id1}
              open={mkOpen}
              anchorEl={inventoryanchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
            >
              <Typography sx={{ p: 2 }}>
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
                    <Typography>Due Date</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <DateRangePicker
                        onChange={handleDateChange}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        showDateDisplay={false}
                        ranges={dateRange}
                        direction="vertical"
                      />
                    </Box>
                    <br></br>
                  </AccordionDetails>
                </Accordion>
              </Typography>
            </Popover>
          )}

          {tab === 'open orders' && (
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
                {filteredData.status.length ||
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
                    <Typography>Created Date</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <DateRangePicker
                        onChange={handleOnChange}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        showDateDisplay={false}
                        ranges={state}
                        direction="vertical"
                      />
                    </Box>
                    <br></br>
                  </AccordionDetails>
                </Accordion>
              </Typography>
            </Popover>
          )}
          {tab === 'inventory' && (
            <>
              <Box sx={{ pl: 2 }}>
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
                {/* id: d?.id,
          partDescription: d?.partDescription,
          partNumber: d?.partNumber,
          purchaseLineNumber: d?.purchaseLineNumber,
          purchaseOrderId: d?.purchaseOrderId,
          purchaseOrderNumber: d?.purchaseOrderNumber,
          quantity: d?.quantity,
          uom: d?.uom,

          dueDate: moment.utc(d?.dueDate).format('MM/DD/YYYY') */}
                <Box className={'sortText'} sx={{ mr: 2, pl: 2, pt: 4, pb: 2 }}>
                  <div
                    onClick={(e) => mkcustomSort(['quantity', 'ASC'])}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Quantity: Asc - Dec
                  </div>
                  <div
                    onClick={(e) => mkcustomSort(['quantity', 'DESC'])}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Quantity: Dec - Asc
                  </div>
                  <div
                    onClick={(e) => mkcustomSort(['dueDate', 'ASC'])}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Due Date: Asc - Dec
                  </div>
                  <div
                    onClick={(e) => mkcustomSort(['dueDate', 'DESC'])}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Due Date: Dec - Asc
                  </div>
                </Box>
              </Popover>
              <Box sx={{ paddingLeft: '15px' }}>
                {getMKInventoryExcel && getMKInventoryExcel?.content && (
                  <CustomButton>
                    {!mkExcelToggle ? (
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
                        data={inventoryExcel}
                        filename={'Products:Incoming M/K Inventory'}
                        title="Export as CSV"
                      >
                        <img src={exportIcon}></img>
                      </CSVLink>
                    )}
                  </CustomButton>
                )}
              </Box>
            </>
          )}
          {tab === 'open orders' && (
            <>
              {' '}
              <Box sx={{ pl: 2 }}>
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
                    onClick={(e) => openOrdercustomSort('createdBy:asc')}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Created By: A - Z
                  </div>
                  <div
                    onClick={(e) => openOrdercustomSort('createdBy:dec')}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    {' '}
                    Created By: Z - A
                  </div>
                  <div
                    onClick={(e) => openOrdercustomSort('qty:asc')}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Quantity: Asc - Dec
                  </div>
                  <div
                    onClick={(e) => openOrdercustomSort('qty:dec')}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Quantity: Dec - Asc
                  </div>
                  <div
                    onClick={(e) => openOrdercustomSort('dueDate:asc')}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Due Date: Asc - Dec
                  </div>
                  <div
                    onClick={(e) => openOrdercustomSort('dueDate:dec')}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Due Date: Dec - Asc
                  </div>
                </Box>
              </Popover>
              <Box sx={{ paddingLeft: '15px' }}>
                {csvData && (
                  <CustomButton>
                    <CSVLink
                      data={csvData}
                      filename={'Products:Open Orders'}
                      title="Export as CSV"
                    >
                      <img src={exportIcon}></img>
                    </CSVLink>
                  </CustomButton>
                )}
              </Box>
            </>
          )}

          {tab === 'product list' && (
            <>
              {' '}
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
                anchorEl={sortanchorEl}
                onClose={sorthandleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
              >
                <Box className={'sortText'} sx={{ mr: 2, pl: 2, pt: 4, pb: 2 }}>
                  <div
                    onClick={(e) => customSort(['partNumber', 'ASC'])}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Part Number: Asc - Dec
                  </div>
                  <div
                    onClick={(e) => customSort(['partNumber', 'DESC'])}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Part Number: Dec - Asc
                  </div>
                </Box>
              </Popover>
              <Box sx={{ paddingLeft: '' }}>
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
                      data={productCsvData}
                      filename={'Product List'}
                      title="Export as CSV"
                    >
                      <img src={exportIcon}></img>
                    </CSVLink>
                  )}
                </CustomButton>
              </Box>
            </>
          )}
        </Box>
      </Box>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}{' '}
      <div className="custom-pg-table-content-sec">
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
            Product List
          </TabItem>
          <TabItem
            className={`TEST2` && tab === 'open orders' && 'tabActive'}
            id="TEST2"
            onClick={() => setTab('open orders')}
          >
            Open Orders
          </TabItem>
          <TabItem
            className={`TEST5` && tab === 'inventory' && 'tabActive'}
            id="TEST5"
            onClick={() => setTab('inventory')}
          >
            Incoming M/K Inventory
          </TabItem>
        </Box>
      </div>
      {/* MODAL AND POPOVERS */}
      <CustomModal open={openModal} onClose={handleModalClose}>
        <Box sx={style}>
          <ModalHeader>Edit Part Numbers</ModalHeader>

          {editLeadsModal()}

          <form onSubmit={handleSubmit}>
            <Box>
              <PartNameText sx={{ margin: '42px 0 16px 0' }}>
                Enter Details
              </PartNameText>
              <Box>
                <LabelBox>Lead Times</LabelBox>
                <Box
                  sx={{
                    '& > :not(style)': {},
                    display: 'flex',
                    flexDirection: 'row'
                  }}
                >
                  <CustomInput
                    onChange={(e) => handleLeadTimeChange(e)}
                    name="leadTimes"
                    autoComplete="none"
                    type="text"
                  />
                  <InputBox
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    Wks
                  </InputBox>
                </Box>
              </Box>
              <div style={{ marginTop: '20px' }}>
                <Box
                  sx={{
                    '& > :not(style)': { mr: 2, mt: 3 },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'right'
                  }}
                >
                  <Grid item xs={6} md={2}>
                    <CancelButton onClick={handleModalClose}>
                      Cancel
                    </CancelButton>
                  </Grid>
                  <Grid item xs={6} md={2}>
                    <CancelButton type="submit">Update</CancelButton>
                  </Grid>
                </Box>
              </div>
            </Box>
          </form>
        </Box>
      </CustomModal>
      <CustomModal
        open={openPlaceOrderModal}
        onClose={handlePlaceOrderModalClose}
      >
        <Box sx={placeOrderStyle}>
          <PlaceOrderForm
            handleModalClose={handlePlaceOrderModalClose}
            selectedData={placeOrderData}
            sd={selectedData}
            shippingLocations={shippingLocations}
            gridRef={gridRef}
            setSelectedData={setSelectedData}
            handleDeselect={gridRef}
            page={page}
            setPage={setPage}
            sx={{ visibility: 'Hidden' }}
          />
        </Box>
      </CustomModal>
      {tab && tab === 'product list' && (
        <TableContainer style={gridStyle}>
          <>
            <Box
              className="ag-theme-alpine"
              style={{
                maxWidth: '100%',
                width: '100%'
              }}
            >
              {productTable()}
              {onRerender(gridRef.current)}
            </Box>
            <Box
              sx={{
                '& > :not(style)': { mr: 2, mt: 2 },
                display: { md: 'flex', xs: 'box' },
                flexDirection: 'row-reverse'
              }}
            >
              {/* {PaginationProduct()} */}

              <Pagination
                count={getViewProducts?.totalPages}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
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
          </>
        </TableContainer>
      )}
      {tab && tab === 'inventory' && (
        <TableContainer style={gridStyle}>
          <>
            <Box
              className="ag-theme-alpine"
              style={{
                maxWidth: '100%',
                width: '100%'
              }}
            >
              {inventoryTable()}
            </Box>
            <Box
              sx={{
                '& > :not(style)': { mr: 2, mt: 2 },
                display: { md: 'flex', xs: 'box' },
                flexDirection: 'row-reverse'
              }}
            >
              <AppPagination setPage={setInventoryPage} {...getInventoryData} />{' '}
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
            </Box>{' '}
          </>
        </TableContainer>
      )}
      {tab && tab === 'open orders' && (
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
              // onFirstDataRendered={onFirstDataRendered}
              domLayout={'autoHeight'}
              defaultColDef={defaultColDef} // Default Column Properties
              rowData={!search ? openOrderData : bluePrint(openOrderData)}
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              rowSelection="multiple" // Options - allows click selection of rows
              frameworkComponents={{ quantityComponent }}
            >
              <AgGridColumn
                resizable={true}
                field="purchaseOrderNumber"
                headerName="P.O Number"
              ></AgGridColumn>
              <AgGridColumn resizable={true} field="partNumber"></AgGridColumn>
              <AgGridColumn
                resizable={true}
                field="product"
                headerName="Product Description"
              ></AgGridColumn>
              <AgGridColumn
                resizable={true}
                field="mkSONumber"
                headerName="MK SO Number"
              ></AgGridColumn>
              <AgGridColumn resizable={true} field="dueDate"></AgGridColumn>
              <AgGridColumn resizable={true} field="createdBy"></AgGridColumn>
              <AgGridColumn resizable={true} field="createdDate"></AgGridColumn>

              <AgGridColumn
                resizable={true}
                field="qty"
                headerName="Quantity"
                cellRenderer="quantityComponent"
              ></AgGridColumn>
              <AgGridColumn resizable={true} field="source"></AgGridColumn>
              <AgGridColumn resizable={true} field="status"></AgGridColumn>
            </AgGridReact>
          </Box>
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
              page={openOrderpage}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
            <SortingCount
              options={options}
              onChange={handleOpenOrderCountChange}
            />
          </Box>
        </TableContainer>
      )}
    </div>
  );
};
export default CustomerPortalTable;
