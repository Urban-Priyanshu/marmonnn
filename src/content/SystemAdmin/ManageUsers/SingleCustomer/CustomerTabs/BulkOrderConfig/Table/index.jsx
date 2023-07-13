import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
// import jQuery from 'jquery';
import $ from 'jquery';
import { CSVLink } from 'react-csv';

import 'react-datepicker/dist/react-datepicker.css';
import sortIcon from '../../../../../../../assets/Icons/sort.svg';

import { useNavigate, Link } from 'react-router-dom';
import Trash from '../../../../../../../assets/Icons/trashRed.svg';
import { ColorRing } from 'react-loader-spinner';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Pagination } from '@material-ui/lab';
import usePagination from 'src/services/pagination/pagiantion.js';
import Switch, { SwitchProps } from '@mui/material/Switch';
import DeleteIcon from '../../../../../../../assets/Icons/Delete.png';
import validate_icon from '../../../../../../../assets/Icons/validate_icon.svg';
import CustomModal from '@mui/material/Modal';
import { FileUploader } from 'react-drag-drop-files';

import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import filterIcon from '../../../../../../../assets/Icons/Filter.png';
import exportIcon from '../../../../../../../assets/Icons/export.png';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import { DateRangePicker } from 'react-date-range';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getFilteredData, handleFilter } from 'src/services/Filter';
import AppPagination from 'src/helpers/appPagination';
import {
  Box,
  Button,
  styled,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import './DataGrid.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  deleteBOUploadHistory,
  getBulkOrderUploadHistory,
  uploadBulkOrder,
  validateBulkOrder,
  placeBulkOrder,
  DownloadBulkOrder,
  changePageExcelBulkOrder,
  changePageFilter,
  placeAllValidBulkOrder
} from 'src/redux/actions/BulkOrderActions';

import moment from 'moment';

import { updateStatus } from 'src/redux/actions/userActions';

import { addDays, subDays } from 'date-fns';
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

const ValidOrderButton = styled(Button)(
  () => `
  color: white !important;
  background: #15364A  !important;
  border-radius: 3px  !important;
  height: 38px !important;
  padding-left:10px !important;
  padding-right:10px !important;
  line-height: 1.1em;

  :hover {
      background-color:  #022f53  !important;
    }
    :disabled {
      opacity: 0.8 !important;
      color: white
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

const BulkOrderHistoryTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deactivated, setDeactivated] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [orderTable, setOrderTable] = React.useState([]);
  const [deleteInfo, setDeleteInfo] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState([]);
  const [selectedDataIds, setSelectedDataIds] = React.useState([]);
  const [openTableModal, setOpenTableModal] = React.useState(false);
  const [file, setFile] = React.useState(null);
  // const [loader, setLoader] = React.useState(false);
  const [spaces, setSpaces] = React.useState(false);

  let [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState();
  const [historyTableData, setHistoryTableData] = useState();
  const [paginationData, setPaginationData] = useState();
  const [csvData, setCsvData] = useState([]);

  const [sortType, setSortType] = useState('');
  const [sort, setSort] = useState(false);

  const [sortanchorEl, setsortAnchorEl] = useState(null);
  const [historyFilter, setHistoryFilter] = useState(false);
  const [excelPage, setExcelPage] = useState(1);
  const [modalTableFilter, setModalTableFilter] = useState(false);
  const [dueDateEdit, setDueDateEdit] = useState(false);
  const [reduceHeader, setReduceHeader] = useState([]);

  const customerData = useSelector((state) => state?.customers?.customerData);
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const BOUploadHistoryData = useSelector(
    (state) => state?.customers?.getBOUploadHistory
  );

  const BOUploadHistoryExcelData = useSelector(
    (state) => state?.customers?.getBulkExcelData
  );
  const BulkHistoryId = useSelector(
    (state) => state?.customers?.getBulkHistoryId?.id
  );

  const isLoading = useSelector((state) => state?.loaderStatus?.showLoading);



  const gridStyle = useMemo(
    () => ({ height: '100%', width: '100%', margin: '12px 0' }),
    []
  );


  const fileTypes = ['CSV', 'XLSX', 'XLS'];
  const [filteredData, setFilteredData] = React.useState({
    status: [],
    jobType: [],
    date: {}
  });

  const [statusFilteredData, setStatusFilteredData] = React.useState({
    status: [],
    jobType: [],
    date: {}
  });
  const pageSize = 10;

  const options = [10, 20, 50, 100];
  const [itemsPerPage, setItemsPerPage] = useState(options[0]);
  const [modalItemsPerPage, setModalItemsPerPage] = useState(options[0]);

  const handleCountChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    // do something with the new itemsPerPage value, e.g. fetch new data from a server
  };
  const handleModalCountChange = (e) => {
    setModalItemsPerPage(e.target.value);
    // do something with the new itemsPerPage value, e.g. fetch new data from a server
  };

  useEffect(() => {
    setPage(1);
    if (paginationData) {
      paginationData?.jump(1);
    }
  }, [itemsPerPage]);

  //  load data from sever
  useEffect(() => {
    dispatch(
      getBulkOrderUploadHistory(customerData?.customerNumber, authToken)
    );
  }, []);

  const handleBulkUpload = () => {
    const fd = new FormData();
    fd.append('file', file);

    dispatch(
      uploadBulkOrder(
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
        changePageExcelBulkOrder(
          customerData?.customerNumber,
          spaces,
          fd,
          authToken,
          setOpenTableModal,
          modalItemsPerPage,
          excelPage,
          BulkHistoryId,
          statusFilteredData
        )
      );
    }
  }, [excelPage]);

  useEffect(() => {
    const fd = new FormData();
    fd.append('file', file);

    if (openTableModal) {
      setSelectedData([]);
      dispatch(
        changePageExcelBulkOrder(
          customerData?.customerNumber,
          spaces,
          fd,
          authToken,
          setOpenTableModal,
          modalItemsPerPage,
          excelPage,
          BulkHistoryId,
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
          BulkHistoryId,
          statusFilteredData
        )
      );
    }
  }, [statusFilteredData]);

  useEffect(() => {
    const fd = new FormData();
    fd.append('file', file);

    if (openTableModal) {
      setSelectedData([]);
      dispatch(
        changePageFilter(
          customerData?.customerNumber,
          spaces,
          fd,
          authToken,
          setOpenTableModal,
          modalItemsPerPage,
          excelPage,
          BulkHistoryId,
          statusFilteredData
        )
      );
    }
  }, [modalItemsPerPage]);

  //BLUEPRINT of the incoming data for AG GRID

  const historyBluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          id: d?.id,
          updatedBy: d?.updatedBy,
          totalPartsUploaded: d?.totalPartsUploaded,
          uploadFileUrl: d?.uploadFileUrl,
          validOrdersFile: d?.validOrdersFile,
          invalidOrdersFile: d?.invalidOrdersFile,
          orderPlacedFileUrl: d?.orderPlacedFileUrl,
          uploadDate: moment.utc(d?.uploadDate).format('MM/DD/YYYY HH:mm'),
          validOrdersFileCount: d?.validOrdersFileCount ?? 'N/A',
          invalidOrdersFileCount: d?.invalidOrdersFileCount,
          orderStatus: d?.orderStatus?.description,

          uploadedFileCount: d?.uploadedFileCount,
          uploadedFileUrl: d?.uploadedFileUrl,
          orderPlacedFile: d?.orderPlacedFile,
          orderPlacedFileCount: d?.orderPlacedFileCount
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
          orderPlacedFileCount: d?.orderPlacedFileCount
        };
      })
    );
  };

  // uploadedFileUrl: d?.uploadedFileUrl,
  // uploadedFileCount: d?.uploadedFileCount,
  // updatedBy: d?.updatedBy,
  // uploadDate: moment.utc(d?.uploadDate).format('MM/DD/YYYY HH:mm'),
  // validOrdersFileCount: d?.validOrdersFileCount,
  // invalidOrdersFileCount: d?.invalidOrdersFileCount,
  // orderPlacedFileCount: d?.orderPlacedFileCount

  useEffect(() => {
    if (BOUploadHistoryData) {
      const tableBluePrint = historyBluePrint(BOUploadHistoryData);
      const exceltableBluePrint = excelhistoryBluePrint(BOUploadHistoryData);
      const filterData = getFilteredData(
        sortType === 'uploadedFileUrl:asc'
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
          : sortType === 'uploadedFileUrl:dec'
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
          : sortType === 'orderPlacedFileCount:asc'
          ? tableBluePrint.sort(
              (a, b) => a.orderPlacedFileCount - b.orderPlacedFileCount
            )
          : sortType === 'orderPlacedFileCount:dec'
          ? tableBluePrint.sort(
              (a, b) => b.orderPlacedFileCount - a.orderPlacedFileCount
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
      setCsvData(excelfilterData);
      setPaginationData(data);
      setHistoryTableData(data?.currentData());
    }
  }, [BOUploadHistoryData, page, filteredData, itemsPerPage, sort, sortType]);

  const bluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          id: d?.id,
          isBPO: d?.isBPO,
          afterOrder: d?.afterOrder,
          partNumber: d?.partNumber,
          poNumber: d?.poNumber,
          poLine: d?.poLine,
          quantity: d?.quantity,
          uom: d?.uom,
          dueDate: d?.dueDate,
          status: d?.status?.map((res) => res),
          statusType: d?.statusType?.map((res) => res),
          inventoryList: d?.inventoryList
        };
      })
    );
  };

  useEffect(() => {
    if (BOUploadHistoryExcelData) {
      const reduceTableData = BOUploadHistoryExcelData?.content?.reduce(
        (a, b) => {
          const newArr = b?.inventoryList?.map((d) => d?.branchName);
          a = [...new Set([...a, ...newArr])];
          return a;
        },
        []
      );
      const tableBluePrint = bluePrint(BOUploadHistoryExcelData?.content);

      // setPaginationData(data);

      const viewProductData = BOUploadHistoryExcelData?.content?.map((d) => {
        let obj = {
          id: d?.id,
          isBPO: d?.isBPO,
          afterOrder: d?.afterOrder,
          partNumber: d?.partNumber,
          poNumber: d?.poNumber,
          poLine: d?.poLine,
          quantity: d?.quantity,
          uom: d?.uom,
          dueDate: d?.dueDate,
          status: d?.status?.map((res) => res),
          statusType: d?.statusType?.map((res) => res)
        };

        let headerObj = reduceTableData?.reduce((a, b) => {
          a = { ...a, [b]: 0 };
          return a;
        }, {});

        let obj2 = d?.inventoryList?.reduce(
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
  }, [BOUploadHistoryExcelData, statusFilteredData, excelPage]);
  

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

  function LinkComponent(props) {
    return (
      <div style={{ cursor: 'pointer' }}>
        <span>{props?.value}</span>
      </div>
    );
  }

  const handleDownloadExcel = (fileName) => {
    const extension = fileName.split('.').pop();
    dispatch(DownloadBulkOrder(fileName, extension, authToken));
  };
  const paginationNumberFormatter = useCallback((params) => {
    return '[' + params.value.toLocaleString() + ']';
  }, []);

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

  function ordersPlacedLink(props) {
    return (
      <div
        style={{ cursor: 'pointer', color: '#20A2F3' }}
        onClick={() => handleDownloadExcel(props.data.orderPlacedFile)}
      >
        <span>{props?.value}</span>
      </div>
    );
  }

  function inventoryComponent(props) {
   
    return (
      <div>
        <span>{Math.floor(props?.value)}</span>
      </div>
    );
  }

  function afterOrderRenderer(props) {
    return (
      <div>
        <span>{props?.data?.afterOrder}</span>
      </div>
    );
  }

  function validOrdersLink(props) {
    return (
      <div
        style={{ cursor: 'pointer', color: '#20A2F3' }}
        onClick={() => handleDownloadExcel(props.data.validOrdersFile)}
      >
        <span>{props?.value}</span>
      </div>
    );
  }
  function invalidOrdersLink(props) {
    return (
      <div
        style={{ cursor: 'pointer', color: '#20A2F3' }}
        onClick={() => handleDownloadExcel(props.data.invalidOrdersFile)}
      >
        <span>{props?.value}</span>
      </div>
    );
  }

  function DateComponent(props) {
    return <div style={{ cursor: 'pointer' }}>{props?.data?.dueDate}</div>;
  }

  const handleChange = (e, p) => {
    setPage(p);
    if (paginationData) {
      paginationData?.jump(p);
    }
  };


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
                  (d === 'PO number has been expired' && '#FF9029') ||
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
                ((props.value === 'Placed' || props.value === 'placed') &&
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
      </div>
    );
  }
  const handlePlaceOrder = () => {
    dispatch(
      placeBulkOrder(
        customerData?.customerNumber,
        BulkHistoryId,
        selectedData,
        authToken,
        handleTableModalClose,
        gridRef
      )
    );
  };
  const handlePlaceAllValidOrder = () => {
    dispatch(
      placeAllValidBulkOrder(
        customerData?.customerNumber,
        BulkHistoryId,
        authToken,
        handleTableModalClose,
        gridRef
      )
    );
  };

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
      deleteBOUploadHistory(data?.id, customerData?.customerNumber, authToken)
    );
    handleModalClose();
  };
  const validateBO = (e, props) => {
    dispatch(
      validateBulkOrder(
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
          disabled={
            props?.data?.orderStatus === 'Pending'
              ? false
              : true || props?.data?.orderStatus === 'Processing'
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
              : true || props?.data?.orderStatus === 'Processing'
              ? false
              : true
          }
          style={{
            cursor: 'pointer',
            marginRight: '50px',
            opacity: props?.data?.orderStatus === 'Processing' && '0.5',
            pointerEvents:
              props?.data?.orderStatus === 'Pending'
                ? 'visible'
                : 'none' || props?.data?.orderStatus === 'Uploaded'
                ? 'none'
                : 'visible'
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
          disabled={
            props?.data?.orderStatus === 'Pending'
              ? false
              : true || props?.data?.orderStatus === 'Processing'
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

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: false
  }));

  const onModalSelectionChanged = useCallback(
    (e) => {
     
      // if(ids.includes(e.data.id)){
      //   arr = selectedData.filter(sd => sd.id != e.data.id)
      // }
      const selectedRows = gridRef.current.api.getSelectedRows();

      const ids = selectedRows.map((sr) => sr.id);
    

      const notSelected = tableData.reduce(
        (acc, curr) => {
          if (!ids.includes(curr.id)) {
            acc.arr.push(curr);
            acc.ids.push(curr.id);
          }
          return acc;
        },
        { arr: [], ids: [] }
      );

     
      let arr = [];
      if (selectedData.length) {
        const selected = selectedData.filter(
          (sd) => !notSelected.ids.includes(sd.id)
        );
   

        arr = [...selected, ...selectedRows];
      } else {
        arr = [...selectedRows];
      }

    

      const filteredArr = arr.filter(
        (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
      );

   

      setSelectedData(filteredArr);
    },
    [selectedData, excelPage, tableData]
  );


  const onRerender = useCallback(
    (params) => {
   
      setTimeout(function () {
        if (params && params.api && selectedData) {
          const ids = selectedData?.map((d) => d?.id);

        
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
      <>
        {/* <input type="checkbox" onClick={() => handleHeaderSelection()} /> */}
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          // onFirstDataRendered={onFirstDataRendered}

          // onRowSelected={(e) => onRowSelection(e)}
          domLayout={'autoHeight'}
          onSelectionChanged={onModalSelectionChanged}
          // onGridSizeChanged={onGridSizeChanged}
          defaultColDef={defaultColDef} // Default Column Properties
          rowData={tableData}
          suppressRowClickSelection={true}
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          frameworkComponents={{
            LinkComponent,
            StatusComponent,
            // ActionComponent,
            AssociateCusNoComponent,
            DateComponent,
            inventoryComponent,
            afterOrderRenderer
          }}
          isRowSelectable={function (rowNode) {
            return rowNode.data
              ? rowNode.data.status?.includes('Valid')
              : false;
          }}
        >
          <AgGridColumn
            resizable={true}
            field="partNumber"
            headerCheckboxSelection={true}
            checkboxSelection={true}
          ></AgGridColumn>
          <AgGridColumn
            resizable={true}
            field="poNumber"
            headerName="PO Number"
          ></AgGridColumn>
          <AgGridColumn
            resizable={true}
            field="poLine"
            headerName="PO Line"
          ></AgGridColumn>
          <AgGridColumn field="quantity" resizable={true}></AgGridColumn>
          <AgGridColumn
            resizable={true}
            field="uom"
            headerName="UOM"
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
            field="afterOrder"
            cellRenderer="afterOrderRenderer"
          ></AgGridColumn>
          <AgGridColumn field="dueDate" resizable={true}></AgGridColumn>
          <AgGridColumn
            field="status"
            cellRenderer="StatusComponent"
            resizable={true}
            width={1000}
          ></AgGridColumn>
        </AgGridReact>
      </>
    );
  }, [
    excelPage,
    BOUploadHistoryExcelData?.content,
    tableData,
    modalItemsPerPage
  ]);
 

 

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

 

  const onHistoryDataFirstRendered = (params) => {
    params?.api.sizeColumnsToFit();
  };

 

  const onGridSizeChanged = (params) => {
    let columnCount = params?.columnApi.columnModel.gridColumns.length;
    width = params?.clientWidth / columnCount;
    params?.api.sizeColumnsToFit();
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
    dispatch(
      getBulkOrderUploadHistory(customerData?.customerNumber, authToken)
    );
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
        <ModalButton onClick={handleOpen}> Upload Bulk</ModalButton>
        <CustomModal open={openModal} onClose={handleModalClose}>
          <Box sx={style}>
            <ModalHeader>Upload Bulk Order</ModalHeader>
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
                      {'Max File Size: 50mB'}
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
                      className="Img1"
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
              >
                <Grid item xs={6} md={2}>
                  <CancelButton onClick={handleModalClose}>Cancel</CancelButton>
                </Grid>{' '}
                <Grid item xs={6} md={2}>
                  <CancelButton disabled={!file} onClick={handleBulkUpload}>
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
                    Upload Bulk Orders for Customer Number:{' '}
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
                  </Typography>
                </Popover>
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
                  onClick={() => onBtnExport({ fileName: 'Bulk Order' })}
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
                    className="ag-theme-alpine bulk_order_modal"
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
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <ValidOrderButton onClick={handlePlaceOrder}>
                        Place Selected Orders
                      </ValidOrderButton>
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <ValidOrderButton onClick={handlePlaceAllValidOrder}>
                        Place All Valid Orders
                      </ValidOrderButton>
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
                <AppPagination
                  setPage={setExcelPage}
                  {...BOUploadHistoryExcelData}
                />
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
                        label="Insufficient Inventory"
                        control={
                          <Checkbox
                            id="check1"
                            name="Insufficient Inventory"
                            checked={statusFilteredData.status.includes(
                              'Insufficient Inventory'
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
                        label="Valid Orders"
                        control={
                          <Checkbox
                            name="Valid"
                            checked={statusFilteredData.status.includes(
                              'Valid'
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
                  onClick={(e) => customSort('uploadedFileUrl:asc')}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  File Name: A - Z
                </div>
                <div
                  onClick={(e) => customSort('uploadedFileUrl:dec')}
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
                  onClick={(e) => customSort('orderPlacedFileCount:asc')}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  File Count: Asc - Dec
                </div>
                <div
                  onClick={(e) => customSort('orderPlacedFileCount:dec')}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  File Count: Dec - Asc
                </div>
                <div
                  onClick={(e) => customSort('validOrdersFileCount:asc')}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  Valid Order: Asc - Dec
                </div>
                <div
                  onClick={(e) => customSort('validOrdersFileCount:dec')}
                  style={{ cursor: 'pointer', fontSize: '12px' }}
                >
                  Valid Order: Dec - Asc
                </div>
              </Box>
            </Popover>{' '}
            {csvData && (
              <CustomButton>
                <CSVLink
                  data={csvData}
                  filename={'Bulk Order'}
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

        {/* <CustomButton onClick={onBtnExport} title="Export as CSV">
        <img src={exportIcon}></img>
        </CustomButton> */}
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
            onFirstDataRendered={onHistoryDataFirstRendered}
            domLayout={'autoHeight'}
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
              ActionComponent,
              validateComponent,
              ordersPlacedLink,
              AssociateCusNoComponent
            }}
          >
            <AgGridColumn
              field="uploadedFileUrl"
              cellRenderer="FileUploadLink"
              headerName="File Uploaded"
              resizable="true"
            ></AgGridColumn>
            <AgGridColumn
              field="uploadedFileCount"
              resizable="true"
            ></AgGridColumn>
            <AgGridColumn
              field="updatedBy"
              headerName="Updated By"
              resizable="true"
            ></AgGridColumn>
            <AgGridColumn
              field="uploadDate"
              headerName="Upload Date/Time"
              // filter={'agDateColumnFilter'}
              resizable="true"
            ></AgGridColumn>
            <AgGridColumn
              cellRenderer="validOrdersLink"
              field="validOrdersFileCount"
              headerName="Valid Orders File"
              resizable="true"
            ></AgGridColumn>
            <AgGridColumn
              cellRenderer="invalidOrdersLink"
              field="invalidOrdersFileCount"
              headerName="Invalid Orders File"
              resizable="true"
            ></AgGridColumn>
            <AgGridColumn
              cellRenderer="ordersPlacedLink"
              field="orderPlacedFileCount"
              headerName="Order Placed File"
              resizable="true"
            ></AgGridColumn>

            <AgGridColumn
              field="orderStatus"
              cellRenderer="StatusComponent"
              resizable="true"
            ></AgGridColumn>
            {/* <AgGridColumn
              field=""
              cellRenderer={validateComponent}
              // headerName="Validate"
            ></AgGridColumn> */}
            <AgGridColumn
              field=""
              cellRenderer="ActionComponent"
              headerName="Action"
              resizable={true}
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
        className="On-close"
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

export default BulkOrderHistoryTable;
