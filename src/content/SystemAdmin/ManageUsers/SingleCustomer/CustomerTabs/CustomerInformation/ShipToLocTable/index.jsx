import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import moment from 'moment';
import { Box, Button, styled, Select, Checkbox } from '@mui/material';
import { Pagination } from '@material-ui/lab';
import usePagination from 'src/services/pagination/pagiantion.js';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomer, updatePrimary } from 'src/redux/actions/sysAdminActions';
import { getFilteredData } from 'src/services/Filter';
import useFormControls from '../Validations';
import SortingCount from 'src/services/sortingCount/SortingCount';

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

const ShipToLocTable = () => {
  const dispatch = useDispatch();
  const gridRef = useRef(); // Optional - for accessing Grid's API

  const [anchorEl, setAnchorEl] = React.useState(null);
  const shipToLocData = useSelector(
    (state) => state?.customers?.customerTableData
  );
  const customerData = useSelector((state) => state?.customers?.customerData);
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const [tableData, setTableData] = useState();
  const [paginationData, setPaginationData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [switchChange, setSwitchChange] = useState(false);
  let [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = React.useState({
    role: [],
    status: []
  });

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

  const bluePrint = (data) => {
    return (
      data &&
      data?.map((r) => {
        return {
          mainID: customerData?.id,
          id: r?.id,
          customerID: r?.customerId,
          customerNumber: r?.customerNumber,
          address:
            r?.address1 +
            ',' +
            (r?.address2 && r?.address2 + ',') +
            r?.city +
            ',' +
            r?.stateCode +
            ',' +
            r?.country +
            ',' +
            r?.postalCode,
          primary: r?.primary,
          shipToNumber: r?.shipToNumber
        };
      })
    );
  };
  const PER_PAGE = 13;

  useEffect(() => {
    if (!shipToLocData) {
      
      const tableBluePrint = bluePrint(customerData?.shippingLocations);
      const filterData = getFilteredData(
        tableBluePrint,
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
   
      setTableData(data?.currentData());
    } else {
      const tableBluePrint = bluePrint(shipToLocData?.shippingLocations);
      const filterData = getFilteredData(
        tableBluePrint,
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
     
      setTableData(data?.currentData());
     
    }
  }, [customerData, page, shipToLocData, itemsPerPage]);

  const handleChange = (e, p) => {
 
    setPage(p);
    if (paginationData) {
      paginationData?.jump(p);
    }
  };



  const onSwitchChange = (e, id, customerID, mainID) => {
    setSwitchChange(true);
 
    dispatch(updatePrimary(e, id, customerID, authToken, mainID));
  };

  useEffect(() => {
    handleChange(undefined, 1);
    setSwitchChange(false);
  }, [switchChange]);



  function ActionComponent(props) {
    return (
      <div style={{ margin: '0px 0 0 0' }}>
      

        <Checkbox
          defaultChecked={props?.data?.primary === true ? true : false}
          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
          onChange={(e) =>
            onSwitchChange(
              e,
              props?.data?.id,
              props?.data?.customerID,
              props?.data?.mainID
            )
          }
        />
      </div>
    );
  }

  let width = 100;

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  const onGridSizeChanged = (params) => {
    let columnCount = params.columnApi.columnModel.gridColumns.length;
    width = params.clientWidth / columnCount;
    params.api.sizeColumnsToFit();
  };

  const gridStyle = useMemo(
    () => ({ height: '100%', width: '100%', paddingBottom: '48px' }),
    []
  );

  return (
    <Box style={gridStyle}>
      <Box
        className="ag-theme-alpine"
        style={{
          maxWidth: '100%',
          width: '100%'
        }}
      >
        <AgGridReact
          domLayout={'autoHeight'}
          ref={gridRef} // Ref for accessing Grid's API
          onFirstDataRendered={onFirstDataRendered}
          onGridSizeChanged={onGridSizeChanged}
          rowData={tableData}
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          frameworkComponents={{
            ActionComponent
          }}
        >
          <AgGridColumn width={'50pxpx'} field="customerNumber"></AgGridColumn>
          <AgGridColumn width={'50pxpx'} field="shipToNumber"></AgGridColumn>
          <AgGridColumn width={'100px'} field="address"></AgGridColumn>

          <AgGridColumn
            field="setPrimary"
            cellRenderer="ActionComponent"
            width={'50px'}
          ></AgGridColumn>
        </AgGridReact>
      </Box>

      <Box
        sx={{
          '& > :not(style)': { mr: 2, mt: 3 },
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
    </Box>
  );
};

export default ShipToLocTable;
