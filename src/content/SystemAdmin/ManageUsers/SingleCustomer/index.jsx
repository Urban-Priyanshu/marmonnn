import { Helmet } from 'react-helmet-async';
import { Box, styled, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Breadcrumb from '../../../../components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificUsersByRole } from '../../../../redux/actions/userActions';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';

import {
  getAllFeatures,
  getCustomer,
  getAllUnAssociatedCustomers
} from 'src/redux/actions/sysAdminActions';

import useFormControls from './CustomerTabs/CustomerInformation/Validations';
import '../../../../App.css';
import ExternalUserTable from './CustomerTabs/ExternalUsers/Table';

import BulkOrderConfig from './CustomerTabs/BulkOrderConfig';
import ForestOrderConfig from './CustomerTabs/ForestOrderConfig';
import BlanketPoConfig from './CustomerTabs/BlanketPoConfig';
import BarCodeScannerConfig from './CustomerTabs/BarcodeScanner';
import CustomerInformation from './CustomerTabs/CustomerInformation/CustomerInformation';
import BasicCard from 'src/content/Dashboard/portalCard/card';

const MainContainer = styled(Box)(
  () => `
  padding: 32px 32px 0 32px;
  `
);

const CustomContainer = styled(Box)(
  () => `
  padding: 0px 0px 20px 0px;`
);

const ContentContainer = styled(Box)(
  () => `
  padding: 0px 31px 0px 31px;
  background-color:#FFFFFF;
  // overflow-y: auto;
  
  // height: 100vh !important;
  `
);

const SubContentContainer = styled(Box)(
  () => `
  padding: 24px 31px 0px 31px;
    background-color:#FFFFFF;
  `
);

const Header = styled(Box)(
  () => `
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  padding: 40px 0 16px 0;
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

const SubTabItem = styled(Box)(
  () => `

  font-family: Open Sans;
  padding: 12px 40px;
  cursor: pointer;
  color: #72869A;
  background: #F2F2F2;
border-radius: 3px 0px 0px 3px;
  
font-weight: 700;
font-size: 18px;
font-weight: 700;
font-size: 18px;
line-height: 21px;
  

  
  `
);

const TopBox = styled(Box)(
  () => `

 padding: 40px 32px 22px 32px;
 
 background: #FFFFFF
  
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

/* identical to box height */

const CustomLabel = styled(FormControlLabel)(
  () => `
  margin: 0
  `
);

function EditCustomer() {
  const { state } = useLocation();

  const dispatch = useDispatch();
  const { id } = useParams();

  const customerData = useSelector((state) => state?.customers?.customerData);

  const [tab, setTab] = useState('Cus Info');
  const [subTab, setSubTab] = useState('Bulk Order PO');
  const [schedule, setSchedule] = useState();

  const [status, setStatus] = useState();

  const authToken = useSelector((state) => state?.auth?.token?.token);

  const authUserRole = useSelector((state) => state?.auth?.authUserData);

  useEffect(() => {
    if (id) {
    
      dispatch(getCustomer(id, authToken));
    }
    dispatch(getSpecificUsersByRole('ROLE_SALES_USER', 'A', authToken));
    dispatch(getAllFeatures(authToken));
  }, [id]);

  useEffect(() => {
    if (customerData && customerData?.customerNumber) {
      dispatch(
        getAllUnAssociatedCustomers(authToken, customerData?.customerNumber)
      );
    }
  }, [customerData]);

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
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
          backgroundColor:
            theme.palette.mode === 'light' ? '#2ECA45' : '#65C466',
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

  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls(undefined, status);

  return (
    <>
      <MainContainer>
        <CustomContainer>
          {state && state?.breadCrumb === 'manage-sales-customers' ? (
            <Breadcrumb
              userData={customerData}
              location={[
                { location: 'Manage Customer', to: '/manage-sales-customers' }
              ]}
            />
          ) : (
            <Breadcrumb
              userData={customerData}
              location={[
                { location: 'Manage Customer', to: '/manage-customers' }
              ]}
            />
          )}

          <CustomerSetup>
            <span>Customer Setup</span>
          </CustomerSetup>

          <CustomContainer>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 0, sm: 0, md: 0 }}
              sx={{ padding: '10px 0 0 0px' }}
            >
              {/* <Grid item xs={12} md={12}> */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  textAlign: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <TabItem
                  className={`TEST` && tab === 'Cus Info' && 'tabActive'}
                  id="TEST"
                  onClick={() => setTab('Cus Info')}
                >
                  Customer Information
                </TabItem>

                {authUserRole &&
                  authUserRole?.roles?.find(
                    (d) =>
                      d?.code !== 'ROLE_SALES_USER' &&
                      (d?.code === 'ROLE_SUPER_ADMIN' ||
                        d?.code === 'ROLE_SYSTEM_ADMIN')
                  ) && (
                    <TabItem
                      className={`TEST2` && tab === 'Ext User' && 'tabActive'}
                      id="TEST2"
                      onClick={() => setTab('Ext User')}
                    >
                      External User(s)
                    </TabItem>
                  )}

                <TabItem
                  className={`TEST4` && tab === 'Config' && 'tabActive'}
                  id="TEST4"
                  onClick={() => setTab('Config')}
                >
                  Configuration
                </TabItem>
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              {tab && tab === 'Cus Info' && (
                <ContentContainer>
                  <CustomerInformation scheduleData={schedule} />
                </ContentContainer>
              )}

              {tab && tab === 'Ext User' && (
                <>
                  <ExternalUserTable />
                </>
              )}

              {tab && tab === 'Int User' && (
                <>
                  <Box
                    sx={{
                      background: '#F7F7F7',
                      padding: '30px'
                    }}
                  >
                    {' '}
                    <Box
                      sx={{
                        display: { md: 'flex', xs: 'box' },
                        flexDirection: 'row'
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <span style={{ fontWeight: '700', fontSize: '20px' }}>
                          Internal User(s)
                        </span>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}

              {tab && tab === 'Config' && (
                <SubContentContainer>
                  <CustomContainer>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        textAlign: 'center',
                        flexWrap: 'wrap'
                      }}
                    >
                      <SubTabItem
                        className={
                          `TEST4` &&
                          subTab === 'Bulk Order PO' &&
                          'subTabActive'
                        }
                        id="TEST4"
                        onClick={() => setSubTab('Bulk Order PO')}
                      >
                        Bulk Order
                      </SubTabItem>

                      <SubTabItem
                        className={
                          `TEST6` &&
                          subTab === 'Forecast Order PO' &&
                          'subTabActive'
                        }
                        id="TEST6"
                        onClick={() => setSubTab('Forecast Order PO')}
                      >
                        Forecast
                      </SubTabItem>
                      <SubTabItem
                        className={
                          `TEST7` &&
                          subTab === 'Blanket PO Configuration' &&
                          'subTabActive'
                        }
                        id="TEST7"
                        onClick={() => setSubTab('Blanket PO Configuration')}
                      >
                        Blanket PO
                      </SubTabItem>
                      <SubTabItem
                        className={
                          `TEST7` &&
                          subTab === 'Barcode Scanner Configuration' &&
                          'subTabActive'
                        }
                        id="TEST7"
                        onClick={() =>
                          setSubTab('Barcode Scanner Configuration')
                        }
                      >
                        Barcode Scanner
                      </SubTabItem>
                    </Box>
                    {subTab && subTab === 'Bulk Order PO' && (
                      <>
                        <BulkOrderConfig />
                      </>
                    )}
                    {subTab && subTab === 'Forecast Order PO' && (
                      <>
                        <ForestOrderConfig />
                      </>
                    )}
                    {subTab && subTab === 'Blanket PO Configuration' && (
                      <>
                        <BlanketPoConfig />
                      </>
                    )}
                    {subTab && subTab === 'Barcode Scanner Configuration' && (
                      <>
                        <BarCodeScannerConfig />
                      </>
                    )}
                  </CustomContainer>
                </SubContentContainer>
              )}
            </Grid>
          </CustomContainer>
        </CustomContainer>
      </MainContainer>
    </>
  );
}

export default EditCustomer;
