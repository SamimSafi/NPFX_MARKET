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
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { IAssetType } from 'src/@types/foamCompanyTypes/looks/AssetType';
// ----------------------------------------------------------------------

export default observer(function AssetTypeNewEditForm() {
  const { AssetTypeStore } = useStore();
  const { translate } = useLocales();
  const { createAssetType, updateAssetType, editMode, selectedAssetType, clearSelectedAssetType } =
    AssetTypeStore;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewAssetTypeSchema = Yup.object().shape({
    englishName: Yup.string().required(`${translate('Validation.EnglishName')}`),
    dariName: Yup.string().required(`${translate('Validation.PashtoName')}`),
    pashtoName: Yup.string().required(`${translate('Validation.DariName')}`),
    code: Yup.string().required(`${translate('Validation.Code')}`),
  });

  const defaultValues = useMemo<IAssetType>(
    () => ({
      id: selectedAssetType?.id,
      englishName: selectedAssetType?.englishName || '',
      dariName: selectedAssetType?.dariName || '',
      pashtoName: selectedAssetType?.pashtoName || '',
      code: selectedAssetType?.code || '',
    }),
    [selectedAssetType]
  );

  const methods = useForm<IAssetType>({
    resolver: yupResolver(NewAssetTypeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: IAssetType) => {
    if (data.id! === undefined) {
      ///create
      createAssetType(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.AssetType.list);
      });
    } else {
      ///update
      updateAssetType(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.AssetType.list);
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
              <RHFTextField
                name="englishName"
                label={translate('GeneralFields.EnglishName')}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="pashtoName"
                label={translate('GeneralFields.PashtoName')}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="dariName"
                label={translate('GeneralFields.DariName')}
                showAsterisk={true}
                autoFocus
              />

              <RHFTextField
                name="code"
                label={translate('GeneralFields.Code')}
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
                  clearSelectedAssetType();
                  navigate(PATH_DASHBOARD.AssetType.list);
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
