import { Box, Container, Grid, styled } from '@mui/material';
import moment from 'moment';

const CustomContainer = styled(Box)(
  () => `
  padding: 0px 0px 20px 0px;`
);

const HistoryItem = styled(Box)(
  () => `
font-weight: 900;
font-size: 12px;
line-height: 16px;
margin-top: 25px;
margin-bottom: 5px;
`
);

function UserHistory({ userData }) {
  return (
    <>
      <CustomContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Box sx={{ fontSize: '15px', fontWeight: '600' }}>User History</Box>
        </Box>
      </CustomContainer>
      <CustomContainer>
        <Box
          sx={{
            width: '100%',
            paddingBottom: '20px',
            backgroundColor: 'white',
            boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.08)',
            borderRadius: '3px'
          }}
        >
          <Box
            sx={{
              width: '80%',
              marginLeft: '2%'
            }}
          >
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={4}>
                <div>
                  <HistoryItem>Last Login</HistoryItem>
                  <span>
                    {userData?.lastLogin
                      ? moment
                          .utc(userData?.lastLogin)
                          .format('MM/DD/YYYY HH:mm')
                      : 'NA'}
                  </span>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <HistoryItem>Created By</HistoryItem>
                  <span>{userData?.createdBy}</span>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <HistoryItem>Created Date</HistoryItem>
                  <span>
                    {userData?.createdDate
                      ? moment
                          .utc(userData?.createdDate)
                          .format('MM/DD/YYYY HH:mm')
                      : 'NA'}
                  </span>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <HistoryItem>Updated Date</HistoryItem>
                  <span>
                    {userData?.updatedDate
                      ? moment
                          .utc(userData?.updatedDate)
                          .format('MM/DD/YYYY HH:mm')
                      : 'NA'}
                  </span>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <HistoryItem>Updated By</HistoryItem>
                  <span>{userData?.updatedBy}</span>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CustomContainer>{' '}
    </>
  );
}

export default UserHistory;
