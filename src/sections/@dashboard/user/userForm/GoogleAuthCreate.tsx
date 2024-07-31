// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
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
        <Enable2fa />
      </Container>
    </Page>
  );
}
