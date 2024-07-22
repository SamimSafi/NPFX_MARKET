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
import WithdrawalTrackingNewEditForm from './WithdrawalTrackingNewEditForm';

// ----------------------------------------------------------------------

export default function WithdrawalTrackingCreate() {
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
              ? `${translate('WithdrawalTracking.CreateWithdrawalTracking')}`
              : `${translate('WithdrawalTracking.EditWithdrawalTracking')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('WithdrawalTracking.WithdrawalTrackingList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit
                ? `${translate('WithdrawalTracking.New')}`
                : `${translate('WithdrawalTracking.Update')}`,
            },
          ]}
        />
        <WithdrawalTrackingNewEditForm />
      </Container>
    </Page>
  );
}
