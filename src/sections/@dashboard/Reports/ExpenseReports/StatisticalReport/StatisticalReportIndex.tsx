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
import Page from '../../../../../components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import useSettings from 'src/hooks/useSettings';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ReactToPrint from 'react-to-print';
import Loader from 'src/components/loader/Loader';
import { StatisticalReportPrintView } from './StatisticalReportPrintView';
import { IExpenseReportParam } from 'src/@types/foamCompanyTypes/ExpenseReports';

// ----------------------------------------------------------------------

export default observer(function StatisticalReportIndex() {
  const { commonDropdown } = useStore();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [user, setUser] = useState<any>([]);
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  const {
    loadUserDropdown,
    loadBranchDDL,
    BranchOption,
    loadExpenseTypeDropdown,
    ExpenseTypeOption,
  } = commonDropdown;

  const handleChangeUser = (event: any, newValue: any[]) => {
    const selectedOptionValues = newValue.map((value) => value.value);
    setUser(selectedOptionValues);
  };

  let componentRef = useRef<any>(null);
  const methods = useForm<IExpenseReportParam>({
    // defaultValues,
  });

  const { setValue, watch, control, reset } = methods;

  const val = watch();

  const defaultValues = useMemo<IExpenseReportParam>(
    () => ({
      fromDate: new Date(),
      toDate: new Date(),
    }),
    []
  );

  useEffect(() => {
    loadBranchDDL();
    loadExpenseTypeDropdown();
    // loadUserDropdown(1);
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, defaultValues, loadUserDropdown]);

  // useEffect(() => {}, [StatisticalReportDetails]);

  const Search = (e: any) => {
    e.preventDefault();
    console.log(val.branchIds);
    //StatisticalReportDetails.length = 0;
    setFilterButtonClicked(!filterButtonClicked);
    setIsloading(true);
    // loadStatisticalReport({
    //   userId: user.length > 0 ? user : undefined,
    //   RequestCategory: val.RequestCategory,
    //   ActionRequest: val.ActionRequest,
    //   fromDate: val.fromDate,
    //   toDate: val.toDate,
    // }).then((rest) => {
    //   setTimeout(() => {
    //     setIsloading(false);
    //   }, 500);
    // });
  };

  return (
    <Page title={translate('ApplicantRequest.ReportTitle')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('ApplicantRequest.UsersStatisticalReport')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },

            {
              name: `${translate('ApplicantRequest.StatisticalReport')}`,
              href: PATH_DASHBOARD.general.app,
            },
          ]}
        />

        <Grid container>
          <Grid item xs={3} md={4} sx={{}}>
            {/*  */}
            <Card sx={{ height: '600px', padding: '30px' }}>
              <>
                <Controller
                  name="branchIds"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      fullWidth
                      freeSolo
                      multiple
                      options={BranchOption.map((option: any) => option)}
                      // value={field.value}
                      value={watch('branchIds') || field.value}
                      getOptionLabel={(option) => option.text}
                      onInputChange={(event, newInputValue, reason) => {
                        if (reason === 'reset') {
                          setValue<any>('branchIds', newInputValue);
                          return;
                        } else {
                          setValue<any>('branchIds', newInputValue);
                        }
                      }}
                      onChange={(event, newValue) => {
                        // setValue('ActionRequest', 0);
                        setValue<any>('branchIds', newValue.values());
                        field.onChange(newValue.values());
                      }}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={option.value}
                            size="small"
                            label={option.value}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ marginBottom: '20px' }}
                          size="small"
                          label={translate('BranchId.BranchId')}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />

                <Controller
                  name="expenseTypeIds"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      fullWidth
                      freeSolo
                      options={ExpenseTypeOption.map((option: any) => option)}
                      value={field.value}
                      getOptionLabel={(option) => option.text}
                      onInputChange={(event, newInputValue, reason) => {
                        if (reason === 'reset') {
                          setValue<any>('expenseTypeIds', newInputValue);
                          return;
                        } else {
                          setValue<any>('expenseTypeIds', newInputValue);
                        }
                      }}
                      onChange={(event, newValue) => {
                        setValue<any>('expenseTypeIds', newValue.value);
                        field.onChange(newValue.value);
                      }}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={option.value}
                            size="small"
                            label={option.value + 'a data'}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ marginBottom: '20px' }}
                          size="small"
                          label={translate('expenseTypeIds.expenseTypeIds')}
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />

                <Controller
                  name="fromDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      label={translate('InternalDocumentReport.FromDate')}
                      // disablePast
                      value={field.value}
                      onChange={(newValue) => {
                        setValue<any>('fromDate', newValue);
                        field.onChange(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ marginBottom: '20px' }}
                          size="small"
                          fullWidth
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />

                <Controller
                  name="toDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      label={translate('InternalDocumentReport.ToDate')}
                      // disablePast
                      value={field.value}
                      onChange={(newValue) => {
                        setValue<any>('toDate', newValue);
                        field.onChange(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ marginBottom: '20px' }}
                          size="small"
                          fullWidth
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
                <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                  <LoadingButton
                    // fullWidth
                    size="small"
                    variant="contained"
                    //loading={isSubmitting}
                    onClick={Search}
                    startIcon={<Iconify icon="eva:search-fill" />}
                  >
                    {translate('InternalDocumentReport.Filter')}
                  </LoadingButton>

                  <ReactToPrint
                    trigger={() => (
                      <Button
                        // fullWidth
                        size="small"
                        variant="contained"
                        color="warning"
                        startIcon={<Iconify icon="eva:printer-outline" />}
                        // disabled={StatisticalReportDetails.length === 0 ? true : false}
                      >
                        {translate('EmployeeCard.Print')}
                      </Button>
                    )}
                    content={() => componentRef.current}
                    onAfterPrint={() => {
                      // alert('this is done');
                    }}
                    pageStyle="print"
                  />

                  <Button
                    // fullWidth
                    size="small"
                    variant="contained"
                    color="error"
                    startIcon={<Iconify icon="eva:refresh-outline" />}
                    onClick={() => {
                      // StatisticalReportDetails.length = 0;
                      setFilterButtonClicked(!filterButtonClicked);

                      // setDepartment([]);
                    }}
                  >
                    {translate('EmployeeCard.Reset')}
                  </Button>
                </Stack>
              </>
            </Card>
          </Grid>

          <Grid item xs={9} md={8} sx={{}}>
            {isloading ? (
              <Loader />
            ) : (
              'test'
              // <StatisticalReportPrintView
              //   ref={componentRef}
              //   // bothSide={bothSide}
              //   filterButtonClicked={filterButtonClicked}
              //   StatisticalReportDetails={StatisticalReportDetails}
              // />
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
});
