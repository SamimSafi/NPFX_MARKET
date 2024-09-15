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
import PropertyNewEditForm from './PropertyNewEditForm';

// ----------------------------------------------------------------------

export default function PropertyCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={!isEdit ? `${translate('Property.AddTitle')}` : `${translate('Property.UpdateTitle')}`}
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit ? `${translate('Property.AddTitle')}` : `${translate('Property.UpdateTitle')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('Property.PropertyList')}`,
              href: PATH_DASHBOARD.Property.list,
            },
            {
              name: !isEdit ? `${translate('Property.New')}` : `${translate('Property.Update')}`,
            },
          ]}
        />
        <PropertyNewEditForm />
      </Container>
    </Page>
  );
}
