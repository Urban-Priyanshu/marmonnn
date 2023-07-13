import { Helmet } from 'react-helmet-async';
import { Box, styled, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ForestOrderConfig from 'src/content/SystemAdmin/ManageUsers/SingleCustomer/CustomerTabs/ForestOrderConfig';

const MainContainer = styled(Box)(
  () => `
  padding: 0px 32px 0px 32px;
  `
);

/* identical to box height */

function CustomerPortalForecast() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('?cp=true');
  }, []);
  return (
    <>
      <MainContainer>
        <ForestOrderConfig CustomerPortal={true} />
      </MainContainer>
    </>
  );
}

export default CustomerPortalForecast;
