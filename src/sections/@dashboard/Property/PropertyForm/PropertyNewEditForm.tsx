import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Card, Grid, Stack } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { IPropertyType } from 'src/@types/foamCompanyTypes/systemTypes/PropertyType';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
// ----------------------------------------------------------------------

export default observer(function PropertyNewEditForm() {
  const { PropertyStore, commonDropdown } = useStore();
  const {
    loadCategorysDDL,
    CategorysOption,
    loadPropertyConditionsDDL,
    PropertyConditionsOption,
    loadEmployeeByCurrentBranchDropdown,
    EmployeeByCurrentBranch,
  } = commonDropdown;
  const { translate } = useLocales();
  const { createProperty, updateProperty, editMode, selectedProperty, clearSelectedProperty } =
    PropertyStore;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const NewPropertySchema = Yup.object().shape({
    categoryId: Yup.number().required(`${translate('Validation.Category')}`),
    conditionId: Yup.number().required(`${translate('Validation.ConditionId')}`),
    price: Yup.number().required(`${translate('Validation.Price')}`),
    userId: Yup.string().required(`${translate('Validation.User')}`),
    usageStartDate: Yup.date().required(`${translate('Validation.StartDate')}`),
  });

  const defaultValues = useMemo<IPropertyType>(
    () => ({
      id: selectedProperty?.id,
      categoryId: selectedProperty?.categoryId || undefined,
      name: selectedProperty?.name || '',
      details: selectedProperty?.details || '',
      model: selectedProperty?.model || '',
      price: selectedProperty?.price || undefined,
      amountPaid: selectedProperty?.amountPaid,
      conditionId: selectedProperty?.conditionId || undefined,
      userId: selectedProperty?.userId || '',
      usageStartDate: selectedProperty?.usageStartDate,
      paymentDate: selectedProperty?.paymentDate,
    }),
    [selectedProperty]
  );

  const methods = useForm<IPropertyType>({
    resolver: yupResolver(NewPropertySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
    control,
  } = methods;
  const onSubmit = async (data: IPropertyType) => {
    if (data.id! === undefined) {
      ///create
      await createProperty(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          navigate(PATH_DASHBOARD.Property.list);
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          if (json.error.CategoryId != null) {
            setError('afterSubmit', { ...err, message: json.error.CategoryId });
          } else if (json.error.Name != null) {
            setError('afterSubmit', { ...err, message: json.error.Name });
          } else if (json.error.UserId != null) {
            setError('afterSubmit', { ...err, message: json.error.UserId });
          } else if (json.error.ConditionId != null) {
            setError('afterSubmit', { ...err, message: json.error.ConditionId });
          } else if (json.error.Price != null) {
            setError('afterSubmit', { ...err, message: json.error.Price });
          } else if (json.error.PaymentDate != null) {
            setError('afterSubmit', { ...err, message: json.error.PaymentDate });
          } else {
            setError('afterSubmit', { ...err, message: json.error });
          }
        });
    } else {
      ///update
      updateProperty(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
        navigate(PATH_DASHBOARD.Property.list);
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
    loadCategorysDDL();
    loadPropertyConditionsDDL();
    loadEmployeeByCurrentBranchDropdown();
  }, [loadCategorysDDL, loadPropertyConditionsDDL, loadEmployeeByCurrentBranchDropdown]);

  // useEffect(() => {
  //   loadUserDropdown(val.branchId, true);
  // }, [loadUserDropdown, val.branchId]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert sx={{ mb: 2 }} severity="error">
          {errors.afterSubmit.message}
        </Alert>
      )}
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
                label={translate('GeneralFields.Name')}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="model"
                label={translate('Property.Model')}
                showAsterisk={true}
                autoFocus
              />
              <RHFSelect name="categoryId" label={translate('Categorys.Categorys')}>
                <option value="" />
                {CategorysOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="conditionId" label={translate('Property.PropertyConditions')}>
                <option value="" />
                {PropertyConditionsOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="userId" label={translate('GeneralFields.User')}>
                <option value="" />
                {EmployeeByCurrentBranch.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>

              <LocalizDatePicker
                name="usageStartDate"
                label={translate('GeneralFields.StartDate')}
                control={control}
                showAsterisk={true}
              />
              <LocalizDatePicker
                name="paymentDate"
                label={translate('Property.PaymentDate')}
                control={control}
                showAsterisk={true}
              />

              <RHFTextField
                name="price"
                label={translate('Property.Price')}
                type={'number'}
                showAsterisk={true}
                autoFocus
              />
              <RHFTextField
                name="amountPaid"
                label={translate('Property.AmountPaid')}
                type={'number'}
                showAsterisk={true}
                autoFocus
              />
            </Box>
            <RHFTextField
              name="details"
              fullWidth
              multiline
              label={translate('Employee.Details')}
              showAsterisk={true}
              autoFocus
              maxRows={8}
              minRows={8}
              sx={{ mt: 2 }}
            />

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
                  clearSelectedProperty();
                  navigate(PATH_DASHBOARD.Property.list);
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
