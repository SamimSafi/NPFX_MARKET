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
import { IWithdrawalTracking } from 'src/@types/foamCompanyTypes/systemTypes/WithdrawalTracking';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
import CancelIcon from '@mui/icons-material/Cancel';
// ----------------------------------------------------------------------
interface Props {
  asssetID?: string;
}
export default observer(function WithdrawalTrackingNewEditForm({ asssetID }: Props) {
  const { WithdrawalTrackingStore, commonDropdown, MainAssetStore } = useStore();
  const { translate } = useLocales();
  const { MainAssetOption, loadMainAssetDDL } = commonDropdown;
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
    mainAssetId: Yup.string().required(`${translate('Validation.Account')}`),
    date: Yup.date().required(`${translate('Validation.Date')}`),
    withdrawalAmount: Yup.number().required(`${translate('Validation.WithdrawalAmount')}`),
  });

  const defaultValues = useMemo<IWithdrawalTracking>(
    () => ({
      id: selectedWithdrawalTracking?.id,
      mainAssetId: selectedWithdrawalTracking?.mainAssetId || asssetID,
      description: selectedWithdrawalTracking?.description || '',
      date: selectedWithdrawalTracking?.date || new Date().toLocaleDateString(),
      withdrawalAmount: selectedWithdrawalTracking?.amount,
    }),
    [selectedWithdrawalTracking, asssetID]
  );

  const methods = useForm<IWithdrawalTracking>({
    resolver: yupResolver(NewWithdrawalTrackingSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
    control,
  } = methods;
  const { setOpenCloseDialogWithdrawCash } = MainAssetStore;
  const onSubmit = (data: IWithdrawalTracking) => {
    if (data.id! === undefined) {
      ///create
      createWithdrawalTracking(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          navigate(PATH_DASHBOARD.WithdrawalTracking.list);
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          if (json.error.Date != null) {
            setError('afterSubmit', { ...err, message: json.error.Date });
          } else if (json.error.MainAssetId != null) {
            setError('afterSubmit', { ...err, message: json.error.MainAssetId });
          } else if (json.error.WithdrawalAmount != null) {
            setError('afterSubmit', { ...err, message: json.error.WithdrawalAmount });
          } else {
            setError('afterSubmit', { ...err, message: json.error });
          }
        });
    } else {
      ///update
      updateWithdrawalTracking(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.WithdrawalTracking.list);
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
    loadMainAssetDDL();
  }, [reset, editMode, defaultValues, loadMainAssetDDL]);

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
              <RHFSelect name="mainAssetId" label={translate('MainAsset.MainAsset')}>
                <option value="" />
                {MainAssetOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <LocalizDatePicker
                name="date"
                label={translate('GeneralFields.Date')}
                control={control}
                showAsterisk={true}
              />

              <RHFTextField
                name="withdrawalAmount"
                label={translate('WithdrawalTracking.WithdrawalAmount')}
                type={'number'}
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

              {asssetID !== undefined ? (
                <LoadingButton
                  fullWidth
                  variant="contained"
                  size="small"
                  onClick={() => setOpenCloseDialogWithdrawCash()}
                  color="secondary"
                  startIcon={<CancelIcon />}
                >
                  {translate('CRUD.Cancle')}
                </LoadingButton>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                  onClick={() => {
                    clearSelectedWithdrawalTracking();
                    navigate(PATH_DASHBOARD.WithdrawalTracking.list);
                  }}
                >
                  {translate('CRUD.BackToList')}
                </Button>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
});
