// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/stores/store';
import useLocales from '../../../../hooks/useLocales';
import { EmployeeDetailTableRow } from '../EmployeeList';
// ----------------------------------------------------------------------

export default observer(function EmployeeDetailHeader() {
  const { translate } = useLocales();
  const {
    EmployeeStore: { SelectedEmployeeDetail, clearSelectedEmployee },
  } = useStore();

  const { themeStretch } = useSettings();

  return (
    <Page title={translate('Employee.DetailsTitle')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('Employee.EmployeeDetails')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('Employee.Employee')}`, href: PATH_DASHBOARD.Employee.list },
          ]}
        />
        <EmployeeDetailTableRow
          row={SelectedEmployeeDetail!}
          clearEmployee={clearSelectedEmployee}
        />
      </Container>
    </Page>
  );
});
