import { Box, Container, Link, Typography, styled } from '@mui/material';
import BrandLogo from 'src/assets/Images/MarmonLogo.svg';
import background from 'src/assets/footer/footerBG.png';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
        width: 100% !important;
        min-width: 100%;
        /* position: absolute; */
        background: #102132 !important;
        z-index:1 !important;
        /* bottom: 0; */
        position: relative;
        z-index: 1000;
        bottom: 0;
        background: #1c2630

`
);




const UnderFooter = styled(Typography)(
  ({ theme }) => `
  
  color: #fff;
  font-size: 14px;
}
`
);

function Footer() {
  return (
    <FooterWrapper className="footer">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1"></Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}></Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          <Link target="_blank" rel="noopener noreferrer"></Link>
        </Typography>
      </Box>

      

      <Box sx={{ width: '80%', marginLeft: '10%' }}></Box>

      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="left"
        textAlign={{ xs: 'left', md: 'left' }}
        justifyContent="space-around"
        sx={{ paddingTop: '20px !important' }}
      >
        <Box>
          {/* <UnderFooter variant="subtitle1">
            © 2021 Marmon/Keystone. All rights reserved.
          </UnderFooter> */}
        </Box>{' '}
        <img style={{ width: '10%', padding: '15px' }} src={BrandLogo}></img>
        <Box>
          {/* <UnderFooter variant="subtitle1"> Follow Us on LinkedIn</UnderFooter> */}
        </Box>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
