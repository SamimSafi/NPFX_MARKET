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
import { ILoanTracking } from 'src/@types/foamCompanyTypes/systemTypes/LoanTracking';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
// ----------------------------------------------------------------------

export default observer(function LoanTrackingNewEditForm() {
  const { LoanTrackingStore } = useStore();
  const { translate } = useLocales();
  const {
    createLoanTracking,
    updateLoanTracking,
    editMode,
    selectedLoanTracking,
    clearSelectedLoanTracking,
  } = LoanTrackingStore;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewLoanTrackingSchema = Yup.object().shape({
    assetId: Yup.number().required(`${translate('Validation.EnglishName')}`),
    currencyTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    userId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    loanTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    date: Yup.date().required(`${translate('Validation.DariName')}`),
    amount: Yup.number().required(`${translate('Validation.Code')}`),
  });

  const defaultValues = useMemo<ILoanTracking>(
    () => ({
      id: selectedLoanTracking?.id,
      assetId: selectedLoanTracking?.assetId,
      userId: selectedLoanTracking?.userId,
      currencyTypeId: selectedLoanTracking?.currencyTypeId,
      loanTypeId: selectedLoanTracking?.loanTypeId,
      description: selectedLoanTracking?.description || '',
      date: selectedLoanTracking?.date || '',
      loanAmount: selectedLoanTracking?.loanAmount,
    }),
    [selectedLoanTracking]
  );

  const methods = useForm<ILoanTracking>({
    resolver: yupResolver(NewLoanTrackingSchema),
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

  const onSubmit = (data: ILoanTracking) => {
    if (data.id! === undefined) {
      ///create
      createLoanTracking(data).then(() => {
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
              <RHFSelect name="assetId" label={translate('LoanTracking.AssetType')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.title}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="currencyTypeId" label={translate('LoanTracking.currencyType')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.title}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="loanTypeId" label={translate('LoanTracking.loanType')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.title}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="userId" label={translate('LoanTracking.user')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.title}
                  </option>
                ))}
              </RHFSelect>

              <LocalizDatePicker
                name="date"
                label={translate('LoanTracking.date')}
                control={control}
                showAsterisk={true}
              />

              <RHFTextField
                name="loanAmount"
                label={translate('LoanTracking.loanAmount')}
                type={'number'}
                showAsterisk={true}
                autoFocus
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
              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                onClick={() => {
                  clearSelectedLoanTracking();
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
