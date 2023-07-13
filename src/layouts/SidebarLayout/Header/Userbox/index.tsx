import { useRef, useState } from 'react';

import { Link, NavLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { logout } from 'src/redux/actions/authActions';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};        
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors?.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: #15364A;
        display: block;
        font-size: 14px;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: #15364A;
        font-size: 11px;
`
);

const ItemText = styled(ListItemText)(
  ({ theme }) => `
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #15364A;
  padding: 10px;
  text-align: left !important;
`
);

const LogoutText = styled(ListItemText)(
  ({ theme }) => `
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  padding: 10px;
  text-align: left !important;
  color: red;
  cursor: pointer;
`
);

function HeaderUserbox({ userData, authToken }) {
  const dispatch: Dispatch<any> = useDispatch();
  const user = {
    name: userData?.firstName + ' ' + userData?.lastName,
    avatar: '../../../../assets/misc/dp.png',
    role: userData?.roles?.map((d) => d?.description)
  };

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const onLogoutClick = () => {
    dispatch(logout(authToken));
  };

  return (
    <>
      <div className="avatar_box">
        <UserBoxButton className='' color="secondary" ref={ref} onClick={handleOpen}>
          <Avatar
            sx={{
              borderRadius: '50%',
              backgroundColor: '#EB4F0C',
              height: '44px',
              width: '44px',
              textTransform:'uppercase'
            }}
            variant="rounded"
            alt={userData?.firstName + userData?.lastName}
            src={userData?.firstName + userData?.lastName}
          />
          {/* <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden> */}
          <Hidden smDown>
            <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
          </Hidden>
        </UserBoxButton>
      </div>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          {/* <Avatar variant="rounded" alt={user.name} src={user.avatar} /> */}
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {userData?.firstName + ' ' + userData?.lastName}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              Signed in as{' '}
              <b>
                {userData &&
                  userData?.roles?.slice(0, 1).map((d) => d?.description)}
              </b>
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <List sx={{ p: 0, ml: 2, mt: -2, mb: 0.5 }} component="nav">
          <Box onClick={onLogoutClick}>
            {/* <AccountTreeTwoToneIcon fontSize="small" /> */}
            <LogoutText primary="Logout" />
          </Box>
        </List>
        <Divider />
        {/* <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box> */}
      </Popover>
    </>
  );
}

export default HeaderUserbox;
