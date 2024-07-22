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

export default observer(function TakeLoanTrackingNewEditForm() {
  const { LoanTrackingStore, commonDropdown } = useStore();
  const { translate } = useLocales();
  const {
    TakeLoanCreateAsset,
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
    userId: Yup.string().required(`${translate('Validation.PashtoName')}`),
    loanTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    date: Yup.date().required(`${translate('Validation.DariName')}`),
    loanAmount: Yup.number().required(`${translate('Validation.Code')}`),
  });

  const defaultValues = useMemo<ILoanTracking>(
    () => ({
      id: selectedLoanTracking?.id,
      partnerId: selectedLoanTracking?.partnerId,
      userId: selectedLoanTracking?.userId,
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
                type={'number'}
                showAsterisk={true}
                autoFocus
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

              <RHFSelect name="currencyTypeId" label={translate('LoanTracking.currencyType')}>
                <option value="" />
                {CurrencyTypeOption.map((op) => (
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
