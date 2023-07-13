import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { styled } from '@mui/material';

import {
  Container,
  Grid,
  Card,
  Box,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import { useState, SyntheticEvent } from 'react';

const Tab = styled(Box)(
  () => `
  
  cursor: pointer;
  &.active {
      border-bottom: blue solid 2px;
    }
`
);

function Tabs({ TabData, func }) {
  const [value, setValue] = useState(0);
  const [tabId, setTabId] = useState(0);

  // func(tabId);

  const handleTabChange = (event: SyntheticEvent, id: number) => {
    setTabId(id);
  };

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ width: '80%' }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {TabData &&
              TabData?.map((tab, i) => (
                <Grid
                  key={i}
                  md={2}
                  sx={{
                    borderBottom: tabId === i ? '#3277af solid 2px' : '',
                    background: tabId === i ? '#E9EFF3' : '',
                    padding: '5px 5px 5px 5px',
                    textAlign: 'center'
                  }}
                >
                  <Tab onClick={(e) => handleTabChange(e, i)}>
                    <span
                      className={tabId === i ? `active` : ''}
                      style={{ fontWeight: tabId === i && '700' }}
                    >
                      {tab?.title}
                    </span>
                  </Tab>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default Tabs;
