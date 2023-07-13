import { Box, styled, Grid } from '@mui/material';
import OverallDashboard from './Overall';

const MainContainer = styled(Box)(
  () => `
  padding: 32px 32px 0px 32px;
  `
);

/* identical to box height */

function Dashboard() {
  return (
    <>
      <MainContainer>
        <OverallDashboard />
      </MainContainer>
    </>
  );
}

export default Dashboard;
