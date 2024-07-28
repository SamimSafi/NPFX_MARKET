import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Card, Grid, InputAdornment, Stack } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { IExpenseTracking } from 'src/@types/foamCompanyTypes/systemTypes/ExpenseTracking';
// ----------------------------------------------------------------------

export default observer(function ExpenseTrackingNewEditForm() {
  const { ExpenseTrackingStore, commonDropdown } = useStore();
  const { translate } = useLocales();
  const {
    createExpenseTracking,
    updateExpenseTracking,
    editMode,
    selectedExpenseTracking,
    clearSelectedExpenseTracking,
  } = ExpenseTrackingStore;
  const {
    loadBranchDDL,
    BranchOption,
    loadUserDropdown,
    UserOption,
    loadExpenseTypeDropdown,
    ExpenseTypeOption,
    loadMainAssetDDL,
    MainAssetOption,
  } = commonDropdown;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewExpenseTrackingSchema = Yup.object().shape({
    expenseTypeId: Yup.number().required(`${translate('Validation.ExpenseType')}`),
    mainAssetId: !editMode
      ? Yup.string().required(`${translate('Validation.Account')}`)
      : Yup.string(),
    branchId: Yup.number().required(`${translate('Validation.Branch')}`),
    userId: Yup.string().required(`${translate('Validation.User')}`),
    date: Yup.date().required(`${translate('Validation.Date')}`),
    amount: Yup.number().required(`${translate('Validation.Amount')}`),
  });

  const defaultValues = useMemo<IExpenseTracking>(
    () => ({
      id: selectedExpenseTracking?.id,
      expenseTypeId: selectedExpenseTracking?.expenseTypeId || undefined,
      mainAssetId: selectedExpenseTracking?.mainAssetId || undefined,
      branchId: selectedExpenseTracking?.branchId || undefined,
      userId: selectedExpenseTracking?.userId || '',
      date: selectedExpenseTracking?.date || new Date().toDateString(),
      amount: selectedExpenseTracking?.amount || undefined,
      description: selectedExpenseTracking?.description || '',
    }),
    [selectedExpenseTracking]
  );

  const methods = useForm<IExpenseTracking>({
    resolver: yupResolver(NewExpenseTrackingSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting, errors },
  } = methods;
  const val = watch();
  const onSubmit = (data: IExpenseTracking) => {
    if (data.id! === undefined) {
      ///create
      createExpenseTracking(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          navigate(PATH_DASHBOARD.ExpenseTracking.list);
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          if (json.error.Date != null) {
            setError('afterSubmit', { ...err, message: json.error.Date });
          } else if (json.error.MainAssetId != null) {
            setError('afterSubmit', { ...err, message: json.error.MainAssetId });
          } else if (json.error.Amount != null) {
            setError('afterSubmit', { ...err, message: json.error.Amount });
          } else {
            setError('afterSubmit', { ...err, message: json.error });
          }
        });
    } else {
      ///update
      updateExpenseTracking(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.ExpenseTracking.list);
      });
    }
  };

  useEffect(() => {
    loadExpenseTypeDropdown();
    if (editMode) {
      reset(defaultValues);
    }
    if (!editMode) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, editMode, defaultValues]);

  useEffect(() => {
    loadBranchDDL();
    loadMainAssetDDL();
  }, [loadBranchDDL, loadMainAssetDDL]);

  useEffect(() => {
    loadUserDropdown(val.branchId);
  }, [loadUserDropdown, val.branchId]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert sx={{ mb: 2 }} severity="error">
          {errors.afterSubmit.message}
        </Alert>
      )}
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
              {editMode ? (
                <></>
              ) : (
                <RHFSelect name="mainAssetId" label={translate('MainAsset.MainAsset')}>
                  <option value="" />
                  {MainAssetOption.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.text}
                    </option>
                  ))}
                </RHFSelect>
              )}

              <RHFSelect
                name="expenseTypeId"
                label={translate('ExpenseType.ExpenseType')}
                showAsterisk={true}
              >
                <option value="" />
                {ExpenseTypeOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="branchId" label={translate('Branch.Branch')}>
                <option value="" />
                {BranchOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect name="userId" label={translate('User.user')}>
                <option value="" />
                {UserOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField
                name="amount"
                label={translate('ExpenseTracking.ExpenseAmount')}
                showAsterisk={true}
                autoFocus
                InputProps={{
                  endAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
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
