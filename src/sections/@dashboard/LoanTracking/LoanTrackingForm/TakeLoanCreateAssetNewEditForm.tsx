import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, FormControlLabel, Grid, Stack, Switch } from '@mui/material';

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
import CancelIcon from '@mui/icons-material/Cancel';
// ----------------------------------------------------------------------

export default observer(function TakeLoanCreateAssetNewEditForm() {
  const { LoanTrackingStore, commonDropdown, MainAssetStore } = useStore();
  const { translate } = useLocales();
  const {
    TakeLoanCreateAsset,
    updateLoanTracking,
    clearSelectedLoanTracking,
    editMode,
    selectedLoanTracking,
  } = LoanTrackingStore;
  const {
    loadLoanTypeDDL,
    LoanTypeOption,
    loadPartnersDDL,
    PartnersOption,
    loadCurrencyTypeDDL,
    CurrencyTypeOption,
  } = commonDropdown;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewLoanTrackingSchema = Yup.object().shape({
    currencyTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    loanTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    date: Yup.date().required(`${translate('Validation.DariName')}`),
    loanAmount: Yup.number().required(`${translate('Validation.loanAmount')}`),
  });

  const defaultValues = useMemo<ILoanTracking>(
    () => ({
      id: selectedLoanTracking?.id,
      partnerId: selectedLoanTracking?.partnerId,
      currencyTypeId: selectedLoanTracking?.currencyTypeId,
      loanTypeId: selectedLoanTracking?.loanTypeId,
      description: selectedLoanTracking?.description || '',
      nameInEnglish: selectedLoanTracking?.nameInEnglish || '',
      nameInPashto: selectedLoanTracking?.nameInPashto || '',
      phone: selectedLoanTracking?.phone || '',
      email: selectedLoanTracking?.email || '',
      date: selectedLoanTracking?.date || '',
      dueDate: selectedLoanTracking?.dueDate || '',
      loanAmount: selectedLoanTracking?.loanAmount,
    }),
    [selectedLoanTracking]
  );

  const methods = useForm<ILoanTracking>({
    resolver: yupResolver(NewLoanTrackingSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
    control,
  } = methods;

  const val = watch();
  const onSubmit = (data: ILoanTracking) => {
    if (data.id! === undefined) {
      ///create
      TakeLoanCreateAsset(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.LoanTracking.list);
        // MainAssetStore.setOpenCloseDialogCreateLoan();
      });
    } else {
      ///update
      updateLoanTracking(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        clearSelectedLoanTracking();
        navigate(PATH_DASHBOARD.LoanTracking.list);
      });
    }
  };

  useEffect(() => {
    if (editMode) {
      reset(defaultValues);
    }
    if (!editMode) {
      reset(defaultValues);
      loadLoanTypeDDL();
      loadPartnersDDL();
      loadCurrencyTypeDDL();
    }
  }, [reset, editMode, defaultValues, loadLoanTypeDDL, loadPartnersDDL, loadCurrencyTypeDDL]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                padding: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFSelect name="partnerId" label={translate('LoanTracking.Partner')}>
                <option value="" />
                {PartnersOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              {/* Partner Name */}
              {val.partnerId ? (
                <></>
              ) : (
                <>
                  <RHFTextField
                    name="nameInEnglish"
                    label={translate('LoanTracking.nameInEnglish')}
                    showAsterisk={true}
                    autoFocus
                  />
                  <RHFTextField
                    name="nameInPashto"
                    label={translate('LoanTracking.nameInPashto')}
                    showAsterisk={true}
                    autoFocus
                  />
                  <RHFTextField
                    name="phone"
                    label={translate('LoanTracking.phone')}
                    showAsterisk={true}
                    autoFocus
                  />
                  <RHFTextField
                    name="email"
                    label={translate('LoanTracking.email')}
                    showAsterisk={true}
                    autoFocus
                  />
                </>
              )}

              <RHFSelect name="currencyTypeId" label={translate('LoanTracking.currencyType')}>
                <option value="" />
                {CurrencyTypeOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="loanTypeId" label={translate('LoanTracking.loanType')}>
                <option value="" />
                {LoanTypeOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField
                name="loanAmount"
                label={translate('LoanTracking.loanAmount')}
                showAsterisk={true}
                autoFocus
                type="number"
              />

              <LocalizDatePicker
                name="date"
                label={translate('LoanTracking.date')}
                control={control}
                showAsterisk={true}
              />
              <LocalizDatePicker
                name="dueDate"
                label={translate('LoanTracking.dueDate')}
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
            <Box
              sx={{
                ml: 4,
                mt: 4,
                mb: 4,
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  startIcon={<Iconify icon="mdi:cash-edit" />}
                >
                  {translate('CRUD.CreateLoan')}
                </LoadingButton>
                <LoadingButton
                  fullWidth
                  variant="contained"
                  color="error"
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                  onClick={() => {
                    navigate(PATH_DASHBOARD.LoanTracking.list);
                    clearSelectedLoanTracking();
                  }}
                >
                  {translate('CRUD.BackToList')}
                </LoadingButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
});
