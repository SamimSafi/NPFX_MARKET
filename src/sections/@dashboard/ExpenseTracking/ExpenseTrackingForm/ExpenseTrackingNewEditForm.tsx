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
  } = commonDropdown;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewExpenseTrackingSchema = Yup.object().shape({
    ExpenseTypeId: Yup.number().required(`${translate('Validation.ExpenseTrackingType')}`),
    branchId: Yup.number().required(`${translate('Validation.branch')}`),
    userId: Yup.string().required(`${translate('Validation.user')}`),
    date: Yup.date().required(`${translate('Validation.user')}`),
    amount: Yup.number().required(`${translate('Validation.amount')}`),
  });

  const defaultValues = useMemo<IExpenseTracking>(
    () => ({
      id: selectedExpenseTracking?.id,
      expenseTypeId: selectedExpenseTracking?.expenseTypeId || undefined,
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
    formState: { isSubmitting },
  } = methods;
  const val = watch();
  const onSubmit = (data: IExpenseTracking) => {
    if (data.id! === undefined) {
      ///create
      createExpenseTracking(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.ExpenseTracking.list);
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
  }, [loadBranchDDL]);

  useEffect(() => {
    loadUserDropdown(val.branchId);
  }, [loadUserDropdown, val.branchId]);

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
              <RHFSelect
                name="ExpenseTypeId"
                label={translate('ExpenseTracking.Expenseype')}
                showAsterisk={true}
              >
                <option value="" />
                {ExpenseTypeOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="branchId" label={translate('MainAsset.branch')}>
                <option value="" />
                {BranchOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect name="userId" label={translate('MainAsset.User')}>
                <option value="" />
                {UserOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField
                name="amount"
                label={translate('ExpenseTracking.Amount')}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="description"
                label={translate('GeneralFields.description')}
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
