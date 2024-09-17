import { useEffect, useState, useRef, useMemo } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import { DatePicker, LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Button,
  Card,
  Chip,
  Grid,
  Stack,
  TextField,
  Container,
  Checkbox,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// @types
// components
import Iconify from 'src/components/Iconify';
import { useStore } from 'src/stores/store';
import { observer } from 'mobx-react-lite';
import useLocales from 'src/hooks/useLocales';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import useSettings from 'src/hooks/useSettings';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ReactToPrint from 'react-to-print';
import Loader from 'src/components/loader/Loader';
import { IExpenseReportParam } from 'src/@types/foamCompanyTypes/ExpenseReports';
import Page from 'src/components/Page';
import { EmployeePropertyPrintView } from './EmployeePropertyPrintView';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

export default observer(function EmployeePropertyIndex() {
  const { PropertyStore } = useStore();
  const { GetPropertiesByEmpId } = PropertyStore;
  const [isloading, setIsloading] = useState(false);

  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const navigate = useNavigate();

  let componentRef = useRef<any>(null);

  useEffect(() => {}, [isloading]);

  return (
    <Page title={translate('EmployeeProperty.EmployeePropertyDetails')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('EmployeeProperty.EmployeePropertyDetails')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('Employee.Employee')}`, href: PATH_DASHBOARD.Employee.list },
            { name: `${translate('Employee.Employee')}` },
          ]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ padding: '20px' }}>
              <Stack direction="row" spacing={1.5}>
                <ReactToPrint
                  trigger={() => (
                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      startIcon={<Iconify icon="eva:printer-outline" />}
                    >
                      {translate('Report.Print')}
                    </Button>
                  )}
                  content={() => componentRef.current}
                  pageStyle="print"
                />

                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.Employee.list);
                  }}
                >
                  {translate('CRUD.BackToList')}
                </Button>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            {isloading ? (
              <Loader />
            ) : (
              <EmployeePropertyPrintView
                ref={componentRef}
                GetPropertiesByEmp={GetPropertiesByEmpId}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
});
