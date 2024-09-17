import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Card, Grid, Stack } from '@mui/material';

import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { Assignment, PropertyRental } from 'src/@types/foamCompanyTypes/systemTypes/PropertyType';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
// ----------------------------------------------------------------------
interface Props {
  id: number;
  Assignment?: Assignment;
}

export default observer(function PropertyAssignmentNewEditForm({ id, Assignment }: Props) {
  const { PropertyStore, commonDropdown } = useStore();
  const { loadEmployeeByCurrentBranchDropdown, EmployeeByCurrentBranch } = commonDropdown;
  const { translate } = useLocales();
  const {
    assignProperty,
    UpdateAssignProperty,
    editMode,
    selectedProperty,
    clearSelectedProperty,
    setOpenCloseAssignDialog,
  } = PropertyStore;
  const { enqueueSnackbar } = useSnackbar();
  const NewPropertySchema = Yup.object().shape({
    propertyId: Yup.number().required(`${translate('Validation.PropertyIsRequired')}`),
    employeeId: Yup.number().required(`${translate('Validation.EmployeeIsRequired')}`),
    startDate: Yup.date().required(`${translate('Validation.StartDate')}`),
    endDate: Yup.date().required(`${translate('Validation.EndDate')}`),
  });

  const defaultValues = useMemo<PropertyRental>(
    () => ({
      id: Assignment?.id,
      propertyId: id,
      employeeId: selectedProperty?.employeeId || Assignment?.employeeId || undefined,
      startDate: selectedProperty?.startDate || Assignment?.startDate,
      endDate: selectedProperty?.endDate || Assignment?.endDate,
      remarks: selectedProperty?.remarks || Assignment?.remarks,
    }),
    [selectedProperty, id, Assignment]
  );

  const methods = useForm<PropertyRental>({
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
  const onSubmit = async (data: PropertyRental) => {
    ///create
    if (data.id === undefined) {
      await assignProperty(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          clearSelectedProperty();
          setOpenCloseAssignDialog();
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
      UpdateAssignProperty(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          clearSelectedProperty();
          setOpenCloseAssignDialog();
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
    loadEmployeeByCurrentBranchDropdown();
  }, [loadEmployeeByCurrentBranchDropdown]);

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
              <RHFSelect name="employeeId" label={translate('Property.Employee')}>
                <option value="" />
                {EmployeeByCurrentBranch.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>

              <LocalizDatePicker
                name="startDate"
                label={translate('GeneralFields.StartDate')}
                control={control}
                showAsterisk={true}
              />
              <LocalizDatePicker
                name="endDate"
                label={translate('GeneralFields.EndDate')}
                control={control}
                showAsterisk={true}
              />
            </Box>
            <RHFTextField
              name="remarks"
              fullWidth
              multiline
              label={translate('GeneralFields.Remarks')}
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
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                {`${translate('CRUD.Assign')}`}
              </LoadingButton>
              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                onClick={() => {
                  clearSelectedProperty();
                  setOpenCloseAssignDialog();
                }}
              >
                {translate('CRUD.Cancle')}
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
});
