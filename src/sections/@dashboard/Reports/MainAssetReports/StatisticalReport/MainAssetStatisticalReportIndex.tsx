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
import { MainAssetStatisticalReportPrintView } from './MainAssetStatisticalReportPrintView';
import { IMainAssetReportParam } from 'src/@types/foamCompanyTypes/MainAssetReports';

// ----------------------------------------------------------------------

export default observer(function MainAssetStatisticalReportIndex() {
  const { commonDropdown, MainAssetReportsStore } = useStore();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [branch, setBranch] = useState<any>([]);
  const [MainAssetType, setMainAssetType] = useState<any>([]);
  const { themeStretch } = useSettings();
  const { translate } = useLocales();

  const { loadMainAssetStatisticalReport, MainAssetStatisticalReportDetails } = MainAssetReportsStore;
  const {
    loadUserDropdown,
    loadBranchDDL,
    BranchOption,
    loadMainAssetDDL,
    MainAssetOption,
  } = commonDropdown;
  const handleChangeBranch = (event: any, newValue: any[]) => {
    const selectedOptionValues = newValue.map((value) => value.value);
    setBranch(selectedOptionValues);
  };

  const handleChangeMainAssetType = (event: any, newValue: any[]) => {
    const selectedOptionValues = newValue.map((value) => value.value);
    setMainAssetType(selectedOptionValues);
  };

  let componentRef = useRef<any>(null);
  const methods = useForm<IMainAssetReportParam>({
    // defaultValues,
  });

  const { setValue, watch, control, reset } = methods;

  const val = watch();

  const defaultValues = useMemo<IMainAssetReportParam>(
    () => ({
      fromDate: new Date(),
      toDate: new Date(),
    }),
    []
  );

  useEffect(() => {
    loadBranchDDL();
    loadMainAssetDDL();
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, defaultValues, loadUserDropdown]);

  const Search = (e: any) => {
    e.preventDefault();
    setFilterButtonClicked(!filterButtonClicked);
    setIsloading(true);
    loadMainAssetStatisticalReport({
      mainAssetIds: branch,
      fromDate: val.fromDate,
      toDate: val.toDate,
    }).then((rest) => {
      setTimeout(() => {
        setIsloading(false);
      }, 500);
    });
  };
  useEffect(() => {}, [MainAssetStatisticalReportDetails, isloading]);

  return (
    <Page title={translate('Report.ReportTitle')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('Report.MainAssetReport')}
          links={[{ name: translate('Report.Dashboard'), href: PATH_DASHBOARD.root }]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ padding: '30px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Controller
                    name="mainAssetIds"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <Autocomplete
                        disableCloseOnSelect
                        multiple
                        freeSolo
                        options={MainAssetOption.map((option: any) => option)}
                        value={field.value}
                        getOptionLabel={(option) => option.text}
                        onChange={(event, newValue) => {
                          handleChangeBranch(event, newValue);
                          field.onChange(newValue);
                        }}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              {...getTagProps({ index })}
                              key={option.value}
                              size="small"
                              label={option.text}
                            />
                          ))
                        }
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option.text}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            sx={{ marginBottom: '20px' }}
                            size="small"
                            label={translate('Report.MainAsset')}
                            error={!!error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

               
                <Grid item xs={12} md={3}>
                  <Controller
                    name="fromDate"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        label={translate('Report.FromDate')}
                        value={field.value}
                        onChange={(newValue) => {
                          setValue<any>('fromDate', newValue);
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            sx={{ marginBottom: '20px' }}
                            size="small"
                            error={!!error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Controller
                    name="toDate"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        label={translate('Report.ToDate')}
                        value={field.value}
                        onChange={(newValue) => {
                          setValue<any>('toDate', newValue);
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            sx={{ marginBottom: '20px' }}
                            size="small"
                            error={!!error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <LoadingButton
                  size="small"
                  variant="contained"
                  onClick={Search}
                  startIcon={<Iconify icon="eva:search-fill" />}
                >
                  {translate('Report.Filter')}
                </LoadingButton>

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
                  startIcon={<Iconify icon="eva:refresh-outline" />}
                  onClick={() => {
                    MainAssetStatisticalReportDetails!.report!.length = 0;
                    setFilterButtonClicked(!filterButtonClicked);
                  }}
                >
                  {translate('Report.Reset')}
                </Button>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            {isloading ? (
              <Loader />
            ) : (
              <MainAssetStatisticalReportPrintView
                ref={componentRef}
                filterButtonClicked={filterButtonClicked}
                StatisticalReportDetails={MainAssetStatisticalReportDetails}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
});
