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
import AddExtUserForm from 'src/content/SystemAdmin/ManageUsers/SingleCustomer/CustomerTabs/ExternalUsers/AddExternalUserForm/AddUserForm';
import { ColorRing } from 'react-loader-spinner';

import { Pagination } from '@material-ui/lab';
import usePagination from 'src/services/pagination/pagiantion.js';
import Trash from '../../../../../../../assets/Icons/trashRed.svg';
import Switch, { SwitchProps } from '@mui/material/Switch';
import DeleteIcon from '../../../../../../../assets/Icons/Delete.png';
import validate_icon from '../../../../../../../assets/Icons/validate_icon.svg';
import CustomModal from '@mui/material/Modal';
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
import {
  BarcodeList,
  deleteBarcodeListData,
  UpdateBarcodeListData
} from 'src/redux/actions/CustomerPortalActions';
import SortingCount from 'src/services/sortingCount/SortingCount';

const PER_PAGE = 13;








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
  width: { md: '100%', sm: '100%' },
  bgcolor: 'background.paper',
  boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.12)',
  p: 4,
  bordeRadius: '5px'
};


const BarcodeTable = () => {
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
  const [file, setFile] = React.useState(null);
  const [spaces, setSpaces] = React.useState(false);
  const isLoading = useSelector((state) => state?.loaderStatus?.showLoading);

  let [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState();
  const [historyTableData, setHistoryTableData] = useState();
  const [csvData, setCsvData] = useState([]);
  const [paginationData, setPaginationData] = useState();
  const [historyFilter, setHistoryFilter] = useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [modalTableFilter, setModalTableFilter] = useState(false);

  const [sortType, setSortType] = useState('');
  const [sort, setSort] = useState(false);
  const [sortanchorEl, setsortAnchorEl] = useState(null);
  const BPOExcelData = useSelector(
    (state) => state?.customers?.getBPOExcelData
  );
  const BarcodeListData = useSelector(
    (state) => state?.customerPortal?.getBarcodeList
  );
  const customerData = useSelector((state) => state?.customers?.customerData);

  const authToken = useSelector((state) => state?.auth?.token?.token);

  const handleChange = (e, p) => {
    setPage(p);
    if (paginationData) {
      paginationData?.jump(p);
    }
  };

  const fileTypes = ['CSV', 'XLSX', 'XLS'];

  const gridStyle = useMemo(
    () => ({ height: '100%', width: '100%', margin: '12px 0' }),
    []
  );

  const [filteredData, setFilteredData] = React.useState({
    status: [],
    jobType: [],
    date: {}
  });

  //  load data from sever
  useEffect(() => {
    dispatch(BarcodeList(customerData?.customerNumber, searchValue, authToken));
  }, [searchValue]);

  const options = [10, 20, 50, 100];
  const [itemsPerPage, setItemsPerPage] = useState(options[0]);

  const handleCountChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    // do something with the new itemsPerPage value, e.g. fetch new data from a server
  };

  useEffect(() => {
    setPage(1);
    if (paginationData) {
      paginationData?.jump(1);
    }
  }, [itemsPerPage]);

  //BLUEPRINT of the incoming data for AG GRID

  const historyBluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          id: d?.id,
          partNumber: d?.partNumber,
          partDescription: d?.partDescription,
          purchaseOrderNumber: d?.purchaseOrderNumber,
          quantity: d?.quantity + ' ' + d?.uom,
          quantity2: d?.quantity,
          quantityNumber: d?.quantityNumber,
          specialRemarks: d?.specialRemarks,
          uom: d?.uom,
          updatedDate: moment.utc(d?.updatedDate).format('MM/DD/YYYY HH:mm'),
          updatedBy: d?.updatedBy,
          createdBy: d?.createdBy,
          createdDate: d?.createdDate,
          customerId: d?.customerId,
          errorsSet: d?.errorsSet
        };
      })
    );
  };

  const excelhistoryBluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          partNumber: d?.partNumber,
          partDescription: d?.partDescription,
          quantity: d?.quantity + ' ' + d?.uom,
          purchaseOrderNumber: d?.purchaseOrderNumber,
          specialRemarks: d?.specialRemarks
        };
      })
    );
  };

  useEffect(() => {
    if (BarcodeListData) {
      const tableBluePrint = historyBluePrint(BarcodeListData?.content);
      const exceltableBluePrint = excelhistoryBluePrint(
        BarcodeListData?.content
      );
      const filterData = getFilteredData(
        sortType === 'partNumber:asc'
          ? tableBluePrint.sort((a, b) =>
              a.partNumber > b.partNumber ? 1 : -1
            )
          : sortType === 'partNumber:dec'
          ? tableBluePrint.sort((a, b) =>
              a.partNumber < b.partNumber ? 1 : -1
            )
          : sortType === 'quantity:asc'
          ? tableBluePrint.sort((a, b) => a.quantity2 - b.quantity2)
          : sortType === 'quantity:dec'
          ? tableBluePrint.sort((a, b) => b.quantity2 - a.quantity2)
          : tableBluePrint,
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
        itemsPerPage,
        currentPage,
        setCurrentPage
      );
      setPaginationData(data);
      setCsvData(excelfilterData);

      setHistoryTableData(data?.currentData());
    }
  }, [BarcodeListData, page, filteredData, itemsPerPage, sort, sortType]);

  const bluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          effectiveDate: d?.effectiveDate,
          endDate: moment.utc(d?.endDate).format('MM/DD/YYYY'),
          partNumber: d?.partNumber,
          poNumber: d?.poNumber,
          price: d?.price,
          quantity: d?.quantity,
          status: d?.status?.map((res) => res),
          uom: d?.uom
        };
      })
    );
  };

  const paginationNumberFormatter = useCallback((params) => {
    return '[' + params?.value?.toLocaleString() + ']';
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
    setOpenModal(false);
    setFile(null);
    // setOpenTableModal(true);
  };

  const deleteBPO = (e, props) => {
    dispatch(
      deleteBarcodeListData(
        customerData?.customerNumber,
        props.data?.id,
        authToken
      )
    );
  };

  const onSearch = (e) => {
    setSearchValue(e?.target?.value);
  };

  const onDelete = (data) => {
    dispatch(
      deleteBPOHistory(data?.id, customerData?.customerNumber, authToken)
    );
    handleModalClose();
  };

  const handleDownloadExcel = (fileName) => {
    dispatch(DownloadBulkOrder(fileName, authToken));
  };

  function FileUploadLink(props) {
    return (
      <div
        style={{ cursor: 'pointer', color: '#20A2F3' }}
        onClick={() => handleDownloadExcel(props?.data?.uploadFileUrl)}
      >
        <span>{props?.value}</span>
      </div>
    );
  }

  function validOrdersLink(props) {
    return (
      <div
        style={{ cursor: 'pointer', color: '#20A2F3' }}
        onClick={() => handleDownloadExcel(props?.data?.validOrdersFileUrl)}
      >
        <span>{props?.value}</span>
      </div>
    );
  }
  function invalidOrdersLink(props) {
    return (
      <div
        style={{ cursor: 'pointer', color: '#20A2F3' }}
        onClick={() => handleDownloadExcel(props?.data?.invalidOrdersFileUrl)}
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
  function quantityRenderer(props) {
    return (
      <div>
        <span>{props?.value}</span>
      </div>
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
                  (d === 'No Part' && '#FF9029') ||
                  (d === 'VALID' && '#5AB839') ||
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

  function ActionComponent(props) {
    return (
      <div style={{ textAlign: 'left' }}>
        <input
          type="image"
          className="Img"
          style={{ cursor: 'pointer' }}
          onClick={(e) => deleteBPO(e, props)}
          src={DeleteIcon}
        ></input>
      </div>
    );
  }
  function validateComponent(props) {
    return (
      <div style={{ textAlign: 'left' }}>
        <Modal
          type={'update'}
          barcodeData={props?.data}
          UpdateBarcodeList={UpdateBarcodeList}
        />
      </div>
    );
  }

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: false
  }));

  // Example using Grid's API

  const handleClose = () => {
    setAnchorEl(null);
  };

  let width = 100;

  const onFirstDataRendered = (params) => {
    params?.api?.sizeColumnsToFit();
  };

  const onGridSizeChanged = (params) => {
    let columnCount = params?.columnApi?.columnModel?.gridColumns?.length;
    width = params?.clientWidth / columnCount;
    params?.api?.sizeColumnsToFit();
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

  const UpdateBarcodeList = (data) => {
    dispatch(
      UpdateBarcodeListData(customerData?.customerNumber, data, authToken)
    );
  };
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
          <span style={{ fontSize: '20px', fontWeight: 700 }}>Parts List</span>{' '}
          <Box sx={{ fontSize: '12px' }}>
            <Box>
              {filteredData.status.length > 0 &&
                'Applied Filters (Status): ' +
                  filteredData.status.map((d) => d)}
            </Box>
          </Box>
        </Box>
        <Box sx={{ padding: '0 20px !important;' }}>
          {' '}
          <TextField
            id="filter-text-box"
            label="Search by part number, description, po number"
            size="small"
            type="text"
            onInput={(e) => onSearch(e)}
            sx={{
              backgroundColor: 'white',
              width: '325px',
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
              <ClearButton sx={{ cursor: 'pointer' }} onClick={onClearFilter}>
                Clear All
              </ClearButton>
            ) : (
              ''
            )}
            {historyFilter && (
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
            )}
            {modalTableFilter && (
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
                          checked={filteredData.status.includes(
                            'Insufficient Inventory'
                          )}
                          onChange={(e) =>
                            handleFilter(
                              e,
                              'status',
                              filteredData,
                              setFilteredData
                            )
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      label="No Part"
                      control={
                        <Checkbox
                          name="No Part"
                          checked={filteredData.status.includes('No Part')}
                          onChange={(e) =>
                            handleFilter(
                              e,
                              'status',
                              filteredData,
                              setFilteredData
                            )
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      label="Valid Orders"
                      control={
                        <Checkbox
                          name="VALID"
                          checked={filteredData.status.includes('VALID')}
                          onChange={(e) =>
                            handleFilter(
                              e,
                              'status',
                              filteredData,
                              setFilteredData
                            )
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      label="Invalid Format"
                      control={
                        <Checkbox
                          name="Invalid format"
                          checked={filteredData.status.includes(
                            'Invalid format'
                          )}
                          onChange={(e) =>
                            handleFilter(
                              e,
                              'status',
                              filteredData,
                              setFilteredData
                            )
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      label="Empty Fields"
                      control={
                        <Checkbox
                          name="Empty"
                          checked={filteredData.status.includes('Empty')}
                          onChange={(e) =>
                            handleFilter(
                              e,
                              'status',
                              filteredData,
                              setFilteredData
                            )
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      label="Blank Fields"
                      control={
                        <Checkbox
                          name="Blank"
                          checked={filteredData.status.includes('Blank')}
                          onChange={(e) =>
                            handleFilter(
                              e,
                              'status',
                              filteredData,
                              setFilteredData
                            )
                          }
                        />
                      }
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            )}
          </Typography>
        </Popover>

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
            <div
              onClick={(e) => customSort('quantity:asc')}
              style={{ cursor: 'pointer', fontSize: '12px' }}
            >
              Quantity: Asc - Dec
            </div>
            <div
              onClick={(e) => customSort('quantity:dec')}
              style={{ cursor: 'pointer', fontSize: '12px' }}
            >
              Quantity: Dec - Asc
            </div>
          </Box>
        </Popover>

        {csvData && (
          <CustomButton>
            <CSVLink
              data={csvData}
              filename={'Barcode Scanner'}
              title="Export as CSV"
            >
              <img src={exportIcon}></img>
            </CSVLink>
          </CustomButton>
        )}
      </Box>{' '}
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div style={gridStyle}>
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
                  AssociateCusNoComponent,
                  quantityRenderer
                }}
              >
                <AgGridColumn
                  field="partNumber"
                  headerName="Part Number"
                  resizable={true}
                ></AgGridColumn>
                <AgGridColumn
                  field="partDescription"
                  headerName="Description"
                  resizable={true}
                ></AgGridColumn>

                <AgGridColumn
                  field="quantity"
                  resizable={true}
                  headerName="Quantity"
                  cellRenderer="quantityRenderer"
                ></AgGridColumn>
                <AgGridColumn
                  // cellRenderer="validOrdersLink"
                  field="purchaseOrderNumber"
                  headerName="PO Number"
                  resizable={true}
                ></AgGridColumn>
                <AgGridColumn
                  // cellRenderer="invalidOrdersLink"
                  field="specialRemarks"
                  headerName="Special Remarks"
                  resizable={true}
                ></AgGridColumn>
                {/*            
            <AgGridColumn
              field="orderStatus"
              cellRenderer="StatusComponent"
              resizable={true}
            ></AgGridColumn> */}
                <AgGridColumn
                  field=""
                  cellRenderer="validateComponent"
                  // width={'120px'}
                  resizable={true}
                  headerName="Update"
                ></AgGridColumn>
                <AgGridColumn
                  field=""
                  cellRenderer="ActionComponent"
                  width={'120px'}
                  resizable={true}
                  headerName="Action"
                ></AgGridColumn>
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
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
              />
              <SortingCount options={options} onChange={handleCountChange} />
            </Box>
          </>
        )}
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

export default BarcodeTable;
