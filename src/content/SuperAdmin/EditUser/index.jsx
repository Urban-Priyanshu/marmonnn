import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditForm from './EditForm';
import Breadcrumb from '../../../components/Breadcrumb';
import UserHistory from './UserHistory';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserRoles } from '../../../redux/actions/userActions';

const MainContainer = styled(Box)(
  () => `
  padding: 32px 0px;
  width: 95%; 
  margin-left: 2%;
  `
);

const CustomContainer = styled(Box)(
  () => `
  padding: 0px 0px 20px 0px;`
);

// const HistoryItem = styled(Box)(
//   () => `
// font-weight: 700;
// font-size: 12px;
// line-height: 16px;
// margin-top: 25px;
// margin-bottom: 5px;
// `
// );

function EditUser() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const userData = useSelector((state) => state?.users?.userData);
  const rolesData = useSelector((state) => state?.users?.roles);
  const authToken = useSelector((state) => state?.auth?.token?.token);

  useEffect(() => {
    dispatch(getUser(id, authToken));
    dispatch(getUserRoles(authToken));
  }, []);

  return (
    <>
      <MainContainer>
        <div className="custom-pg-content-sec">
          <CustomContainer>
            <Box className="custom-heading-container-sec" sx={{}}>
              <span
                className="custom-heading-sec"
                style={{
                  fontSize: '20px',
                  lineHeight: 1,
                  fontWeight: 700,
                  display: 'inline-flex',
                  flexDirection: 'column'
                }}
              >
                <Breadcrumb
                  userData={userData}
                  location={[{ location: 'Manage Users', to: '/manage-users' }]}
                />
              </span>
            </Box>
          </CustomContainer>{' '}
          <UserHistory userData={userData} />
          <CustomContainer sx={{ marginTop: '20px' }}>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <Box sx={{ fontSize: '15px', fontWeight: '600' }}>
                User Details
              </Box>
            </Box>
          </CustomContainer>
          <CustomContainer>
            <Box
              sx={{
                width: '100%',
                backgroundColor: 'white',
                boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.08)',
                borderRadius: '3px',
                padding: '30px 0 55px'
              }}
            >
              <MainContainer>
                <EditForm
                  userData={userData}
                  rolesData={rolesData}
                  authToken={authToken}
                />
              </MainContainer>
            </Box>
          </CustomContainer>
        </div>
      </MainContainer>
    </>
  );
}

export default EditUser;
