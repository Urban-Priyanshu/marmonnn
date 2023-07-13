import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import sortIcon from '../../../../../../../assets/Icons/sort.svg';
import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { Link, useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import SortingCount from '../../../../../../../services/sortingCount/SortingCount';

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

import filterIcon from 'src/assets/Icons/Filter.png';
import exportIcon from 'src/assets/Icons/export.png';

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
  getOrderHistory
} from 'src/redux/actions/CustomerPortalActions';
import { AgGroupComponent } from 'ag-grid-community';
import { downloadLogo } from 'src/redux/actions/sysAdminActions';
import {
  getAllCartOrderByUserId,
  getAllCustomerShippingLocations
} from 'src/redux/actions/customerCartActions';
import { ActionTypes } from 'src/redux/constants/action-types';
import { toast } from 'react-toastify';
import Breadcrumb from 'src/components/Breadcrumb';

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

const ListHeader = styled(Box)(
  () => `font-weight: 700;
      font-size: 12px;
      color: #15364A;
          `
);

const ListText = styled(Box)(
  () => `font-weight: 400;
    font-size: 14px;
    color: #15364A;
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

// const TableContainer = styled(Box)(
//   () => `
//         padding: 15px 24px;
//         background-color: white;
//         box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.08);
//         border-radius: 3px;

//         `
// );

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
const CompareForecast = () => {
  const { state } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const gridRef2 = useRef(); // Optional - for accessing Grid's API
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [openPlaceOrderModal, setopenPlaceOrderModal] = React.useState(false);
  const [deactivated, setDeactivated] = React.useState(false);
  const [reduceHeader, setReduceHeader] = useState([]);
  const [values, setValues] = useState();
  const [data, setdata] = useState([]);



  const { partNumber } = useParams();

  const userData = useSelector((state) => state?.users?.usersData);
  const getViewProducts = useSelector(
    (state) => state?.customerPortal?.getCustomerViewProducts
  );

  const getOpenOrders = useSelector(
    (state) => state?.customerPortal?.getCustomerOpenOrders
  );

  const getOpenOrderProductInfo = useSelector(
    (state) => state?.customerPortal?.getOpenOrdersDetails
  );
  const getOrderHistoryData = useSelector(
    (state) => state?.customerPortal?.getOrderHistoryDetails
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
  const ForecastCompareData = useSelector(
    (state) => state?.customers?.getForecastCompareData
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [tableData, setTableData] = useState();
  const [allParts, setAllParts] = useState();
  const [partsAddedTableData, setPartsAddedTableData] = useState();
  const [deltaTableData, setDeltaTableData] = useState();

  const [sortType, setSortType] = useState('');
  const [sort, setSort] = useState(false);
  const [sortanchorEl, setsortAnchorEl] = useState(null);
  const [tab, setTab] = useState('Part Comparison');
  const [paginationData, setPaginationData] = useState();
  const [varpaginationData, setVarPaginationData] = useState();
  const [addedPaginationData, setAddedPaginationData] = useState();
  const [removedPaginationData, setRemovedPaginationData] = useState();
  const [varExcelData, setVarExcelData] = useState([]);
  const [deltaExcelData, setDeltaExcelData] = useState([]);
  const [selectedData, setSelectedData] = React.useState([]);

  const [filteredData, setFilteredData] = React.useState({
    role: [],
    status: []
  });

  let [page, setPage] = useState(1);
  let [partsAddedPage, setPartsAddedPage] = useState(1);
  let [partsRemovedPage, setPartsRemovedPage] = useState(1);
  let [varpage, setVarPage] = useState(1);
  let [active, setActive] = useState(false);

  const options = [10, 20, 50, 100];
  const [itemsPerPage, setItemsPerPage] = useState(options[0]);

  const handleCountChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    // do something with the new itemsPerPage value, e.g. fetch new data from a server
  };

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

  const handleChange = (e, p) => {
    setPage(p);
    if (paginationData) {
      paginationData?.jump(p);
    }
  };

  const handleVarChange = (e, p) => {
    setVarPage(p);
    if (varpaginationData) {
      varpaginationData?.jump(p);
    }
  };

  const handlePartsAddedPageChange = (e, p) => {
    setPartsAddedPage(p);
    if (addedPaginationData) {
      addedPaginationData?.jump(p);
    }
  };

  const handlePartsRemovedPageChange = (e, p) => {
    setPartsRemovedPage(p);
    if (removedPaginationData) {
      removedPaginationData?.jump(p);
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
  }, [customerData]);

  useEffect(() => {
    setItemsPerPage(options[0]);
  }, [tab]);

  useEffect(() => {
    if (ForecastCompareData) {
      const compareData = ForecastCompareData?.items?.map((item) => {
        let obj = {
          partNumber: item?.partNumber,

          description: item?.description,

          uom: item?.uom
        };

        let obj2 = {};

        ForecastCompareData?.dates?.forEach((date) => {
          obj2 = {
            ...obj2,
            [date]: `${item?.forecasts[date]?.[state?.file1]?.value ?? 0}/${
              item?.forecasts[date]?.[state?.file2]?.value ?? 0
            }`
          };
        });

        return { ...obj, ...obj2 };
      });

      let finalData =
        sortType === 'partNumber:asc'
          ? compareData.sort((a, b) => (a.partNumber > b.partNumber ? 1 : -1))
          : sortType === 'partNumber:dec'
          ? compareData.sort((a, b) => (a.partNumber < b.partNumber ? 1 : -1))
          : compareData;

      const data = usePagination(
        finalData,
        itemsPerPage,
        currentPage,
        setCurrentPage
      );

      setVarExcelData(finalData);
      setVarPaginationData(data);

      setTableData(data?.currentData());
    }

 
  }, [varpage, itemsPerPage, sort, sortType]);

  useEffect(() => {
    if (ForecastCompareData) {
      const compareData = ForecastCompareData?.items?.map((item) => {
        let obj = {
          partNumber: item?.partNumber,

          description: item?.description,

          uom: item?.uom
        };

        let obj2 = {};

        ForecastCompareData?.dates?.forEach((date) => {
          obj2 = {
            ...obj2,
            [date]: `${
              (item?.forecasts[date]?.[state?.file1]?.value ?? 0) -
              (item?.forecasts[date]?.[state?.file2]?.value ?? 0)
            }`
          };
        });

        return { ...obj, ...obj2 };
      });

      let finalData =
        sortType === 'partNumber:asc'
          ? compareData.sort((a, b) => (a.partNumber > b.partNumber ? 1 : -1))
          : sortType === 'partNumber:dec'
          ? compareData.sort((a, b) => (a.partNumber < b.partNumber ? 1 : -1))
          : compareData;

      const data = usePagination(
        finalData,
        itemsPerPage,
        currentPage,
        setCurrentPage
      );
     
      setDeltaExcelData(finalData);
      setPaginationData(data);

      setDeltaTableData(data?.currentData());
    }

  
  }, [page, itemsPerPage, sort, sortType]);

  useEffect(() => {
    const combinedArray = [];

    if (
      ForecastCompareData &&
      ForecastCompareData?.partsAdded &&
      ForecastCompareData?.partsRemoved &&
      ForecastCompareData?.partsRemoved?.length ||
        ForecastCompareData?.partsAdded?.length
    ) {
    
      for (let i = 0; i < ForecastCompareData?.partsRemoved?.length; i++) {
        combinedArray.push({
          partsAdded: ForecastCompareData?.partsAdded[i],
          partsRemoved: ForecastCompareData?.partsRemoved[i]
        });
        
      }
    }

    if (
      ForecastCompareData &&
      ForecastCompareData?.partsAdded &&
      ForecastCompareData?.partsRemoved &&
      ForecastCompareData?.partsAdded?.length ||
        ForecastCompareData?.partsRemoved?.length
    ) {
      for (let i = 0; i < ForecastCompareData?.partsAdded?.length; i++) {
        combinedArray.push({
          partsAdded: ForecastCompareData?.partsAdded[i],
          partsRemoved: ForecastCompareData?.partsRemoved[i]
        });
      }
    }

   

      const removeDuplicates = arr => {
        const result = [];
        const seen = new Set();
      
        for (let i = 0; i < arr.length; i++) {
          const stringified = JSON.stringify(arr[i]);
          if (!seen.has(stringified)) {
            seen.add(stringified);
            result.push(arr[i]);
          }
        }
      
        return result;
      }


      const filteredArr = removeDuplicates(combinedArray);
     

      if (ForecastCompareData) {
        const data = usePagination(
          filteredArr,
          itemsPerPage,
          currentPage,
          setCurrentPage
        );
      setRemovedPaginationData(data);
      setAllParts(data?.currentData());
    
    }
  }, [partsRemovedPage, itemsPerPage ]);




  const partComparisonCSVAdded = ForecastCompareData?.partsAdded?.map((d) => {
    return { partsAdded: d?.partNumber };
  });

  const partComparisonCSVRemoved = ForecastCompareData?.partsRemoved?.map(
    (d) => {
      return { partsRemoved: d?.partNumber };
    }
  );

  const partComparisonCSV = [
    ...partComparisonCSVAdded,
    ...partComparisonCSVRemoved
  ];

  //    // Example using Grid's API
  const bluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          partNumber: d?.partNumber,
          poNumber: d?.poNumber,
          orderNumber: d?.orderNumber,
          packingList: d?.packingList,
          pod: d?.pod,
          dueDate: moment.utc(d?.dueDate).format('MM/DD/YYYY HH:mm'),
          invoice: d?.invoice,
          status: d?.status?.map((res) => res),
          qty: d?.qty + d?.uom
        };
      })
    );
  };

  const compareCsv = [
    ForecastCompareData?.items?.map((d) => {
      return {
        partNumber: d?.partNumber,
        description: d?.description,
        uom: d?.uom
      };
    })
  ];

  // const reduceTableData = tableData?.reduce((a, b) => {
  //   const newArr = b?.branchInventories?.map((d) => d?.branchName);
  //   a = [...new Set([...a, ...newArr])];
  //   return a;
  // }, []);

  // setReduceHeader(reduceTableData);

  useEffect(() => {
    if (customerData) {
      dispatch(
        getCustomerViewProducts(
          customerData?.customerNumber,
          10,
          page,
          'ASC',
          authToken,
          searchValue
        )
      );
    }
  }, [page, searchValue, customerData]);

  function LinkComponent(props) {
    return (
      <Link to={'/under-dev'}>
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
      </Link>
    );
  }

  function deltaVariance(props) {
    let file1 = props?.data?.[props?.colDef?.field] ?? 0;

    let file2 = props?.data?.[props?.colDef?.field]?.[state?.file2]?.value ?? 0;

    return (
      <div>
        <span
          style={{
            color:
              (file1 > file2 && '#46BD60') ||
              (file1 < file2 && '#E70F0F') ||
              (file1 === file2 && '#343D42'),
            fontWeight: '700',
            fontSize: '12px'
          }}
        >
          {`${file1}` ?? 0}
        </span>
      </div>
    );
  }

  function forecastComparisonDateComponent(props) {
    let file1 = +props?.data?.[props?.colDef?.field]?.split('/')[0];

    let file2 = +props?.data?.[props?.colDef?.field]?.split('/')[1];

    return (
      <div>
        <span
          style={{
            color:
              (file1 > file2 && '#46BD60') ||
              (file1 < file2 && '#E70F0F') ||
              (file1 === file2 && '#343D42'),
            fontWeight: '700',
            fontSize: '12px'
          }}
        >
          {/* {file1 || file2
            ? `${file1} /
              ${file2}`
            : '-'} */}
          {props?.value === '0/0' ? '-' : props?.value}
        </span>
      </div>
    );
  }

  function PartComponent(props) {
    return (
      <div>
        {props?.data?.description === null ? (
          <span style={{ color: 'red' }}>{props?.data?.partNumber}</span>
        ) : (
          <span>{props?.data?.partNumber}</span>
        )}
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

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const deltaVarExport = useCallback(() => {
    gridRef2.current.api.exportDataAsCsv();
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

  const onFilterTextBoxChanged2 = useCallback(() => {
    setSearch(true);
    gridRef2.current.api.setQuickFilter(
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

  const handleClose = () => {
    setAnchorEl(null);
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
    if (selectedData.length) {
      setOpenModal(true);
    } else {
      toast.error('Please choose the part number to edit');
    }
  };

  const handleOpenPlaceOrder = () => {
    if (selectedData?.length) {
      const shippingLoc = shippingLocations?.find((d) => d?.primary);

      setSelectedData(
        selectedData?.map((val) => ({
          ...val,
          shippingLocationId: shippingLoc?.id
        }))
      );

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
      role: [],
      status: []
    });
  };

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllCustomerShippingLocations(customerData?.id, authToken));
  }, [customerData]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = selectedData?.map((d) => {
      return { partNumber: d?.partNumber, leadTime: parseInt(values) };
    });

    dispatch(
      updateLeadTime(
        customerData?.customerNumber,
        data,
        authToken,
        handleModalClose
      )
    );
  };

  function inventoryComponent(props) {
    return (
      <div>
        <span>
          {calculateInventory(
            props?.data,
            props?.value,
            props?.colDef?.headerName
          )}
          {/* {props?.value?.find(
            (d) => d?.branchName === props?.colDef?.headerName
          )?.quantity ?? 0} */}
        </span>
      </div>
    );
  }

  const sortingCount = useCallback(() => {
    return <SortingCount options={options} onChange={handleCountChange} />;
  }, [options]);

  const customSort = (e) => {
    setSort(true);
    setSortType(e);
    setPage(1);
    if (paginationData) {
      paginationData?.jump(1);
    }
  };

  const sorthandleClick = (event) => {
    setsortAnchorEl(event.currentTarget);
  };

  const sorthandleClose = () => {
    setsortAnchorEl(null);
  };

  const sortopen = Boolean(sortanchorEl);
  const sortid = sortopen ? 'simple-popover' : undefined;

  return (
    <MainContainer>
      <div>
        <Box sx={{ margin: '0px 0 10px 0' }}>
          <Breadcrumb
            userData={customerData}
            location={[
              {
                location: 'Customer Setup',
                to: `/manage-customers/${customerData?.id}`
              }
            ]}
            page={'Forecast'}
          />
        </Box>
        <Box
          sx={{
            '& > :not(style)': {},
            display: { md: 'flex', xs: 'box' },
            flexDirection: 'row'
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <span style={{ fontSize: '20px', fontWeight: 700 }}>
              Compare Forecast
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

          <Box sx={{ padding: '0 !important;' }}>
            {tab === 'VAR By Week' && (
              <TextField
                id="filter-text-box"
                label="Search by part number"
                size="small"
                type="text"
                onInput={() => onFilterTextBoxChanged()}
                sx={{
                  backgroundColor: 'white',
                  width: '300px',
                  border: '1px solid #E6E6E6',
                  borderRadius: '0px !important',
                  fontWeight: '400',
                  fontSize: '12px !important',
                  border: '0px'
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
            {tab === 'Delta Variance' && (
              <TextField
                id="filter-text-box"
                label="Search by part number"
                size="small"
                type="text"
                onInput={() => onFilterTextBoxChanged2()}
                sx={{
                  backgroundColor: 'white',
                  width: '300px',
                  border: '1px solid #E6E6E6',
                  borderRadius: '0px !important',
                  fontWeight: '400',
                  fontSize: '12px !important',
                  border: '0px'
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

          <Box sx={{ paddingLeft: '15px' }}></Box>
          {/* <img src={customerPortalLogo}></img> */}
          {/* {customerData?.logo && (
            <img src={`data:image/jpeg;base64,${logoImage}`}></img>
          )} */}
        </Box>
        <Box
          sx={{
            '& > :not(style)': { mt: 3 },
            display: { md: 'flex', xs: 'box' },
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <span
              style={{ fontWeight: '400', fontSize: '20px', color: '#EB4F0C' }}
            >
              Customer Number : {customerData?.customerNumber} Customer Name |
              {' ' + customerData?.customerName}
            </span>
          </Box>
          {ForecastCompareData && tab === 'Part Comparison' && (
            <CSVLink data={partComparisonCSV} filename={'Part_comparison.csv'}>
              <CustomButton>
                <img src={exportIcon}></img>
              </CustomButton>
            </CSVLink>
          )}{' '}
          {tab === 'VAR By Week' && (
            <>
              {' '}
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
                    onClick={(e) => customSort('partNumber:asc')}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Part Number: Asc - Dec
                  </div>
                  <div
                    onClick={(e) => customSort('partNumber:dec')}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Part Number: Dec - Asc
                  </div>
                </Box>
              </Popover>
              <Box sx={{ paddingLeft: '15px' }}>
                <CustomButton title="Export as CSV">
                  <CSVLink
                    data={varExcelData ?? []}
                    filename={'Compare Forecast:Var By Week'}
                    title="Export as CSV"
                  >
                    <img src={exportIcon}></img>
                  </CSVLink>
                </CustomButton>
              </Box>
            </>
          )}
          {tab === 'Delta Variance' && (
            <>
              {' '}
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
                    onClick={(e) => customSort('partNumber:asc')}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Part Number: Asc - Dec
                  </div>
                  <div
                    onClick={(e) => customSort('partNumber:dec')}
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                  >
                    Part Number: Dec - Asc
                  </div>
                </Box>
              </Popover>
              <Box sx={{ paddingLeft: '15px' }}>
                <CustomButton title="Export as CSV">
                  {/* <img src={exportIcon}></img>*/}
                  <CSVLink
                    data={deltaExcelData ?? []}
                    filename={'Compare Forecast:Delta Variance'}
                    title="Export as CSV"
                  >
                    <img src={exportIcon}></img>
                  </CSVLink>
                </CustomButton>
              </Box>
            </>
          )}
        </Box>
        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}{' '}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
          }}
        >
          <TabItem
            className={`TEST` && tab === 'Part Comparison' && 'tabActive'}
            id="TEST"
            onClick={() => setTab('Part Comparison')}
          >
            Part Comparison
          </TabItem>
          <TabItem
            className={`TEST2` && tab === 'VAR By Week' && 'tabActive'}
            id="TEST2"
            onClick={() => setTab('VAR By Week')}
          >
            VAR By Week
          </TabItem>
          <TabItem
            className={`TEST5` && tab === 'Delta Variance' && 'tabActive'}
            id="TEST5"
            onClick={() => setTab('Delta Variance')}
          >
            Delta Variance
          </TabItem>
        </Box>
        {/* MODAL AND POPOVERS */}
        {tab && tab === 'Part Comparison' && (
          <>
            <TableContainer
              style={{ bgcolor: 'background.paper', height: '500px' }}
            >
              <Box
                sx={{
                  '& > :not(style)': {},
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <Table
                  sx={{ minWidth: 700, backgroundColor: 'white' }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'white' }}>
                      <StyledTableCell>
                        Dropped Items (
                        {ForecastCompareData?.partsRemoved?.length})
                      </StyledTableCell>{' '}
                      <StyledTableCell>
                        Added Items ({ForecastCompareData?.partsAdded?.length})
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allParts &&
                      allParts?.map((d) => (
                        <StyledTableRow key={d[0]}>
                          <StyledTableCell>
                            {d?.partsRemoved?.partDescription === null ? (
                              <div style={{ color: 'red' }}>
                                {d?.partsRemoved?.partNumber}
                              </div>
                            ) : (
                              <div style={{ color: 'black' }}>
                                {d?.partsRemoved?.partNumber}
                              </div>
                            )}
                          </StyledTableCell>
                          <StyledTableCell>
                            {d?.partsAdded?.partDescription === null ? (
                              <div style={{ color: 'red' }}>
                                {d?.partsAdded?.partNumber}
                              </div>
                            ) : (
                              <div style={{ color: 'black' }}>
                                {d?.partsAdded?.partNumber}
                              </div>
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>{' '}
                </Table>

                {/* <Table
                  sx={{ minWidth: 700, backgroundColor: 'white' }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'white' }}>
                      <StyledTableCell>
                        Added Items ({ForecastCompareData?.partsAdded?.length})
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {partsAddedTableData &&
                      partsAddedTableData?.map((d) => (
                        <StyledTableRow key={d[0]}>
                          {d?.partDescription != null ? (
                            <StyledTableCell> {d?.partNumber}</StyledTableCell>
                          ) : (
                            <StyledTableCell style={{ color: 'red' }}>
                              {' '}
                              {d?.partNumber}
                            </StyledTableCell>
                          )}
                        </StyledTableRow>
                      ))}
                  </TableBody>{' '}
                </Table> */}
              </Box>
            </TableContainer>{' '}
            <Grid style={{ marginTop: '20px' }} container>
              <Grid style={{ textAlign: 'right' }} md={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {sortingCount()}
                  <Pagination
                    count={removedPaginationData?.maxPage}
                    size="large"
                    page={partsRemovedPage}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePartsRemovedPageChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </>
        )}
        {tab && tab === 'VAR By Week' && (
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
                rowData={getFilteredData(
                  tableData,
                  filteredData,
                  'systemAdmin'
                )}
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection="multiple" // Options - allows click selection of rows
                frameworkComponents={{
                  forecastComparisonDateComponent,
                  PartComponent
                }}
              >
                <AgGridColumn
                  field="partNumber"
                  headerName="Part Number"
                  cellRenderer="PartComponent"
                ></AgGridColumn>
                <AgGridColumn
                  resizable={true}
                  field="description"
                  headerName="Description"
                ></AgGridColumn>
                <AgGridColumn field="uom" headerName="UOM"></AgGridColumn>
                {ForecastCompareData?.dates?.map((d) => (
                  <AgGridColumn
                    key={d}
                    field={d}
                    cellRenderer="forecastComparisonDateComponent"
                  ></AgGridColumn>
                ))}
              </AgGridReact>
            </Box>
            <Box
              sx={{
                '& > :not(style)': { mr: 2, mt: 2, mb: 2 },
                display: { md: 'flex', xs: 'box' },
                flexDirection: 'row-reverse'
              }}
            >
              <Pagination
                count={varpaginationData?.maxPage}
                size="large"
                page={varpage}
                variant="outlined"
                shape="rounded"
                onChange={handleVarChange}
              />
              <SortingCount options={options} onChange={handleCountChange} />
            </Box>
          </TableContainer>
        )}
        {tab && tab === 'Delta Variance' && (
          <TableContainer style={gridStyle}>
            <Box
              className="ag-theme-alpine"
              style={{
                maxWidth: '100%',
                width: '100%'
              }}
            >
              <AgGridReact
                ref={gridRef2} // Ref for accessing Grid's API
                // onFirstDataRendered={onFirstDataRendered}
                domLayout={'autoHeight'}
                defaultColDef={defaultColDef} // Default Column Properties
                rowData={deltaTableData}
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection="multiple" // Options - allows click selection of rows
                frameworkComponents={{ deltaVariance, PartComponent }}
              >
                <AgGridColumn
                  field="partNumber"
                  headerName="Part Number"
                  cellRenderer="PartComponent"
                ></AgGridColumn>
                <AgGridColumn
                  resizable={true}
                  field="description"
                  headerName="Description"
                ></AgGridColumn>
                <AgGridColumn field="uom" headerName="UOM"></AgGridColumn>
                {ForecastCompareData &&
                  ForecastCompareData?.dates?.map((d) => (
                    <AgGridColumn
                      key={d}
                      field={d}
                      cellRenderer="deltaVariance"
                    ></AgGridColumn>
                  ))}
              </AgGridReact>
            </Box>
            <Box
              sx={{
                '& > :not(style)': { mr: 2, mt: 2, mb: 2 },
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
              {/* <div>
                Page Size:{' '}
                <select onChange={(e) => setPerPage(e.target.value)}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div> */}
              <SortingCount options={options} onChange={handleCountChange} />
            </Box>
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
export default CompareForecast;
