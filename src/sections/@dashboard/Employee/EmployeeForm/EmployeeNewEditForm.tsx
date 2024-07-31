import * as Yup from 'yup';
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
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
  FormControlLabel,
  Switch,
} from '@mui/material';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { fData } from 'src/utils/formatNumber';
import { MuiPhone } from 'src/sections/@dashboard/MuiPhone';
import CustomFlag from '../../CustomFlags/CustomFlag';
import Fieldset from 'src/utils/fieldSet';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import CustomRHFAutocomplete from 'src/components/hook-form/CustomRHFAutocomplete';
import uuid from 'react-uuid';
import { IEmployee } from 'src/@types/foamCompanyTypes/Employee';

// ----------------------------------------------------------------------

export default observer(function EmployeeNewEditForm() {
  const language = window.localStorage.getItem('i18nextLng');
  const { EmployeeStore, commonDropdown } = useStore();
  const [checked, setChecked] = useState(false);
  const { translate } = useLocales();
  const [isTrue, setIsTrue] = useState<boolean>(true);
  const [isImageUpdate, setIsImageUpdated] = useState(false);
  const [muiPhone, setMuiPhone] = useState('+93');
  const [muiEmergencyPhone, setMuiEmergencyPhone] = useState('+93');
  const cropperRef = useRef<ReactCropperElement>(null);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [croppedImage, setCroppedImage] = useState<string>('');

  const { createEmployee, updateEmployee, editMode, clearSelectedEmployee, employeeForEdit } =
    EmployeeStore;
  const { loadBranchDDL, BranchOption } = commonDropdown;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewEmployeeSchema = Yup.object().shape({
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
    personalEmail: Yup.string().required(`${translate('Validation.personalEmail')}`),
    gender: Yup.string().required(`${translate('Validation.Gender')}`),
    joinDate: Yup.date().required(`${translate('Validation.JoinDate')}`),
  });

  const defaultValues = useMemo<IEmployee>(
    () => ({
      id: employeeForEdit?.id,
      englishFirstName: employeeForEdit?.englishFirstName || '',
      pashtoFirstName: employeeForEdit?.pashtoFirstName || '',
      englishSurName: employeeForEdit?.englishSurName || '',
      pashtoSurName: employeeForEdit?.pashtoSurName || '',
      englishFatherName: employeeForEdit?.englishFatherName || '',
      pashtoFatherName: employeeForEdit?.pashtoFatherName || '',
      englishGrandFatherName: employeeForEdit?.englishGrandFatherName || '',
      pashtoGrandFatherName: employeeForEdit?.pashtoGrandFatherName || '',
      gender: employeeForEdit?.gender || '',
      tazkiraTypeId: employeeForEdit?.tazkiraTypeId || 1,
      tazkiraNo: employeeForEdit?.tazkiraNo || '',
      joldNo: employeeForEdit?.joldNo || '',
      pageNo: employeeForEdit?.pageNo || '',
      regNo: employeeForEdit?.regNo || '',
      dateOfBirth: employeeForEdit?.dateOfBirth || new Date(),
      temporaryAddress: employeeForEdit?.temporaryAddress || '',
      permenantAddress: employeeForEdit?.permenantAddress || '',
      BranchId: employeeForEdit?.joinDate || undefined,
      bloodGroup: employeeForEdit?.bloodGroup || '',
      joinDate: employeeForEdit?.joinDate || new Date(),
      leaveDate: employeeForEdit?.leaveDate || '',
      leaveRemark: employeeForEdit?.leaveRemark || '',
      personalEmail: employeeForEdit?.personalEmail || '',
      phoneNumber: employeeForEdit?.phoneNumber || '',
      emergencyPhoneNumber: employeeForEdit?.emergencyPhoneNumber || '',
      isActive: employeeForEdit?.isActive || true,
      photoPath: employeeForEdit?.photoPath || '',
      profilePhoto: employeeForEdit?.profilePhoto || null,
    }),
    [employeeForEdit]
  );

  const methods = useForm<IEmployee>({
    resolver: yupResolver(NewEmployeeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const val = watch();
  const onSubmit = (data: IEmployee) => {
    data.phoneNumber = muiPhone.replace(/\s+/g, '');
    data.emergencyPhoneNumber = muiEmergencyPhone.replace(/\s+/g, '');
    data.isActive = val.isActive;

    if (data.id! === undefined) {
      ///create
      data.profilePhoto = methods.getValues().profilePhoto;
      createEmployee(data)
        .then(() => {
          clearSelectedEmployee();
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
          } else if (json.error.IsActive != null) {
            setError('afterSubmit', { ...err, message: json.error.IsActive });
          } else {
            setError('afterSubmit', { ...err, message: json.error });
          }
          console.log(err);
        });
    } else {
      ///update
      if (data.leaveDate) {
        data.leaveDate = new Date(data.leaveDate!).toDateString();
      }
      if (!isImageUpdate) {
        data.profilePhoto = null;
      } else {
        data.profilePhoto = methods.getValues().profilePhoto;
      }
      updateEmployee(data)
        .then(() => {
          clearSelectedEmployee();
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
          } else if (json.error.IsActive != null) {
            setError('afterSubmit', { ...err, message: json.error.IsActive });
          } else {
            setError('afterSubmit', { ...err, message: json.error });
          }
          console.log(err);
        });
    }
  };

  // useEffect(() => {
  //   let value = String(val.isActive);
  //   // eslint-disable-next-line eqeqeq
  //   if (value != '0') {
  //     setIsTrue(!isTrue);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [val.isActive]);

  useEffect(() => {
    if (editMode) {
      reset(defaultValues);
      setMuiPhone(defaultValues.phoneNumber!);
      setMuiEmergencyPhone(defaultValues.emergencyPhoneNumber!);
      setValue('gender', defaultValues.gender);
    }
    if (!editMode) {
      reset(defaultValues);
    }
    loadBranchDDL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, editMode, defaultValues, loadBranchDDL]);

  // useEffect(() => {
  //   if (editMode) {
  //     if (defaultValues.departmentId) {
  //       loadDepartmentDropdown().then((res) => {
  //         setDepartmentName(
  //           DepartmentOption.find((e) => e.value === defaultValues.departmentId)?.text
  //         );
  //       });
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [departmentName]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
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
  }, [editMode, setValue]);

  const gender = [
    { title: 'Male', value: 'Male' },
    { title: 'Female', value: 'Female' },
  ];

  const TazkiraType = [
    { title: 1, value: `${translate('Employee.ETazkira')}` },
    { title: 2, value: `${translate('Employee.PaperBaseTazkira')}` },
  ];

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
            <Fieldset legend={translate('Employee.EnglishBioData')}>
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
                  name="englishSurName"
                  label={translate('Employee.englishSurName')}
                  showAsterisk={true}
                />
                <RHFTextField
                  name="englishFatherName"
                  label={translate('Employee.FatherEnglishName')}
                  showAsterisk={true}
                />
                <RHFTextField
                  name="englishGrandFatherName"
                  label={translate('Employee.englishGrandFatherName')}
                  showAsterisk={true}
                />
              </Box>
            </Fieldset>

            <Fieldset legend={translate('Employee.PashtoDariBioData')}>
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
                  name="pashtoFirstName"
                  label={translate('Employee.PashtoName')}
                  showAsterisk={true}
                />

                <RHFTextField
                  name="pashtoSurName"
                  label={translate('Employee.pashtoSurName')}
                  showAsterisk={true}
                />

                <RHFTextField
                  name="pashtoFatherName"
                  label={translate('Employee.FatherDariName')}
                  showAsterisk={true}
                />

                <RHFTextField
                  name="pashtoGrandFatherName"
                  label={translate('Employee.pashtoGrandFatherName')}
                  showAsterisk={true}
                />
              </Box>
            </Fieldset>
          </Card>
        </Grid>

        <Grid item xs={12} md={12} sx={{ mt: 1 }}>
          <Card sx={{ p: 3, borderRadius: '15px 15px 15px 15px' }}>
            <Fieldset legend={translate('Employee.EmployeeGeneralInfo')}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                }}
              >
                <RHFSelect name="gender" label={translate('Employee.Gender')}>
                  <option value="" />
                  {gender.map((op) => (
                    <option key={op.title} value={op.title}>
                      {op.title}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect
                  name="tazkiraTypeId"
                  label={translate('Employee.TazkiraType')}
                  onChange={(e) => setValue('tazkiraTypeId', parseInt(e.target.value))}
                >
                  <option value="" />
                  {TazkiraType.map((op) => (
                    <option key={op.title} value={op.title}>
                      {op.value}
                    </option>
                  ))}
                </RHFSelect>

                <RHFTextField
                  name="tazkiraNo"
                  label={translate('Employee.cnic')}
                  showAsterisk={true}
                />

                {val.tazkiraTypeId === 2 && (
                  <>
                    <RHFTextField name="joldNo" label={translate('Employee.JoldNo')} />
                    <RHFTextField name="pageNo" label={translate('Employee.PageNo')} />
                    <RHFTextField name="regNo" label={translate('Employee.RegNo')} />
                  </>
                )}

                <LocalizDatePicker
                  name="dateOfBirth"
                  label={translate('Employee.dateOfBirth')}
                  control={control}
                  showAsterisk={true}
                />

                <RHFTextField
                  name="temporaryAddress"
                  label={translate('Employee.temporaryAddress')}
                  showAsterisk={true}
                />
                <RHFTextField
                  name="permenantAddress"
                  label={translate('Employee.permanentAddress')}
                  showAsterisk={true}
                />
                {!editMode ? (
                  <RHFSelect name="branchId" label={translate('Branch.Branch')}>
                    <option value="" />
                    {BranchOption.map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.text}
                      </option>
                    ))}
                  </RHFSelect>
                ) : (
                  <></>
                )}
                <RHFSelect name="bloodGroup" label={translate('Employee.BloodGroup')}>
                  <option value="" />
                  {bloodGroup.map((op) => (
                    <option key={op.value} value={op.title}>
                      {op.title}
                    </option>
                  ))}
                </RHFSelect>

                <LocalizDatePicker
                  name="joinDate"
                  label={translate('Employee.JoinDate')}
                  control={control}
                  showAsterisk={true}
                />
                {editMode && (
                  <>
                    <LocalizDatePicker
                      name="leaveDate"
                      label={translate('Employee.leaveDate')}
                      control={control}
                    />
                    <RHFTextField name="leaveRemark" label={translate('Employee.leaveRemark')} />
                  </>
                )}

                <RHFTextField name="personalEmail" label={translate('Employee.personalEmail')} />
                <MuiPhone
                  value={muiPhone}
                  dir={language === 'en' ? 'ltr' : 'ltr'}
                  onChange={(Phone) => setMuiPhone(Phone)}
                  name="phoneNumber"
                  customFlag={CustomFlag}
                />
                <MuiPhone
                  value={muiEmergencyPhone}
                  dir={language === 'en' ? 'ltr' : 'ltr'}
                  label={translate('Employee.emergencyPhoneNumber')}
                  onChange={(EmergencyPhone) => setMuiEmergencyPhone(EmergencyPhone)}
                  name="emergencyPhoneNumber"
                  customFlag={CustomFlag}
                />

                {editMode ? (
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            {...field}
                            onChange={(e) => {
                              field.onChange(e); // Notify React Hook Form of the value change
                              handleChange(e); // Handle the switch state change
                            }}
                            checked={field.value}
                          />
                        }
                        label={translate('employee.isActive')}
                        labelPlacement="end"
                      />
                    )}
                  />
                ) : (
                  <></>
                )}

                {/* <RHFSelect
                  name="genderId"
                  label={translate('Employee.Gender')}
                  showAsterisk={true}
                  onChange={(e) => setValue('genderId', e.target.value)}
                >
                  <option value="" />

                  <option value="1">{translate('Employee.Male')}</option>
                  <option value="2">{translate('Employee.Female')}</option>
                </RHFSelect> */}

                {/* {!editMode && (
                  <CustomRHFAutocomplete
                    name="departmentName"
                    label={translate('Employee.Department')}
                    showAsterisk={true}
                    placeholder={translate('Employee.Department')}
                    value={watch('departmentName') || ''}
                    options={DepartmentOption.map((i) => i.text)}
                    getOptionLabel={(option: any) => `${option}`}
                    onChange={(event, newValue: any) => {
                      const find = DepartmentOption.filter((item) => item.text === newValue)[0];

                      if (find) {
                        const id = find?.value;
                        setValue('departmentId', Number(id));
                        setValue(`departmentName`, find?.text);
                      } else {
                        setValue('departmentId', undefined);
                        setValue(`departmentName`, '');
                      }
                    }}
                    freeSolo
                    fullWidth
                    renderOption={(props, option: any) => (
                      <li {...props} key={option + '-' + uuid()}>
                        {option}
                      </li>
                    )}
                  />
                )} */}
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
                    clearSelectedEmployee();
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
