import * as Yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
// components
import { observer } from 'mobx-react-lite';
import CustomRHFAutocomplete from 'src/components/hook-form/CustomRHFAutocomplete';
import uuid from 'react-uuid';
import Loader from 'src/components/loader/Loader';
import Fieldset from 'src/utils/fieldSet';
import useThrottle from 'src/hooks/useThrottle';
import useLocales from 'src/hooks/useLocales';
import { useStore } from 'src/stores/store';
import { TrainingVideo } from 'src/@types/foamCompanyTypes/systemTypes/trainingVideo';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/Iconify';
//import './upload.css';
// ----------------------------------------------------------------------

export default observer(function TrainingVideoNewEditForm() {
  const { translate } = useLocales();

  const { commonDropdown } = useStore();
  const [application, setApplication] = useState<string | undefined>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isloading, setIsloading] = useState(false);
  const { TrainingVideoStore } = useStore();

  const {
    createTrainingVideo,
    updateTrainingVideo,
    selectedTrainingVideo,
    editMode,
    clearSelectedTrainingVideo,
  } = TrainingVideoStore;

  const { loadApplicationDropdown, ApplicationOption } = commonDropdown;

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewRoleSchema = Yup.object().noUnknown().shape({
    // title: Yup.string().required(`${translate('Validation.TitleIsRequired')}`),
    // application: Yup.string().required(`${translate('Validation.Description')}`),
  });

  const defaultValues = useMemo<TrainingVideo>(
    () => ({
      id: selectedTrainingVideo?.id,
      dariTitle: selectedTrainingVideo?.dariTitle || '',
      pashtoTitle: selectedTrainingVideo?.pashtoTitle || '',
      application: selectedTrainingVideo?.application || '',
      poster: selectedTrainingVideo?.poster,
      dariVideoPath: selectedTrainingVideo?.dariVideoPath,
      pashtoVideoPath: selectedTrainingVideo?.pashtoVideoPath,
    }),
    [selectedTrainingVideo]
  );

  const methods = useForm<TrainingVideo>({
    resolver: yupResolver(NewRoleSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;
  const val = watch();

  // const depId = selectedTrainingVideo?.departmentIds.map((m) => m);

  // useEffect(() => {
  //   loadDepartmentDropdown()
  //     .then((res) => {
  //       setDepartmentsOption(DepartmentOption.map((i) => i.text));
  //     })
  //     .finally(() => {
  //       setDepartmentsOption(DepartmentOption.map((i) => i.text));
  //     });
  // }, []);

  useEffect(() => {
    if (editMode) {
      reset(defaultValues);
    }
    if (!editMode) {
      reset(defaultValues);
    }
  }, [reset, editMode, defaultValues]);

  useEffect(() => {
    if (editMode) {
      if (defaultValues.id) {
        loadApplicationDropdown().then((res) => {
          setApplication(ApplicationOption.find((e) => e.value === defaultValues.id)?.text);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [application]);

  useEffect(() => {
    loadApplicationDropdown().then((res) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = useThrottle((data: TrainingVideo) => {
    if (selectedTrainingVideo?.id === undefined) {
      ///create
      createTrainingVideo(val)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          navigate(PATH_DASHBOARD.TrainingVideo.list);
          clearSelectedTrainingVideo();
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      //   ///update
      updateTrainingVideo(val)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
          navigate(PATH_DASHBOARD.TrainingVideo.list);
          clearSelectedTrainingVideo();
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  });

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {isloading ? (
          <Loader />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    mb: 3,
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                  }}
                >
                  <RHFTextField
                    name="dariTitle"
                    label={translate('TrainingVideo.DariTitle')}
                    //showAsterisk={true}
                    type="text"
                    autoFocus
                  />
                  <RHFTextField
                    name="pashtoTitle"
                    label={translate('TrainingVideo.PashtoTitle')}
                    //showAsterisk={true}
                    type="text"
                  />
                  {/* <RHFTextField
                    name="application"
                    label={translate('TrainingVideo.Application')}
                    //showAsterisk={true}
                    type="text"
                  /> */}
                  <CustomRHFAutocomplete
                    name="application"
                    label={translate('TrainingVideo.Application')}
                    //placeholder={translate('Employee.Department')}
                    value={watch('application') || ''}
                    options={ApplicationOption.map((i) => i.text)}
                    getOptionLabel={(option: any) => `${option}`}
                    onChange={(event, newValue: any) => {
                      const find = ApplicationOption.filter((item) => item.text === newValue)[0];

                      if (find) {
                        const id = find?.value;
                        setValue('id', Number(id));
                        setValue(`application`, find?.text);
                        console.log(find);
                      } else {
                        setValue('id', undefined);
                        setValue(`application`, '');
                      }
                    }}
                    freeSolo
                    fullWidth
                    // eslint-disable-next-line arrow-body-style
                    renderOption={(props, option: any) => {
                      return (
                        <li {...props} key={option + '-' + uuid()}>
                          {option}
                        </li>
                      );
                    }}
                  />
                </Box>
                <Fieldset legend={translate('TrainingVideo.AddAttachments')}>
                  <Box
                    sx={{
                      mt: 1,
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                      alignItems: 'center', // Align items vertically in the center
                      // justifyContent: 'start', // Align items to the start of the row
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h6" sx={{ color: 'text.disabled' }}>
                        {translate('TrainingVideo.AddDariVideo')}:
                      </Typography>
                    </Box>
                    <input
                      id="uploadFile"
                      type="file"
                      name="dariVideoPath"
                      accept=".mp4"
                      onChange={(e) => {
                        const file = e.target.files![0];
                        const allowedExtensions = /(\.mp4)$/i;

                        if (allowedExtensions.test(file.name)) {
                          setValue('dariVideoPath', file);
                        } else {
                          // Display an error message or handle the invalid file.
                          console.log('Invalid file format. Only MP4 files are allowed.');
                        }
                      }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h6" sx={{ color: 'text.disabled' }}>
                        {translate('TrainingVideo.AddPashtoVideo')}:
                      </Typography>
                    </Box>
                    <input
                      id="uploadFile"
                      type="file"
                      name="pashtoVideoPath"
                      accept=".mp4"
                      onChange={(e) => {
                        const file = e.target.files![0];
                        const allowedExtensions = /(\.mp4)$/i;

                        if (allowedExtensions.test(file.name)) {
                          setValue('pashtoVideoPath', file);
                        } else {
                          // Display an error message or handle the invalid file.
                          console.log('Invalid file format. Only MP4 files are allowed.');
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h6" sx={{ color: 'text.disabled' }}>
                        {translate('TrainingVideo.AddPoster')}:
                      </Typography>
                    </Box>
                    <input
                      id="uploadFile"
                      type="file"
                      name="poster"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) => {
                        const file = e.target.files![0];

                        if (file && /^image\/(png|jpeg|jpg)$/.test(file.type)) {
                          setValue('poster', file);
                        } else {
                          // Display an error message or handle the invalid file.
                          console.log('Invalid file format. Please select an image file.');
                        }
                      }}
                    />
                  </Box>
                </Fieldset>
                <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                  <LoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    startIcon={
                      !editMode ? (
                        <Iconify icon="eva:plus-fill" />
                      ) : (
                        <Iconify icon="eva:edit-fill" />
                      )
                    }
                  >
                    {!editMode ? `${translate('CRUD.Create')}` : `${translate('CRUD.Update')}`}
                  </LoadingButton>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                    onClick={() => {
                      clearSelectedTrainingVideo();
                      navigate(PATH_DASHBOARD.TrainingVideo.list);
                    }}
                  >
                    {translate('CRUD.BackToList')}
                  </Button>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        )}
      </FormProvider>
    </>
  );
});
