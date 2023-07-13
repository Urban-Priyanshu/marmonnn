import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import filterIcon from '../../../../assets/Icons/Filter.png';
import exportIcon from '../../../../assets/Icons/export.png';
import sortIcon from '../../../../assets/Icons/sort.svg';
import User_Setup from '../../../../assets/Icons/User_setup.svg';
import Access_Portal from '../../../../assets/Icons/Access_portal.svg';
import { CSVLink, CSVDownload } from 'react-csv';
import Tooltip from '@mui/material/Tooltip';
import { ColorRing } from 'react-loader-spinner';

import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Pagination } from '@material-ui/lab';
import usePagination from 'src/services/pagination/pagiantion.js';

import { getFilteredData, handleFilter } from 'src/services/Filter';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './DataGrid.css';

import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomers } from 'src/redux/actions/sysAdminActions';
import Modal from 'src/components/Modal';
import { ActionTypes } from 'src/redux/constants/action-types';
import ManageCustomers from '..';
import SortingCount from 'src/services/sortingCount/SortingCount';

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

const TableContainer = styled(Box)(
  () => `
  padding: 15px 24px;
  background-color: white;
  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.08);
  border-radius: 3px;

  `
);



const CustomerTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sortanchorEl, setsortAnchorEl] = useState(null);

  const customersData = useSelector((state) => state?.customers?.customersData);
  const authToken = useSelector((state) => state?.auth?.token?.token);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = React.useState(false);

  const [sort, setSort] = useState(false);
  const [sortType, setSortType] = useState('');
  const [tableData, setTableData] = useState();
  const [csvData, setCsvData] = useState([]);
  const [paginationData, setPaginationData] = useState();
  let [active, setActive] = useState(false);

  const [filteredData, setFilteredData] = React.useState({
    status: []
  });
  // const [isLoading, setIsLoading] = useState(false);

  const isLoading = useSelector((state) => state?.loaderStatus?.showLoading);

  const gridStyle = useMemo(
    () => ({ height: '100%', width: '100%', margin: '12px 0' }),
    []
  );

  let [page, setPage] = useState(1);
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

  let count, _DATA;

  const handleChange = (e, p) => {
   
    setPage(p);
    if (paginationData) {
      paginationData?.jump(p);
    }
  };

  //BLUEPRINT of the incoming data for AG GRID

  const bluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          id: d?.id,
          groupCode: d?.groupCode || 'N/A',
          customerNumber: d?.customerNumber,
          customerName: d?.customerName,
          associatedCustomerNumber: d?.associatedCustomerNumbers || 'N/A',
          shipToLocation: d?.shippingLocations?.length
            ? d?.shippingLocations
                ?.filter((r) => r.primary === true)
                .map(
                  (data) =>
                    data?.address1 +
                    ',' +
                    (data?.address2 && data?.address2 + ',') +
                    data?.city +
                    ',' +
                    data?.stateCode +
                    ',' +
                    data?.country +
                    ',' +
                    data?.postalCode
                )
            : 'N/A',

          status: d?.status.description
        };
      })
    );
  };

  const excelbluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          customerNumber: d?.customerNumber,
          customerName: d?.customerName,
          associatedCustomerNumber: d?.associatedCustomerNumbers || 'N/A',
          shipToLocation: d?.shippingLocations?.length
            ? d?.shippingLocations
                ?.filter((r) => r.primary === true)
                .map(
                  (data) =>
                    data?.address1 +
                    ',' +
                    (data?.address2 && data?.address2 + ',') +
                    data?.city +
                    ',' +
                    data?.stateCode +
                    ',' +
                    data?.country +
                    ',' +
                    data?.postalCode
                )
            : 'N/A',

          status: d?.status.description
        };
      })
    );
  };

  useEffect(() => {
    dispatch({
      type: ActionTypes.GET_CUSTOMER,
      payload: null
    });
    if (customersData) {
      if (sort) {
        const tableBluePrint = bluePrint(customersData);
        const exceltableBluePrint = excelbluePrint(customersData);

        const filterData = getFilteredData(
          sortType === 'name:asc'
            ? tableBluePrint.sort((a, b) =>
                a.customerName > b.customerName ? 1 : -1
              )
            : sortType === 'name:dec'
            ? tableBluePrint.sort((a, b) =>
                a.customerName < b.customerName ? 1 : -1
              )
            : sortType === 'customerNumber:asc'
            ? tableBluePrint.sort((a, b) => a.customerNumber - b.customerNumber)
            : sortType === 'customerNumber:dec'
            ? tableBluePrint.sort((a, b) => b.customerNumber - a.customerNumber)
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
        setTableData(data?.currentData());
      } else {
        const tableBluePrint = bluePrint(customersData);
        const exceltableBluePrint = excelbluePrint(customersData);

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
          itemsPerPage,
          currentPage,
          setCurrentPage
        );
        setPaginationData(data);

        setCsvData(excelfilterData);
        setTableData(data?.currentData());
      }
    }
  }, [customersData, page, filteredData, sortType, sort, itemsPerPage]);

  useEffect(() => {
    setPage(1);
    if (paginationData) {
      paginationData?.jump(1);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    setPage(1);
    if (paginationData) {
      paginationData?.jump(1);
    }
  }, [filteredData?.status]);

 

  //  load data from sever
  useEffect(() => {
    // setIsLoading(true);
    dispatch(getAllCustomers(authToken));
  }, []);

  function LinkComponent(props) {
    return (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() =>
          navigate(`/manage-customers/${props?.data?.id}`, {
            state: {
              breadCrumb: 'manage-customers'
            }
          })
        }
      >
        <span
          style={{
            fontWeight: '600',
            fontSize: '12px',
            lineHeight: '18px',

            color: '#20A2F3'
          }}
        >
          {props?.value}
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
              (props.value === 'Inactive' && '#FF4A4A') ||
              (props.value === 'Pending Setup' && '#555555'),

            marginTop: '-2px'
          }}
        >
          {props?.value && props?.value === 'Inactive'
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
  //   <input
  //   type="image"
  //   className="Img"
  //   disabled={
  //     props?.data?.orderStatus === 'Pending'
  //       ? false
  //       : true || props?.data?.orderStatus === 'Uploaded'
  //       ? true
  //       : false
  //   }
  //   style={{
  //     cursor: 'pointer',
  //     opacity: props?.data?.orderStatus === 'Uploaded' && '0.5'
  //   }}
  //   onClick={(e) => deleteBPO(e, props)}
  //   src={DeleteIcon}
  // ></input>

  function ActionComponent(props) {
    return (
      <div style={{ margin: '5px 0 0 0' }}>
        <Box
          sx={{
            '& > :not(style)': { mr: 5 }
          }}
        >
          <Tooltip title="Customer Setup" arrow>
            <img
              className="Img customer_setup"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                navigate(`/manage-customers/${props?.data?.id}`, {
                  state: {
                    breadCrumb: 'manage-customers'
                  }
                })
              }
              src={User_Setup}
            ></img>
          </Tooltip>
          {props?.data?.status === 'Active' ? (
            <Tooltip title="Access Portal" arrow>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to={`/customer-portal/${props?.data?.id}/products?cp=true`}
              >
                <input
                  type="image"
                  className="Img"
                  disabled={
                    props?.data?.status === 'Inactive'
                      ? true
                      : false || props?.data?.status === 'Pending Setup'
                      ? true
                      : false
                  }
                  style={{
                    cursor: 'pointer',
                    opacity:
                      (props?.data?.status === 'Inactive' && '0.5') ||
                      (props?.data?.status === 'Pending Setup' && '0.5')
                  }}
                  src={Access_Portal}
                ></input>
              </Link>
            </Tooltip>
          ) : (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={`/customer-portal/${props?.data?.id}/products?cp=true`}
            >
              <input
                type="image"
                className="Img"
                disabled={
                  props?.data?.status === 'Inactive'
                    ? true
                    : false || props?.data?.status === 'Pending Setup'
                    ? true
                    : false
                }
                style={{
                  cursor: 'pointer',
                  opacity:
                    (props?.data?.status === 'Inactive' && '0.5') ||
                    (props?.data?.status === 'Pending Setup' && '0.5')
                }}
                src={Access_Portal}
              ></input>
            </Link>
          )}
        </Box>
      </div>
    );
  }

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: false
  }));

  // Example using Grid's API

  const onFilterTextBoxChanged = useCallback(() => {
    setSearch(true);
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box')?.value
    );

    if (document.getElementById('filter-text-box')?.value === '') {
      setSearch(false);
    }
  }, []);

  const handleClick = (event) => {
    setActive(true);
    setAnchorEl(event?.currentTarget);

    if (filteredData?.role?.length || filteredData?.status) {
      setActive(true);
    }
  };

  const sorthandleClick = (event) => {
    setsortAnchorEl(event.currentTarget);
  };

  const sorthandleClose = () => {
    setsortAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (filteredData?.role?.length || filteredData?.status?.length) {
      setActive(true);
    } else {
      setActive(false);
    }
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
      status: []
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const sortopen = Boolean(sortanchorEl);
  const sortid = sortopen ? 'simple-popover' : undefined;

  const customSort = (e) => {
    setSort(true);
    setSortType(e);
    setPage(1);
    if (paginationData) {
      paginationData?.jump(1);
    }
  };

  const ManageCustomerTable = useCallback(() => {
    return (
      <div
        className="ag-theme-alpine"
        style={{
          maxWidth: '100%',
          width: '100%'
        }}
      >
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          domLayout={'autoHeight'}
          onFirstDataRendered={onFirstDataRendered}
          onGridSizeChanged={onGridSizeChanged}
          defaultColDef={defaultColDef} // Default Column Properties
          rowData={!search ? tableData : bluePrint(customersData)}
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          frameworkComponents={{
            LinkComponent,
            StatusComponent,
            ActionComponent,
            AssociateCusNoComponent
          }}
        >
          {/* <AgGridColumn width={width} field="groupCode"></AgGridColumn> */}
          <AgGridColumn
            width={'120px'}
            cellRenderer="LinkComponent"
            field="customerNumber"
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn
            width={'150px'}
            field="customerName"
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn
            width={'150px'}
            cellRenderer="AssociateCusNoComponent"
            field="associatedCustomerNumber"
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn
            width={'280px'}
            field="shipToLocation"
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn
            width={'140px'}
            field="status"
            cellRenderer="StatusComponent"
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn
            field=""
            headerName="Action"
            cellRenderer="ActionComponent"
            width={'120px'}
          ></AgGridColumn>
        </AgGridReact>
      </div>
    );
  }, [
    tableData,
    search,
    customersData,
    sortType,
    sort,
    filteredData,
    anchorEl,
    sortanchorEl,
    page,
    itemsPerPage
  ]);

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
        <Box className="custom-heading-container-sec" sx={{}}>
          <span
            className="custom-heading-sec"
            style={{
              fontSize: '20px',
              fontWeight: 700,
              fontWeight: 700,
              display: 'inline-flex',
              flexDirection: 'column'
            }}
          >
            Manage Customers
            <label
              style={{
                fontSize: '15px',
                fontWeight: '600',
                lineHeight: '1',
                marginTop: '12px'
              }}
            >
              Customer List
            </label>
          </span>{' '}
          <Box sx={{ fontSize: '12px' }}>
            <Box>
              {filteredData.status.length > 0 &&
                'Applied Filters (Status): ' +
                  filteredData.status.map((d) => d)}
            </Box>
          </Box>
        </Box>

        <Box className="custom-heading-actionable-sec" sx={{}}>
          <Box sx={{ paddingLeft: '15px' }}>
            <TextField
              id="filter-text-box"
              label="Search by customer number, customer name"
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
          </Box>
          <Box sx={{ paddingLeft: '15px' }}>
            <Modal type={'addCustomer'} />
          </Box>
          <Box sx={{ paddingLeft: '15px' }}>
            <CustomButton
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              sx={{ background: active && 'black !important' }}
              title="Filters"
            >
              <img src={filterIcon}></img>
            </CustomButton>
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
              {filteredData.status.length ? (
                <ClearButton sx={{ cursor: 'pointer' }} onClick={onClearFilter}>
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
                      label="Active"
                      control={
                        <Checkbox
                          name="Active"
                          checked={filteredData.status.includes('Active')}
                          onChange={(e) =>
                            handleFilter(
                              e,
                              'status',
                              filteredData,
                              setFilteredData,
                              setPage,
                              paginationData?.jump
                            )
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      label="Inactive"
                      control={
                        <Checkbox
                          name="Inactive"
                          checked={filteredData.status.includes('Inactive')}
                          onChange={(e) =>
                            handleFilter(
                              e,
                              'status',
                              filteredData,
                              setFilteredData,
                              setPage,
                              paginationData?.jump
                            )
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      label="Pending Setup"
                      control={
                        <Checkbox
                          name="Pending Setup"
                          checked={filteredData.status.includes(
                            'Pending Setup'
                          )}
                          onChange={(e) =>
                            handleFilter(
                              e,
                              'status',
                              filteredData,
                              setFilteredData,
                              setPage,
                              paginationData?.jump
                            )
                          }
                        />
                      }
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Typography>
          </Popover>{' '}
          {/* <Box className="sortBy" sx={{ paddingLeft: '15px' }}>
            <select
              style={{
                padding: '10px',
                background: '#15364a',
                color: 'white'
              }}
              onChange={(e) => customSort(e)}
            >
              <option value="" disabled selected>
                Sort By
              </option>
              <option value="name:asc">Name- A - Z</option>
              <option value="name:dec">Name- Z - A</option>
              <option value="customerNumber:asc">
                Customer Number- Asc - Dec
              </option>
              <option value="customerNumber:dec">
                Customer Number- Dec - Asc
              </option>
            </select>
          </Box> */}
          <Box sx={{ paddingLeft: '15px' }}>
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
                onClick={(e) => customSort('name:asc')}
                style={{ cursor: 'pointer', fontSize: '12px' }}
              >
                Name: A - Z
              </div>
              <div
                onClick={(e) => customSort('name:dec')}
                style={{ cursor: 'pointer', fontSize: '12px' }}
              >
                Name: Z - A
              </div>
              <div
                onClick={(e) => customSort('customerNumber:asc')}
                style={{ cursor: 'pointer', fontSize: '12px' }}
              >
                Number: Asc - Dec
              </div>
              <div
                onClick={(e) => customSort('customerNumber:dec')}
                style={{ cursor: 'pointer', fontSize: '12px' }}
              >
                Number: Dec - Asc
              </div>
            </Box>
          </Popover>{' '}
          <Box sx={{ paddingLeft: '15px' }}>
            {csvData && (
              <CustomButton>
                <CSVLink
                  data={csvData}
                  filename={'Customer List'}
                  title="Export as CSV"
                >
                  <img src={exportIcon}></img>
                </CSVLink>
              </CustomButton>
            )}
          </Box>
        </Box>
      </Box>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="custom-pg-table-content-sec">
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
              {ManageCustomerTable()}
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
        </TableContainer>
      </div>
    </div>
  );
};

export default CustomerTable;
