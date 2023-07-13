import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';

import DialogTitle from '@mui/material/DialogTitle';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import CartIcon from 'src/assets/Icons/Cart.svg';
import { useDispatch, useSelector, Provider } from 'react-redux';
import moment from 'moment';

import {
  getAllCartOrderByUserId,
  placeCartOrders
} from 'src/redux/actions/customerCartActions';
import { toast } from 'react-toastify';
import { getCustomer } from 'src/redux/actions/sysAdminActions';
import { ActionTypes } from 'src/redux/constants/action-types';

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
const CancelButton = styled(Button)(
  () => `
  background: #FFFFFF  !important;
  border: 1px solid #15364A  !important;
  border-radius: 3px  !important;
  color: #15364A  !important;
  height: 38px !important;
  width: 84px !important
      
          :hover {
              background-color: white  !important;
            }
          
          `
);

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            color: white !important;
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: white;
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                  color: white;
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                                color: white;
                            }
                        }
                    }
                }
            }
        }
`
);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <div style={{ width: '100%' }}>
      <Box
        className={'dddddddddddd'}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1
        }}
        {...other}
      >
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </Box>
    </div>
  );
};

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

function createData(cost, part, qty, reqDate, poNumber) {
  return { cost, part, qty, reqDate, poNumber };
}

const rows = [
  createData(159, 159, 6.0, 24, 4.0),
  createData(159, 237, 9.0, 37, 4.3),
  createData(159, 159, 6.0, 24, 4.0),
  createData(159, 237, 9.0, 37, 4.3)
];

function HeaderMenu() {
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [values, setValues] = useState([]);
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const customerData = useSelector((state) => state?.customers?.customerData);
  const cartData = useSelector(
    (state) => state?.customerPortal?.getCustomerCartDetails
  );
  const authUser = useSelector((state) => state?.auth?.authUserData);
  const cartError = useSelector(
    (state) => state?.customerPortal?.getCustomerCartResponse
  );

  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    for (let i in cartData) {
      let obj = cartData[i];
      delete obj['status'];
    }
    setValues(cartData);
  }, [cartData]);

  const handleClickOpen = () => {
    if (!cartData?.length) {
      toast.error('The cart is empty.');
    } else {
      setDialogOpen(true);
    }
  };

  const handleClickClose = () => {
    setDialogOpen(false);
  };

  const handleEditCart = () => {
    navigate(`/customer-portal/${customerData?.id}/cart?cp=true`);
    setDialogOpen(false);
  };

  const handleSubmit = () => {
    dispatch(
      placeCartOrders(
        customerData?.id,
        customerData?.customerNumber,
        values,
        navigate,
        authToken
      )
    );

    setDialogOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (query.get('cp') === 'true') {
      dispatch(getAllCartOrderByUserId(customerData?.id, authToken));
    }
  }, [cartError, customerData]);

  return (
    <>
      <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          },
          color: 'white',
          padding: '0px 47px'
        }}
      >
        <List disablePadding component={Box} display="flex">
          {/* <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/components/buttons"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="SERVICES"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/components/forms"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="PRODUCTS"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/components/forms"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="COMPANY"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/components/forms"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="RESOURCES"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/components/forms"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="CONTACT"
            />
          </ListItem> */}
          {/* {query.get('cp') === 'true' &&
          authUser &&
          authUser?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')
            ? authUser &&
              authUser?.features?.find((d) => d?.featureCode !== 'PO') &&
              ''
            : authUser &&
              authUser?.roles?.find((d) => d?.code !== 'ROLE_CUSTOMER') &&
              customerData &&
              customerData?.features?.find((d) => d?.featureCode === 'PO') && (
                <ListItem
                  onClick={handleClickOpen}
                  classes={{ root: 'MuiListItem-indicators' }}
                  button
                >
                  <img src={CartIcon}></img>
                  <Box style={{ fontSize: '15px', margin: '10px' }}>
                    <span style={{ color: '#eb4f0c', fontWeight: 900 }}>
                      {cartData?.length}
                    </span>
                  </Box>
                </ListItem>
              )} */}

          {query.get('cp') === 'true' &&
          authUser &&
          authUser?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')
            ? ((authUser &&
                authUser?.features?.find((d) => d?.featureCode === 'BF') &&
                authUser &&
                authUser?.features?.find((d) => d?.featureCode === 'PO')) ||
                location.pathname?.substring(
                  location.pathname?.lastIndexOf('/') + 1
                ) === 'BarCodeScanner') && (
                <ListItem
                  onClick={handleClickOpen}
                  classes={{ root: 'MuiListItem-indicators' }}
                  button
                >
                  <img src={CartIcon}></img>
                  <Box style={{ fontSize: '15px', margin: '10px' }}>
                    <span style={{ color: '#eb4f0c', fontWeight: 900 }}>
                      {cartData?.length}
                    </span>
                  </Box>
                </ListItem>
              )
            : ''}

          {query.get('cp') === 'true' &&
          authUser &&
          authUser?.roles?.find((d) => d?.code !== 'ROLE_CUSTOMER')
            ? ((customerData &&
                customerData?.features?.find((d) => d?.featureCode === 'PO') &&
                customerData?.features?.find((f) => f?.featureCode === 'BF')) ||
                location.pathname?.substring(
                  location.pathname?.lastIndexOf('/') + 1
                ) === 'BarCodeScanner') && (
                <ListItem
                  onClick={handleClickOpen}
                  classes={{ root: 'MuiListItem-indicators' }}
                  button
                >
                  <img src={CartIcon}></img>
                  <Box style={{ fontSize: '15px', margin: '10px' }}>
                    <span style={{ color: '#eb4f0c', fontWeight: 900 }}>
                      {cartData?.length}
                    </span>
                  </Box>
                </ListItem>
              )
            : ''}

          {/* {query.get('cp') === 'true' &&
          authUser &&
          authUser?.roles?.find((d) => d?.code !== 'ROLE_CUSTOMER')
            ? customerData &&
              customerData?.features?.find((d) => d?.featureCode === 'PO') && (
                <ListItem
                  onClick={handleClickOpen}
                  classes={{ root: 'MuiListItem-indicators' }}
                  button
                >
                  <img src={CartIcon}></img>
                  <Box style={{ fontSize: '15px', margin: '10px' }}>
                    <span style={{ color: '#eb4f0c', fontWeight: 900 }}>
                      {cartData?.length}
                    </span>
                  </Box>
                </ListItem>
              )
            : ''} */}
        </List>
      </ListWrapper>
      <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        {/* <MenuItem sx={{ px: 3 }} component={NavLink} to="/overview">
          SERVICES
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/tabs">
          PRODUCTS
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/cards">
          RESOURCES
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/modals">
          COMPANY
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/modals">
          CONTACT
        </MenuItem> */}
      </Menu>

      <BootstrapDialog
        open={dialogOpen}
        // TransitionComponent={Transition}
        aria-labelledby="customized-dialog-title"
        className={'cart_dialog'}
        onClose={handleClickClose}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClickClose}
        >
          <span style={{ fontWeight: '700', fontSize: '22px' }}>
            Order Summary
          </span>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description">
            <TableContainer style={{ borderRadius: 0 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{ background: '#C7C7C7' }}>
                  <TableRow>
                    <TableCell style={{ color: '#343D42' }} align="left">
                      Cus #
                    </TableCell>
                    <TableCell style={{ color: '#343D42' }} align="left">
                      Part #
                    </TableCell>
                    <TableCell style={{ color: '#343D42' }} align="left">
                      Qty Requested
                    </TableCell>

                    <TableCell style={{ color: '#343D42' }} align="left">
                      Date Required
                    </TableCell>
                    <TableCell style={{ color: '#343D42' }} align="left">
                      PO Number
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartData &&
                    cartData?.map((row) => (
                      <TableRow
                        key={row}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell align="left" component="th" scope="row">
                          {row.customerNumber}
                        </TableCell>
                        <TableCell align="left" component="th" scope="row">
                          {row.partNumber}
                        </TableCell>
                        <TableCell align="left">{row.quantity}</TableCell>

                        <TableCell align="left">
                          {moment.utc(row.dueDate).format('MM/DD/YYYY')}
                        </TableCell>
                        <TableCell align="left">
                          {row.purchaseOrderNumber}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={handleEditCart}>Edit Cart</CancelButton>
          <AddButton onClick={handleSubmit} style={{ marginLeft: '10px' }}>
            Submit
          </AddButton>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default HeaderMenu;
