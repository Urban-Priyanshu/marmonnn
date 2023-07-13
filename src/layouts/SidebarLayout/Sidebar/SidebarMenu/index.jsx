import { useContext, useMemo } from 'react';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { SidebarContext } from '../../../../contexts/SidebarContext';

import HomeIcon from '../../../../assets/Icons/Home_inactive.svg';
import HomeActive from '../../../../assets/Icons/Home_active.svg';
import Vector_active from '../../../../assets/Icons/Vector_active.svg';
import user_inactive from '../../../../assets/Icons/user_inactive.svg';
import UserIcon from '../../../../assets/Icons/Customer_inactive.svg';
import UserActive from '../../../../assets/Icons/Customer_active.svg';
import MonitorIcon from '../../../../assets/Icons/Monitor.png';
import MonitorActive from '../../../../assets/Icons/PC_active.svg';

import Icon1 from '../../../../assets/Icons/icon1.svg';

import Icon2 from '../../../../assets/Icons/icon2.svg';
import Icon3 from '../../../../assets/Icons/icon3.svg';
import Icon4 from '../../../../assets/Icons/icon4.svg';
import Icon5 from '../../../../assets/Icons/icon5.svg';

import Icon1_active from '../../../../assets/Icons/Icon1_active.svg';
import Icon2_active from '../../../../assets/Icons/Icon2_active.svg';
import Icon3_active from '../../../../assets/Icons/Icon3_active.svg';
import Icon4_active from '../../../../assets/Icons/Icon4_active.svg';
import Icon5_active from '../../../../assets/Icons/Icon5_active.svg';

import PcActive from '../../../../assets/Icons/PC_active.svg';

import ManageUserActive from '../../../../assets/Icons/Users_active.svg';
import ManageUserIcon from '../../../../assets/Icons/Users_inactive.svg';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding-top: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme?.colors?.alpha?.trueWhite[50]};
      // padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme?.colors?.primary?.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme?.colors?.alpha?.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme?.colors?.alpha?.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme?.colors?.alpha?.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          & {
            
      border-left: transparent solid 3px;
          }

          &.active
           {
            background-color: #FFFFFF;
            border-left: #20A2F3 solid 3px;
            color: #20A2F3;
            border-radius: unset;

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme?.colors?.alpha?.trueWhite[100]};
            }
          }
          
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme?.colors?.alpha?.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

const IconHolder = styled(Box)(
  () => `
      margin: 0px 15px 0px 15px;

`
);

function SidebarMenu(props) {
  const { closeSidebar, Active } = useContext(SidebarContext);

  const menuActive = useSelector((state) => state?.dashboard?.getMenuActive);

  const authUserData = useSelector((state) => state?.auth?.authUserData);
  const customerData = useSelector((state) => state?.customers?.customerData);

  const userType = authUserData?.roles?.some((d) => d?.id === 1 || d?.id === 2);

  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  return (
    <>
      <MenuWrapper>
        <List
          component="div"
          sx={{ padding: '0px' }}
          subheader={
            <ListSubheader component="div" disableSticky></ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List sx={{ padding: '0px' }}>
              {/* <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                <Button
                  disabled
                  disableRipple
                  onClick={closeSidebar}
                  startIcon={
                    <IconHolder className="">
                      <img src={TopIcon}></img>
                    </IconHolder>
                  }
                ></Button>
              </ListItem> */}
           
              {authUserData && authUserData?.roles?.some((d) => d?.id <= 3) && (
                <>
                  <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                    <Tooltip title="Home" arrow>
                      <Button
                        disableRipple
                        component={RouterLink}
                        to={'/portal'}
                        startIcon={
                          <IconHolder>
                           
                            <img
                              className="ion_side active"
                              src={HomeIcon}
                            ></img>
                          </IconHolder>
                        }
                      ></Button>
                    </Tooltip>
                  </ListItem>
                </>
              )}

              {authUserData && authUserData?.roles?.some((d) => d?.id === 1) && (
                <>
                 
                  <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                    <Tooltip title="Manage Users" arrow>
                      <Button
                        disableRipple
                        component={RouterLink}
                        to="/manage-users"
                        startIcon={
                          <IconHolder>
                            <img
                              className="ion_side active"
                              src={ManageUserIcon}
                            ></img>
                          </IconHolder>
                        }
                      ></Button>
                    </Tooltip>
                  </ListItem>
                </>
              )}

              {authUserData &&
                authUserData?.roles?.some(
                  (d) => d?.id === 1 || d?.id === 2
                ) && (
                  <>
                    <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                      <Tooltip title="Manage Customers" arrow>
                        <Button
                          disableRipple
                          component={RouterLink}
                          onClick={() => closeSidebar(3)}
                          to={'/manage-customers'}
                          startIcon={
                            <IconHolder>
                              <img
                                className="ion_side active"
                                src={UserIcon}
                              ></img>
                            </IconHolder>
                          }
                        ></Button>
                      </Tooltip>
                    </ListItem>
                  </>
                )}

              {authUserData && authUserData?.roles?.some((d) => d?.id === 3) && (
                <>
                  <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                    <Tooltip title="Manage Sales Customers" arrow>
                      <Button
                        disableRipple
                        component={RouterLink}
                        onClick={() => closeSidebar(9)}
                        to="/manage-sales-customers"
                        startIcon={
                          <IconHolder>
                            <img
                              className="ion_side active"
                              src={MonitorIcon}
                            ></img>
                          </IconHolder>
                        }
                      ></Button>
                    </Tooltip>
                  </ListItem>
                </>
              )}

              {authUserData && authUserData?.roles?.some((d) => d?.id > 3) && (
                <>
                  {authUserData?.features?.find(
                    (d) => d?.featureCode === 'BF'
                  ) && (
                    <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                      <Tooltip title="Products" disableInteractive>
                        <Button
                          disableRipple
                          component={RouterLink}
                          onClick={() => closeSidebar(10)}
                          to={`/customer-portal/${customerData?.id}/products?cp=true`}
                          startIcon={
                            <IconHolder>
                              <img
                                className="ion_side active"
                                src={user_inactive}
                              ></img>
                            </IconHolder>
                          }
                        ></Button>
                      </Tooltip>
                    </ListItem>
                  )}
                  {query.get('cp') === 'true' && (
                    <>
                      {authUserData?.features?.find(
                        (d) => d?.featureCode === 'BF'
                      ) && (
                        <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                          <Tooltip title="Order History" disableInteractive>
                            <Button
                              disableRipple
                              component={RouterLink}
                              onClick={() => closeSidebar(4)}
                              to={`/customer-portal/${customerData?.id}/orderHistory?cp=true`}
                              startIcon={
                                <IconHolder>
                                  <img
                                    className="ion_side active"
                                    src={Icon1}
                                  ></img>
                                </IconHolder>
                              }
                            ></Button>
                          </Tooltip>
                        </ListItem>
                      )}
                      {authUserData?.features?.find(
                        (d) => d?.featureCode === 'BCS'
                      ) && (
                        <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                          <Tooltip title="Barcode Scanner" disableInteractive>
                            <Button
                              disableRipple
                              component={RouterLink}
                              onClick={() => closeSidebar(5)}
                              to={`/customer-portal/${customerData?.id}/BarCodeScanner?cp=true`}
                              startIcon={
                                <IconHolder>
                                  <img
                                    className="ion_side active"
                                    src={Icon2}
                                  ></img>
                                </IconHolder>
                              }
                            ></Button>
                          </Tooltip>
                        </ListItem>
                      )}
                      {authUserData?.features?.find(
                        (d) => d?.featureCode === 'BO'
                      ) && (
                        <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                          <Tooltip title="Bulk Order" disableInteractive>
                            <Button
                              disableRipple
                              component={RouterLink}
                              onClick={() => closeSidebar(6)}
                              to={`/customer-portal/${authUserData?.associateCustomerId}/bulkOrder?cp=true`}
                              startIcon={
                                <IconHolder>
                                  <img
                                    className="ion_side active"
                                    src={Icon3}
                                  ></img>
                                </IconHolder>
                              }
                            ></Button>
                          </Tooltip>
                        </ListItem>
                      )}

                      {authUserData?.features?.find(
                        (d) => d?.featureCode === 'BPO'
                      ) && (
                        <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                          <Tooltip title="Blanket PO" disableInteractive>
                            <Button
                              disableRipple
                              component={RouterLink}
                              onClick={() => closeSidebar(7)}
                              to={`/customer-portal/${authUserData?.associateCustomerId}/blanketPo?cp=true`}
                              startIcon={
                                <IconHolder>
                                  <img
                                    className="ion_side active"
                                    src={Icon4}
                                  ></img>
                                </IconHolder>
                              }
                            ></Button>
                          </Tooltip>
                        </ListItem>
                      )}

                      {authUserData?.features?.find(
                        (d) => d?.featureCode === 'FC'
                      ) && (
                        <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                          <Tooltip title="Forecast" disableInteractive>
                            <Button
                              disableRipple
                              component={RouterLink}
                              onClick={() => closeSidebar(8)}
                              to={`/customer-portal/${authUserData?.associateCustomerId}/forecast?cp=true`}
                              startIcon={
                                <IconHolder>
                                  <img
                                    className="ion_side active"
                                    src={Icon5}
                                  ></img>
                                </IconHolder>
                              }
                            ></Button>
                          </Tooltip>
                        </ListItem>
                      )}
                    </>
                  )}
                </>
              )}

              {authUserData && authUserData?.roles?.some((d) => d?.id <= 3) && (
                <>
                  {query.get('cp') === 'true' && (
                    <>
                      {customerData?.features?.find(
                        (d) => d?.featureCode === 'BF'
                      ) && (
                        <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                          <Tooltip title="Products" disableInteractive>
                            <Button
                              disableRipple
                              component={RouterLink}
                              onClick={() => closeSidebar(10)}
                              to={`/customer-portal/${customerData?.id}/products?cp=true`}
                              startIcon={
                                <IconHolder>
                                  <img
                                    className="ion_side active"
                                    src={user_inactive}
                                  ></img>
                                </IconHolder>
                              }
                            ></Button>
                          </Tooltip>
                        </ListItem>
                      )}
                      {customerData?.features?.find(
                        (d) => d?.featureCode === 'BF'
                      ) && (
                        <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                          <Tooltip title="Order History" disableInteractive>
                            <Button
                              disableRipple
                              component={RouterLink}
                              onClick={() => closeSidebar(4)}
                              to={`/customer-portal/${customerData?.id}/orderHistory?cp=true`}
                              startIcon={
                                <IconHolder>
                                  <img
                                    className="ion_side active"
                                    src={Icon1}
                                  ></img>
                                </IconHolder>
                              }
                            ></Button>
                          </Tooltip>
                        </ListItem>
                      )}
                      {customerData?.features?.find(
                        (d) => d?.featureCode === 'BCS'
                      ) && (
                        <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                          <Tooltip title="Barcode Scanner" disableInteractive>
                            <Button
                              disableRipple
                              component={RouterLink}
                              onClick={() => closeSidebar(5)}
                              to={`/customer-portal/${customerData?.id}/BarCodeScanner?cp=true`}
                              startIcon={
                                <IconHolder>
                                  <img
                                    className="ion_side active"
                                    src={Icon2}
                                  ></img>
                                </IconHolder>
                              }
                            ></Button>
                          </Tooltip>
                        </ListItem>
                      )}
                      {customerData?.features?.find(
                        (d) => d?.featureCode === 'BO'
                      ) && (
                        <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                          <Tooltip title="Bulk Order" disableInteractive>
                            <Button
                              disableRipple
                              component={RouterLink}
                              onClick={() => closeSidebar(6)}
                              to={`/customer-portal/${authUserData?.associateCustomerId}/bulkOrder?cp=true`}
                              startIcon={
                                <IconHolder>
                                  <img
                                    className="ion_side active"
                                    src={Icon3}
                                  ></img>
                                </IconHolder>
                              }
                            ></Button>
                          </Tooltip>
                        </ListItem>
                      )}

                      {customerData?.features?.find(
                        (d) => d?.featureCode === 'BPO'
                      ) && (
                        <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                          <Tooltip title="Blanket PO" disableInteractive>
                            <Button
                              disableRipple
                              component={RouterLink}
                              onClick={() => closeSidebar(7)}
                              to={`/customer-portal/${authUserData?.associateCustomerId}/blanketPo?cp=true`}
                              startIcon={
                                <IconHolder>
                                  <img
                                    className="ion_side active"
                                    src={Icon4}
                                  ></img>
                                </IconHolder>
                              }
                            ></Button>
                          </Tooltip>
                        </ListItem>
                      )}

                      {customerData?.features?.find(
                        (d) => d?.featureCode === 'FC'
                      ) && (
                        <ListItem sx={{ padding: '0px', marginBottom: '20px' }}>
                          <Tooltip title="Forecast" disableInteractive>
                            <Button
                              disableRipple
                              component={RouterLink}
                              onClick={() => closeSidebar(8)}
                              to={`/customer-portal/${authUserData?.associateCustomerId}/forecast?cp=true`}
                              startIcon={
                                <IconHolder>
                                  <img
                                    className="ion_side active"
                                    src={Icon5}
                                  ></img>
                                </IconHolder>
                              }
                            ></Button>
                          </Tooltip>
                        </ListItem>
                      )}
                    </>
                  )}
                </>
              )}
             
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
