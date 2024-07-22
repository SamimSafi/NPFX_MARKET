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
import { ILoanTracking, IPayTakenLoan } from 'src/@types/foamCompanyTypes/systemTypes/LoanTracking';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
// ----------------------------------------------------------------------

export default observer(function PayTakenLoanTrackingNewEditForm() {
  const { LoanTrackingStore, commonDropdown } = useStore();
  const { translate } = useLocales();
  const {
    createLoanTracking,
    updateLoanTracking,
    editMode,
    selectedLoanTracking,
    clearSelectedLoanTracking,
  } = LoanTrackingStore;
  const {
    loadLoanTypeDDL,
    LoanTypeOption,
    loadPartnersDDL,
    PartnersOption,
    loadCurrencyTypeDDL,
    CurrencyTypeOption,
    loadBranchDDL,
    BranchOption,
    loadUserDropdown,
    UserOption,
  } = commonDropdown;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewLoanTrackingSchema = Yup.object().shape({
    currencyTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    userId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    loanTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    date: Yup.date().required(`${translate('Validation.DariName')}`),
    amount: Yup.number().required(`${translate('Validation.Code')}`),
  });

  const defaultValues = useMemo<IPayTakenLoan>(
    () => ({
      loanTrackingId: selectedLoanTracking?.id || undefined,
      userId: selectedLoanTracking?.userId || '',
      mainAssetId: selectedLoanTracking?.mainAssetId,
      date: selectedLoanTracking?.date || '',
      description: selectedLoanTracking?.description || '',
      amountByMainAssetCurrencyType: 0,
      loanCurrencyToSelectedCurrencyExchangeRate: 0,
      selectedCurrencyToLoanCurrencyExchangeRate: 0,
      amountByLoanTrackingCurrencyType: 0,
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
      loadLoanTypeDDL();
      loadPartnersDDL();
      loadCurrencyTypeDDL();
      loadBranchDDL();
    }
  }, [reset, editMode, defaultValues, loadLoanTypeDDL, loadPartnersDDL, loadCurrencyTypeDDL, loadBranchDDL]);

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
                padding: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField
                name="amountByMainAssetCurrencyType"
                label={translate('LoanTracking.amountByMainAssetCurrencyType')}
                showAsterisk={true}
                autoFocus
                type="number"
              />
              <RHFTextField
                name="loanCurrencyToSelectedCurrencyExchangeRate"
                label={translate('LoanTracking.loanCurrencyToSelectedCurrencyExchangeRate')}
                showAsterisk={true}
                autoFocus
                type="number"
              />
              <RHFTextField
                name="selectedCurrencyToLoanCurrencyExchangeRate"
                label={translate(
                  'LoanTracking.amountByMainAssetCurrencselectedCurrencyToLoanCurrencyExchangeRateyType'
                )}
                showAsterisk={true}
                autoFocus
                type="number"
              />
              <RHFTextField
                name="amountByLoanTrackingCurrencyType"
                label={translate('LoanTracking.amountByLoanTrackingCurrencyType')}
                showAsterisk={true}
                autoFocus
                type="number"
              />
              <RHFTextField
                name="email"
                label={translate('LoanTracking.nameInPashto')}
                showAsterisk={true}
                autoFocus
              />
              <LocalizDatePicker
                name="date"
                label={translate('LoanTracking.date')}
                control={control}
                showAsterisk={true}
              />

              {/* <RHFSelect name="currencyTypeId" label={translate('LoanTracking.currencyType')}>
                <option value="" />
                {CurrencyTypeOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect> */}
              {/* <RHFSelect name="branchId" label={translate('MainAsset.branch')}>
                <option value="" />
                {BranchOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect> */}

              <RHFSelect name="userId" label={translate('MainAsset.User')}>
                <option value="" />
                {UserOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
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
                  navigate(PATH_DASHBOARD.LoanTracking.list);
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
