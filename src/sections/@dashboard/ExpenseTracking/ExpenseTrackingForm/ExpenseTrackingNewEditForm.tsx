import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { IExpenseTracking } from 'src/@types/foamCompanyTypes/systemTypes/ExpenseTracking';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
// ----------------------------------------------------------------------

export default observer(function ExpenseTrackingNewEditForm() {
  const { ExpenseTrackingStore } = useStore();
  const { translate } = useLocales();
  const {
    createExpenseTracking,
    updateExpenseTracking,
    editMode,
    selectedExpenseTracking,
    clearSelectedExpenseTracking,
  } = ExpenseTrackingStore;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewExpenseTrackingSchema = Yup.object().shape({
    assetTypeId: Yup.number().required(`${translate('Validation.EnglishName')}`),
    currencyTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    userId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    date: Yup.date().required(`${translate('Validation.DariName')}`),
    amount: Yup.number().required(`${translate('Validation.Code')}`),
  });

  const defaultValues = useMemo<IExpenseTracking>(
    () => ({
      id: selectedExpenseTracking?.id,
      assetTypeId: selectedExpenseTracking?.assetTypeId,
      userId: selectedExpenseTracking?.userId,
      currencyTypeId: selectedExpenseTracking?.currencyTypeId,
      description: selectedExpenseTracking?.description || '',
      date: selectedExpenseTracking?.date || '',
      amount: selectedExpenseTracking?.amount,
    }),
    [selectedExpenseTracking]
  );

  const methods = useForm<IExpenseTracking>({
    resolver: yupResolver(NewExpenseTrackingSchema),
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

  const onSubmit = (data: IExpenseTracking) => {
    if (data.id! === undefined) {
      ///create
      createExpenseTracking(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.ContractType.list);
      });
    } else {
      ///update
      updateExpenseTracking(data).then(() => {
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
              <RHFSelect name="assetTypeId" label={translate('ExpenseTracking.AssetType')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.title}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="currencyTypeId" label={translate('ExpenseTracking.currencyType')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.title}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="userId" label={translate('ExpenseTracking.user')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.title}
                  </option>
                ))}
              </RHFSelect>

              <LocalizDatePicker
                name="transactionDate"
                label={translate('ExpenseTracking.transactionDate')}
                control={control}
                showAsterisk={true}
              />

              <RHFTextField
                name="tradeAmount"
                label={translate('ExpenseTracking.tradeAmount')}
                type={'number'}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="profitAmount"
                label={translate('ExpenseTracking.profitAmount')}
                type={'number'}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="lossAmount"
                label={translate('ExpenseTracking.lossAmount')}
                type={'number'}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="description"
                label={translate('ExpenseTracking.description')}
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
                  clearSelectedExpenseTracking();
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
