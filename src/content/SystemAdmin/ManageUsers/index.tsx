import { Box, Container, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomersTable from './Table';

const MainContainer = styled(Box)(
  () => `
  padding: 0px 32px 0px 32px;
  width: 100%; 
  `
);

export default function ManageCustomers() {
  return (
    <>
      <MainContainer>
        <CustomersTable />
      </MainContainer>
    </>
  );
}
