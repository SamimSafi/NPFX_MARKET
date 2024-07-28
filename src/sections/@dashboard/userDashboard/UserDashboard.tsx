import { Button, Card, CardHeader, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStore } from 'src/stores/store';
import Loader from 'src/components/loader/Loader';
import SpiderChart from 'src/customeCharts/SpiderChart';
import EmptyContent from 'src/components/EmptyContent';
import useLocales from 'src/hooks/useLocales';
import { useNavigate } from 'react-router';
import Iconify from 'src/components/Iconify';
import { PATH_DASHBOARD } from 'src/routes/paths';

export default function UserDashboard() {
  const { translate } = useLocales();
  const { userDashboardStore } = useStore();
  const [isloading, setIsloading] = useState(false);
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
        <Typography variant="h4">{translate('Dashboard.UserSummaryDashboard')}</Typography>
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
        <Card>
          <CardHeader
            title={translate('UserDashboard.TotalUserSummaryByDepartment')}
            subheader={new Date().toDateString()}
          />
          {isloading ? (
            <Loader />
          ) : (
            <>
              <Grid container xs={12} md={12}>
                <Grid item xs={12} md={12} sx={{ padding: 1 }}>
                  <></>
                </Grid>
              </Grid>
            </>
          )}
        </Card>
      </Grid>
    </>
  );
}
