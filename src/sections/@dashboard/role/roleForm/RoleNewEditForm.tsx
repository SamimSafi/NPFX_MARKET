import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types
import { IRole } from '../../../../@types/role';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { useStore } from 'src/stores/store';
import { observer } from 'mobx-react-lite';
import useLocales from 'src/hooks/useLocales';
import CustomRHFAutocomplete from 'src/components/hook-form/CustomRHFAutocomplete';
import uuid from 'react-uuid';
// ----------------------------------------------------------------------

export default observer(function RoleNewEditForm() {
  const { translate } = useLocales();

  const [permit, setPermit] = useState<any>([]);
  const [applicationName, setApplicationName] = useState<string | undefined>('');
  const [selectedPermission, setSelectedPermission] = useState<string[]>();
  const [newPermissionOptions, setNewPermissionOptions] = useState<any[]>([]);
  const { RoleStore, commonDropdown } = useStore();
  const { loadApplicationDropdown, ApplicationOption, loadPermissionDropdown, PermissionOption } =
    commonDropdown;
  const { createRole, updateRole, editMode, selectedRole, selectedRoleDetail, clearSelectedRole } =
    RoleStore;
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewRoleSchema = Yup.object()
    .noUnknown()
    .shape({
      name: Yup.string().required(`${translate('userRole.NameIsRequired')}`),
      // applicationId: Yup.string().required(`${translate('userRole.AppIsRequired')}`),
      applicationName: Yup.string().required(`${translate('userRole.AppIsRequired')}`),
      description: Yup.string().required(`${translate('userRole.DescriptionIsRequired')}`),
    });

  const ids = selectedRoleDetail?.permissions.map((role) => role.id);

  const defaultValues = useMemo<IRole>(
    () => ({
      id: selectedRole?.id,
      name: selectedRole?.name || '',
      applicationId: selectedRole?.applicationId,
      description: selectedRole?.description || '',
      totalPermissions: selectedRole?.totalPermissions || '',
      application: selectedRole?.application || '',
      permissionIds: selectedRole?.permissionIds,
    }),
    [selectedRole]
  );

  const methods = useForm<IRole>({
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
  const onSubmit = (data: IRole) => {
    const newData = {
      ...data,
      permissionIds: permit,
      applicationId: val.applicationId,
      // ids: permit,
    };

    if (selectedRole?.id! === undefined) {
      //   ///create
      console.log(data.id);
      createRole(newData).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.Role.list);
      });
    } else {
      const newData = {
        ...data,
        permissionIds: permit,
        id: selectedRole?.id,
        applicationId: val.applicationId,
      };
      //update

      updateRole(newData).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.Role.list);
      });
    }
  };

  useEffect(() => {
    loadApplicationDropdown();
    loadPermissionDropdown(val.applicationId!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val.applicationId]);

  useEffect(() => {
    if (editMode) {
      setPermit(ids);
      reset(defaultValues);
    }
    if (!editMode) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, editMode, defaultValues]);

  //new code added
  const loadPermissions = () => {
    loadPermissionDropdown(val.applicationId!).then((res) => {
      if (editMode) {
        const selectedPermissions = PermissionOption.filter((e) =>
          // actionRequestIds!.includes(e.value.toString())
          ids!.includes(Number(e.value))
        );
        setTimeout(() => {
          const permissionNames = selectedPermissions.map((actionrequest) => actionrequest.text);
          console.log(permissionNames + 'test');
          setSelectedPermission(permissionNames);
        }, 500);
        setNewPermissionOptions(PermissionOption.map((i) => i.text));

        //setValue('actionRequestNames', actionRequestNames);
      }
    });
  };

  useEffect(() => {
    if (editMode) {
      if (defaultValues.applicationId) {
        loadApplicationDropdown().then((res) => {
          setApplicationName(
            ApplicationOption.find((e) => e.value === defaultValues.applicationId)?.text
          );
        });
        loadPermissions();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationName]);
  useEffect(() => {
    //if(editMode)
    setValue('applicationName', applicationName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationName]);

  //new code added

  return (
    <>
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
                  name="name"
                  label={translate('userRole.Name')}
                  showAsterisk={true}
                  type="text"
                  autoFocus
                />
                <CustomRHFAutocomplete
                  name="applicationName"
                  label={translate('userRole.Application')}
                  placeholder="application type"
                  value={watch('applicationName') || ''}
                  options={
                    !editMode
                      ? ApplicationOption.filter((item) => item.hasAccount !== true).map(
                          (i) => i.text
                        )
                      : ApplicationOption.map((i) => i.text)
                  }
                  getOptionLabel={(option: any) => `${option}`}
                  onChange={(event, newValue: any) => {
                    const find = !editMode
                      ? ApplicationOption.filter(
                          (item) => item.text === newValue && item.hasAccount !== true
                        )[0]
                      : ApplicationOption.filter((item) => item.text === newValue)[0];

                    if (find) {
                      const id = find?.value;
                      setValue('applicationId', Number(id));
                      setValue(`applicationName`, find?.text);
                    } else {
                      setValue('applicationId', undefined);
                      setValue(`applicationName`, '');
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

                <RHFTextField
                  name="description"
                  label={translate('userRole.Description')}
                  showAsterisk={true}
                />
                <CustomRHFAutocomplete
                  value={selectedPermission || []}
                  multiple
                  loading={PermissionOption.length > 0 ? false : true}
                  onFocus={() => {
                    if (!editMode) {
                      loadPermissionDropdown(val.applicationId!)
                        .then((res) => {
                          setTimeout(() => {
                            setNewPermissionOptions(PermissionOption.map((i) => i.text));
                          }, 1000);
                        })
                        .finally(() => {
                          setNewPermissionOptions(PermissionOption.map((i) => i.text));
                        });
                    }
                  }}
                  name="permissionNames"
                  label={translate('userRole.Permission')}
                  options={['Select All', ...newPermissionOptions]}
                  getOptionLabel={(option: any) => `${option}`}
                  onChange={(event, newValue: any) => {
                    console.log(newValue);
                    if (newValue.includes('Select All')) {
                      setSelectedPermission(newPermissionOptions);
                      setPermit(PermissionOption.map((d) => d.value));
                    } else {
                      setSelectedPermission(newValue);
                      const selectedPermissionlist = newValue
                        .map((res: any) => {
                          const find = PermissionOption.find((item) => item.text === res);
                          if (find) {
                            return find.value.toString();
                          } else {
                            return null;
                          }
                        })
                        .filter((role: any) => role !== null);

                      setPermit(selectedPermissionlist);
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
                  {!editMode
                    ? `${translate('userRole.CreateRole')}`
                    : `${translate('userRole.UpdateRole')}`}
                </LoadingButton>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                  onClick={() => {
                    clearSelectedRole();
                    navigate(PATH_DASHBOARD.Role.list);
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
