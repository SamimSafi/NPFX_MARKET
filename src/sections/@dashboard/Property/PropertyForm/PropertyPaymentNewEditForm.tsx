import * as Yup from 'yup';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';

import useLocales from 'src/hooks/useLocales';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFSelect } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { Payment } from 'src/@types/foamCompanyTypes/systemTypes/PropertyType';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
// ----------------------------------------------------------------------
interface Props {
  id: number;
  payment?: Payment;
}

export default observer(function PropertyPaymentNewEditForm({ id, payment }: Props) {
  const { PropertyStore, commonDropdown } = useStore();
  const { loadEmployeeByCurrentBranchDropdown, EmployeeByCurrentBranch } = commonDropdown;
  const { translate } = useLocales();
  const {
    propertyPayment,
    UpdatePropertyPayment,
    editMode,
    selectedProperty,
    clearSelectedProperty,
    setOpenClosePaymentDialog,
  } = PropertyStore;
  const { enqueueSnackbar } = useSnackbar();
  const NewPropertySchema = Yup.object().shape({
    propertyId: Yup.number().required(`${translate('Validation.PropertyIsRequired')}`),
    amountPaid: Yup.number().required(`${translate('Validation.AmountPaid')}`),
    paymentDate: Yup.date().required(`${translate('Validation.PaymentDate')}`),
  });

  const defaultValues = useMemo<Payment>(
    () => ({
      id: payment?.id,
      propertyId: id || payment?.propertyId,
      amountPaid: undefined,
      employeeId: selectedProperty?.employeeId || payment?.employeeId || undefined,
      paymentDate: selectedProperty?.startDate || payment?.paymentDate,
      remainingBalance: payment?.remainingBalance,
    }),
    [selectedProperty, id, payment]
  );

  const [remainingBalance, setRemainingBalance] = useState(
    payment?.remainingBalance || selectedProperty?.price! - selectedProperty?.amountPaid! || 0
  );
  const [errorMessage, setErrorMessage] = useState('');

  const methods = useForm<Payment>({
    resolver: yupResolver(NewPropertySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting, errors },
    control,
  } = methods;
  const onSubmit = async (data: Payment) => {
    ///create
    if (data.id === undefined) {
      await propertyPayment(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          // navigate(PATH_DASHBOARD.Property.list);
          clearSelectedProperty();
          setOpenClosePaymentDialog();
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
      await UpdatePropertyPayment(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          // navigate(PATH_DASHBOARD.Property.list);
          clearSelectedProperty();
          setOpenClosePaymentDialog();
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

  const handleAmountPaidChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const amountPaid = parseFloat(event.target.value);
    const totalAmount =
      payment?.remainingBalance || selectedProperty?.price! - selectedProperty?.amountPaid! || 0;

    if (amountPaid > totalAmount) {
      setErrorMessage(`Amount paid cannot exceed the total amount: ${totalAmount}`);
    } else {
      setErrorMessage('');
      const newRemainingBalance = totalAmount - amountPaid;
      setRemainingBalance(newRemainingBalance);
      setValue('remainingBalance', newRemainingBalance); // update the remaining balance in the form
    }
  };

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
                name="paymentDate"
                label={translate('Property.PaymentDate')}
                control={control}
                showAsterisk={true}
              />
            </Box>
            {/* Paid Amount Field */}
            <Typography variant="subtitle1">
              Total Amount:{' '}
              {payment?.remainingBalance ||
                selectedProperty?.price! - selectedProperty?.amountPaid! ||
                0}
            </Typography>
            <Controller
              name="amountPaid"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={translate('Property.PayableAmount')}
                  type="number"
                  onChange={(e) => {
                    field.onChange(e); // react-hook-form tracking
                    handleAmountPaidChange(e); // custom calculation
                  }}
                  sx={{ mt: 2 }}
                />
              )}
            />
            {/* <RHFTextField
              name="remainingBalance"
              fullWidth
              label={translate('Property.RemainingBalance')}
              showAsterisk={true}
              type="number"
              sx={{ mt: 2 }}
            /> */}
            {/* Remaining Balance Field */}
            <Controller
              name="remainingBalance"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={translate('Property.RemainingBalance')}
                  value={remainingBalance}
                  InputProps={{
                    readOnly: true, // make the remaining balance read-only
                  }}
                  sx={{ mt: 2 }}
                />
              )}
            />

            {/* Display Error Message */}
            {errorMessage && (
              <Typography color="error" variant="body2">
                {errorMessage}
              </Typography>
            )}

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                loading={isSubmitting}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                {`${translate('CRUD.Pay')}`}
              </LoadingButton>
              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                onClick={() => {
                  clearSelectedProperty();
                  setOpenClosePaymentDialog();
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
