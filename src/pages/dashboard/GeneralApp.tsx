import { Box, Container, Divider, Fab, Grid, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { useEffect, useState } from 'react';
import { useStore } from 'src/stores/store';
import ArchiveDashboard from 'src/sections/@dashboard/archiveDashboard/ArchiveDashboard';
import MisWorkDashboard from './MisWorkDashboard';

import DashboardWidget from './DashboardWidget';
import Loader from 'src/components/loader/Loader';
//localization
import useLocales from 'src/hooks/useLocales';
import UserPerformenceDashboard from 'src/sections/@dashboard/userPerformenceDashboard/UserPerformenceDashboard';
import UserDashboard from 'src/sections/@dashboard/userDashboard/UserDashboard';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Button from '@mui/material/Button';
import { AppWelcome } from 'src/sections/@dashboard/general/app';
import { SeoIllustration, SpeakerIllustration } from 'src/assets';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { warning } from 'react-router/lib/router';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';
import NewsCard from 'src/sections/@dashboard/general/app/NewsCard';
import { blue, green } from '@mui/material/colors';
import { Color } from 'react-push-notification/dist/notifications/Storage';
import { ColorSchema } from 'src/theme/palette';
import BarChart from 'src/customeCharts/BarChart';
import { barChartData } from 'src/chartsDefaultData/chartData';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { translate } = useLocales();

  const { userPerformenceDashboardStore, userDashboardStore } = useStore();
  const [showButton, setShowButton] = useState(false);

  const { getLoggedInUsersDashboard } = userPerformenceDashboardStore;

  const { getUserSummaryByDepartment } = userDashboardStore;

  const { themeStretch } = useSettings();

  const [receptionDashboard, setReceptionDashboard] = useState<boolean>(false);

  const [misDashboard, setMisDashboard] = useState<boolean>(false);

  const [archiveDashboard, setArchiveDashboard] = useState<boolean>(false);

  const [internalDashboard, setInternalDashboard] = useState<boolean>(false);

  const [externalDashboard, setExternalDashboard] = useState<boolean>(false);

  const [userPerformenceDashboard, setUserPerformenceDashboard] = useState<boolean>(false);

  const [userDashboard, setUserDashboard] = useState<boolean>(false);

  const [hrDashboard, setHRDashboard] = useState<boolean>(false);

  const [itsmsDashboard, setItsmsDashboard] = useState<boolean>(false);

  const [isloading, setIsloading] = useState(false);

  const [showWelcomeGrid, setShowWelcomeGrid] = useState(true);

  const handleReceptionDashboard = (reception: boolean) => {
    setMisDashboard(false);
    setArchiveDashboard(false);
    setInternalDashboard(false);
    setExternalDashboard(false);
    setUserPerformenceDashboard(false);
    setUserDashboard(false);
    setItsmsDashboard(false);
    setHRDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setReceptionDashboard(reception);
    setShowWelcomeGrid(false);
  };
  const handleHRDashboard = (HR: boolean) => {
    setMisDashboard(false);
    setArchiveDashboard(false);
    setInternalDashboard(false);
    setExternalDashboard(false);
    setUserPerformenceDashboard(false);
    setHRDashboard(HR);
    setItsmsDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setReceptionDashboard(false);
    setShowWelcomeGrid(false);
  };

  const handleMisDashboard = (mis: boolean) => {
    setArchiveDashboard(false);
    setReceptionDashboard(false);
    setInternalDashboard(false);
    setItsmsDashboard(false);
    setExternalDashboard(false);
    setHRDashboard(false);
    setUserDashboard(false);
    setUserPerformenceDashboard(false);
    setShowButton(true);
    setMisDashboard(mis);
    setShowWelcomeGrid(false);
  };
  const handleArchiveDashboard = (archive: boolean) => {
    setReceptionDashboard(false);
    setMisDashboard(false);
    setInternalDashboard(false);
    setExternalDashboard(false);
    setItsmsDashboard(false);
    setHRDashboard(false);
    setUserPerformenceDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setArchiveDashboard(archive);
    setShowWelcomeGrid(false);
  };

  const handleInternalDocumentDashboard = (internal: boolean) => {
    setReceptionDashboard(false);
    setMisDashboard(false);
    setArchiveDashboard(false);
    setExternalDashboard(false);
    setHRDashboard(false);
    setUserPerformenceDashboard(false);
    setItsmsDashboard(false);
    setHRDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setInternalDashboard(internal);
    setShowWelcomeGrid(false);
  };

  const handleExternalDocumentDashboard = (external: boolean) => {
    setReceptionDashboard(false);
    setMisDashboard(false);
    setArchiveDashboard(false);
    setInternalDashboard(false);
    setUserPerformenceDashboard(false);
    setItsmsDashboard(false);
    setHRDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setExternalDashboard(external);
    setShowWelcomeGrid(false);
  };

  const handleUserPerformenceDashboard = (user: boolean) => {
    setReceptionDashboard(false);
    setMisDashboard(false);
    setArchiveDashboard(false);
    setHRDashboard(false);
    setInternalDashboard(false);
    setExternalDashboard(false);
    setItsmsDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setUserPerformenceDashboard(user);
    setShowWelcomeGrid(false);
  };

  const handleUserDashboard = (user: boolean) => {
    setReceptionDashboard(false);
    setMisDashboard(false);
    setArchiveDashboard(false);
    setInternalDashboard(false);
    setHRDashboard(false);
    setExternalDashboard(false);
    setUserPerformenceDashboard(false);
    setItsmsDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setUserDashboard(user);
    setShowWelcomeGrid(false);
  };

  const handleITSMSDashboard = (itsms: boolean) => {
    setReceptionDashboard(false);
    setMisDashboard(false);
    setArchiveDashboard(false);
    setInternalDashboard(false);
    setExternalDashboard(false);
    setHRDashboard(false);
    setUserPerformenceDashboard(false);
    setUserDashboard(false);
    setIsloading(true);
    setShowButton(true);
    setItsmsDashboard(itsms);
    setShowWelcomeGrid(false);
  };

  useEffect(() => {
    if (userPerformenceDashboard) {
      getLoggedInUsersDashboard().then((res) => {
        setTimeout(() => {
          setIsloading(false);
        }, 1000);
      });
    }
  }, [userPerformenceDashboard]);

  useEffect(() => {
    if (userDashboard) {
      getUserSummaryByDepartment().then((res) => {
        setTimeout(() => {
          setIsloading(false);
        }, 1000);
      });
    }
  }, [userDashboard]);

  const renderDashboard = () => {
    if (misDashboard) {
      return (
        <>
          {' '}
          <MisWorkDashboard />
        </>
      );
    } else if (userPerformenceDashboard && isloading) {
      return (
        <>
          <Loader />
        </>
      );
    } else if (userPerformenceDashboard === true && isloading === false) {
      return (
        <>
          <UserPerformenceDashboard />
        </>
      );
    } else if (userDashboard === true && isloading) {
      return (
        <>
          <Loader />
        </>
      );
    } else if (userDashboard === true && isloading === false) {
      return (
        <>
          <UserDashboard />
        </>
      );
    }
  };

  const positionToColor: ColorSchema[] = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ];

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {/* {showButton ? (
          <>
            <Button
              sx={{ mb: 1 }}
              color="primary"
              size="small"
              onClick={() => setShowButton(false)}
            >
              <KeyboardDoubleArrowLeftIcon /> Back
            </Button>
          </>
        ) : (
          <></>
        )} */}
        {/* -----------------------Welcome Componenet------------------------- */}

        <Grid item xs={12} md={12}>
          <BarChart
            title={translate('UserPerformanceDashboard.TestData')}
            subheader={new Date().toDateString()}
            chartData={barChartData}
          />
        </Grid>
      </Container>
    </Page>
  );
}
