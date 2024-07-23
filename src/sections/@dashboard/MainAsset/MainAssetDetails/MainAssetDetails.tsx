// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Stack, Box, Typography, Tab, Tabs, AppBar } from '@mui/material';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import { _bankingCreditCard, _bankingRecentTransitions, _bankingContacts } from 'src/_mock';
import MainAssetBalanceStatistics from './MainAssetBalanceStatistics';
import MainAssetContacts from './MainAssetContacts';
import MainAssetCurrentBalance from './MainAssetCurrentBalance';
import MainAssetExpensesCategories from './MainAssetExpensesCategories';
import MainAssetInviteFriends from './MainAssetInviteFriends';
import MainAssetQuickTransfer from './MainAssetQuickTransfer';
import MainAssetRecentTransitions from './MainAssetRecentTransitions';
import MainAssetWidgetSummary from './MainAssetWidgetSummary';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
// hooks

// _mock_

// components

// sections
//Tab functions
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
// ----------------------------------------------------------------------

export default function GeneralBanking() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const { themeStretch } = useSettings();

  return (
    <Page title="General: Banking">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <MainAssetWidgetSummary
                title="Profit"
                icon={'eva:diagonal-arrow-left-down-fill'}
                percent={2.6}
                total={18765}
                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
              />

              <MainAssetWidgetSummary
                title="Defect"
                color="warning"
                icon={'eva:diagonal-arrow-right-up-fill'}
                percent={-0.5}
                total={8938}
                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <MainAssetCurrentBalance list={_bankingCreditCard} />
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* tab Start */}
              <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                <AppBar position="static">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                >
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <MainAssetRecentTransitions
                      title="Recent Transitions"
                      tableData={_bankingRecentTransitions}
                      tableLabels={[
                        { id: 'description', label: 'Description' },
                        { id: 'date', label: 'Date' },
                        { id: 'amount', label: 'Amount' },
                        { id: 'status', label: 'Status' },
                        { id: '' },
                      ]}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <MainAssetRecentTransitions
                      title="Recent Transitions"
                      tableData={_bankingRecentTransitions}
                      tableLabels={[
                        { id: 'description', label: 'Description' },
                        { id: 'date', label: 'Date' },
                        { id: 'amount', label: 'Amount' },
                        { id: 'status', label: 'Status' },
                        { id: '' },
                      ]}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={2} dir={theme.direction}>
                    <MainAssetRecentTransitions
                      title="Recent Transitions"
                      tableData={_bankingRecentTransitions}
                      tableLabels={[
                        { id: 'description', label: 'Description' },
                        { id: 'date', label: 'Date' },
                        { id: 'amount', label: 'Amount' },
                        { id: 'status', label: 'Status' },
                        { id: '' },
                      ]}
                    />
                  </TabPanel>
                </SwipeableViews>
              </Box>
              {/* end Tab */}
              <MainAssetBalanceStatistics
                title="Balance Statistics"
                subheader="(+43% Income | +12% Expense) than last year"
                chartLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']}
                chartData={[
                  {
                    year: 'Week',
                    data: [
                      { name: 'Income', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
                      { name: 'Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                  {
                    year: 'Month',
                    data: [
                      { name: 'Income', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                      { name: 'Expenses', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                    ],
                  },
                  {
                    year: 'Year',
                    data: [
                      { name: 'Income', data: [76, 42, 29, 41, 27, 138, 117, 86, 63] },
                      { name: 'Expenses', data: [80, 55, 34, 114, 80, 130, 15, 28, 55] },
                    ],
                  },
                ]}
              />

              <MainAssetExpensesCategories
                title="Expenses Categories"
                chartData={[
                  { label: 'Category 1', value: 14 },
                  { label: 'Category 2', value: 23 },
                  { label: 'Category 3', value: 21 },
                  { label: 'Category 4', value: 17 },
                  { label: 'Category 5', value: 15 },
                  { label: 'Category 6', value: 10 },
                  { label: 'Category 7', value: 12 },
                  { label: 'Category 8', value: 17 },
                  { label: 'Category 9', value: 21 },
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.info.darker,
                  theme.palette.chart.yellow[0],
                  theme.palette.chart.blue[0],
                  theme.palette.chart.red[0],
                  theme.palette.chart.violet[2],
                  theme.palette.chart.violet[0],
                  theme.palette.success.darker,
                  theme.palette.chart.green[0],
                ]}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <MainAssetQuickTransfer title="Members balances" list={_bankingContacts} />

              <MainAssetContacts
                title="Members who benefited"
                subheader="You have 122 Members whe benefited"
                list={_bankingContacts.slice(-5)}
              />
              <MainAssetContacts
                title="Members who failed"
                subheader="You have 122 Members who failed"
                list={_bankingContacts.slice(-5)}
              />

              {/* <MainAssetInviteFriends
                price="$50"
                title={`Invite friends \n and earn`}
                description="Praesent egestas tristique nibh. Duis lobortis massa imperdiet quam."
                img="/assets/illustrations/illustration_invite.png"
              /> */}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
