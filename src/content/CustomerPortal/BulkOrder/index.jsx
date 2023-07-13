import { Helmet } from 'react-helmet-async';
import { Box, styled, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BulkOrderConfig from 'src/content/SystemAdmin/ManageUsers/SingleCustomer/CustomerTabs/BulkOrderConfig';

const MainContainer = styled(Box)(
  () => `
  padding: 0px 32px 0px 32px;
  `
);


function CustomerPortalBulkOrder() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('?cp=true');
  }, []);
  return (
    <>
      <MainContainer>
        <BulkOrderConfig CustomerPortal={true} />
      </MainContainer>
    </>
  );
}

export default CustomerPortalBulkOrder;
