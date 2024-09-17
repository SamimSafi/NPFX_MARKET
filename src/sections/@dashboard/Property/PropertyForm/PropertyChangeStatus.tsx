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
import { FormProvider, RHFSelect } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import {
  IChangePropertyCondition,
  PropertyRental,
} from 'src/@types/foamCompanyTypes/systemTypes/PropertyType';
// ----------------------------------------------------------------------

interface Props {
  id: number;
}
export default observer(function PropertyChangeStatus({ id }: Props) {
  const { PropertyStore, commonDropdown } = useStore();
  const { loadPropertyConditionsDDL, PropertyConditionsOption } = commonDropdown;
  const { translate } = useLocales();
  const {
    ChangeCondition,
    selectedProperty,
    clearSelectedProperty,
    setOpenCloseChangeStatusDialog,
  } = PropertyStore;
  const { enqueueSnackbar } = useSnackbar();
  const NewPropertySchema = Yup.object().shape({
    conditionId: Yup.number().required(`${translate('Validation.ConditionId')}`),
  });

  const defaultValues = useMemo<IChangePropertyCondition>(
    () => ({
      id: id,
      conditionId: selectedProperty?.conditionId || undefined,
    }),
    [selectedProperty, id]
  );

  const methods = useForm<IChangePropertyCondition>({
    resolver: yupResolver(NewPropertySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;
  const onSubmit = async (data: PropertyRental) => {
    ///create
    await ChangeCondition(data)
      .then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        clearSelectedProperty();
        setOpenCloseChangeStatusDialog();
      })
      .catch((err) => {
        var json = JSON.parse(err.request.response);
        if (json.error.ConditionId != null) {
          setError('afterSubmit', { ...err, message: json.error.ConditionId });
        } else {
          setError('afterSubmit', { ...err, message: json.error });
        }
      });
  };

  useEffect(() => {
    loadPropertyConditionsDDL();
  }, [loadPropertyConditionsDDL]);

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
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              <RHFSelect name="conditionId" label={translate('Property.PropertyConditions')}>
                <option value="" />
                {PropertyConditionsOption.map((op) => (
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
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                {`${translate('CRUD.ChangeStatus')}`}
              </LoadingButton>
              <Button
                fullWidth
                variant="contained"
                color="error"
                startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                onClick={() => {
                  clearSelectedProperty();
                  setOpenCloseChangeStatusDialog();
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
