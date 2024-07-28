import { useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useLocales from 'src/hooks/useLocales';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import TradeTrackingNewEditForm from './TradeTrackingNewEditForm';

// ----------------------------------------------------------------------

export default function TradeTrackingCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit
          ? `${translate('TradeTracking.AddTitle')}`
          : `${translate('TradeTracking.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('TradeTracking.CreateTradeTracking')}`
              : `${translate('TradeTracking.EditTradeTracking')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('TradeTracking.Title')}`,
              href: PATH_DASHBOARD.TradeTracking.list,
            },
            {
              name: !isEdit
                ? `${translate('TradeTracking.New')}`
                : `${translate('TradeTracking.Update')}`,
            },
          ]}
        />
        <TradeTrackingNewEditForm />
      </Container>
    </Page>
  );
}
