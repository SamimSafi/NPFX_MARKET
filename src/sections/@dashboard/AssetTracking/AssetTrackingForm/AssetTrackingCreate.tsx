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
import AssetTrackingNewEditForm from './AssetTrackingNewEditForm';

// ----------------------------------------------------------------------

export default function AssetTrackingCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit
          ? `${translate('AssetTracking.AddTitle')}`
          : `${translate('AssetTracking.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('AssetTracking.CreateAssetTracking')}`
              : `${translate('AssetTracking.EditAssetTracking')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('AssetTracking.AssetTrackingList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit
                ? `${translate('AssetTracking.New')}`
                : `${translate('AssetTracking.Update')}`,
            },
          ]}
        />
        <AssetTrackingNewEditForm />
      </Container>
    </Page>
  );
}
