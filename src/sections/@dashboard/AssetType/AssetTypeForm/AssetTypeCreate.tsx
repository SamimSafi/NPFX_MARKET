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
import AssetTypeNewEditForm from './AssetTypeNewEditForm';

// ----------------------------------------------------------------------

export default function AssetTypeCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit ? `${translate('AssetType.AddTitle')}` : `${translate('AssetType.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('AssetType.CreateAssetType')}`
              : `${translate('AssetType.EditAssetType')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('AssetType.AssetTypeList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit ? `${translate('AssetType.New')}` : `${translate('AssetType.Update')}`,
            },
          ]}
        />
        <AssetTypeNewEditForm />
      </Container>
    </Page>
  );
}
