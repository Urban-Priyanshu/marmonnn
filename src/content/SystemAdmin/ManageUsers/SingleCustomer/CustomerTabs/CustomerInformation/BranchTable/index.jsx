import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { AgGridColumn, AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {
  Box,
  Button,
  styled,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';

import './DataGrid.css';
import { getAllUsers } from 'src/redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  UpdatedAssociatedCustomerPrimary,
  unAssociateCustomer
} from 'src/redux/actions/sysAdminActions';
import Checkbox from '@mui/material/Checkbox';



const BranchTable = () => {
  const dispatch = useDispatch();

  const branchData = useSelector(
    (state) => state?.customers?.customerTableData
  );
  const customerData = useSelector((state) => state?.customers?.customerData);

  const authToken = useSelector((state) => state?.auth?.token?.token);
  const [open, setOpen] = React.useState(false);

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [switchStatus, setSwitchStatus] = useState([]);
  const [brachData, setbranchData] = useState();
  const [dissassociateUser, setDissassociateUser] = useState();
  const [tableData, setTableData] = useState();

  const dataBranch = (data) => {
    return data?.map((d) => {
      return {
        id: customerData?.id,
        mainCustomerNumber: customerData?.customerNumber,
        customerId: d?.customerId,
        customerNumber: d?.customerNumber,
        customerName: d?.customerName,
        branchNumber: d?.branchNumber,
        primary: d?.primary,
        firstName: d?.firstName,
        lastName: d?.lastName
      };
    });
  };

  useEffect(() => {
    if (!branchData) {
      setTableData(dataBranch(customerData?.associatedCustomers));
    } else {
      setTableData(dataBranch(branchData?.associatedCustomers));
    }
  }, [branchData, customerData]);

  const onSwitchChange = (
    e,
    customerNumber,
    firstName,
    lastName,
    branchNumber,
    customerId,
    id
  ) => {
    dispatch(
      UpdatedAssociatedCustomerPrimary(
        e,
        customerNumber,
        firstName,
        lastName,
        branchNumber,
        customerId,
        authToken,
        id
      )
    );
  };

  function LinkComponent(props) {
    return (
      <Link to={'' + props.data.id}>
        <span>{props?.value}</span>
      </Link>
    );
  }

  function StatusComponent(props) {
    return (
      <div>
        <div
          style={{
            borderRadius: '0px',
            textAlign: 'center',
            color: 'white',
            background:
              (props.value === 'Active' && '#46bd60') ||
              (props.value === 'Deactivated' && '#FF4A4A') ||
              (props.value === 'Request Sent' && '#555555') ||
              '#46bd60',
            padding: '3px 15px',
            marginTop: '-2px'
          }}
        >
          {props?.value && props?.value === 'Deactivated'
            ? 'Inactive'
            : props?.value}
        </div>
      </div>
    );
  }

  function AssociateCusNoComponent(props) {
    return (
      <div>
        {props.value}
        &nbsp; &nbsp;
        <span
          style={{
            background: '#20A2F3',
            padding: '5px',
            color: 'white',
            borderRadius: '100%'
          }}
        >
          +5
        </span>
      </div>
    );
  }

  function ActionComponent(props, x) {
    return (
      <div>
      
        
        <Checkbox
          defaultChecked={props?.data?.primary === true ? true : false}
          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
          onChange={(e) =>
            onSwitchChange(
              e,
              props?.data?.customerNumber,
              props?.data?.firstName,
              props?.data?.lastName,
              props?.data?.branchNumber,
              props?.data?.customerId,
              props?.data?.id
            )
          }
        />
      </div>
    );
  }

  const onDisassociateClick = (props) => {
    setOpen(true);
    setDissassociateUser(props?.data);
  };

  const onDelete = (dissassociateUser) => {
    dispatch(
      unAssociateCustomer(
        dissassociateUser?.customerNumber,
        dissassociateUser?.id,
        dissassociateUser?.mainCustomerNumber,
        customerData,
        authToken
      )
    );
    handleClose();
  };

  function DisassociateComponent(props) {
    return (
      <div>
        {!props?.data?.primary && (
          <Button
            style={{ color: 'red' }}
            onClick={() => onDisassociateClick(props)}
          >
            Disassociate
          </Button>
        )}
      </div>
    );
  }

  // DefaultColDef sets props common to all Columns

  let width = 100;

  const handleClose = () => {
    setOpen(false);
  };

  const onFirstDataRendered = (params) => {
    params?.api?.sizeColumnsToFit();
  };

  const onGridSizeChanged = (params) => {
    let columnCount = params?.columnApi?.columnModel?.gridColumns?.length;
    width = params?.clientWidth / columnCount;
    params?.api?.sizeColumnsToFit();
  };

  const gridStyle = useMemo(
    () => ({ height: '100%', width: '100%', paddingBottom: '20px' }),
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
            LinkComponent,
            StatusComponent,
            ActionComponent,
            AssociateCusNoComponent,
            DisassociateComponent
          }}
        >
          <AgGridColumn width={width} field="customerNumber"></AgGridColumn>
          <AgGridColumn width={width} field="customerName"></AgGridColumn>
          <AgGridColumn width={width} field="branchNumber"></AgGridColumn>
          <AgGridColumn
            field="setPrimary"
            cellRenderer="ActionComponent"
            width={width}
          ></AgGridColumn>
          <AgGridColumn
            field="disassociate"
            cellRenderer="DisassociateComponent"
            width={width}
          ></AgGridColumn>
        </AgGridReact>
      </Box>
      <Box
        sx={{
          '& > :not(style)': { mr: 2 },
          display: { md: 'flex', xs: 'box' },
          flexDirection: 'row-reverse'
        }}
      ></Box>

      <Dialog
        className="On-close"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dissassociateUser?.customerName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to dissassociate this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            className="On-delete"
            onClick={(e) => onDelete(dissassociateUser)}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BranchTable;
