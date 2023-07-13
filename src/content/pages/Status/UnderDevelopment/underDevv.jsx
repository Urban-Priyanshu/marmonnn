import { Box, Typography, Container, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import DemoAnalytics from '../../../../assets/Images/demoAnalytics.png';

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

function UnderDevv() {
  const authUserData = useSelector((state) => state?.auth?.authUserData);
  return (
    <>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Container maxWidth="lg">
              <Typography variant="h2" sx={{ mt: 8, mb: 8 }}>
                BarCode Scanner Page is under Development!
              </Typography>
              <Typography
                variant="h3"
                color="text.secondary"
                fontWeight="normal"
                sx={{ mb: 4 }}
              ></Typography>{' '}
            </Container>
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

export default UnderDevv;
