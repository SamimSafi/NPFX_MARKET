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
import EmployeeDegreeNewEditForm from './EmployeeNewEditForm';
// ----------------------------------------------------------------------

export default function EmployeeDegreeCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { translate } = useLocales();
  const isEdit = pathname.includes('edit');

  return (
    <Page title={translate('Employee.CreateTitle')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('Employee.CreateEmployee')}`
              : `${translate('Employee.UpdateEmployee')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('Employee.EmployeeList')}`, href: PATH_DASHBOARD.Employee.list },
            {
              name: !isEdit
                ? `${translate('Employee.NewEmployee')}`
                : `${translate('Employee.UpdateEmp')}`,
            },
          ]}
        />
        <EmployeeDegreeNewEditForm />
      </Container>
    </Page>
  );
}
