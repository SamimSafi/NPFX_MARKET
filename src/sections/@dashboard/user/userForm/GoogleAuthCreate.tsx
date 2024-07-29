// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import useLocales from '../../../../hooks/useLocales';
import Enable2fa from './Enable2fa';
// ----------------------------------------------------------------------

export default function GoogleAuthCreate() {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  return (
    <Page title={translate('User.GoogleAuth')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('User.GoogleAuthCreate')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('User.GoogleAuthCreate')}`, href: PATH_DASHBOARD.user.list },
            { name: translate('User.GoogleAuthCreate') },
          ]}
        />
        <Enable2fa />
      </Container>
    </Page>
  );
}
