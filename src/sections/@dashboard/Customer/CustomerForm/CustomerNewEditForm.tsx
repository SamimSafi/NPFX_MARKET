import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
  Alert,
} from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import {
  FormProvider,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { IEmployee } from 'src/@types/foamCompanyTypes/Employee';
import Label from 'src/components/Label';
import { fData } from 'src/utils/formatNumber';

import { MuiPhone } from 'src/sections/@dashboard/MuiPhone';
import CustomFlag from '../../CustomFlags/CustomFlag';
import Fieldset from 'src/utils/fieldSet';

import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';


import { ICustomer } from 'src/@types/foamCompanyTypes/customer';

// ----------------------------------------------------------------------

export default observer(function CustomerNewEditForm() {
  const language = window.localStorage.getItem('i18nextLng');
  const { customerStore, commonDropdown } = useStore();
  const { translate } = useLocales();
  const [isImageUpdate, setIsImageUpdated] = useState(false);
  const [muiPhone, setMuiPhone] = useState('+93');

  const cropperRef = useRef<ReactCropperElement>(null);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [croppedImage, setCroppedImage] = useState<string>('');


  const { createCustomer, updateCustomer, editMode, selectedCustomer, clearSelectedCustomer } =
    customerStore;
  const { loadProvinceDropdown } =
    commonDropdown;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  // const phoneRegExp =
  //   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  const NewEmployeeSchema = Yup.object().shape({
    registrationNumber: Yup.string().required(`${translate('Validation.RegistrationNumber')}`),
    englishFirstName: Yup.string().required(`${translate('Validation.EnglishName')}`),
    pashtoFirstName: Yup.string().required(`${translate('Validation.PashtoName')}`),
    englishSurName: Yup.string().required(`${translate('Validation.EnglishSurName')}`),
    pashtoSurName: Yup.string().required(`${translate('Validation.PashtoSurName')}`),
    englishFatherName: Yup.string().required(
      `${translate('Validation.FatherEnglishNameIsRequired')}`
    ),
    pashtoFatherName: Yup.string().required(`${translate('Validation.FatherDariNameIsRequired')}`),
    englishGrandFatherName: Yup.string().required(`${translate('Validation.GrandFatherEnglish')}`),
    pashtoGrandFatherName: Yup.string().required(`${translate('Validation.GrandFatherPashto')}`),
    tazkiraNo: Yup.string().required(`${translate('Validation.CNIC')}`),
    dateOfBirth: Yup.date().required(`${translate('Validation.DateOfBirth')}`),
    temporaryAddress: Yup.string().required(`${translate('Validation.TemporaryAddress')}`),
    permenantAddress: Yup.string().required(`${translate('Validation.PermanentAddress')}`),
    attendanceId: Yup.number().required(`${translate('Validation.AttendanceId')}`),
    provinceName: Yup.string().required(`${translate('Validation.Province')}`),
    districtName: Yup.string().required(`${translate('Validation.District')}`),
    healthStatusName: Yup.string().required(`${translate('Validation.EmployeeHealthStatus')}`),
    departmentName: !editMode
      ? Yup.string().required(`${translate('Validation.Directorate')}`)
      : Yup.string(),
    genderId: Yup.string().required(`${translate('Validation.Gender')}`),
    // bloodGroup: Yup.string().required(`${translate('Validation.BloodGroup')}`),
    joinDate: Yup.date().required(`${translate('Validation.JoinDate')}`),
    // personalEmail: Yup.string()
    //   .email()
    //   .required(`${translate('Validation.PersonalEmail')}`),
    // officialEmail: Yup.string()
    //   .email()
    //   .required(`${translate('Validation.OfficialEmail')}`),
    // phoneNumber: Yup.string()
    //   .matches(phoneRegExp, `${translate('User.NumberFormat')}`)
    //   .matches(/^\+937[0-9]{8}$/, `${translate('User.NumberFormat')}`)
    //   .length(12, 'Phone Number must be 12 digit')
    //   .required('Phone Number is required'),
    // emergencyPhoneNumber: Yup.string()
    //   .matches(phoneRegExp, `${translate('User.NumberFormat')}`)
    //   // .matches(/^\+937[0-9]{8}$/, `${translate('User.NumberFormat')}`)
    //   // .length(12, 'Phone Number must be 12 digit')
    //   .required('Phone Number is required'),
    // rfidNumber: Yup.string().required(`${translate('Validation.RFID')}`),
    isCurrent: !editMode
      ? Yup.boolean().required(`${translate('Validation.isCurrent')}`)
      : Yup.string(),
    // profilePhoto: !editMode
    //   ? Yup.string()
    //       .nullable()
    //       .required(`${translate('Validation.ProfilePhoto')}`)
    //   : Yup.string(),
  });

  const defaultValues = useMemo<ICustomer>(
    () => ({
      id: selectedCustomer?.id,
      englishFirstName: selectedCustomer?.englishFirstName || '',
      pashtoFirstName: selectedCustomer?.pashtoFirstName || '',
      englishSurName: selectedCustomer?.englishSurName || '',
      pashtoSurName: selectedCustomer?.pashtoSurName || '',
      englishFatherName: selectedCustomer?.englishFatherName || '',
      pashtoFatherName: selectedCustomer?.pashtoFatherName || '',
      englishGrandFatherName: selectedCustomer?.englishGrandFatherName || '',
      pashtoGrandFatherName: selectedCustomer?.pashtoGrandFatherName || '',
      profilePhoto: selectedCustomer?.profilePhoto || null,
      email: selectedCustomer?.email || '',
      phone: selectedCustomer?.phone || '',
      location: selectedCustomer?.location || '',
    }),
    [selectedCustomer]
  );

  const methods = useForm<IEmployee>({
    resolver: yupResolver(NewEmployeeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: IEmployee) => {
    data.phoneNumber = muiPhone.replace(/\s+/g, '');
    if (data.id! === undefined) {
      ///create
      data.profilePhoto = methods.getValues().profilePhoto;
     await createCustomer(data)
        .then(() => {
          clearSelectedCustomer();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          navigate(PATH_DASHBOARD.Employee.list);
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          if (json.error.PersonalEmail != null) {
            setError('afterSubmit', { ...err, message: json.error.PersonalEmail });
          } else if (json.error.OfficialEmail != null) {
            setError('afterSubmit', { ...err, message: json.error.OfficialEmail });
          } else if (json.error.PhoneNumber != null) {
            setError('afterSubmit', { ...err, message: json.error.PhoneNumber });
          } else if (json.error.EmergencyPhoneNumber != null) {
            setError('afterSubmit', { ...err, message: json.error.EmergencyPhoneNumber });
          } else if (json.error.LeaveDate != null) {
            setError('afterSubmit', { ...err, message: json.error.LeaveDate });
          } else if (json.error.AttendanceId != null) {
            setError('afterSubmit', { ...err, message: json.error.AttendanceId });
          } else if (json.error.TazkiraTypeId != null) {
            setError('afterSubmit', { ...err, message: json.error.TazkiraTypeId });
          } else {
            setError('afterSubmit', { ...err, message: json.error });
          }
          console.log(err);
        });
    } else {
      ///update

      if (!isImageUpdate) {
        data.profilePhoto = null;
      } else {
        data.profilePhoto = methods.getValues().profilePhoto;
      }
    await  updateCustomer(data)
        .then(() => {
          clearSelectedCustomer();
          enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
          navigate(PATH_DASHBOARD.Employee.list);
        })
        .catch((err) => {
          console.log(err);
          var json = JSON.parse(err.request.response);
          if (json.error.PersonalEmail != null) {
            setError('afterSubmit', { ...err, message: json.error.PersonalEmail });
          } else if (json.error.OfficialEmail != null) {
            setError('afterSubmit', { ...err, message: json.error.OfficialEmail });
          } else if (json.error.PhoneNumber != null) {
            setError('afterSubmit', { ...err, message: json.error.PhoneNumber });
          } else if (json.error.EmergencyPhoneNumber != null) {
            setError('afterSubmit', { ...err, message: json.error.EmergencyPhoneNumber });
          } else if (json.error.LeaveDate != null) {
            setError('afterSubmit', { ...err, message: json.error.LeaveDate });
          } else if (json.error.AttendanceId != null) {
            setError('afterSubmit', { ...err, message: json.error.AttendanceId });
          } else if (json.error.TazkiraTypeId != null) {
            setError('afterSubmit', { ...err, message: json.error.TazkiraTypeId });
          } else {
            setError('afterSubmit', { ...err, message: json.error });
          }
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (editMode) {
      reset(defaultValues);
      setMuiPhone(defaultValues.phone!);
    }
    if (!editMode) {
      loadProvinceDropdown();

      reset(defaultValues);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, editMode, defaultValues]);

  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      console.log(file);

      setImageSrc(URL.createObjectURL(file));
      //setValue('profilePhoto',URL.createObjectURL(file))
      setCroppedImage('');
    }
  }, []);

  const handleCropImage = useCallback(() => {
    if (cropperRef.current) {
      if (editMode) {
        setIsImageUpdated(true);
      }
      const canvas = cropperRef.current?.cropper;
      if (canvas) {
        // Convert the canvas to a Blob object
        canvas.getCroppedCanvas().toBlob((blob: any) => {
          if (blob) {
            // Create a new File object with the Blob and set it as the value for 'profilePhoto'
            const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });

            setValue(
              'profilePhoto',
              Object.assign(croppedFile, {
                preview: URL.createObjectURL(croppedFile),
              })
            );

            setImageSrc('');
          }
        }, 'image/jpeg');
        // Convert the canvas to a data URL and set it as the cropped image
        const croppedDataURL = canvas.getCroppedCanvas().toDataURL();
        setCroppedImage(croppedDataURL);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert sx={{ mb: 2 }} severity="error">
          {errors.afterSubmit.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 13, px: 3, borderRadius: '15px 15px 15px 15px' }}>
            <Fieldset legend={translate('Employee.ProfilePhoto')}>
              {editMode && (
                <Label
                  //color={values !== 'active' ? 'error' : 'success'}
                  sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                 />
              )}
              <Box sx={{ mb: 3 }}>
                <RHFUploadAvatar
                  name="profilePhoto"
                  accept="image/*"
                  onDrop={handleDrop}
                  maxSize={3145728}
                  showAsterisk={true}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary',
                      }}
                    >
                      {translate('User.Allowed')}
                      <br /> {translate('User.MaxSize')} {fData(3145728)}
                    </Typography>
                  }
                />
                {imageSrc && (
                  <Box>
                    <Cropper
                      src={imageSrc}
                      style={{ width: '100%', height: '100%' }}
                      aspectRatio={16 / 16}
                      guides={true}
                      ref={cropperRef}
                    />
                    {croppedImage ? (
                      <Box>
                        <img src={croppedImage} alt="Cropped" />
                        <button onClick={() => handleCropImage()}>Cancel Crop</button>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => handleCropImage()}
                      >
                        {translate('Employee.CropImage')}
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            </Fieldset>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: '15px 15px 15px 15px' }}>
            <Fieldset legend={translate('Customer.Bio')}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  // display: 'flex',
                }}
              >
                <RHFTextField
                  name="englishFirstName"
                  label={translate('Employee.EnglishName')}
                  showAsterisk={true}
                  autoFocus
                />
                <RHFTextField
                  name="pashtoFirstName"
                  label={translate('Employee.PashtoName')}
                  showAsterisk={true}
                  autoFocus
                />
                <RHFTextField
                  name="englishSurName"
                  label={translate('Employee.englishSurName')}
                  showAsterisk={true}
                  autoFocus
                />
                <RHFTextField
                  name="pashtoSurName"
                  label={translate('Employee.pashtoSurName')}
                  showAsterisk={true}
                  autoFocus
                />
                <RHFTextField
                  name="englishFatherName"
                  label={translate('Employee.FatherEnglishName')}
                  showAsterisk={true}
                  autoFocus
                />
                <RHFTextField
                  name="pashtoFatherName"
                  label={translate('Employee.FatherDariName')}
                  showAsterisk={true}
                  autoFocus
                />
                <RHFTextField
                  name="englishGrandFatherName"
                  label={translate('Employee.englishGrandFatherName')}
                  showAsterisk={true}
                />
                <RHFTextField
                  name="pashtoGrandFatherName"
                  label={translate('Employee.pashtoGrandFatherName')}
                  showAsterisk={true}
                />
              </Box>
            </Fieldset>

            <Fieldset legend={translate('Employee.EmployeeGeneralInfo')}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                }}
              >
                <RHFTextField
                  name="email"
                  label={translate('Employee.Email')}
                  showAsterisk={true}
                />

                <MuiPhone
                  value={muiPhone}
                  dir={language === 'en' ? 'ltr' : 'ltr'}
                  onChange={(Phone) => setMuiPhone(Phone)}
                  name="phone"
                  customFlag={CustomFlag}
                />
                <RHFTextField
                  name="location"
                  label={translate('Supplier.location')}
                  showAsterisk={true}
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
                    clearSelectedCustomer();
                    navigate(PATH_DASHBOARD.Employee.list);
                  }}
                >
                  {translate('CRUD.BackToList')}
                </Button>
              </Stack>
            </Fieldset>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
});
