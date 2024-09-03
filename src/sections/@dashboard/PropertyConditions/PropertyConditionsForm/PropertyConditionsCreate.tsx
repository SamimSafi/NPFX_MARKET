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
import PropertyConditionsNewEditForm from './PropertyConditionsNewEditForm';

// ----------------------------------------------------------------------

export default function PropertyConditionsCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit
          ? `${translate('PropertyConditions.AddTitle')}`
          : `${translate('PropertyConditions.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('PropertyConditions.CreatePropertyConditions')}`
              : `${translate('PropertyConditions.EditPropertyConditions')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('PropertyConditions.PropertyConditionsList')}`,
              href: PATH_DASHBOARD.PropertyConditions.list,
            },
            {
              name: !isEdit
                ? `${translate('PropertyConditions.New')}`
                : `${translate('PropertyConditions.Update')}`,
            },
          ]}
        />
        <PropertyConditionsNewEditForm />
      </Container>
    </Page>
  );
}
