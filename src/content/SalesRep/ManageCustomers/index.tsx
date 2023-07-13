import { Box, styled } from '@mui/material';
import { useEffect } from 'react';
import SalesCustomerTable from './Table';

const MainContainer = styled(Box)(
  () => `padding: 0px 32px 0px 32px;
  width: 100%;
  `
);

export default function ManageSalesCustomers() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <MainContainer>
        <SalesCustomerTable />
      </MainContainer>
    </>
  );
}
