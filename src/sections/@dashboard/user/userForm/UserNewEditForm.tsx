import * as Yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import useLocales from '../../../../hooks/useLocales';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
  Alert,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useStore } from 'src/stores/store';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { CreateUser } from 'src/@types/createUser';
import { observer } from 'mobx-react-lite';
import Iconify from 'src/components/Iconify';
import CustomRHFAutocomplete from 'src/components/hook-form/CustomRHFAutocomplete';
import uuid from 'react-uuid';
// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default observer(function UserNewEditForm() {
  const { translate } = useLocales();
  const [fullName, setFullName] = useState('');
  const [roleid, setRoleId] = useState<any>([]);
  const [branchID, setBranchID] = useState<any>([]);
  const {
    EmployeeStore: { selectedEmployee, clearSelectedEmployee },
  } = useStore();
  const [selectedRolesName, setSelectedRolesName] = useState<string[]>();
  const [selectedBranch, setSelectedBranch] = useState<string[]>();
  const [rolesOptions, setRolesOptions] = useState<any[]>([]);
  const [branchOption, setbranchOption] = useState<any[]>([]);
  const [empEmail, setEmpEmail] = useState<string>();

  const { UserStore, commonDropdown } = useStore();
  const {
    createUser,
    updateUser,
    editMode,
    selectedUser,
    SelecteduserDetail,
    clearSelectedUser,
    clearSelectedUserDetail,
  } = UserStore;
  const {
    loadEmployeeDropdown,
    EmployeeOption,
    loadBranchDDL,
    BranchOption,
    loadRoleDropdown,
    RolesOption,
  } = commonDropdown;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    userName: Yup.string().required(`${translate('User.UserNameIsRequired')}`),
    email: Yup.string().required(`${translate('Validation.Emaill')}`),
    // DepartmentNames: !editMode ? Yup.string().required(`${translate('User.DepartmentIsReuquired')}`) :Yup.array()
    // .of(Yup.string().required(`${translate('User.DepartmentIsReuquired')}`)),

    // rolesName: !editMode ? Yup.string().required(`${translate('User.rolesIsReuquired')}`) :Yup.array()
    // .of(Yup.string().required(`${translate('User.rolesIsReuquired')}`)),
    employeeName: Yup.string()
      .required(`${translate('Validation.EmployeeIsRequired')}`)
      .label('employee'),
  });

  const rolesId = SelecteduserDetail?.userRoles.map((m) => m.id);
  const branchesId = SelecteduserDetail?.allowedbranchlevelModels.map((m) => m.id);

  const defaultValues = useMemo<CreateUser>(
    () => ({
      id: selectedUser?.id || undefined,
      userName: selectedUser?.userName || '',
      userRoles: selectedUser?.userRoles || undefined,
      email: SelecteduserDetail?.email || '',
      allowedbranchlevelModels: selectedUser?.allowedbranchlevelModels || undefined,
      employeeId: SelecteduserDetail?.employeeId || selectedEmployee?.id || undefined,
    }),
    [selectedUser, SelecteduserDetail, selectedEmployee]
  );

  console.log(selectedUser?.userRoles);
  const methods = useForm<CreateUser>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    control,
    watch,
    resetField,

    setValue,

    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: CreateUser) => {
    const newData = {
      ...data,
      userRoles: roleid.toString(),
      allowedbranchlevelModels: branchID.toString(),
    };
    if (newData.id === undefined) {
      ///create

      createUser(newData)
        .then((res) => {
          console.log(res);
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          clearSelectedEmployee();
          navigate(PATH_DASHBOARD.user.list);
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          if (json.error.EmployeeId != null) {
            setError('afterSubmit', { ...err, message: json.error.EmployeeId });
          } else if (json.error.userName != null) {
            setError('afterSubmit', { ...err, message: json.error.UserName });
          } else {
            setError('afterSubmit', { ...err, message: json.error });
          }

          console.log(err.request.response);
        });
    } else {
      //update
      updateUser(newData)
        .then(() => {
          reset();
          clearSelectedUser();
          enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
          navigate(PATH_DASHBOARD.user.list);
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          if (json.error.EmployeeId != null) {
            setError('afterSubmit', { ...err, message: json.error.EmployeeId });
          } else if (json.error.userName != null) {
            setError('afterSubmit', { ...err, message: json.error.UserName });
          } else {
            setError('afterSubmit', { ...err, message: json.error });
          }
        });
    }
  };
  const [employeeName, setEmployeeName] = useState<string | undefined>('');
  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nameWithOutSpaces = event.target.value.replace(/\s/g, '');
    setValue('userName', nameWithOutSpaces);
    setFullName(nameWithOutSpaces);
  };

  const loadRoles = () => {
    loadRoleDropdown().then((res) => {
      if (editMode) {
        const selectedRoles = RolesOption.filter((e) => rolesId!.includes(Number(e.value)));
        setTimeout(() => {
          const roleNames = selectedRoles.map((role) => role.text);
          setSelectedRolesName(roleNames);
        }, 500);
        setRolesOptions(RolesOption.map((i) => i.text));
      }
    });
  };

  useEffect(() => {
    if (editMode) {
      setValue('userName', defaultValues.userName);
      setFullName(defaultValues.userName);
      reset(defaultValues);
    }
    if (!editMode) {
      reset(defaultValues);
    }
  }, [reset, editMode, defaultValues]);

  useEffect(() => {
    if (editMode) {
      setRoleId(rolesId);
      setBranchID(branchesId);
      loadRoles();
      loadBranchDDL()
        .then((res) => {
          const selectedBranches = BranchOption.filter((e) =>
            branchesId!.includes(Number(e.value))
          );
          setTimeout(() => {
            const branchsNames = selectedBranches.map((branches) => branches.text);
            setSelectedBranch(branchsNames);
          }, 500);
          setbranchOption(BranchOption.map((i) => i.text));
        })
        .finally(() => {
          setbranchOption(BranchOption.map((i) => i.text));
        });

      setValue('userName', defaultValues.userName);
      setFullName(defaultValues.userName);
      reset(defaultValues);
    }
    if (!editMode) {
      loadRoleDropdown()
        .then((res) => {
          setRolesOptions(RolesOption.map((i) => i.text));
        })
        .finally(() => {
          setRolesOptions(RolesOption.map((i) => i.text));
        });

      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, editMode, defaultValues]);

  useEffect(() => {
    loadEmployeeDropdown(true);
    loadBranchDDL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editMode) {
      if (defaultValues.employeeId) {
        loadEmployeeDropdown(true).then((res) => {
          setEmployeeName(EmployeeOption.find((e) => e.value === defaultValues.employeeId)?.text);
        });
      }
    }
  }, [employeeName]);

  useEffect(() => {}, [empEmail]);

  useEffect(() => {
    //if(editMode)
    setValue('employeeName', employeeName);
  }, [employeeName]);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {!!errors.afterSubmit && (
          <Alert sx={{ mb: 2 }} severity="error">
            {errors.afterSubmit.message}
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3, alignItems: 'center', alignContent: 'center' }}>
              <Box
                sx={{
                  mt: 2,
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <CustomRHFAutocomplete
                  name="employeeId"
                  label={translate('User.Employee')}
                  showAsterisk={true}
                  placeholder="Employee"
                  value={employeeName || ''}
                  options={
                    // !editMode
                    //   ? EmployeeOption.filter((item) => item.hasAccount != true).map((i) => i.text)
                    //   :
                    EmployeeOption.map((i) => i.text)
                  }
                  getOptionLabel={(option: any) => `${option}`}
                  onChange={(event, newValue: any) => {
                    setEmpEmail(
                      EmployeeOption.filter((item) => item.text === newValue)[0].personalEmail
                    );
                    const find = //!editMode
                      //   ? EmployeeOption.filter(
                      //       (item) => item.text === newValue && item.hasAccount != true
                      //     )[0]
                      //   :
                      EmployeeOption.filter((item) => item.text === newValue)[0];

                    if (find) {
                      const id = find?.value;
                      setValue('employeeId', Number(id));
                      setValue(`employeeName`, find?.text);
                    } else {
                      setValue('employeeId', undefined);
                      setValue(`employeeName`, '');
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
                <RHFTextField
                  name="userName"
                  value={fullName}
                  label={translate('User.fullUserName')}
                  showAsterisk={true}
                  onChange={handleFullNameChange}
                />

                <RHFTextField
                  name="email"
                  value={empEmail || watch('email')}
                  label={translate('User.email')}
                  showAsterisk={true}
                  // disabled
                />
                <CustomRHFAutocomplete
                  value={selectedRolesName || []}
                  loading={rolesOptions.length > 0 ? false : true}
                  multiple
                  name="rolesName"
                  label={translate('User.userRoles')}
                  placeholder="UserRoles"
                  // value={watch("rolesName") || []}
                  options={['Select All', ...rolesOptions]}
                  onFocus={() => {
                    if (!editMode) {
                      loadRoleDropdown()
                        .then((res) => {
                          setTimeout(() => {
                            setRolesOptions(RolesOption.map((i) => i.text));
                          }, 1000);
                        })
                        .finally(() => {
                          setRolesOptions(RolesOption.map((i) => i.text));
                        });
                    }
                  }}
                  getOptionLabel={(option: any) => `${option}`}
                  onChange={(event, newValue: any) => {
                    if (newValue.includes('Select All')) {
                      setSelectedRolesName(rolesOptions);
                      setRoleId(RolesOption.map((d) => d.value));
                    } else {
                      setSelectedRolesName(newValue);
                      const selectedRoles = newValue
                        .map((res: any) => {
                          const find = RolesOption.find((item) => item.text === res);
                          if (find) {
                            return find.value.toString();
                          } else {
                            return null;
                          }
                        })
                        .filter((role: any) => role !== null);

                      setRoleId(selectedRoles);
                    }

                    // setValue('rolesName',selectedRoles)
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
                <CustomRHFAutocomplete
                  value={selectedBranch || []}
                  multiple
                  loading={branchOption.length > 0 ? false : true}
                  onFocus={() => {
                    if (!editMode) {
                      loadBranchDDL()
                        .then((res) => {
                          setTimeout(() => {
                            setbranchOption(BranchOption.map((i) => i.text));
                          }, 1000);
                        })
                        .finally(() => {
                          setbranchOption(BranchOption.map((i) => i.text));
                        });
                    }
                  }}
                  name="allowedBranchs"
                  label={translate('User.Branch')}
                  placeholder="Branch"
                  options={[translate('GeneralFields.SelectAll'), ...branchOption]}
                  getOptionLabel={(option: any) => `${option}`}
                  onChange={(event, newValue: any) => {
                    if (newValue.includes(translate('GeneralFields.SelectAll'))) {
                      setSelectedBranch(branchOption);
                      setBranchID(BranchOption.map((d) => d.value));
                    } else {
                      setSelectedBranch(newValue);
                      const selectedBranchID = newValue
                        .map((res: any) => {
                          const find = BranchOption.find((item) => item.text === res);
                          if (find) {
                            return find.value.toString();
                          } else {
                            return null;
                          }
                        })
                        .filter((branch: any) => branch !== null);

                      setBranchID(selectedBranchID);
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
                    clearSelectedUser();
                    clearSelectedEmployee();
                    clearSelectedUserDetail();
                    selectedEmployee?.id != undefined
                      ? navigate(PATH_DASHBOARD.Employee.list)
                      : navigate(PATH_DASHBOARD.user.list);
                  }}
                >
                  {translate('CRUD.BackToList')}
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
});
