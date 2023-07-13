import {
  Box,
  Typography,
  Container,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCustomer } from 'src/redux/actions/sysAdminActions';

const MainContent = styled(Box)(
  () => `
      height: 100%;
      display: flex;
      flex: 1;
      overflow: auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `
);

function NoPermissions() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state?.auth?.authUserData);
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const customerData = useSelector((state) => state?.customers?.customerData);

  

  useEffect(() => {
    if (authUser && authUser?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')) {
      dispatch(getCustomer(authUser?.associateCustomerId, authToken));
    } else {
      dispatch(getCustomer(id, authToken));
    }
  }, []);

  useEffect(() => {
    if (authUser && authUser?.roles?.find((d) => d?.code === 'ROLE_CUSTOMER')) {
      if (authUser?.features?.find((d) => d?.featureCode === 'BF')) {
        navigate('?cp=true');
      } else if (authUser?.features?.find((d) => d?.featureCode === 'BO')) {
        navigate(
          `/customer-portal/${authUser?.associateCustomerId}/bulkOrder?cp=true`
        );
      } else if (authUser?.features?.find((d) => d?.featureCode === 'BPO')) {
        navigate(
          `/customer-portal/${authUser?.associateCustomerId}/blanketPo?cp=true`
        );
      } else if (authUser?.features?.find((d) => d?.featureCode === 'BCS')) {
        navigate(
          `/customer-portal/${authUser?.associateCustomerId}/BarCodeScanner?cp=true`
        );
      } else if (authUser?.features?.find((d) => d?.featureCode === 'FC')) {
        navigate(
          `/customer-portal/${authUser?.associateCustomerId}/forecast?cp=true`
        );
      }
    } else {
      if (customerData?.features?.find((d) => d?.featureCode === 'BF')) {
        navigate('?cp=true');
      } else if (customerData?.features?.find((d) => d?.featureCode === 'BO')) {
        navigate(`/customer-portal/${customerData?.id}/bulkOrder?cp=true`);
      } else if (
        customerData?.features?.find((d) => d?.featureCode === 'BPO')
      ) {
        navigate(`/customer-portal/${customerData?.id}/blanketPo?cp=true`);
      } else if (
        customerData?.features?.find((d) => d?.featureCode === 'BCS')
      ) {
        navigate(`/customer-portal/${customerData?.id}/BarCodeScanner?cp=true`);
      } else if (customerData?.features?.find((d) => d?.featureCode === 'FC')) {
        navigate(`/customer-portal/${customerData?.id}/forecast?cp=true`);
      }
    }
  }, [customerData, authUser]);
  return (
    <>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Container maxWidth="lg">
              <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
                You do not have permissions to view this Page!
              </Typography>
            </Container>
            <img
              alt="Maintenance"
              height={250}
              src="/static/images/status/maintenance.svg"
            />
          </Box>
          <Divider sx={{ my: 4 }} />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* <Box>
                <Typography component="span" variant="subtitle1">
                  Phone:{' '}
                </Typography>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="text.primary"
                >
                  + 00 1 888 555 444
                </Typography>
              </Box> */}
            {/* <Box>
                <Tooltip arrow placement="top" title="Facebook">
                  <IconButton color="primary">
                    <FacebookIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="top" title="Twitter">
                  <IconButton color="primary">
                    <TwitterIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="top" title="Instagram">
                  <IconButton color="primary">
                    <InstagramIcon />
                  </IconButton>
                </Tooltip>
              </Box> */}
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default NoPermissions;
