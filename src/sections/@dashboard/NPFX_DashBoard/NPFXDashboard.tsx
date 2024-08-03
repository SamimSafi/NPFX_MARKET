// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button, Stack } from '@mui/material';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import { AppWelcome } from '../general/app';
import { MotivationIllustration } from 'src/assets';
import NPFXNewProducts from './NPFXNewProducts';

import {
  _bankingContacts,
  _ecommerceBestSalesman,
  _ecommerceLatestProducts,
  _ecommerceNewProducts,
  _ecommerceSalesOverview,
} from 'src/_mock';
import NPFXWidgetSummary from './NPFXWidgetSummary';
import NPFXSaleByGender from './NPFXSaleByGender';
import NPFXBestSalesman from './NPFXBestSalesman';
import NPFXCurrentBalance from './NPFXCurrentBalance';
import NPFXLatestProducts from './NPFXLatestProducts';
import NPFXSalesOverview from './NPFXSalesOverview';
import NPFXYearlySales from './NPFXYearlySales';
import { BookingCheckInWidgets } from '../general/booking';
import NPFXCurrentBalanceAndExpense from './NPFXCurrentBalanceAndExpense';
import { BankingExpensesCategories } from '../general/banking';
import ExpensesCategories from './ExpensesCategories';
import TradeStatistics from './TradeStatistics';
import MemberBalance from './MemberBalance';

// ----------------------------------------------------------------------

export default function NPFXDashboard() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="General: E-commerce">
      <Container maxWidth={themeStretch ? false : 'sm'}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={12}>
            <AppWelcome
              title={`Welcome to NPFX system`}
              description="One of the best trading company."
              img={
                <MotivationIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              // action={<Button variant="contained">Go Now</Button>}
            />
          </Grid> */}

          <Grid item xs={12} md={12}>
            <NPFXNewProducts list={_ecommerceNewProducts} />
          </Grid>

          <Grid item xs={12} md={4}>
            <NPFXWidgetSummary
              title="Today Total Trade"
              percent={2.6}
              total={765}
              chartColor={theme.palette.primary.main}
              chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <NPFXWidgetSummary
              title="Today Total Profit"
              percent={-0.1}
              total={18765}
              chartColor={theme.palette.chart.green[0]}
              chartData={[56, 47, 40, 62, 73, 30, 23, 54, 67, 68]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <NPFXWidgetSummary
              title="Today Total Defect"
              percent={0.6}
              total={4876}
              chartColor={theme.palette.chart.red[0]}
              chartData={[40, 70, 75, 70, 50, 28, 7, 64, 38, 27]}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <NPFXCurrentBalanceAndExpense
              // chartData={[
              //   { label: 'Check In', percent: 72, total: 38566 },
              //   { label: 'Check Out', percent: 64, total: 18472 },
              // ]}
              subheader=""
              title="Expense and Current Balance"
              CurrentBalance={2324}
              chartData={[
                { label: 'Expense', expense: 44, CurrentBalance: 38566 },
                { label: 'Current', expense: 75, CurrentBalance: 18472 },
              ]}
              chartColors={[
                [theme.palette.primary.light, theme.palette.primary.main],
                [theme.palette.warning.light, theme.palette.warning.main],
              ]}
            />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={8}>
            <NPFXSalesOverview title="Current Balance" data={_ecommerceSalesOverview} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <NPFXCurrentBalance
              title="Today Total Expense"
              expenseInAfg={187650}
              expenseInDollor={25500}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            <MemberBalance
              title="Member Balance"
              subheader="You have 15 Member"
              list={_bankingContacts.slice(-15)}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={8}>
            <Stack spacing={3}>
              <NPFXYearlySales
                title="Expense"
                subheader="(+43%) than last year"
                chartLabels={{
                  Day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  Week: [
                    'Week 1',
                    'Week 2',
                    'Week 3',
                    'Week 4',
                    'Week 5',
                    'Week 6',
                    'Week 7',
                    'Week 8',
                    'Week 9',
                  ],
                  Month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                  Year: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
                }}
                chartData={[
                  {
                    year: 'Day',
                    data: [
                      {
                        name: 'Income',
                        data: [5, 10, 7, 13, 8, 6, 12],
                      },
                      {
                        name: 'Expenses',
                        data: [3, 6, 5, 8, 5, 7, 9],
                      },
                    ],
                  },
                  {
                    year: 'Week',
                    data: [
                      {
                        name: 'Income',
                        data: [10, 41, 35, 151, 49, 62, 69, 91, 48],
                      },
                      {
                        name: 'Expenses',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45],
                      },
                    ],
                  },
                  {
                    year: 'Month',
                    data: [
                      {
                        name: 'Income',
                        data: [148, 91, 69, 62, 49, 51, 35, 41, 10],
                      },
                      {
                        name: 'Expenses',
                        data: [45, 77, 99, 88, 77, 56, 13, 34, 10],
                      },
                    ],
                  },
                  {
                    year: 'Year',
                    data: [
                      {
                        name: 'Income',
                        data: [76, 42, 29, 41, 27, 138, 117, 86, 63],
                      },
                      {
                        name: 'Expenses',
                        data: [80, 55, 34, 114, 80, 130, 15, 28, 55],
                      },
                    ],
                  },
                ]}
              />
              <ExpensesCategories
                title="Expenses By Categories"
                chartData={[
                  { label: 'Expense Type 1', value: 14 },
                  { label: 'Expense Type 2', value: 23 },
                  { label: 'Expense Type 3', value: 21 },
                  { label: 'Expense Type 4', value: 17 },
                  { label: 'Expense Type 5', value: 15 },
                  { label: 'Expense Type 6', value: 10 },
                  { label: 'Expense Type 7', value: 12 },
                  { label: 'Expense Type 8', value: 17 },
                  { label: 'Expense Type 9', value: 21 },
                ]}
                // chartColors={[
                //   theme.palette.primary.main,
                //   theme.palette.info.darker,
                //   theme.palette.chart.yellow[0],
                //   theme.palette.chart.blue[0],
                //   theme.palette.chart.red[0],
                //   theme.palette.chart.violet[2],
                //   theme.palette.chart.violet[0],
                //   theme.palette.success.darker,
                //   theme.palette.chart.green[0],
                // ]}
              />

              <TradeStatistics
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
            </Stack>
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <NPFXBestSalesman
              title="Best Salesman"
              tableData={_ecommerceBestSalesman}
              tableLabels={[
                { id: 'seller', label: 'Seller' },
                { id: 'product', label: 'Product' },
                { id: 'country', label: 'Country', align: 'center' },
                { id: 'total', label: 'Total' },
                { id: 'rank', label: 'Rank', align: 'right' },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <NPFXLatestProducts title="Latest Products" list={_ecommerceLatestProducts} />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
