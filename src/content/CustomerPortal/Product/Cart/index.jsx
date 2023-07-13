import { Helmet } from 'react-helmet-async';
import { Box, styled, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomerPortalTable from './Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomer } from 'src/redux/actions/sysAdminActions';
import CartTable from './Table';
import Breadcrumb from 'src/components/Breadcrumb';
import { timeCalculation } from 'src/redux/actions/DashboardActions';
import { advanceTime } from 'src/services/Time-tracking';

const MainContainer = styled(Box)(
  () => `
  padding: 32px 32px 0px 32px;
  `
);

/* identical to box height */

function ProductCart() {
  // const dispatch = useDispatch();
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0
  });
  const authUser = useSelector((state) => state?.auth?.authUserData);
  const navigate = useNavigate();



  const customerData = useSelector((state) => state?.customers?.customerData);

  useEffect(() => {
    navigate('?cp=true');
  }, []);

  
 
  useEffect(() => {
  
    if (authUser && authUser?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')) {
    let isCancelled = false;

    advanceTime(time, isCancelled, setTime , "Base Feature" );
   
    return () => {
      
      isCancelled = true;
      localStorage.setItem('componentTime', JSON.stringify(time));
    };
  }
  }, [time]);
 

  useEffect(() => {
    return () => {
      const value = JSON.parse(localStorage.getItem('componentTime'));
      
     if(value?.seconds > 20){
      dispatch(timeCalculation(authUser?.email, "Base Feature" , value?.seconds ,authUser?.associateCustomerId ))
     }
      
      
      localStorage.clear();
    
    };
  }, []);

  useEffect(() => {
    if (authUser && authUser?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')) {
      window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
    }
   
  }, []);
 

  function handleUnload(event) {
    event.preventDefault();
    event.returnValue = '';

    // Make API call here
    const value = JSON.parse(localStorage.getItem('componentTime'));
    if(value?.seconds > 20){
      dispatch(timeCalculation(authUser?.email, "Base Feature"  , value?.seconds ,authUser?.associateCustomerId ))
      localStorage.clear();
     }
    
  }

 

  return (
    <>
      <MainContainer>
        <Box sx={{ margin: '0px 0 10px 0' }}>
          <Breadcrumb
            userData={customerData}
            location={[
              {
                location: 'Home',
                to: `/customer-portal/${customerData?.id}/products`
              }
            ]}
            page={'Cart'}
          />
        </Box>

        <CartTable />
      </MainContainer>
    </>
  );
}

export default ProductCart;
