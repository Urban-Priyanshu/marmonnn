import { useContext, useEffect } from 'react';

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from '../../../contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import HeaderMenu from './Menu';

import HeaderButtons from './Buttons';
import HeaderUserbox from './Userbox';

import { useDispatch, useSelector } from 'react-redux';
import BrandLogo from '../../../assets/Images/MarmonLogo.svg';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: 60px;
        color: ${theme?.header?.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: #102132;
        position: fixed;
        justify-content: space-between;
        width: 100%;
        border-bottom: #E6EFF6 1px solid;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: 0;
            width: auto;
        }
`
);

function Header() {
  const dispatch = useDispatch();
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const userData = useSelector((state) => state?.auth?.authUserData);
  const authToken = useSelector((state) => state?.auth?.token?.token);

  const theme = useTheme();

  return (
    <HeaderWrapper className='custom-header-sec'
      sx={{ padding: '0 2.8%' }}
      display="flex"
      alignItems="center"
    >
      <div>
        <Link to="/">
          <img style={{ marginTop: '10px' }} src={BrandLogo}></img>
        </Link>
      </div>
      <Box display="flex" alignItems="center">
        <HeaderMenu />
        <HeaderUserbox userData={userData} authToken={authToken} />
        <Box
          component="span"
          sx={{
            ml: 2,
            display: { lg: 'none', xs: 'inline-block' }
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? (
                <MenuTwoToneIcon fontSize="small" />
              ) : (
                <CloseTwoToneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
