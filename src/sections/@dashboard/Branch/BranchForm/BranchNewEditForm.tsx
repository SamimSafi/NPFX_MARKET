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
import { IBranch } from 'src/@types/foamCompanyTypes/looks/branch';
// ----------------------------------------------------------------------

export default observer(function BranchNewEditForm() {
  const { branchStore, commonDropdown } = useStore();
  const { translate } = useLocales();
  const { createBranch, updateBranch, editMode, selectedBranch, clearSelectedBranch } = branchStore;
  const navigate = useNavigate();
  const { loadBranchDDL, BranchOption } = commonDropdown;
  const { enqueueSnackbar } = useSnackbar();

  const NewBranchSchema = Yup.object().shape({
    englishName: Yup.string().required(`${translate('Validation.EnglishName')}`),
    dariName: Yup.string().required(`${translate('Validation.DariName')}`),
    pashtoName: Yup.string().required(`${translate('Validation.PashtoName')}`),
    code: Yup.string().required(`${translate('Validation.Code')}`),
    address: Yup.string().required(`${translate('Validation.Address')}`),
  });

  const defaultValues = useMemo<IBranch>(
    () => ({
      id: selectedBranch?.id,
      englishName: selectedBranch?.englishName || '',
      dariName: selectedBranch?.dariName || '',
      pashtoName: selectedBranch?.pashtoName || '',
      code: selectedBranch?.code || '',
      address: selectedBranch?.address || '',
      parentId: selectedBranch?.parentId || undefined,
    }),
    [selectedBranch]
  );

  const methods = useForm<IBranch>({
    resolver: yupResolver(NewBranchSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: IBranch) => {
    if (data.id! === undefined) {
      ///create
      createBranch(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.Branch.list);
      });
    } else {
      ///update
      updateBranch(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.Branch.list);
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
    loadBranchDDL();
  }, [reset, editMode, defaultValues, loadBranchDDL]);

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
                name="dariName"
                label={translate('GeneralFields.DariName')}
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
                name="code"
                label={translate('GeneralFields.Code')}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="address"
                label={translate('Branch.Address')}
                showAsterisk={true}
                autoFocus
              />
              <RHFSelect name="parentId" label={translate('Branch.Parent')}>
                <option value="" />
                {BranchOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
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
                  clearSelectedBranch();
                  navigate(PATH_DASHBOARD.Branch.list);
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
