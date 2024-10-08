// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Stack, Box, Typography, Tab, Tabs, AppBar } from '@mui/material';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import MainAssetContacts from './MainAssetContacts';
import MainAssetWidgetSummary from './MainAssetWidgetSummary';
import { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useStore } from 'src/stores/store';
import MainAssetTracking from './MainAssetTracking';
import LoanTracking from './LoanTracking';
import ExpenseTracking from './ExpenseTracking';
import TradeTracking from './TradeTracking';
import WidthrawalTracking from './WidthrawalTracking';
import { useParams } from 'react-router';
import Loader from 'src/components/loader/Loader';
import useLocales from 'src/hooks/useLocales';
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
        <Box>
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
  const { translate } = useLocales();
  const { MainAssetDetailsStore } = useStore();
  const [isloading, setIsloading] = useState(false);
  const {
    GetMainAssetTracking,
    LoadMainAssetTracking,
    GetLoanTracking,
    LoadLoanTracking,
    loadExpenseTracking,
    LoadExpenseTracking,
    loadTradeTracking,
    LoadTradeTracking,
    loadWithdrawalTracking,
    LoadWidthrawalTracking,
    MainAssetDetail,
    loadMainAssetChildAsset,
    MainAssetChild,
    loadMainAssetDetail,
  } = MainAssetDetailsStore;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const { id } = useParams();
  const { themeStretch } = useSettings();
  useEffect(() => {
    if (id != null) {
      loadMainAssetDetail(id).then(() => {
        GetMainAssetTracking({
          pageIndex: 0,
          pageSize: 10000,
          mainAssetId: id,
        });
        GetLoanTracking({
          pageIndex: 0,
          pageSize: 10000,
          mainAssetId: id,
        });
        loadExpenseTracking({
          pageIndex: 0,
          pageSize: 10000,
          mainAssetId: id,
        });
        loadTradeTracking({
          pageIndex: 0,
          pageSize: 10000,
          mainAssetId: id,
        });
        loadWithdrawalTracking({
          pageIndex: 0,
          pageSize: 10000,
          mainAssetId: id,
        });
        loadMainAssetChildAsset(id);

        setIsloading(true);
        setTimeout(() => {
          setIsloading(true);
        }, 1000);
      });
    } else {
      setIsloading(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(LoadMainAssetTracking.map((data) => data.balanceAmount));
  // console.log(LoadLoanTracking.map((data) => data.branchId));
  // console.log(MainAssetChild.map((data) => data.balanceAmount));

  return isloading ? (
    <Page title={translate('AssetDetails.AccountDetails')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <MainAssetWidgetSummary
                title={translate('AssetDetails.TotalCreditAmount')}
                icon={'eva:diagonal-arrow-left-down-fill'}
                percent={2.6}
                total={MainAssetDetail!.totalCreditAmount}
                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
              />

              <MainAssetWidgetSummary
                title={translate('AssetDetails.TotalDebitAmount')}
                color="warning"
                icon={'eva:diagonal-arrow-right-up-fill'}
                percent={-0.5}
                total={MainAssetDetail!.totalDebitAmount}
                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
              />

              <MainAssetWidgetSummary
                title={translate('AssetDetails.CurrentBalance')}
                color="success"
                icon={'eva:diagonal-arrow-right-up-fill'}
                percent={-0.5}
                total={MainAssetDetail!.balanceAmount}
                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
              />
            </Stack>
          </Grid>
          {/* 
          <Grid item xs={12} md={5}>
            <MainAssetCurrentBalance list={_bankingCreditCard} />
          </Grid> */}

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
                    <Tab label={translate('AssetDetails.AssetTracking')} {...a11yProps(0)} />
                    <Tab label={translate('AssetDetails.LoanTracking')} {...a11yProps(1)} />
                    <Tab label={translate('AssetDetails.ExpenseTracking')} {...a11yProps(2)} />
                    <Tab label={translate('AssetDetails.TradeTracking')} {...a11yProps(3)} />
                    <Tab label={translate('AssetDetails.WidthrawalTracking')} {...a11yProps(4)} />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                >
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <MainAssetTracking
                      tableData={LoadMainAssetTracking}
                      tableLabels={[
                        { id: 'userName', label: translate('Report.UserName') },
                        { id: 'transactionDate', label: translate('Report.transactionDate') },
                        { id: 'debitAmount', label: translate('Report.debitAmount') },
                        { id: 'creditAmount', label: translate('Report.creditAmount') },
                        { id: 'balanceAmount', label: translate('Report.balanceAmount') },
                        { id: 'description', label: translate('Report.Description') },
                        { id: '' },
                      ]}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <LoanTracking
                      tableData={LoadLoanTracking}
                      tableLabels={[
                        { id: 'partner', label: translate('Report.Partner') },
                        { id: 'partnerPhone', label: translate('Report.partnerPhone') },
                        { id: 'loanAmount', label: translate('Report.loanAmount') },
                        { id: 'paidAmount', label: translate('Report.paidAmount') },
                        { id: 'remainAmount', label: translate('Report.remainAmount') },
                        { id: 'description', label: translate('Report.Description') },
                        { id: '' },
                      ]}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={2} dir={theme.direction}>
                    <ExpenseTracking
                      title=""
                      tableData={LoadExpenseTracking}
                      tableLabels={[
                        { id: 'expenseType', label: translate('Report.expenseType') },
                        { id: 'amount', label: translate('Report.Amount') },
                        { id: 'date', label: translate('Report.Date') },
                        { id: 'description', label: translate('Report.Description') },
                        { id: '' },
                      ]}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={3} dir={theme.direction}>
                    <TradeTracking
                      title=""
                      tableData={LoadTradeTracking}
                      tableLabels={[
                        { id: 'userName', label: translate('Report.UserName') },
                        { id: 'branch', label: translate('Report.Branch') },
                        { id: 'tradeAmount', label: translate('Report.tradeAmount') },
                        { id: 'profitAmount', label: translate('Report.profitAmount') },
                        { id: 'lossAmount', label: translate('Report.lossAmount') },
                        { id: 'description', label: translate('Report.Description') },
                        { id: '' },
                      ]}
                    />
                  </TabPanel>
                  <TabPanel value={value} index={4} dir={theme.direction}>
                    <WidthrawalTracking
                      title=""
                      tableData={LoadWidthrawalTracking}
                      tableLabels={[
                        { id: 'userName', label: translate('Report.UserName') },
                        { id: 'branch', label: translate('Report.Branch') },
                        { id: 'amount', label: translate('Report.Amount') },
                        { id: 'date', label: translate('Report.Date') },
                        { id: 'description', label: translate('Report.Description') },
                        { id: '' },
                      ]}
                    />
                  </TabPanel>
                </SwipeableViews>
              </Box>
              {/* end Tab */}
              {/* <MainAssetBalanceStatistics
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
              /> */}

              {/* <MainAssetExpensesCategories
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
              /> */}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* <MainAssetQuickTransfer title="Members balances" list={MainAssetChild} /> */}

              <MainAssetContacts
                title={translate('AssetDetails.MembersBalance')}
                subheader=""
                list={MainAssetChild}
              />
              {/*
              <MainAssetContacts
                title="Members who failed"
                subheader="You have 122 Members who failed"
                list={_bankingContacts.slice(-5)}
              /> */}

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
  ) : (
    <Loader></Loader>
  );
}
