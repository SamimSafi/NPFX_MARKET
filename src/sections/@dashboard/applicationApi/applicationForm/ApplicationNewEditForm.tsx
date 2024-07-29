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
import { PATH_DASHBOARD } from 'src/routes/paths';
// @types
import { Application } from 'src/@types/application';

// components
import Iconify from 'src/components/Iconify';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/stores/store';
import useLocales from 'src/hooks/useLocales';
// ----------------------------------------------------------------------

export default observer(function ApplicationNewEditForm() {
  const { ApplicationStore } = useStore();
  const { translate } = useLocales();
  const {
    createApplication,
    updateApplication,
    editMode,
    selectedApplication,
    clearSelectedApplication,
  } = ApplicationStore;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewApplicationSchema = Yup.object().shape({
    title: Yup.string().required(`${translate('Validation.EnglishName')}`),
    abbrevation: Yup.string().required(`${translate('Validation.DariName')}`),
    iconClass: Yup.string().required(`${translate('Validation.PashtoName')}`),
    defaultRoute: Yup.string().required(`${translate('Validation.DocCode')}`),
    area: Yup.string().required(`${translate('Validation.DocCode')}`),
    description: Yup.string().required(`${translate('Validation.DocCode')}`),
  });

  const defaultValues = useMemo<Application>(
    () => ({
      id: selectedApplication?.id,
      title: selectedApplication?.title || '',
      abbrevation: selectedApplication?.abbrevation || '',
      iconClass: selectedApplication?.iconClass || '',
      defaultRoute: selectedApplication?.defaultRoute || '',
      area: selectedApplication?.area || '',
      description: selectedApplication?.description || '',
    }),
    [selectedApplication]
  );

  const methods = useForm<Application>({
    resolver: yupResolver(NewApplicationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: Application) => {
    if (data.id! === undefined) {
      ///create
      createApplication(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.Application.list);
      });
    } else {
      ///update
      updateApplication(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.Application.list);
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
              <RHFTextField name="title" label={translate('APPlication.Title')} autoFocus />
              <RHFTextField
                name="abbrevation"
                label={translate('APPlication.Abbrevation')}
                disabled
              />
              <RHFTextField name="iconClass" label={translate('APPlication.IconClass')} disabled />
              <RHFTextField
                name="defaultRoute"
                label={translate('APPlication.DefaultRoute')}
                disabled
              />
              <RHFTextField name="area" label={translate('APPlication.Area')} disabled />
              <RHFTextField name="description" label={translate('APPlication.Description')} />
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
                {!editMode
                  ? `${translate('APPlication.NewApp')}`
                  : `${translate('APPlication.UpdateApp')}`}
              </LoadingButton>
              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                onClick={() => {
                  clearSelectedApplication();
                  navigate(PATH_DASHBOARD.Application.list);
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
