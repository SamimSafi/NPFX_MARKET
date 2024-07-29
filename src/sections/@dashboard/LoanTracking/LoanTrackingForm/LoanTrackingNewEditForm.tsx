import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Card, FormControlLabel, Grid, Stack, Switch } from '@mui/material';

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

interface Props {
  asssetID: string;
}
export default observer(function LoanTrackingNewEditForm({ asssetID }: Props) {
  const { LoanTrackingStore, commonDropdown, MainAssetStore } = useStore();
  const { translate } = useLocales();
  const { createLoanTracking, updateLoanTracking, editMode, selectedLoanTracking } =
    LoanTrackingStore;
  const {
    loadLoanTypeDDL,
    LoanTypeOption,
    loadPartnersDDL,
    PartnersOption,
    loadMainAssetDDL,
    MainAssetOption,
  } = commonDropdown;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewLoanTrackingSchema = Yup.object().shape({
    mainAssetId: Yup.string().required(`${translate('Validation.Account')}`),
    // currencyTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    // userId: Yup.string().required(`${translate('Validation.PashtoName')}`),
    loanTypeId: Yup.number().required(`${translate('Validation.LoanType')}`),
    date: Yup.date().required(`${translate('Validation.Date')}`),
    loanAmount: Yup.number().required(`${translate('Validation.LoanAmount')}`),
  });

  const defaultValues = useMemo<ILoanTracking>(
    () => ({
      id: selectedLoanTracking?.id,
      mainAssetId: selectedLoanTracking?.mainAssetId || asssetID,
      partnerId: selectedLoanTracking?.partnerId,
      userId: selectedLoanTracking?.userId,
      currencyTypeId: 1,
      loanTypeId: selectedLoanTracking?.loanTypeId,
      description: selectedLoanTracking?.description || '',
      nameInEnglish: selectedLoanTracking?.nameInEnglish || '',
      nameInPashto: selectedLoanTracking?.nameInPashto || '',
      phone: selectedLoanTracking?.phone || '',
      email: selectedLoanTracking?.email || '',
      date: selectedLoanTracking?.date || '',
      dueDate: selectedLoanTracking?.dueDate || '',
      isGiven: selectedLoanTracking?.isGiven || true,
      loanAmount: selectedLoanTracking?.loanAmount,
    }),
    [selectedLoanTracking, asssetID]
  );

  const methods = useForm<ILoanTracking>({
    resolver: yupResolver(NewLoanTrackingSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting, errors },
    control,
  } = methods;

  const val = watch();
  const onSubmit = (data: ILoanTracking) => {
    if (data.id! === undefined) {
      ///create
      createLoanTracking(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          // navigate(PATH_DASHBOARD.ContractType.list);
          MainAssetStore.setOpenCloseDialogCreateLoan();
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          if (json.error.NameInEnglish != null) {
            setError('afterSubmit', { ...err, message: json.error.NameInEnglish });
          } else if (json.error.NameInPashto != null) {
            setError('afterSubmit', { ...err, message: json.error.NameInPashto });
          } else if (json.error.Phone != null) {
            setError('afterSubmit', { ...err, message: json.error.Phone });
          } else if (json.error.Email != null) {
            setError('afterSubmit', { ...err, message: json.error.Email });
          } else if (json.error.LoanTypeId != null) {
            setError('afterSubmit', { ...err, message: json.error.LoanTypeId });
          } else if (json.error.MainAssetId != null) {
            setError('afterSubmit', { ...err, message: json.error.MainAssetId });
          } else if (json.error.LoanAmount != null) {
            setError('afterSubmit', { ...err, message: json.error.LoanAmount });
          } else if (json.error.Date != null) {
            setError('afterSubmit', { ...err, message: json.error.Date });
          } else if (json.error.DueDate != null) {
            setError('afterSubmit', { ...err, message: json.error.DueDate });
          } else {
            setError('afterSubmit', { ...err, message: json.error });
          }
        });
    } else {
      ///update
      updateLoanTracking(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
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
      loadMainAssetDDL();
    }
  }, [reset, editMode, defaultValues, loadLoanTypeDDL, loadPartnersDDL, loadMainAssetDDL]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert sx={{ mb: 2 }} severity="error">
          {errors.afterSubmit.message}
        </Alert>
      )}
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
              <RHFSelect name="mainAssetId" label={translate('MainAsset.MainAsset')}>
                <option value="" />
                {MainAssetOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="partnerId" label={translate('Partner.Partner')}>
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
                    label={translate('GeneralFields.NameInEnglish')}
                    showAsterisk={true}
                    autoFocus
                  />
                  <RHFTextField
                    name="nameInPashto"
                    label={translate('GeneralFields.NameInPashto')}
                    showAsterisk={true}
                    autoFocus
                  />
                  <RHFTextField
                    name="phone"
                    label={translate('Partner.PartnerPhone')}
                    showAsterisk={true}
                    autoFocus
                  />
                  <RHFTextField
                    name="email"
                    label={translate('User.email')}
                    showAsterisk={true}
                    autoFocus
                  />
                </>
              )}
              <RHFSelect name="loanTypeId" label={translate('LoanType.LoanType')}>
                <option value="" />
                {LoanTypeOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField
                name="loanAmount"
                label={translate('LoanTracking.LoanAmount')}
                showAsterisk={true}
                autoFocus
                type="number"
              />

              <LocalizDatePicker
                name="date"
                label={translate('GeneralFields.Date')}
                control={control}
                showAsterisk={true}
              />
              <LocalizDatePicker
                name="dueDate"
                label={translate('GeneralFields.DueDate')}
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
            <Box
              sx={{
                display: 'flex',
                direction: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <Controller
                  name="isGiven"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label>{translate('LoanTracking.GiveLoan')}</label>
                      <Switch
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // Notify React Hook Form of the value change
                          // handleChange(e); // Handle the switch state change
                        }}
                        checked={field.value}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      <label>{translate('LoanTracking.TakeLoan')}</label>
                    </>
                  )}
                />
              </Stack>
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
                  size="small"
                  onClick={() => MainAssetStore.setOpenCloseDialogCreateLoan()}
                  color="secondary"
                  startIcon={<CancelIcon />}
                >
                  {translate('CRUD.Cancle')}
                </LoadingButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
});
