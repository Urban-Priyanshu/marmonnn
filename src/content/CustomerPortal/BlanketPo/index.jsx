import { Helmet } from 'react-helmet-async';
import { Box, styled, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlanketPoConfig from 'src/content/SystemAdmin/ManageUsers/SingleCustomer/CustomerTabs/BlanketPoConfig';

const MainContainer = styled(Box)(
  () => `
  padding: 0px 32px 0px 32px;
  `
);



function CustomerPortalBlanketPo() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('?cp=true');
  }, []);
  return (
    <>
      <MainContainer>
        <BlanketPoConfig CustomerPortal={true} />
      </MainContainer>
    </>
  );
}

export default CustomerPortalBlanketPo;
