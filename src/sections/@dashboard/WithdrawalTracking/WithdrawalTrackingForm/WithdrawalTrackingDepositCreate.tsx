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
import WithdrawalTrackingDepositNewEditForm from './WithdrawalTrackingDepositNewEditForm';

// ----------------------------------------------------------------------

export default function WithdrawalTrackingDepositCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit
          ? `${translate('WithdrawalTracking.AddTitle')}`
          : `${translate('WithdrawalTracking.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('WithdrawalTracking.CreateDeposit')}`
              : `${translate('WithdrawalTracking.EditDeposit')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('WithdrawalTracking.WithdrawalTrackingList')}`,
              href: PATH_DASHBOARD.WithdrawalTracking.list,
            },
            {
              name: !isEdit
                ? `${translate('WithdrawalTracking.DepositToAccount')}`
                : `${translate('WithdrawalTracking.UpdateDeposit')}`,
            },
          ]}
        />
        <WithdrawalTrackingDepositNewEditForm />
      </Container>
    </Page>
  );
}
