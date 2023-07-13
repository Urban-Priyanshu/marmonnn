import react, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { duoCallBack, getAuthUser } from './redux/actions/authActions';
import Loader from 'react-js-loader';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    background: 'white',
    minWidth: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

export default function DuoCallBack() {
  const classes = useStyles();
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const authUser = useSelector((state) => state?.auth?.authUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  useEffect(async () => {
    let response;
    const email = localStorage.getItem('authEmail');
    if (email) {
      response = await dispatch(
        duoCallBack(query.get('state'), query.get('duo_code'), email)
      );
    }
    
    if (email && response) {
      setTimeout(() => {
        dispatch(getAuthUser(email, response.data.token, navigate));
      }, 500);
    }
  }, []);

  // useEffect(() => {
  //   const email = localStorage.getItem('authEmail');
  //   if (email && response) {
  //     dispatch(getAuthUser(email, authToken, navigate));
  //   }
  // }, [authToken]);

  useEffect(() => {
    if (authUser && authUser?.roles?.find((d) => d?.id === 1)) {
      navigate('/portal');
    } else if (authUser && authUser?.roles?.find((d) => d?.id === 2)) {
      navigate('/portal');
    } else if (authUser && authUser?.roles?.find((d) => d?.id === 3)) {
      navigate('/portal');
    } else if (authUser && authUser?.roles?.find((d) => d?.id >= 3)) {
      navigate(
        `/customer-portal/${authUser?.associateCustomerId}/products?cp=true`
      );
    }
  }, [authUser]);

  return (
    <Grid
      className={classes.root}
      spacing={0}
      alignItems="center"
      justify="center"
    >
      <Loader type="bubble-spin" bgColor={'black'} color={'black'} size={100} />
    </Grid>
  );
}
