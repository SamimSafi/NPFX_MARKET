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
import { ITradeTracking } from 'src/@types/foamCompanyTypes/systemTypes/TradeTracking';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
import CancelIcon from '@mui/icons-material/Cancel';
// ----------------------------------------------------------------------
interface Props {
  asssetID?: string;
}
export default observer(function TradeTrackingNewEditForm({ asssetID }: Props) {
  const { TradeTrackingStore, commonDropdown, MainAssetStore } = useStore();
  const { translate } = useLocales();
  const { loadMainAssetDDL, MainAssetOption } = commonDropdown;
  const {
    createTradeTracking,
    updateTradeTracking,
    editMode,
    selectedTradeTracking,
    clearSelectedTradeTracking,
  } = TradeTrackingStore;
  // const { loadBranchDDL, BranchOption, loadUserDropdown, UserOption } = commonDropdown;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewTradeTrackingSchema = Yup.object().shape({
    mainAssetId: Yup.string().required(`${translate('Validation.Account')}`),
    // currencyTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    date: Yup.date().required(`${translate('Validation.Date')}`),
    tradeAmount: Yup.number().required(`${translate('Validation.TradeAmount')}`),
  });

  const defaultValues = useMemo<ITradeTracking>(
    () => ({
      id: selectedTradeTracking?.id,
      mainAssetId: selectedTradeTracking?.mainAssetId || asssetID,
      // branchId: selectedTradeTracking?.branchId,
      // userId: selectedTradeTracking?.userId,
      // currencyTypeId: selectedTradeTracking?.currencyTypeId,
      description: selectedTradeTracking?.description || '',
      date: selectedTradeTracking?.date || '',
      tradeAmount: selectedTradeTracking?.tradeAmount,
      profitAmount: selectedTradeTracking?.profitAmount || 0,
      lossAmount: selectedTradeTracking?.lossAmount || 0,
    }),
    [selectedTradeTracking, asssetID]
  );

  const methods = useForm<ITradeTracking>({
    resolver: yupResolver(NewTradeTrackingSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
    control,
    // watch,
  } = methods;
  // const val = watch();
  const onSubmit = (data: ITradeTracking) => {
    if (data.id! === undefined) {
      ///create
      createTradeTracking(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          asssetID !== undefined
            ? (() => {
                MainAssetStore.setOpenCloseDialogCreateTrade();
                MainAssetStore.loadMainAsset({ pageIndex: 0, pageSize: 10 });
              })()
            : navigate(PATH_DASHBOARD.TradeTracking.list);
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          if (json.error.Date != null) {
            setError('afterSubmit', { ...err, message: json.error.Date });
          } else if (json.error.MainAssetId != null) {
            setError('afterSubmit', { ...err, message: json.error.MainAssetId });
          } else if (json.error.TradeAmount != null) {
            setError('afterSubmit', { ...err, message: json.error.TradeAmount });
          } else if (json.error.ProfitAmount != null) {
            setError('afterSubmit', { ...err, message: json.error.ProfitAmount });
          } else if (json.error.LossAmount != null) {
            setError('afterSubmit', { ...err, message: json.error.LossAmount });
          } else {
            setError('afterSubmit', { ...err, message: json.error });
          }
        });
    } else {
      ///update
      updateTradeTracking(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.TradeTracking.list);
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
  // useEffect(() => {
  //   loadBranchDDL();
  // }, [loadBranchDDL]);

  // useEffect(() => {
  //   loadUserDropdown(val.branchId);
  // }, [loadUserDropdown, val.branchId]);

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
                name="tradeAmount"
                label={translate('TradeTracking.TradeAmount')}
                type={'number'}
                InputProps={{
                  endAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                showAsterisk={true}
              />
              <RHFTextField
                name="profitAmount"
                label={translate('TradeTracking.ProfitAmount')}
                type={'number'}
                InputProps={{
                  endAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                showAsterisk={true}
              />
              <RHFTextField
                name="lossAmount"
                label={translate('TradeTracking.LossAmount')}
                type={'number'}
                InputProps={{
                  endAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                showAsterisk={true}
              />
              <RHFTextField
                name="description"
                label={translate('GeneralFields.Description')}
                showAsterisk={true}
              />
            </Box>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                loading={isSubmitting}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                {translate('CRUD.Save')}
              </LoadingButton>
              {asssetID !== undefined ? (
                <LoadingButton
                  fullWidth
                  variant="contained"
                  size="small"
                  onClick={() => MainAssetStore.setOpenCloseDialogCreateTrade()}
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
                    clearSelectedTradeTracking();
                    navigate(PATH_DASHBOARD.TradeTracking.list);
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
