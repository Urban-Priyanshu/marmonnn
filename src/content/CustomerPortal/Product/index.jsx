import { Helmet } from 'react-helmet-async';
import { Box, styled, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomerPortalTable from './Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCustomersById,
  getCustomer
} from 'src/redux/actions/sysAdminActions';
import { advanceTime } from 'src/services/Time-tracking';
import { timeCalculation } from 'src/redux/actions/DashboardActions';

const MainContainer = styled(Box)(
  () => `
  padding: 0px 32px 0px 32px;
  `
);

/* identical to box height */

function CustomerPortalMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0
  });
  const authToken = useSelector((state) => state?.auth?.token?.token);
  
  const authUser = useSelector((state) => state?.auth?.authUserData);
  const customersById = useSelector((state) => state?.customers?.customersById);

 
  useEffect(() => {
    if (authUser && authUser?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')) {
      dispatch(getCustomer(authUser?.associateCustomerId, authToken));
    } else {
      
      dispatch(getCustomer(id, authToken));
    }

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
      
     if(value?.seconds > 59){
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
    if(value?.seconds > 59){
      dispatch(timeCalculation(authUser?.email, "Base Feature"  , value?.seconds ,authUser?.associateCustomerId ))
      localStorage.clear();
     }
    
  }

  return (
    <>
      <MainContainer>
        <CustomerPortalTable userID={id} />
      </MainContainer>
    </>
  );
}

export default CustomerPortalMain;
