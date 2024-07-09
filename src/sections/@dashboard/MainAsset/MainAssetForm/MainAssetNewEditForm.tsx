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
import { IMainAsset } from 'src/@types/foamCompanyTypes/systemTypes/MainAsset';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
// ----------------------------------------------------------------------

export default observer(function MainAssetNewEditForm() {
  const { MainAssetStore } = useStore();
  const { translate } = useLocales();
  const { createMainAsset, updateMainAsset, editMode, selectedMainAsset, clearSelectedMainAsset } =
    MainAssetStore;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewMainAssetSchema = Yup.object().shape({
    currencyTypeId: Yup.number().required(`${translate('Validation.PashtoName')}`),
    userId: Yup.number().required(`${translate('Validation.EnglishName')}`),
    parentId: Yup.number().required(`${translate('Validation.EnglishName')}`),
    date: Yup.date().required(`${translate('Validation.DariName')}`),
    balanceAmount: Yup.number().required(`${translate('Validation.Code')}`),
  });

  const defaultValues = useMemo<IMainAsset>(
    () => ({
      id: selectedMainAsset?.id,
      currencyTypeId: selectedMainAsset?.currencyTypeId || undefined,
      userId: selectedMainAsset?.userId || undefined,
      parentId: selectedMainAsset?.parentId || undefined,
      date: selectedMainAsset?.date,
      balanceAmount: selectedMainAsset?.balanceAmount,
    }),
    [selectedMainAsset]
  );

  const methods = useForm<IMainAsset>({
    resolver: yupResolver(NewMainAssetSchema),
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

  const onSubmit = (data: IMainAsset) => {
    if (data.id! === undefined) {
      ///create
      createMainAsset(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.ContractType.list);
      });
    } else {
      ///update
      updateMainAsset(data).then(() => {
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
              <RHFSelect name="currencyTypeId" label={translate('MainAsset.currencyType')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.title}>
                    {op.title}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="userId" label={translate('MainAsset.user')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.title}>
                    {op.title}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="parentId" label={translate('MainAsset.Parent')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.title}>
                    {op.title}
                  </option>
                ))}
              </RHFSelect>

              <LocalizDatePicker
                name="date"
                label={translate('MainAsset.date')}
                control={control}
                showAsterisk={true}
              />

              <RHFTextField
                name="balanceAmount"
                label={translate('MainAsset.balanceAmount')}
                type={'number'}
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
                  clearSelectedMainAsset();
                  navigate(PATH_DASHBOARD.MainAsset.list);
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
