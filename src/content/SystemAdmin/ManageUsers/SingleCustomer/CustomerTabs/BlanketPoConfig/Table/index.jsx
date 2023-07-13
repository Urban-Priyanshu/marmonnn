import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';

import sortIcon from '../../../../../../../assets/Icons/sort.svg';
import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { Pagination } from '@material-ui/lab';
import usePagination from 'src/services/pagination/pagiantion.js';
import Trash from '../../../../../../../assets/Icons/trashRed.svg';
import Switch, { SwitchProps } from '@mui/material/Switch';
import DeleteIcon from '../../../../../../../assets/Icons/Delete.png';
import validate_icon from '../../../../../../../assets/Icons/validate_icon.svg';
import CustomModal from '@mui/material/Modal';
import { ColorRing } from 'react-loader-spinner';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import filterIcon from '../../../../../../../assets/Icons/Filter.png';
import exportIcon from '../../../../../../../assets/Icons/export.png';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { DateRangePicker } from 'react-date-range';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getFilteredData, handleFilter } from 'src/services/Filter';
import { FileUploader } from 'react-drag-drop-files';
import AppPagination from 'src/helpers/appPagination';
import {
  Box,
  Button,
  styled,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import IosShareIcon from '@mui/icons-material/IosShare';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './DataGrid.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCustomers,
  getAllFeatures,
  getAllJobTypes,
  getCustomerNumbers,
  updateStatusByEmail
} from 'src/redux/actions/sysAdminActions';
import {
  changePageExcelBpo,
  changePageFilter,
  deleteBPOHistory,
  getBPOUploadHistory,
  placeBlanketPO,
  uploadBlanketPO,
  validateBlanketPo
} from 'src/redux/actions/BlanketPoActions';
import { addDays, subDays } from 'date-fns';

import moment from 'moment';
import Modal from 'src/components/Modal';
import { updateStatus } from 'src/redux/actions/userActions';
import { DownloadBulkOrder } from 'src/redux/actions/BulkOrderActions';
import { toast } from 'react-toastify';
import SortingCount from 'src/services/sortingCount/SortingCount';

const PER_PAGE = 13;

const ModalHeader = styled(Box)(
  () => `
    font-weight: 900;
    font-size: 18px;
    `
);

const CustomLabel = styled(FormControlLabel)(
  () => `
    margin: 0
    `
);

const CancelButton = styled(Button)(
  () => `
  color: white !important;
  background: #15364A  !important;
  border-radius: 3px  !important;
  height: 38px !important;
  width: 100px !important;

  :hover {
      background-color:  #022f53  !important;
    }
    :disabled {
      opacity: 0.8 !important;
      color: white
    }
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
  bgcolor: 'background.paper',
  boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.12)',
  p: 3,
  bordeRadius: '5px'
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '88%', sm: '100%' },
  bgcolor: 'background.paper',
  boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.12)',
  p: 4,
  bordeRadius: '5px'
};

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

const BPOHistoryTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedData, setSelectedData] = React.useState([]);
  const [active, setActive] = React.useState(false);
  const [deleteInfo, setDeleteInfo] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openTableModal, setOpenTableModal] = React.useState(false);
  const [csvData, setCsvData] = React.useState([]);
  const [file, setFile] = React.useState(null);
  const [loader, setLoader] = React.useState(false);
  const [spaces, setSpaces] = React.useState(false);
  const customerData = useSelector((state) => state?.customers?.customerData);
  let [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState();
  const [excelPage, setExcelPage] = useState(1);
  const [historyTableData, setHistoryTableData] = useState();
  const [paginationData, setPaginationData] = useState();
  const [historyFilter, setHistoryFilter] = useState(false);
  const [modalTableFilter, setModalTableFilter] = useState(false);

  const [sortType, setSortType] = useState('');
  const [sort, setSort] = useState(false);
  const [sortanchorEl, setsortAnchorEl] = useState(null);
  const [statusFilteredData, setStatusFilteredData] = React.useState({
    status: [],
    jobType: [],
    date: {}
  });

  const gridStyle = useMemo(
    () => ({ height: '100%', width: '100%', margin: '12px 0' }),
    []
  );

  const [filteredData, setFilteredData] = React.useState({
    status: [],
    jobType: [],
    date: {}
  });

  const BPOExcelData = useSelector(
    (state) => state?.customers?.getBPOExcelData
  );
  const pageSize = 10;

  const options = [10, 20, 50, 100];
  const [itemsPerPage, setItemsPerPage] = useState(options[0]);
  const [modalItemsPerPage, setModalItemsPerPage] = useState(options[0]);

  const handleCountChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    // do something with the new itemsPerPage value, e.g. fetch new data from a server
  };

  const handleModalCountChange = (e) => {
    setModalItemsPerPage(e?.target?.value);
    // do something with the new itemsPerPage value, e.g. fetch new data from a server
  };

  useEffect(() => {
    setPage(1);
    if (paginationData) {
      paginationData?.jump(1);
    }
  }, [itemsPerPage]);

  const BPOHistoryData = useSelector(
    (state) => state?.customers?.getBPOUploadHistory
  );
  const BpoHistoryId = useSelector(
    (state) => state?.customers?.getBpoHistoryId?.id
  );
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const isLoading = useSelector((state) => state?.loaderStatus?.showLoading);
  const fileTypes = ['CSV', 'XLSX', 'XLS'];

  const handleChange = (e, p) => {
    setPage(p);
    if (paginationData) {
      paginationData?.jump(p);
    }
  };

  //  load data from sever
  useEffect(() => {
    dispatch(getBPOUploadHistory(customerData?.customerNumber, authToken));
  }, []);

  //BLUEPRINT of the incoming data for AG GRID

  const historyBluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          id: d?.id,
          updatedBy: d?.updatedBy,
          fileUploaded: d?.uploadedFileCount,
          uploadedFileUrl: d?.uploadedFileUrl,
          validOrdersFileUrl: d?.validOrdersFileUrl,
          invalidOrdersFileUrl: d?.invalidOrdersFileUrl,
          uploadedFileCount: d?.uploadedFileCount,
          uploadDate: moment.utc(d?.uploadDate).format('MM/DD/YYYY HH:mm'),
          validOrdersFileCount: d?.validOrdersFileCount,
          invalidOrdersFileCount: d?.invalidOrdersFileCount,
          orderStatus: d?.orderStatus?.description,
          uploadFileUrl: d?.uploadFileUrl
        };
      })
    );
  };

  const excelhistoryBluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          uploadedFileUrl: d?.uploadedFileUrl,
          uploadedFileCount: d?.uploadedFileCount,
          updatedBy: d?.updatedBy,
          uploadDate: moment.utc(d?.uploadDate).format('MM/DD/YYYY HH:mm'),
          validOrdersFileCount: d?.validOrdersFileCount,
          invalidOrdersFileCount: d?.invalidOrdersFileCount,
          orderStatus: d?.orderStatus?.description
        };
      })
    );
  };

  useEffect(() => {
    if (BPOHistoryData) {
      const tableBluePrint = historyBluePrint(BPOHistoryData);
      const exceltableBluePrint = excelhistoryBluePrint(BPOHistoryData);
      const filterData = getFilteredData(
        sortType === 'fileUploaded:asc'
          ? tableBluePrint.sort((a, b) =>
              a?.uploadedFileUrl?.substring(
                a?.uploadedFileUrl?.lastIndexOf('/') + 1
              ) >
              b?.uploadedFileUrl?.substring(
                b?.uploadedFileUrl?.lastIndexOf('/') + 1
              )
                ? 1
                : -1
            )
          : sortType === 'fileUploaded:dec'
          ? tableBluePrint.sort((a, b) =>
              a?.uploadedFileUrl?.substring(
                a?.uploadedFileUrl?.lastIndexOf('/') + 1
              ) <
              b?.uploadedFileUrl?.substring(
                b?.uploadedFileUrl?.lastIndexOf('/') + 1
              )
                ? 1
                : -1
            )
          : sortType === 'updatedBy:asc'
          ? tableBluePrint.sort((a, b) => (a.updatedBy > b.updatedBy ? 1 : -1))
          : sortType === 'updatedBy:dec'
          ? tableBluePrint.sort((a, b) => (a.updatedBy < b.updatedBy ? 1 : -1))
          : sortType === 'validOrdersFileCount:asc'
          ? tableBluePrint.sort(
              (a, b) => a.validOrdersFileCount - b.validOrdersFileCount
            )
          : sortType === 'validOrdersFileCount:dec'
          ? tableBluePrint.sort(
              (a, b) => b.validOrdersFileCount - a.validOrdersFileCount
            )
          : sortType === 'totalPartsUploaded:asc'
          ? tableBluePrint.sort(
              (a, b) => a.uploadedFileCount - b.uploadedFileCount
            )
          : sortType === 'totalPartsUploaded:dec'
          ? tableBluePrint.sort(
              (a, b) => b.uploadedFileCount - a.uploadedFileCount
            )
          : tableBluePrint,
        filteredData,
        'config'
      );
      const excelfilterData = getFilteredData(
        exceltableBluePrint,
        filteredData,
        'config'
      );
      const data = usePagination(
        filterData,
        itemsPerPage,
        currentPage,
        setCurrentPage
      );
      setPaginationData(data);
      setCsvData(excelfilterData);

      setHistoryTableData(data?.currentData());
    }
  }, [BPOHistoryData, page, filteredData, itemsPerPage, sortType, sort]);



  const handlePlaceOrder = () => {
    dispatch(
      placeBlanketPO(
        customerData?.customerNumber,
        BpoHistoryId,
        BPOExcelData?.content,
        handleTableModalClose,
        authToken
      )
    );
  };

  const paginationNumberFormatter = useCallback((params) => {
    return '[' + params?.value?.toLocaleString() + ']';
  }, []);

  // useEffect(() => {
  //   if (BPOExcelData) {
  //     const tableBluePrint = bluePrint(BPOExcelData?.content);

  //     // setPaginationData(data);

  //     setTableData(tableBluePrint);
  //   }
  // }, [BPOExcelData?.content, statusFilteredData , excelPage]);

  const handleModalClose = () => {
    setModalOpen(false);
    setOpenModal(false);
    setFile(null);
    // setOpenTableModal(true);
  };

  const handleTableModalClose = () => {
    setModalItemsPerPage(options[0]);
    setSelectedData([]);
    onStatusClearFilter();
    setOpenTableModal(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleFileChange = (file) => {
    setFile(file);
  };
  const deleteBPO = (e, props) => {
    setModalOpen(true);
    setDeleteInfo(props?.data);
  };

  const onDelete = (data) => {
    dispatch(
      deleteBPOHistory(data?.id, customerData?.customerNumber, authToken)
    );
    handleModalClose();
  };

  const handleDownloadExcel = (fileName) => {
    const extension = fileName.split('.').pop();
   
    dispatch(DownloadBulkOrder(fileName, extension, authToken));
  };

  function FileUploadLink(props) {
    return (
      <div
        style={{ cursor: 'pointer', color: '#20A2F3' }}
        onClick={() => handleDownloadExcel(props.data.uploadedFileUrl)}
      >
        <span>
          {props?.value?.substring(props?.value?.lastIndexOf('/') + 1)}
        </span>
      </div>
    );
  }

  function validOrdersLink(props) {
    return (
      <div
        style={{ cursor: 'pointer', color: '#20A2F3' }}
        onClick={() => handleDownloadExcel(props.data.validOrdersFileUrl)}
      >
        <span>{props?.value}</span>
      </div>
    );
  }
  function invalidOrdersLink(props) {
    return (
      <div
        style={{ cursor: 'pointer', color: '#20A2F3' }}
        onClick={() => handleDownloadExcel(props.data.invalidOrdersFileUrl)}
      >
        <span>{props?.value}</span>
      </div>
    );
  }

  function LinkComponent(props) {
    return (
      <Link to="/portal">
        <span>{props?.value}</span>
      </Link>
    );
  }

  function StatusComponent(props) {
    return (
      <div>
        {Array.isArray(props?.value) ? (
          props?.value?.map((d, i) => (
            <span
              key={i}
              style={{
                borderRadius: '30px',
                textAlign: 'center',
                padding: '4px 20px',
                height: '22px',
                color: 'white',
                background:
                  (d === 'Invalid Part' && '#DF4242') ||
                  (d === 'Valid' && '#5AB839') ||
                  (d === 'Insufficient Inventory' && '#DF4242') ||
                  '#DF4242',
                marginTop: '-5px',
                marginRight: '5px'
              }}
            >
              {d}
            </span>
          ))
        ) : (
          <span
            style={{
              borderRadius: '30px',
              textAlign: 'center',
              padding: '4px 20px',
              height: '22px',
              color: 'white',
              background:
                ((props.value === 'Pending' || props.value === 'pending') &&
                  '#FF9029') ||
                ((props.value === 'Processing' ||
                  props.value === 'processing') &&
                  '#46bd60') ||
                ((props.value === 'Uploaded' || props.value === 'uploaded') &&
                  '#46bd60') ||
                'red',
              marginTop: '-5px'
            }}
          >
            {props?.value}
          </span>
        )}
      </div>
    );
  }

  function AssociateCusNoComponent(props) {
    return (
      <div>
        {props.value}
        &nbsp; &nbsp;
        {/* <span
          style={{
            background: '#20A2F3',
            padding: '5px',
            color: 'white',
            borderRadius: '100%'
          }}
        >
          +5
        </span> */}
      </div>
    );
  }

  const validateBO = (e, props) => {
    setLoader(true);
    dispatch(
      validateBlanketPo(
        props?.data?.id,
        customerData?.customerNumber,
        authToken,
        setOpenTableModal,
        modalItemsPerPage,
        excelPage
      )
    );
    handleModalClose();
  };
  function ActionComponent(props) {
    return (
      <Box
        sx={{
          '& > :not(style)': { mr: 3 }
        }}
      >
        <ValidateButton
          className="Img"
          style={{ cursor: 'pointer' }}
          disabled={
            props?.data?.orderStatus === 'Pending'
              ? false
              : true || props?.data?.orderStatus === 'Uploaded'
              ? true
              : false
          }
          onClick={(e) => validateBO(e, props)}
        >
          Validate
        </ValidateButton>
        <input
          type="image"
          className="Img"
          disabled={
            props?.data?.orderStatus === 'Pending'
              ? false
              : true || props?.data?.orderStatus === 'Uploaded'
              ? true
              : false
          }
          style={{
            cursor: 'pointer',
            opacity: props?.data?.orderStatus === 'Uploaded' && '0.5'
          }}
          onClick={(e) => deleteBPO(e, props)}
          src={DeleteIcon}
        ></input>
      </Box>
    );
  }
  function validateComponent(props) {
    return (
      <div style={{ textAlign: 'center' }}>
        <ValidateButton
          className="Img"
          style={{ cursor: 'pointer' }}
          disabled={
            props?.data?.orderStatus === 'Pending'
              ? false
              : true || props?.data?.orderStatus === 'Uploaded'
              ? true
              : false
          }
          onClick={(e) => validateBO(e, props)}
        >
          Validate
        </ValidateButton>
      </div>
    );
  }
  const handleUploadBPO = () => {
    const fd = new FormData();
    fd.append('file', file);

    dispatch(
      uploadBlanketPO(
        customerData?.customerNumber,
        spaces,
        fd,
        authToken,
        setOpenTableModal,
        modalItemsPerPage,
        excelPage
      )
    );
    setFile(null);
    handleModalClose();
  };
  useEffect(() => {
    const fd = new FormData();
    fd.append('file', file);

    if (openTableModal) {
      dispatch(
        changePageExcelBpo(
          customerData?.customerNumber,
          spaces,
          fd,
          authToken,
          setOpenTableModal,
          modalItemsPerPage,
          excelPage,
          BpoHistoryId,
          statusFilteredData
        )
      );
    }
  }, [excelPage]);

  useEffect(() => {
    const fd = new FormData();
    fd.append('file', file);

    if (openTableModal) {
      dispatch(
        changePageExcelBpo(
          customerData?.customerNumber,
          spaces,
          fd,
          authToken,
          setOpenTableModal,
          modalItemsPerPage,
          excelPage,
          BpoHistoryId,
          statusFilteredData
        )
      );
    }
  }, [modalItemsPerPage]);



  useEffect(() => {
    const fd = new FormData();
    fd.append('file', file);

    if (openTableModal) {
      dispatch(
        changePageFilter(
          customerData?.customerNumber,
          spaces,
          fd,
          authToken,
          setOpenTableModal,
          modalItemsPerPage,
          excelPage,
          BpoHistoryId,
          statusFilteredData
        )
      );
    }
  }, [statusFilteredData]);
  useEffect(() => {
    const fd = new FormData();
    fd.append('file', file);

    if (openTableModal) {
      dispatch(
        changePageFilter(
          customerData?.customerNumber,
          spaces,
          fd,
          authToken,
          setOpenTableModal,
          modalItemsPerPage,
          excelPage,
          BpoHistoryId,
          statusFilteredData
        )
      );
    }
  }, [modalItemsPerPage]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: false
  }));

  // Example using Grid's API

 
  const onTrashClick = () => {
    setFile(null);
  };

  const onSpacesSwitchChange = (e) => {
    if (spaces) {
      setSpaces(e.target.checked);
    } else {
      setSpaces(e.target.checked);
    }
  };

  const handleClick = (event) => {
    setModalTableFilter(false);
    setHistoryFilter(true);
    setActive(true);
    setAnchorEl(event?.currentTarget);
  };

  const handleStatusFilter = (event) => {
    setHistoryFilter(false);
    setModalTableFilter(true);
    setActive(true);
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onBtnExport = useCallback((params) => {
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  let width = 100;

  const onFirstDataRendered = (params) => {
    params?.api?.sizeColumnsToFit();
  };

  const onGridSizeChanged = (params) => {
    let columnCount = params.columnApi.columnModel.gridColumns.length;
    width = params.clientWidth / columnCount;
    params.api.sizeColumnsToFit();
  };

  const onClearFilter = () => {
    setFilteredData({
      status: [],
      jobType: [],
      date: {}
    });

    setState([
      {
        startDate: subDays(new Date(), 0),
        endDate: addDays(new Date(), 0),
        key: 'selection'
      }
    ]);
  };

  const onStatusClearFilter = () => {
    setStatusFilteredData({
      status: [],
      jobType: [],
      date: {}
    });

    setState([
      {
        startDate: subDays(new Date(), 0),
        endDate: addDays(new Date(), 0),
        key: 'selection'
      }
    ]);
    dispatch(getBPOUploadHistory(customerData?.customerNumber, authToken));
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

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    setState([selection]);

    handleFilter(ranges, 'date', filteredData, setFilteredData);
  };

  const onRerender = useCallback(
    (params) => {
      setTimeout(function () {
        if (params && params.api && selectedData[excelPage]) {
          const ids = selectedData[excelPage]?.map((d) => d?.id);
         
          params.api.forEachNode((node, i) => {
          

            node.setSelected(ids?.includes(node?.data?.id));
          });
        }
      }, 100);
    },
    [excelPage, selectedData]
  );

  const productTable = useCallback(() => {
    return (
      <AgGridReact
        ref={gridRef} // Ref for accessing Grid's API
        // onFirstDataRendered={onFirstDataRendered}
        domLayout={'autoHeight'}
        // onGridSizeChanged={onGridSizeChanged}
        defaultColDef={defaultColDef} // Default Column Properties
        rowData={BPOExcelData?.content}
        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        rowSelection="multiple" // Options - allows click selection of rows
        frameworkComponents={{
          LinkComponent,
          StatusComponent,
          ActionComponent,
          AssociateCusNoComponent
        }}
      >
        <AgGridColumn resizable={true} field="partNumber"></AgGridColumn>
        <AgGridColumn
          resizable={true}
          field="poNumber"
          headerName="PO Number"
        ></AgGridColumn>
        <AgGridColumn resizable={true} field="quantity"></AgGridColumn>
        <AgGridColumn
          resizable={true}
          field="uom"
          headerName="UOM"
        ></AgGridColumn>
        <AgGridColumn resizable={true} field="price"></AgGridColumn>
        <AgGridColumn resizable={true} field="effectiveDate"></AgGridColumn>
        <AgGridColumn resizable={true} field="endDate"></AgGridColumn>
        <AgGridColumn
          cellRenderer="StatusComponent"
          field="status"
          resizable={true}
          width={1000}
        ></AgGridColumn>
      </AgGridReact>
    );
  }, [excelPage, onRerender, BPOExcelData?.content, modalItemsPerPage]);

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

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const sortopen = Boolean(sortanchorEl);
  const sortid = sortopen ? 'simple-popover' : undefined;
  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { mr: 1 },
          display: { md: 'flex', xs: 'box' },
          flexDirection: 'row'
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ flexGrow: 1 }}>
          <span style={{ fontSize: '20px', fontWeight: 700 }}>
            Upload History
          </span>{' '}
          <Box sx={{ fontSize: '12px' }}>
            <Box>
              {filteredData.status.length > 0 &&
                'Applied Filters (Status): ' +
                  filteredData.status.map((d) => d)}
            </Box>
          </Box>
        </Box>

        <ModalButton onClick={handleOpen}> Upload Blanket PO </ModalButton>
        <CustomModal open={openModal} onClose={handleModalClose}>
          <Box sx={style}>
            <ModalHeader>Upload Blanket PO</ModalHeader>
            <div style={{ marginTop: '20px' }}>
              {!file && (
                <Box className="file_Upload">
                  <FileUploader
                    onTypeError={(err) => toast.error(err)}
                    handleChange={handleFileChange}
                    name="file"
                    types={fileTypes}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      textAlign: 'center',
                      padding: '8px 0 0 0'
                    }}
                  >
                    <Grid item xs={6} md={6} sm={12}>
                      {'Acceptable File Types: ' + fileTypes}
                    </Grid>
                    <Grid item xs={6} md={6} sm={12}>
                      {'Max File Size: 50MB'}
                    </Grid>
                  </Box>
                </Box>
              )}
              <Box
                sx={{
                  flexGrow: 1,
                  borderBottom: '1px solid #D9D9D9',
                  padding: '25px 0'
                }}
              >
                <CustomLabel
                  label={
                    <Box sx={{ fontWeight: '700', fontSize: '12px' }}>
                      Remove spaces from Part Number
                    </Box>
                  }
                  control={
                    <IOSSwitch
                      defaultChecked={spaces}
                      onChange={(e) => onSpacesSwitchChange(e)}
                      name="statusCode"
                      sx={{ mr: 1 }}
                    />
                  }
                />
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
                  justifyContent: 'flex-end'
                }}
              >
                <Grid item xs={6} md={2}>
                  <CancelButton onClick={handleModalClose}>Cancel</CancelButton>
                </Grid>{' '}
                <Grid item xs={6} md={2}>
                  <CancelButton disabled={!file} onClick={handleUploadBPO}>
                    Upload
                  </CancelButton>
                </Grid>
              </Box>
            </div>
          </Box>
        </CustomModal>
        <CustomModal open={openTableModal} onClose={handleTableModalClose}>
          <Box sx={modalStyle}>
            <div>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { mr: 1 },
                  display: { md: 'flex', xs: 'box' },
                  flexDirection: 'row'
                }}
                noValidate
                autoComplete="off"
              >
                <Box sx={{ flexGrow: 1 }}>
                  <span style={{ fontSize: '20px', fontWeight: 700 }}>
                    Upload Blanket PO for Customer Number:{' '}
                    {customerData?.customerNumber}
                  </span>{' '}
                  <Box sx={{ fontSize: '12px' }}>
                    <Box>
                      {filteredData.status.length > 0 &&
                        'Applied Filters (Status): ' +
                          filteredData.status.map((d) => d)}
                    </Box>
                  </Box>
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
                    {filteredData.status.length ||
                    filteredData.jobType.length ||
                    filteredData.date.from ? (
                      <ClearButton
                        sx={{ cursor: 'pointer' }}
                        onClick={onClearFilter}
                      >
                        Clear All
                      </ClearButton>
                    ) : (
                      ''
                    )}
                  </Typography>
                </Popover>{' '}
                <CustomButton
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleStatusFilter}
                  title="Filters"
                  style={{ backgroundColor: active ? 'green !important' : '' }}
                >
                  <img src={filterIcon}></img>
                </CustomButton>
                <CustomButton
                  onClick={() => onBtnExport({ fileName: 'Blanket PO' })}
                  title="Export as CSV"
                >
                  <img src={exportIcon}></img>
                </CustomButton>
              </Box>
              {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
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
                <Box style={gridStyle}>
                  <Box
                    className="ag-theme-alpine modal_table blanket_po_modal"
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
                      '& > :not(style)': { mr: 2, mt: 3 },
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'left'
                    }}
                  >
                    <Grid item xs={6} md={2}>
                      <CancelButton onClick={handleTableModalClose}>
                        Cancel
                      </CancelButton>
                    </Grid>{' '}
                    <Grid item xs={6} md={2}>
                      <CancelButton onClick={handlePlaceOrder}>
                        Upload
                      </CancelButton>
                    </Grid>
                  </Box>
                </Box>
              )}
              <Box
                sx={{
                  '& > :not(style)': { mr: 2, mt: 2 },
                  display: { md: 'flex', xs: 'box' },
                  flexDirection: 'row-reverse'
                }}
              >
                <AppPagination setPage={setExcelPage} {...BPOExcelData} />{' '}
                <div>
                  Items per page:{' '}
                  <select
                    value={modalItemsPerPage}
                    onChange={handleModalCountChange}
                  >
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </Box>
            </div>
          </Box>
        </CustomModal>
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
        >
          <Typography sx={{ p: 2 }}>
            {historyFilter && (
              <>
                {filteredData.date.from ? (
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
                    <Typography>Upload Date</Typography>
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
              </>
            )}
            {modalTableFilter && (
              <>
                {statusFilteredData.status.length ? (
                  <ClearButton
                    sx={{ cursor: 'pointer' }}
                    onClick={onStatusClearFilter}
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
                    <Typography>Status</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <FormControlLabel
                        label="Duplicate Order"
                        control={
                          <Checkbox
                            id="check1"
                            name="Duplicate"
                            checked={statusFilteredData.status.includes(
                              'Duplicate'
                            )}
                            onChange={(e) =>
                              handleFilter(
                                e,
                                'status',
                                statusFilteredData,
                                setStatusFilteredData
                              )
                            }
                          />
                        }
                      />
                      <FormControlLabel
                        label="Invalid Part"
                        control={
                          <Checkbox
                            name="Invalid Part"
                            checked={statusFilteredData.status.includes(
                              'Invalid Part'
                            )}
                            onChange={(e) =>
                              handleFilter(
                                e,
                                'status',
                                statusFilteredData,
                                setStatusFilteredData
                              )
                            }
                          />
                        }
                      />

                      <FormControlLabel
                        label="Invalid Format"
                        control={
                          <Checkbox
                            name="Invalid Format"
                            checked={statusFilteredData.status.includes(
                              'Invalid Format'
                            )}
                            onChange={(e) =>
                              handleFilter(
                                e,
                                'status',
                                statusFilteredData,
                                setStatusFilteredData
                              )
                            }
                          />
                        }
                      />

                      <FormControlLabel
                        label="Blank Fields"
                        control={
                          <Checkbox
                            name="Empty"
                            checked={statusFilteredData.status.includes(
                              'Empty'
                            )}
                            onChange={(e) =>
                              handleFilter(
                                e,
                                'status',
                                statusFilteredData,
                                setStatusFilteredData
                              )
                            }
                          />
                        }
                      />
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </>
            )}
          </Typography>
        </Popover>

        {historyTableData && historyTableData?.length ? (
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
              anchorEl={sortanchorEl}
              onClose={sorthandleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
            >
              <Box className={'sortText'} sx={{ mr: 2, pl: 2, pt: 4, pb: 2 }}>
                <div
                  onClick={(e) => customSort('fileUploaded:asc')}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  File Name: A - Z
                </div>
                <div
                  onClick={(e) => customSort('fileUploaded:dec')}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  File Name: Z - A
                </div>
                <div
                  onClick={(e) => customSort('updatedBy:asc')}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  Updated By: Asc - Dec
                </div>
                <div
                  onClick={(e) => customSort('updatedBy:dec')}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  Updated By: Dec - Asc
                </div>
                <div
                  onClick={(e) => customSort('totalPartsUploaded:asc')}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  File Count: Asc - Dec
                </div>
                <div
                  onClick={(e) => customSort('totalPartsUploaded:dec')}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  File Count: Dec - Asc
                </div>
                <div
                  onClick={(e) => customSort('validOrdersFileCount:asc')}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  Valid Parts: Asc - Dec
                </div>
                <div
                  onClick={(e) => customSort('validOrdersFileCount:dec')}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  Valid Parts: Dec - Asc
                </div>
              </Box>
            </Popover>{' '}
            {csvData && (
              <CustomButton>
                <CSVLink
                  data={csvData}
                  filename={'Blanket PO'}
                  title="Export as CSV"
                >
                  <img src={exportIcon}></img>
                </CSVLink>
              </CustomButton>
            )}
          </>
        ) : (
          ''
        )}
      </Box>{' '}
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div style={gridStyle}>
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
            paginationNumberFormatter={paginationNumberFormatter}
            onGridSizeChanged={onGridSizeChanged}
            defaultColDef={defaultColDef} // Default Column Properties
            rowData={historyTableData}
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
            frameworkComponents={{
              LinkComponent,
              FileUploadLink,
              validOrdersLink,
              invalidOrdersLink,
              StatusComponent,
              validateComponent,
              ActionComponent,
              AssociateCusNoComponent
            }}
          >
            <AgGridColumn
              field="uploadedFileUrl"
              cellRenderer="FileUploadLink"
              headerName="File Uploaded"
              resizable={true}
            ></AgGridColumn>
            <AgGridColumn
              field="uploadedFileCount"
              headerName="Total Parts Uploaded"
              resizable={true}
            ></AgGridColumn>
            <AgGridColumn
              field="updatedBy"
              headerName="Updated By"
              resizable={true}
            ></AgGridColumn>
            <AgGridColumn
              field="uploadDate"
              resizable={true}
              headerName="Upload Date/Time"
            ></AgGridColumn>
            <AgGridColumn
              cellRenderer="validOrdersLink"
              field="validOrdersFileCount"
              headerName="Valid Parts File"
              resizable={true}
            ></AgGridColumn>
            <AgGridColumn
              cellRenderer="invalidOrdersLink"
              field="invalidOrdersFileCount"
              headerName="Invalid Parts File"
              resizable={true}
            ></AgGridColumn>

            <AgGridColumn
              field="orderStatus"
              cellRenderer="StatusComponent"
              headerName="Status"
              resizable={true}
            ></AgGridColumn>
            {/* <AgGridColumn
              field=""
              cellRenderer="validateComponent"
              width={'120px'}
              headerName="Validate"
            ></AgGridColumn> */}
            <AgGridColumn
              field=""
              cellRenderer="ActionComponent"
              resizable={true}
              headerName="Action"
            ></AgGridColumn>
          </AgGridReact>
        </Box>
        <Box
          sx={{
            '& > :not(style)': { mr: 2, mt: 2, mb: 4 },
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
          <SortingCount options={options} onChange={handleCountChange} />
        </Box>
      </div>
      <Dialog
        className="On-close ddddddddddddddddddddddddddddddddddddddd"
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this history?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="On-delete"
            onClick={(e) => onDelete(deleteInfo)}
            autoFocus
          >
            Agree
          </Button>
          <Button onClick={handleModalClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BPOHistoryTable;
