import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, InputAdornment, Stack, TextField } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { IPayTakenLoan } from 'src/@types/foamCompanyTypes/systemTypes/LoanTracking';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
import CancelIcon from '@mui/icons-material/Cancel';
import { currency } from 'src/constantFile/CommonConstant';
import { roundOff } from 'src/utils/general';
import useSettings from 'src/hooks/useSettings';
// ----------------------------------------------------------------------
interface Props {
  LoanTrackingId: number;
  currencyTypeId: number;
  mainAssetId: string;
}
export default observer(function PayTakenLoanTrackingNewEditForm({
  LoanTrackingId,
  currencyTypeId,
  mainAssetId,
}: Props) {
  const { LoanTrackingStore, commonDropdown } = useStore();
  const { translate } = useLocales();
  const { exchangeRate, onChangeExchangeRate } = useSettings();
  const {
    PayTakenLoan,
    updateLoanTracking,
    editMode,
    selectedLoanTracking,
    setOpenCloseDialogPayTakenLoan,
  } = LoanTrackingStore;
  const { loadMainAssetDDL, MainAssetOption } = commonDropdown;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewLoanTrackingSchema = Yup.object().shape({
    date: Yup.date().required(`${translate('Validation.DariName')}`),
    amountByMainAssetCurrencyType: Yup.number().required(`${translate('Validation.Code')}`),
    amountByLoanTrackingCurrencyType: Yup.number().required(`${translate('Validation.Code')}`),
  });

  const defaultValues = useMemo<IPayTakenLoan>(
    () => ({
      loanTrackingId: selectedLoanTracking?.id || LoanTrackingId,
      mainAssetId: selectedLoanTracking?.mainAssetId || mainAssetId,
      date: selectedLoanTracking?.date || '',
      description: selectedLoanTracking?.description || '',
      amountByMainAssetCurrencyType: 0,
      amountByLoanTrackingCurrencyType: 0,
      exchangeRate: 0 || exchangeRate,
    }),
    [selectedLoanTracking, LoanTrackingId, mainAssetId, exchangeRate]
  );

  const methods = useForm<IPayTakenLoan>({
    resolver: yupResolver(NewLoanTrackingSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
    control,
    setValue,
  } = methods;
  const val = watch();
  const exchangeRates = watch('exchangeRate');
  const usdDollor = watch('usd');

  const handleUSDChange = (usd: number) => {
    const afn = usd * exchangeRates;
    setValue('afn', roundOff(afn, 2));
  };

  const handleAFNChange = (afn: number) => {
    const usd = afn / exchangeRates;
    setValue('usd', roundOff(usd, 2));
  };

  const handleExchangeRateChange = (rate: number) => {
    setValue('exchangeRate', rate);
    const afn = usdDollor! * rate;
    setValue('afn', roundOff(afn, 2));
  };
  const onSubmit = (data: IPayTakenLoan) => {
    // this statements checks if row currency  is usd set usd and if it's afn then set afn value
    switch (Number(currencyTypeId)) {
      case currency.USD: // USD
        data.amountByLoanTrackingCurrencyType = val.usd!;
        break;
      default:
        data.amountByLoanTrackingCurrencyType = val.afn!;
    }
    // this statements checks if ddl currency  is usd set usd and if it's afn then set afn value

    switch (Number(val.currencyTypeId)) {
      case currency.USD: // USD
        data.amountByMainAssetCurrencyType = val.usd!;
        break;
      default:
        data.amountByMainAssetCurrencyType = val.afn!;
    }

    // if (data.loanTrackingId! === undefined) {
    ///create
    PayTakenLoan(data).then(() => {
      reset();
      enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
      // navigate(PATH_DASHBOARD.ContractType.list);
      setOpenCloseDialogPayTakenLoan();
    });
    // } else {
    //   ///update
    //   updateLoanTracking(data).then(() => {
    //     reset();
    //     enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
    //     navigate(PATH_DASHBOARD.ContractType.list);
    //   });
    // }
  };

  useEffect(() => {
    if (editMode) {
      reset(defaultValues);
    }
    if (!editMode) {
      reset(defaultValues);
      loadMainAssetDDL();
    }
  }, [reset, editMode, defaultValues, loadMainAssetDDL]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                padding: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                justifyItems: 'center',
              }}
            >
              <RHFSelect
                name="mainAssetId"
                onChange={(event) => {
                  const selectedOption = MainAssetOption.find(
                    (op) => op.value === event.target.value
                  );
                  if (selectedOption) {
                    setValue('currencyTypeId', selectedOption.currencyTypeId);
                    setValue('mainAssetId', selectedOption.value.toString());
                  }
                }}
                label={translate('MainAsset.MainAsset')}
              >
                <option value="" />
                {MainAssetOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
            </Box>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                padding: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                justifyItems: 'center',
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                border={1}
                borderRadius={1}
                borderColor="grey.400"
                width="100%"
                height="100%"
                sx={{ gridColumn: 'span 2', textAlign: 'center' }}
              >
                <Controller
                  name="exchangeRate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={translate('GeneralFields.OneDollor')}
                      type="text" // Changed to text to control input better
                      onChange={(e) => {
                        let { value } = e.target;
                        // Restrict input to only digits and max 3 digits
                        if (/^\d{0,3}$/.test(value)) {
                          if (value === '') {
                            value = '0';
                          }
                          const rate = parseFloat(value);
                          field.onChange(e);
                          handleExchangeRateChange(rate);
                          onChangeExchangeRate(rate);
                        }
                      }}
                      value={field.value === undefined ? '0' : field.value}
                      margin="normal"
                      sx={{
                        width: '130px',
                      }}
                      InputProps={{
                        endAdornment: <InputAdornment position="start">؋</InputAdornment>,
                        sx: { textAlign: 'center' },
                      }}
                      inputProps={{
                        maxLength: 3, // Max length to restrict input
                        style: { textAlign: 'center' },
                      }}
                    />
                  )}
                />
              </Box>
              <Controller
                name="usd"
                control={control}
                render={({ field }) => (
                  <RHFTextField
                    {...field}
                    label={translate('GeneralFields.USD')}
                    type="number"
                    onChange={(e) => {
                      const usd = parseFloat(e.target.value);
                      field.onChange(e);
                      handleUSDChange(usd);
                    }}
                    margin="normal"
                    InputProps={{
                      endAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                )}
              />
              <Controller
                name="afn"
                control={control}
                render={({ field }) => (
                  <RHFTextField
                    {...field}
                    label={translate('GeneralFields.AFN')}
                    type="number"
                    onChange={(e) => {
                      const afn = parseFloat(e.target.value);
                      field.onChange(e);
                      handleAFNChange(afn);
                    }}
                    margin="normal"
                    InputProps={{
                      endAdornment: <InputAdornment position="start">؋</InputAdornment>,
                    }}
                  />
                )}
              />
              <LocalizDatePicker
                name="date"
                label={translate('GeneralFields.Date')}
                control={control}
                showAsterisk={true}
              />

              <RHFTextField
                name="description"
                label={translate('GeneralFields.Description')}
                showAsterisk={true}
                autoFocus
              />
            </Box>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                loading={isSubmitting}
                startIcon={
                  !editMode ? <Iconify icon="eva:minus-fill" /> : <Iconify icon="eva:edit-fill" />
                }
              >
                {!editMode ? `${translate('CRUD.PayTakenLoan')}` : `${translate('CRUD.Update')}`}
              </LoadingButton>
              <LoadingButton
                fullWidth
                variant="contained"
                size="small"
                onClick={() => setOpenCloseDialogPayTakenLoan()}
                color="secondary"
                startIcon={<CancelIcon />}
              >
                {translate('CRUD.Cancle')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
});
