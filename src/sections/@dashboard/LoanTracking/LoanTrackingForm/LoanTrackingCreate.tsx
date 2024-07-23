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
import TakeLoanCreateAssetNewEditForm from './TakeLoanCreateAssetNewEditForm';

// ----------------------------------------------------------------------

export default function LoanTrackingCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit
          ? `${translate('LoanTracking.AddTitle')}`
          : `${translate('LoanTracking.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('LoanTracking.CreateLoanTracking')}`
              : `${translate('LoanTracking.EditLoanTracking')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('LoanTracking.LoanTrackingList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit
                ? `${translate('LoanTracking.New')}`
                : `${translate('LoanTracking.Update')}`,
            },
          ]}
        />
        <TakeLoanCreateAssetNewEditForm />
      </Container>
    </Page>
  );
}
