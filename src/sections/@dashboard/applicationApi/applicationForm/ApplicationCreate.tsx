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
// sections
import ApplicationNewEditForm from './ApplicationNewEditForm';
// @type
// ----------------------------------------------------------------------

export default function ApplicationCreate() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');

  return (
    <Page title="Application: Create a new Application">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit ? `${translate('APPlication.NewApp')}` : `${translate('APPlication.UpdateApp')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('APPlication.AppList')}`, href: PATH_DASHBOARD.Application.list },
            {
              name: !isEdit
                ? `${translate('APPlication.NewApp')}`
                : `${translate('APPlication.UpdateApp')}`,
            },
          ]}
        />
        <ApplicationNewEditForm />
      </Container>
    </Page>
  );
}
