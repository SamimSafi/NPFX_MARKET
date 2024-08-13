// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack } from '@mui/material';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import NPFXNewProducts from './NPFXNewProducts';
import NPFXWidgetSummary from './NPFXWidgetSummary';
import NPFXYearlySales from './NPFXYearlySales';
import ExpensesCategories from './ExpensesCategories';
import MemberBalance from './MemberBalance';
import { useStore } from 'src/stores/store';
import { useEffect, useState } from 'react';
import Loader from 'src/components/loader/Loader';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

export default function NPFXDashboard() {
  const theme = useTheme();
  const { translate } = useLocales();
  const { npfxDashboardStore } = useStore();
  const {
    LoadTradeTrackingChart,
    LoadExpenseChart,
    LoadRealTimeDashboard,
    LoadDashboardOfBranchsMainAsset,
    dashboardOfBranchsMainAsset,
    realTimeDashboardData,
    tradeTrackingChartData,
    expenseChartData,
  } = npfxDashboardStore;
  const [load, setLoad] = useState<boolean>(true);
  const { themeStretch } = useSettings();

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      LoadTradeTrackingChart();
      LoadExpenseChart();
      LoadRealTimeDashboard();
      LoadDashboardOfBranchsMainAsset().then(() => {
        setLoad(false);
      });
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //For dynamic grid
  const getGridSize = (length: number) => {
    if (length === 1) return 12;
    if (length === 2) return 6;
    if (length === 3) return 4;
    if (length === 4) return 3;

    return 2;
  };

  const CurrentBalancegridSize = getGridSize(
    realTimeDashboardData?.totalMainAssetsCurrentBalance?.length || 0
  );
  const ExpensegridSize = getGridSize(realTimeDashboardData?.todayTotalExpense?.length || 0);

  return (
    <Page title="General:">
      {load ? (
        <Loader />
      ) : (
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <NPFXNewProducts />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                {realTimeDashboardData?.totalMainAssetsCurrentBalance!.map((data, index) => (
                  <Grid item xs={12} md={CurrentBalancegridSize} key={data.currencyType}>
                    <NPFXWidgetSummary
                      title={`${translate('Npfx.CurrentBalance')} ${data.currencyType}`}
                      percent={0.6}
                      total={data.value}
                      chartColor={theme.palette.chart.red[0]}
                      chartData={[40, 70, 75, 70, 50, 28, 7, 64, 38, 27]}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                {realTimeDashboardData?.todayTotalExpense!.map(
                  (data, index) =>
                    data.value !== 0 && (
                      <Grid item xs={12} md={ExpensegridSize} key={data.currencyType}>
                        <NPFXWidgetSummary
                          title={`${translate('Npfx.TodayTotalExpense')} ${data.currencyType}`}
                          percent={0.6}
                          total={data.value}
                          chartColor={theme.palette.chart.red[0]}
                          chartData={[40, 70, 75, 70, 50, 28, 7, 64, 38, 27]}
                        />
                      </Grid>
                    )
                ) && (
                  <Grid item xs={12} md={12}>
                    <NPFXWidgetSummary
                      title={`${translate('Npfx.TodayTotalExpense')}`}
                      percent={0.6}
                      total={0}
                      chartColor={theme.palette.chart.red[0]}
                      chartData={[40, 70, 75, 70, 50, 28, 7, 64, 38, 27]}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <NPFXWidgetSummary
                title={translate('Npfx.TodayTotalTrade')}
                percent={2.6}
                total={realTimeDashboardData?.totalTodaysTrade?.[0]?.tradeAmount ?? 0}
                chartColor={theme.palette.primary.main}
                chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <NPFXWidgetSummary
                title={translate('Npfx.TodayTotalProfit')}
                percent={-0.1}
                total={realTimeDashboardData?.totalTodaysTrade?.[0]?.profitAmount ?? 0}
                chartColor={theme.palette.chart.green[0]}
                chartData={[56, 47, 40, 62, 73, 30, 23, 54, 67, 68]}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <NPFXWidgetSummary
                title={translate('Npfx.TodayTotalLoss')}
                percent={0.6}
                total={realTimeDashboardData?.totalTodaysTrade?.[0]?.lossAmount ?? 0}
                chartColor={theme.palette.chart.red[0]}
                chartData={[40, 70, 75, 70, 50, 28, 7, 64, 38, 27]}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MemberBalance
                title={translate('Npfx.MemberBalance')}
                subheader=""
                list={dashboardOfBranchsMainAsset || []}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={8}>
              <Stack spacing={3}>
                <NPFXYearlySales
                  title={translate('Npfx.TradeChart')}
                  subheader=""
                  chartLabels={tradeTrackingChartData?.chartLabels! || []}
                  chartData={tradeTrackingChartData?.chartData! || []}
                />
                <ExpensesCategories
                  title={translate('Npfx.ExpensesByCategories')}
                  chartData={expenseChartData! || []}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      )}
    </Page>
  );
}
