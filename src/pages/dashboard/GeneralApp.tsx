import { Container, Grid, useTheme } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { useEffect, useState } from 'react';
import { useStore } from 'src/stores/store';
import Loader from 'src/components/loader/Loader';
//localization
import useLocales from 'src/hooks/useLocales';
import BarChart from 'src/customeCharts/BarChart';
import { barChartData } from 'src/chartsDefaultData/chartData';
import PieChart from 'src/customeCharts/PieChart';
import EmptyContent from 'src/components/EmptyContent';
import SpiderChart from 'src/customeCharts/SpiderChart';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { translate } = useLocales();
  const theme = useTheme();
  const { npfxDashboardStore } = useStore();

  const { getUserSummaryByBranch, dashboardUsersByBranch } = npfxDashboardStore;

  const { themeStretch } = useSettings();

  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    if (dashboardUsersByBranch) {
      getUserSummaryByBranch().then((res) => {
        setTimeout(() => {
          setIsloading(false);
        }, 1000);
      });
    }
  }, [dashboardUsersByBranch, getUserSummaryByBranch]);

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid item xs={12} md={12}>
          <BarChart
            title={translate('UserPerformanceDashboard.TestData')}
            subheader={new Date().toDateString()}
            chartData={barChartData}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          {isloading === false ? (
            dashboardUsersByBranch && dashboardUsersByBranch.length > 0 ? (
              <SpiderChart
                title={translate('npxChartDashboard.TotalBracnhes')}
                title2={translate('npxChartDashboard.TotalUsers')}
                chartData={dashboardUsersByBranch}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.chart.blue[0],
                  theme.palette.chart.blue[1],
                  theme.palette.chart.blue[2],
                  theme.palette.chart.blue[3],
                  theme.palette.chart.violet[0],
                  theme.palette.chart.violet[1],
                  theme.palette.chart.violet[2],
                  theme.palette.chart.violet[3],
                  theme.palette.chart.yellow[0],
                  theme.palette.chart.red[0],
                  theme.palette.chart.red[1],
                  theme.palette.chart.red[2],
                  theme.palette.chart.red[3],
                  theme.palette.chart.green[0],
                  theme.palette.chart.green[1],
                  theme.palette.chart.green[2],
                  theme.palette.chart.green[3],
                ]}
              />
            ) : (
              <EmptyContent
                title={translate('ReceptionDashboard.NoRecordFound')}
                sx={{
                  '& span.MuiBox-root': { height: 160 },
                }}
              />
            )
          ) : (
            <Loader />
          )}
        </Grid>
      </Container>
    </Page>
  );
}
