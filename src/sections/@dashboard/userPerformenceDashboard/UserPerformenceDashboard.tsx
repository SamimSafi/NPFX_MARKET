import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useStore } from 'src/stores/store';
import Loader from 'src/components/loader/Loader';
import SpiderChart from 'src/customeCharts/SpiderChart';
import EmptyContent from 'src/components/EmptyContent';
import BarChart from 'src/customeCharts/BarChart';
import useLocales from 'src/hooks/useLocales';
import { useNavigate } from 'react-router';
import Iconify from 'src/components/Iconify';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { barChartData } from 'src/chartsDefaultData/chartData';

export default function UserPerformenceDashboard() {
  const { translate } = useLocales();
  const { userPerformenceDashboardStore } = useStore();
  const {
    ArchiveDataEntryByLoggedInUserDashboard,
    externalDocumentDashboardByLoggedInUser,
    internalDocumentDashboardByLoggedInUser,
  } = userPerformenceDashboardStore;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Grid
        item
        xs={6}
        md={12}
        sx={{ display: 'flex', alignContent: 'flex-end', mb: 4 }}
        justifyContent={'space-between'}
      >
        {/* <Stack direction="row" spacing={1.5} sx={{ mt: 1, ml: 0, mb: 1 }}> */}
        <Typography variant="h4">{translate('Dashboard.UserPerformanceDashboard')}</Typography>
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          onClick={() => {
            navigate(PATH_DASHBOARD.root);
            //clearEmployee();
          }}
        >
          {translate('CRUD.BackToDashboard')}
        </Button>
        {/* </Stack> */}
      </Grid>
      <Grid item xs={12} md={12}>
        <BarChart
          title={translate('UserPerformanceDashboard.TestData')}
          subheader={new Date().toDateString()}
          chartData={barChartData}
        />
      </Grid>
      <Grid item xs={6} md={6}>
        {internalDocumentDashboardByLoggedInUser == null ? (
          <>
            <EmptyContent
              title={translate('ReceptionDashboard.NoRecordFound')}
              sx={{
                '& span.MuiBox-root': { height: 160 },
              }}
            />
          </>
        ) : (
          <BarChart
            title={translate('UserPerformanceDashboard.InternalDocumentsTotalSummary')}
            subheader={new Date().toDateString()}
            chartData={internalDocumentDashboardByLoggedInUser}
          />
        )}
      </Grid>
    </>
  );
}
