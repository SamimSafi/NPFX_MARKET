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
// ----------------------------------------------------------------------
interface Props {
  LoanTrackingId: number;
}
export default observer(function PayTakenLoanTrackingNewEditForm({ LoanTrackingId }: Props) {
  const { LoanTrackingStore, commonDropdown } = useStore();
  const { translate } = useLocales();
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
      mainAssetId: selectedLoanTracking?.mainAssetId,
      date: selectedLoanTracking?.date || '',
      description: selectedLoanTracking?.description || '',
      amountByMainAssetCurrencyType: 0,
      amountByLoanTrackingCurrencyType: 0,
      exchangeRate: 0,
    }),
    [selectedLoanTracking, LoanTrackingId]
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

  const exchangeRate = watch('exchangeRate');
  const amountByMainAssetCurrencyType = watch('amountByMainAssetCurrencyType');

  const handleUSDChange = (usd: number) => {
    const afn = usd * exchangeRate;
    setValue('amountByLoanTrackingCurrencyType', afn);
  };

  const handleAFNChange = (afn: number) => {
    const usd = afn / exchangeRate;
    setValue('amountByMainAssetCurrencyType', usd);
  };

  const handleExchangeRateChange = (rate: number) => {
    setValue('exchangeRate', rate);
    const afn = amountByMainAssetCurrencyType * rate;
    setValue('amountByLoanTrackingCurrencyType', afn);
  };
  const onSubmit = (data: IPayTakenLoan) => {
    if (data.loanTrackingId! === undefined) {
      ///create
      PayTakenLoan(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.ContractType.list);
      });
    } else {
      ///update
      updateLoanTracking(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.ContractType.list);
      });
    }
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
              <RHFSelect name="mainAssetId" label={translate('MainAsset.mainAsset')}>
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
                      label="1 USD ="
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
                name="amountByMainAssetCurrencyType"
                control={control}
                render={({ field }) => (
                  <RHFTextField
                    {...field}
                    label="USD"
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
                name="amountByLoanTrackingCurrencyType"
                control={control}
                render={({ field }) => (
                  <RHFTextField
                    {...field}
                    label="AFN"
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
                label={translate('LoanTracking.date')}
                control={control}
                showAsterisk={true}
              />

              <RHFTextField
                name="description"
                label={translate('LoanTracking.description')}
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
                  !editMode ? <Iconify icon="eva:plus-fill" /> : <Iconify icon="eva:edit-fill" />
                }
              >
                {!editMode ? `${translate('CRUD.Save')}` : `${translate('CRUD.Update')}`}
              </LoadingButton>
              <LoadingButton
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
