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
import LoanTypeNewEditForm from './LoanTypeNewEditForm';

// ----------------------------------------------------------------------

export default function LoanTypeCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={!isEdit ? `${translate('LoanType.AddTitle')}` : `${translate('LoanType.UpdateTitle')}`}
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('LoanType.CreateLoanType')}`
              : `${translate('LoanType.EditLoanType')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('LoanType.LoanTypeList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit ? `${translate('LoanType.New')}` : `${translate('LoanType.Update')}`,
            },
          ]}
        />
        <LoanTypeNewEditForm />
      </Container>
    </Page>
  );
}
