import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, InputAdornment, Stack } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { IWithdrawalTracking } from 'src/@types/foamCompanyTypes/systemTypes/WithdrawalTracking';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
// ----------------------------------------------------------------------

export default observer(function WithdrawalTrackingNewEditForm() {
  const { WithdrawalTrackingStore } = useStore();
  const { translate } = useLocales();
  const {
    createWithdrawalTracking,
    updateWithdrawalTracking,
    editMode,
    selectedWithdrawalTracking,
    clearSelectedWithdrawalTracking,
  } = WithdrawalTrackingStore;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewWithdrawalTrackingSchema = Yup.object().shape({
    assetId: Yup.number().required(`${translate('Validation.EnglishName')}`),
    currencyTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    userId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    loanTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    date: Yup.date().required(`${translate('Validation.DariName')}`),
    dueDate: Yup.date().required(`${translate('Validation.DariName')}`),
    withdrawalAmount: Yup.number().required(`${translate('Validation.Code')}`),
  });

  const defaultValues = useMemo<IWithdrawalTracking>(
    () => ({
      id: selectedWithdrawalTracking?.id,
      mainAssetId: selectedWithdrawalTracking?.mainAssetId,
      userId: selectedWithdrawalTracking?.userId,
      currencyTypeId: selectedWithdrawalTracking?.currencyTypeId,
      dueDate: selectedWithdrawalTracking?.dueDate,
      description: selectedWithdrawalTracking?.description || '',
      date: selectedWithdrawalTracking?.date || new Date().toLocaleDateString(),
      withdrawalAmount: selectedWithdrawalTracking?.withdrawalAmount,
    }),
    [selectedWithdrawalTracking]
  );

  const methods = useForm<IWithdrawalTracking>({
    resolver: yupResolver(NewWithdrawalTrackingSchema),
    defaultValues,
  });

  const bloodGroup = [
    { title: 'A+', value: 'A+' },
    { title: 'A-', value: 'A-' },
    { title: 'B+', value: 'B+' },
    { title: 'B-', value: 'B-' },
    { title: 'O+', value: 'O+' },
    { title: 'O-', value: 'O-' },
    { title: 'AB+', value: 'AB+' },
    { title: 'AB-', value: 'AB-' },
  ];

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = methods;

  const onSubmit = (data: IWithdrawalTracking) => {
    if (data.id! === undefined) {
      ///create
      createWithdrawalTracking(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.ContractType.list);
      });
    } else {
      ///update
      updateWithdrawalTracking(data).then(() => {
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
    }
  }, [reset, editMode, defaultValues]);

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
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFSelect name="assetId" label={translate('WithdrawalTracking.AssetType')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.title}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="currencyTypeId" label={translate('WithdrawalTracking.currencyType')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.title}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="userId" label={translate('WithdrawalTracking.user')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.title}
                  </option>
                ))}
              </RHFSelect>

              <LocalizDatePicker
                name="date"
                label={translate('WithdrawalTracking.date')}
                control={control}
                showAsterisk={true}
              />

              <RHFTextField
                name="withdrawalAmount"
                label={translate('WithdrawalTracking.withdrawalAmount')}
                type={'number'}
                showAsterisk={true}
                autoFocus
                InputProps={{
                  endAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              <RHFTextField
                name="description"
                label={translate('WithdrawalTracking.description')}
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
              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                onClick={() => {
                  clearSelectedWithdrawalTracking();
                  navigate(PATH_DASHBOARD.ExpenseTracking.list);
                }}
              >
                {translate('CRUD.BackToList')}
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
});
