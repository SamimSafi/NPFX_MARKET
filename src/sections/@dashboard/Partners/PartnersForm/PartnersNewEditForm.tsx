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
import { IPartners } from 'src/@types/foamCompanyTypes/systemTypes/Partners';
// ----------------------------------------------------------------------

export default observer(function PartnersNewEditForm() {
  const { PartnersStore } = useStore();
  const { translate } = useLocales();
  const { createPartners, updatePartners, editMode, selectedPartners, clearSelectedPartners } =
    PartnersStore;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewPartnersSchema = Yup.object().shape({
    nameInEnglish: Yup.string().required(`${translate('Validation.EnglishName')}`),
    nameInPashto: Yup.string().required(`${translate('Validation.DariName')}`),
    phone: Yup.string().required(`${translate('Validation.phone')}`),
  });

  const defaultValues = useMemo<IPartners>(
    () => ({
      id: selectedPartners?.id,
      nameInEnglish: selectedPartners?.nameInEnglish || '',
      nameInPashto: selectedPartners?.nameInPashto || '',
      phone: selectedPartners?.phone || '',
      email: selectedPartners?.email || '',
    }),
    [selectedPartners]
  );

  const methods = useForm<IPartners>({
    resolver: yupResolver(NewPartnersSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: IPartners) => {
    if (data.id! === undefined) {
      ///create
      createPartners(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.Partners.list);
      });
    } else {
      ///update
      updatePartners(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.Partners.list);
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
                name="nameInEnglish"
                label={translate('GeneralFields.EnglishName')}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="nameInPashto"
                label={translate('GeneralFields.PashtoName')}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="phone"
                label={translate('Employee.PhoneNumber')}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="email"
                label={translate('Employee.Email')}
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
                  clearSelectedPartners();
                  navigate(PATH_DASHBOARD.Partners.list);
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
