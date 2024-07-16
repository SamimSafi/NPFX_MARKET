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
  const { MainAssetStore, commonDropdown } = useStore();
  const { loadBranchDDL, BranchOption, loadUserDropdown, UserOption } = commonDropdown;
  const { translate } = useLocales();
  const { createMainAsset, updateMainAsset, editMode, selectedMainAsset, clearSelectedMainAsset } =
    MainAssetStore;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewMainAssetSchema = Yup.object().shape({
    currencyTypeId: Yup.number().required(`${translate('Validation.currencyTypeId')}`),
    branchId: Yup.number().required(`${translate('Validation.currencyTypeId')}`),
    ownerUserId: Yup.string().required(`${translate('Validation.ownerUserId')}`),
    depositDate: Yup.date().required(`${translate('Validation.DariName')}`),
    balanceAmount: Yup.number().required(`${translate('Validation.Code')}`),
  });

  const defaultValues = useMemo<IMainAsset>(
    () => ({
      id: selectedMainAsset?.id,
      currencyTypeId: selectedMainAsset?.currencyTypeId || undefined,
      ownerUserId: selectedMainAsset?.ownerUserId || undefined,
      branchId: selectedMainAsset?.branchId || undefined,
      depositDate: selectedMainAsset?.depositDate,
      balanceAmount: selectedMainAsset?.balanceAmount,
    }),
    [selectedMainAsset]
  );

  const methods = useForm<IMainAsset>({
    resolver: yupResolver(NewMainAssetSchema),
    defaultValues,
  });

  const bloodGroup = [
    { title: 'A+', value: 1 },
    { title: 'A-', value: 2 },
    { title: 'B+', value: 3 },
    { title: 'B-', value: 4 },
    { title: 'O+', value: 5 },
  ];

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    control,
    watch,
  } = methods;
  const val = watch();
  const onSubmit = (data: IMainAsset) => {
    if (data.id! === undefined) {
      ///create
      createMainAsset(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.MainAsset.list);
      });
    } else {
      ///update
      updateMainAsset(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.MainAsset.list);
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
              <RHFSelect name="currencyTypeId" label={translate('MainAsset.currencyType')}>
                <option value="" />
                {bloodGroup.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.title}
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
              <RHFSelect name="ownerUserId" label={translate('MainAsset.Owneruser')}>
                <option value="" />
                {UserOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>

              <LocalizDatePicker
                name="depositDate"
                label={translate('MainAsset.depositDate')}
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
