import { Helmet } from 'react-helmet-async';
import { Box, styled, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../../../../components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';

import { getCustomer } from 'src/redux/actions/sysAdminActions';
import moment from 'moment';

const MainContainer = styled(Box)(
  () => `
  padding: 15px 0px;
  width: 95%; 
  margin-left: 2%;
  `
);

const CustomContainer = styled(Box)(
  () => `
  padding: 0px 0px 0px 0px;`
);

const HistoryItem = styled(Box)(
  () => `
  font-family: 'Open Sans';
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  
  color: #15364A;
  margin-bottom: 4px;
`
);

const ContentBox = styled(Box)(
  () => `
  padding: 0px 80px 0 32px;
`
);

const TextSpan = styled(Typography)(
  () => `
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */
  
  
  color: #15364A;
`
);
function CustomerInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const customerData = useSelector((state) => state?.customers?.customerData);
  const authToken = useSelector((state) => state?.auth?.token?.token);

  useEffect(() => {
    if (id) dispatch(getCustomer(id, authToken));
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          padding: '26px 0px 26px 0px',
          background: '#F2F2F2 !important'
        }}
      >
        <Grid item>
          <ContentBox>
            <HistoryItem>Customer Number</HistoryItem>
            <TextSpan>{customerData?.customerNumber}</TextSpan>
          </ContentBox>
        </Grid>
        <Grid item>
          <ContentBox>
            <HistoryItem>Customer Name</HistoryItem>
            <TextSpan>{customerData?.customerName} </TextSpan>
          </ContentBox>
        </Grid>

        <Grid item>
          <ContentBox>
            <HistoryItem>Last Modified By</HistoryItem>
            <TextSpan>{customerData?.updatedBy}</TextSpan>
          </ContentBox>
        </Grid>
        <Grid item>
          <ContentBox>
            <HistoryItem>No of Users</HistoryItem>
            <TextSpan>
              {customerData?.associatedUsers?.filter(
                (d) => d?.userType === 'CE'
              ).length ?? 'N/A'}
            </TextSpan>
          </ContentBox>
        </Grid>
        <Grid item>
          <ContentBox>
            <HistoryItem>Last Updated Date</HistoryItem>
            <TextSpan>
              {moment.utc(customerData?.updatedDate).format('MM/DD/YYYY HH:mm')}
            </TextSpan>
          </ContentBox>
        </Grid>
      </Box>
    </>
  );
}

export default CustomerInfo;
