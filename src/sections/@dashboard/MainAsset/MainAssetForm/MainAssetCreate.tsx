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
import MainAssetNewEditForm from './MainAssetNewEditForm';

// ----------------------------------------------------------------------

export default function MainAssetCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit ? `${translate('MainAsset.AddTitle')}` : `${translate('MainAsset.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit ? `${translate('MainAsset.AddTitle')}` : `${translate('MainAsset.UpdateTitle')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('MainAsset.MainAssetList')}`,
              href: PATH_DASHBOARD.MainAsset.list,
            },
            {
              name: !isEdit ? `${translate('MainAsset.New')}` : `${translate('MainAsset.Update')}`,
            },
          ]}
        />
        <MainAssetNewEditForm />
      </Container>
    </Page>
  );
}
