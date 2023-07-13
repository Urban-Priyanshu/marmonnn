import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SortIcon from '@mui/icons-material/Sort';

import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Select from 'react-select';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Pencil from '../../../../assets/Icons/Shape.svg';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import moment from 'moment';
import { Pagination } from '@material-ui/lab';
import usePagination from 'src/services/pagination/pagiantion.js';
import { Box, Button, styled, TextField, MenuItem } from '@mui/material';

import filterIcon from '../../../../assets/Icons/Filter.png';
import sortIcon from '../../../../assets/Icons/sort.svg';
import exportIcon from '../../../../assets/Icons/export.png';
import { ColorRing } from 'react-loader-spinner';

import SearchIcon from '@mui/icons-material/Search';
import IosShareIcon from '@mui/icons-material/IosShare';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Modal from 'src/components/Modal';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './DataGrid.css';
import { getAllUsers, updateStatus } from 'src/redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredData, handleFilter } from 'src/services/Filter';
import { CSVLink, CSVDownload } from 'react-csv';
import { ActionTypes } from 'src/redux/constants/action-types';
import SortingCount from 'src/services/sortingCount/SortingCount';

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



const UserTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = React.useState(false);
  const [deactivated, setDeactivated] = React.useState(false);
  const userData = useSelector((state) => state?.users?.usersData);
  const authToken = useSelector((state) => state?.auth?.token?.token);

  const [currentPage, setCurrentPage] = useState(1);
  const isLoading = useSelector((state) => state?.loaderStatus?.showLoading);

  const [tableData, setTableData] = useState();
  const [sort, setSort] = useState(false);
  const [sortanchorEl, setsortAnchorEl] = useState(null);
  const [sortType, setSortType] = useState('');
  const [paginationData, setPaginationData] = useState();
  const [csvData, setCsvData] = useState([]);

  const [filteredData, setFilteredData] = React.useState({
    role: [],
    status: []
  });

  let [page, setPage] = useState(1);
  let [active, setActive] = useState(false);

  const gridStyle =
    (() => ({ height: '100%', width: '100%', margin: '12px 0' }), []);
  const PER_PAGE = 13;

  const options = [10, 20, 50, 100];
  const [itemsPerPage, setItemsPerPage] = useState(options[0]);

  const handleCountChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    // do something with the new itemsPerPage value, e.g. fetch new data from a server
  };

  const handleChange = (e, p) => {
    setPage(p);
    if (paginationData) {
      paginationData?.jump(p);
    }
  };

  const bluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          id: d?.id,
          name:
            d?.firstName.charAt(0).toUpperCase() +
            d?.firstName.slice(1) +
            ' ' +
            d?.lastName.charAt(0).toUpperCase() +
            d?.lastName.slice(1),
          roles: d?.roles?.map((r) => r?.description),
          email: d?.email,
          lastLogin: d?.lastLogin
            ? moment.utc(d?.lastLogin).format('MM/DD/YYYY HH:mm')
            : 'N/A',
          status: d?.status?.description
        };
      })
    );
  };

  const excelbluePrint = (data) => {
    return (
      data &&
      data?.map((d) => {
        return {
          name:
            d?.firstName.charAt(0).toUpperCase() +
            d?.firstName.slice(1) +
            ' ' +
            d?.lastName.charAt(0).toUpperCase() +
            d?.lastName.slice(1),
          email: d?.email,
          roles: d?.roles?.map((r) => r?.description),
          lastLogin: d?.lastLogin
            ? moment.utc(d?.lastLogin).format('MM/DD/YYYY HH:mm')
            : 'N/A',
          status: d?.status?.description
        };
      })
    );
  };

  useEffect(() => {
    dispatch({
      type: ActionTypes.GET_CUSTOMER,
      payload: null
    });
    if (userData) {
      if (sort === true) {
        const tableBluePrint = bluePrint(userData);
        const exceltableBluePrint = excelbluePrint(userData);

        const filterData = getFilteredData(
          sortType === 'name:asc'
            ? tableBluePrint.sort((a, b) => (a.name > b.name ? 1 : -1))
            : sortType === 'name:dec'
            ? tableBluePrint.sort((a, b) => (a.name < b.name ? 1 : -1))
            : sortType === 'email:asc'
            ? tableBluePrint.sort((a, b) => (a.email > b.email ? 1 : -1))
            : sortType === 'email:dec'
            ? tableBluePrint.sort((a, b) => (a.email < b.email ? 1 : -1))
            : tableBluePrint,
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

        setCsvData(excelfilterData);
        setTableData(data?.currentData());
      } else {
        const tableBluePrint = bluePrint(userData);
        const exceltableBluePrint = excelbluePrint(userData);
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

        setCsvData(excelfilterData);
        setTableData(data?.currentData());
      }
    }
  }, [userData, page, filteredData, sort, sortType, itemsPerPage]);

  useEffect(() => {
    setPage(1);
    if (paginationData) {
      paginationData?.jump(1);
    }
  }, [itemsPerPage]);

  //BLUEPRINT of the incoming data for AG GRID

  //  load data from sever
  useEffect(() => {
    dispatch(getAllUsers(authToken));
  }, [deactivated]);

  function EmailComponent(props) {
    return <div style={{ width: '100%' }}>{props?.value}</div>;
  }

  function LinkComponent(props) {
    return (
      <Link to={'/manage-users/' + props.data.id}>
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
      
      <div>
        <img
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/manage-users/${props?.data?.id}`)}
          src={Pencil}
        ></img>
      </div>
    );
  }

 
  

  const customSort = (e) => {
    setSort(true);
    setSortType(e);
    setPage(1);
    if (paginationData) {
      paginationData?.jump(1);
    }
  };

  useEffect(() => {
    setPage(1);
    if (paginationData) {
      paginationData?.jump(1);
    }
  }, [filteredData?.status]);

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

  const handleClick = (event) => {
    setActive(true);
    setAnchorEl(event.currentTarget);

    if (filteredData?.role?.length || filteredData?.status) {
      setActive(true);
    }
  };

  const sorthandleClick = (event) => {
    setsortAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (filteredData?.role?.length || filteredData?.status?.length) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const sorthandleClose = () => {
    setsortAnchorEl(null);
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
      role: [],
      status: []
    });
  };

  const sortOptions = [
    {
      label: 'Name: A - Z',
      value: 'name:asc'
    },
    {
      label: 'Name: Z - A',
      value: 'name:dec'
    },
    {
      label: 'Name: A - Z',
      value: 'email:asc'
    },
    {
      label: 'Name: Z - A',
      value: 'email:dec'
    }
  ];

  const manageUsersTable = useCallback(() => {
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
          onFirstDataRendered={onFirstDataRendered}
          domLayout={'autoHeight'}
          onGridSizeChanged={onGridSizeChanged}
          defaultColDef={defaultColDef} // Default Column Properties
          rowData={!search ? tableData : bluePrint(userData)}
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          frameworkComponents={{
            LinkComponent,
            StatusComponent,
            ActionComponent,
            EmailComponent,
            RoleComponent
          }}
        >
          <AgGridColumn
            width="170"
            cellRenderer="LinkComponent"
            field="name"
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn
            width="170"
            cellRenderer="EmailComponent"
            field="email"
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn
            width="150"
            cellRenderer="RoleComponent"
            field="roles"
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn
            width="100px"
            field="lastLogin"
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn
            width={width}
            cellRenderer="StatusComponent"
            field="status"
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn
            field=""
            headerName="Action"
            cellRenderer="ActionComponent"
            width={'50'}
          ></AgGridColumn>
        </AgGridReact>
      </div>
    );
  }, [
    tableData,
    search,
    userData,
    sortType,
    sort,
    filteredData,
    anchorEl,
    sortanchorEl,
    page,
    itemsPerPage
  ]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const sortopen = Boolean(sortanchorEl);
  const sortid = sortopen ? 'simple-popover' : undefined;
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
              lineHeight: 1,
              fontWeight: 700,
              display: 'inline-flex',
              flexDirection: 'column'
            }}
          >
            Manage Users
            <label
              style={{
                fontSize: '15px',
                fontWeight: '600',
                lineHeight: '1',
                marginTop: '12px'
              }}
            >
              User List
            </label>
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

        <Box className="custom-heading-actionable-sec" sx={{}}>
          <Box sx={{ paddingLeft: '15px' }}>
            {' '}
            <TextField
              id="filter-text-box"
              label="Search by name, email id "
              size="small"
              type="text"
              onInput={() => onFilterTextBoxChanged()}
              sx={{
                backgroundColor: 'white',
                width: '300px',
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
            <Modal type={'addUser'} />
          </Box>
          <Box sx={{ paddingLeft: '15px' }}>
            <CustomButton
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              title="Filters"
              sx={{ background: active && 'black !important' }}
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
              {filteredData.status.length || filteredData.role.length ? (
                <ClearButton sx={{ cursor: 'pointer' }} onClick={onClearFilter}>
                  Clear All
                </ClearButton>
              ) : (
                ''
              )}
              <Accordion>
                <AccordionSummary
                  className="custom-cls"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    sx={{
                      margin: '0 0'
                    }}
                  >
                    Roles
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormControlLabel
                      label="Super Admin"
                      control={
                        <Checkbox
                          name="Super Admin"
                          checked={filteredData.role.includes('Super Admin')}
                          onChange={(e) =>
                            handleFilter(
                              e,
                              'role',
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
                      label="Sales User"
                      control={
                        <Checkbox
                          name="Sales User"
                          checked={filteredData.role.includes('Sales User')}
                          onChange={(e) =>
                            handleFilter(
                              e,
                              'role',
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
                      label="System Admin"
                      control={
                        <Checkbox
                          name="System Admin"
                          checked={filteredData.role.includes('System Admin')}
                          onChange={(e) =>
                            handleFilter(
                              e,
                              'role',
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
                          id="check1"
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
                          name="Deactivated"
                          checked={filteredData.status.includes('Deactivated')}
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
                      label="Request Sent"
                      control={
                        <Checkbox
                          name="Request Sent"
                          checked={filteredData.status.includes('Request Sent')}
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
              <option value="email:asc">Email- A - Z</option>
              <option value="email:dec">Email- Z - A</option>
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
            <Typography
              className={'sortText'}
              sx={{ pr: 5, pl: 2, pt: 4, pb: 2 }}
            >
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
                onClick={(e) => customSort('email:asc')}
                style={{ cursor: 'pointer', fontSize: '12px' }}
              >
                Email: A - Z
              </div>
              <div
                onClick={(e) => customSort('email:dec')}
                style={{ cursor: 'pointer', fontSize: '12px' }}
              >
                Email: Z - A
              </div>
            </Typography>
          </Popover>{' '}
          <Box sx={{ paddingLeft: '15px' }}>
            {/* <CSVLink data={paginationData}>Download me</CSVLink>; */}
            {csvData && (
              <CustomButton>
                <CSVLink
                  data={csvData}
                  filename={'Internal User List'}
                  title="Export as CSV"
                >
                  <img src={exportIcon}></img>
                </CSVLink>
              </CustomButton>
            )}
          </Box>
        </Box>
      </Box>{' '}
      {/* <Box
        component="form"
        sx={{
          '& > :not(style)': { mt: 2, mb: 2 },
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <Box sx={{ fontSize: '15px', fontWeight: '600' }}>User List</Box>
      </Box> */}
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
              {manageUsersTable()}
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

export default UserTable;
