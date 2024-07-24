import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, InputAdornment, Stack } from '@mui/material';

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
// ----------------------------------------------------------------------
interface Props {
  asssetID?: string;
}
export default observer(function TradeTrackingNewEditForm({ asssetID }: Props) {
  const { TradeTrackingStore, commonDropdown } = useStore();
  const { translate } = useLocales();
  const { loadMainAssetDDL, MainAssetOption } = commonDropdown;
  const { createTradeTracking, updateTradeTracking, editMode, selectedTradeTracking } =
    TradeTrackingStore;
  // const { loadBranchDDL, BranchOption, loadUserDropdown, UserOption } = commonDropdown;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewTradeTrackingSchema = Yup.object().shape({
    mainAssetId: Yup.string().required(`${translate('Validation.EnglishName')}`),
    // currencyTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    date: Yup.date().required(`${translate('Validation.DariName')}`),
    tradeAmount: Yup.number().required(`${translate('Validation.tradeAmount')}`),
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
    formState: { isSubmitting },
    control,
    // watch,
  } = methods;
  // const val = watch();
  const onSubmit = (data: ITradeTracking) => {
    if (data.id! === undefined) {
      ///create
      createTradeTracking(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.TradeTracking.list);
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
              <RHFSelect name="mainAssetId" label={translate('MainAsset.mainAsset')}>
                <option value="" />
                {MainAssetOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>

              <LocalizDatePicker
                name="date"
                label={translate('TradeTracking.date')}
                control={control}
                showAsterisk={true}
              />

              <RHFTextField
                name="tradeAmount"
                label={translate('TradeTracking.tradeAmount')}
                type={'number'}
                InputProps={{
                  endAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                showAsterisk={true}
              />
              <RHFTextField
                name="profitAmount"
                label={translate('TradeTracking.profitAmount')}
                type={'number'}
                InputProps={{
                  endAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                showAsterisk={true}
              />
              <RHFTextField
                name="lossAmount"
                label={translate('TradeTracking.lossAmount')}
                type={'number'}
                InputProps={{
                  endAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                showAsterisk={true}
              />
              <RHFTextField
                name="description"
                label={translate('TradeTracking.description')}
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
              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                onClick={() => {
                  navigate(PATH_DASHBOARD.TradeTracking.list);
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
