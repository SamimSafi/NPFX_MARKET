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
import ExpenseTrackingNewEditForm from './ExpenseTrackingNewEditForm';

// ----------------------------------------------------------------------

export default function ExpenseTrackingCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit
          ? `${translate('ExpenseTracking.AddTitle')}`
          : `${translate('ExpenseTracking.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('ExpenseTracking.CreateExpenseTracking')}`
              : `${translate('ExpenseTracking.EditExpenseTracking')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('ExpenseTracking.ExpenseTrackingList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit
                ? `${translate('ExpenseTracking.New')}`
                : `${translate('ExpenseTracking.Update')}`,
            },
          ]}
        />
        <ExpenseTrackingNewEditForm />
      </Container>
    </Page>
  );
}
