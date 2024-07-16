import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { DatePicker, LoadingButton } from '@mui/lab';

import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  Alert,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
  Stack,
  TextField,
  Autocomplete,
  Chip,
  LinearProgress,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types
import { productOrder } from '../../../../@types/foamCompanyTypes/productOrder';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField, RHFSelect, RHFEditor } from '../../../../components/hook-form';
import { useStore } from 'src/stores/store';
import { observer } from 'mobx-react-lite';
import useLocales from 'src/hooks/useLocales';
import uuid from 'react-uuid';
import CustomRHFAutocomplete from 'src/components/hook-form/CustomRHFAutocomplete';
import CustomButton from 'src/components/CustomButton';

// ----------------------------------------------------------------------
export default observer(function ProductOrderNewEditForm() {
  const { translate } = useLocales();
  const { ProductOrderStore, commonDropdown } = useStore();
  const { loadUserDropdown, loadHighLevelEmployeeDropdown, FromHighDepartmentOption } =
    commonDropdown;

  const { createProductOrder, editMode, clearSelectedProductOrder, selectedProductOrder } =
    ProductOrderStore;

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewproductOrderSchema = Yup.object().shape({
    signEmpContractDetailsId: Yup.string().required(
      `${translate('productOrder.GetActiveEmployeeIsRequired')}`
    ),
    documentSubject: Yup.string().required(
      `${translate('productOrder.DocumentSubjectIsRequired')}`
    ),

    documentBody: Yup.string().required(`${translate('productOrder.DocumentBodyIsRequired')}`),
    documentTypeId: Yup.string().required(`${translate('productOrder.DocumentTypeIsRequired')}`),
    toDepartmentId: Yup.string().required(`${translate('productOrder.ToDepIsRequired')}`),
    documentLevelId: Yup.string().required(`${translate('productOrder.DocumentLevelIsRequired')}`),
  });

  const defaultValues = useMemo<productOrder>(
    () => ({
      id: selectedProductOrder?.id || undefined,
      cusetomerId: selectedProductOrder?.cusetomerId || undefined,
      orderDetails: selectedProductOrder?.orderDetails || [],
    }),
    [selectedProductOrder]
  );

  const methods = useForm<productOrder>({
    resolver: yupResolver(NewproductOrderSchema),
    defaultValues,
  });
  const [value, setValues] = useState<any>([]);

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'orderDetails',
  });
  const changeHanddler = async (id?: any) => {
    if (id) {
      // eslint-disable-next-line array-callback-return
      const fieldData = fields.map((data) => data.id);
      const fieldArr = [...fieldData, id];
      const removeUndefined: any = fieldArr.filter((data) => data != undefined);
      setValues(removeUndefined);
    }
    // else{
    //   const fieldData =  fields.map((data) => data.organization_Or_Department_Id);
    //  const fieldArr =  [ ...fieldData ]
    //  const removeUndefined:any = fieldArr.filter(data => data != undefined);
    //  setValues(removeUndefined);
    // }
  };

  const handleAdd = () => {
    changeHanddler();
    append({
      goodsId: undefined,
      originalPrice: undefined,
      salePrice: undefined,
      totalPrice: undefined,
      quantity: undefined,
      discount: undefined,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
    delete value[index];
  };
  const val = watch();

  const onSubmit = (data: productOrder) => {
    console.log(data);

    if (defaultValues.id === undefined) {
      ///create
      createProductOrder(data)
        .then(() => {
          reset();
          enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
          // navigate(PATH_DASHBOARD.productOrder.list);
          clearSelectedProductOrder();
        })
        .catch((err) => {
          var json = JSON.parse(err.request.response);
          console.log(json.DocumentTypeId);

          if (json.error.DocumentTypeId != null) {
            setError('afterSubmit', { ...err, message: json.error.DocumentTypeId });
          } else if (json.error.DocumentLevelId != null) {
            setError('afterSubmit', { ...err, message: json.error.DocumentLevelId });
          } else if (json.errors.DocumentSubject != null) {
            setError('afterSubmit', { ...err, message: json.error.DocumentSubject });
          } else if (json.errors.DocumentNumber != null) {
            setError('afterSubmit', { ...err, message: json.error.DocumentNumber });
          } else if (json.errors.DocumentTypeId != null) {
            setError('afterSubmit', { ...err, message: json.error.DocumentTypeId });
          } else if (json.errors.DocumentBookRecivedNumber != null) {
            setError('afterSubmit', { ...err, message: json.error.DocumentBookRecivedNumber });
          } else if (json.errors.FromDepartmentId != null) {
            setError('afterSubmit', { ...err, message: json.error.FromDepartmentId });
          } else if (json.errors.ToDepartmentId != null) {
            setError('afterSubmit', { ...err, message: json.error.ToDepartmentId });
          } else if (json.errors.DocumentLevelId != null) {
            setError('afterSubmit', { ...err, message: json.error.DocumentLevelId });
          } else if (json.errors.DepartmentId != null) {
            setError('afterSubmit', { ...err, message: json.error.DepartmentId });
          } else if (json.errors.UserId != null) {
            setError('afterSubmit', { ...err, message: json.error.UserId });
          }
        });
    } else {
      ///update
      // setIsSubmit(true);
      // updateproductOrder(data, true)
      //   .then(() => {
      //     reset();
      //     enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
      //     navigate(PATH_DASHBOARD.productOrder.list);
      //     clearSelectedInternalDoc();
      //   })
      //   .finally(() => {
      //     setIsSubmit(false);
      //   }).catch((err) => {
      //     console.log(err);
      //     var json = JSON.parse(err.request.response);
      //     if (json.error.ReturnDate != null) {
      //       setError('afterSubmit', { ...err, message: json.error.ReturnDate });
      //     } else if (json.error.DocumentDate != null) {
      //       setError('afterSubmit', { ...err, message: json.error.DocumentDate });
      //     } else if (json.errors.DocumentSubject != null) {
      //       setError('afterSubmit', { ...err, message: json.error.DocumentSubject });
      //     } else if (json.errors.DocumentNumber != null) {
      //       setError('afterSubmit', { ...err, message: json.error.DocumentNumber });
      //     } else if (json.errors.DocumentTypeId != null) {
      //       setError('afterSubmit', { ...err, message: json.error.DocumentTypeId });
      //     } else if (json.errors.DocumentBookRecivedNumber != null) {
      //       setError('afterSubmit', { ...err, message: json.error.DocumentBookRecivedNumber });
      //     } else if (json.errors.FromDepartmentId != null) {
      //       setError('afterSubmit', { ...err, message: json.error.FromDepartmentId });
      //     } else if (json.errors.ToDepartmentId != null) {
      //       setError('afterSubmit', { ...err, message: json.error.ToDepartmentId });
      //     } else if (json.errors.DocumentLevelId != null) {
      //       setError('afterSubmit', { ...err, message: json.error.DocumentLevelId });
      //     } else if (json.errors.DepartmentId != null) {
      //       setError('afterSubmit', { ...err, message: json.error.DepartmentId });
      //     } else if (json.errors.UserId != null) {
      //       setError('afterSubmit', { ...err, message: json.error.UserId });
      //     }
      //   });
    }
  };

  useEffect(() => {
    if (editMode) {
      reset(defaultValues);
    }
    if (!editMode) {
      reset(defaultValues);

      // loadUserHighDepartmentDropdown();
    }
  }, [reset, editMode, defaultValues]);

  useEffect(() => {
    // loadDepartmentDropdown();
    // loadUserHighDepartmentDropdown();
    loadUserDropdown(1);
    loadHighLevelEmployeeDropdown();
  }, []);

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
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                }}
              >
                <CustomRHFAutocomplete
                  name="cusetomerId"
                  loading={FromHighDepartmentOption.length > 0 ? false : true}
                  label={translate('productOrder.Customer')}
                  showAsterisk={true}
                  placeholder="Customer"
                  value={watch('customerName') || ''}
                  options={FromHighDepartmentOption.map((i) => i.text)}
                  onFocus={() => {
                    if (!editMode) {
                      loadHighLevelEmployeeDropdown();
                    }
                  }}
                  getOptionLabel={(option: any) => `${option}`}
                  onChange={(event, newValue: any) => {
                    const find = FromHighDepartmentOption.filter(
                      (item) => item.text === newValue
                    )[0];

                    if (find) {
                      const id = find?.value;
                      setValue('cusetomerId', Number(id));
                      setValue(`customerName`, find?.text);
                    } else {
                      setValue('cusetomerId', undefined);
                      setValue(`customerName`, '');
                    }
                  }}
                  freeSolo
                  fullWidth
                  renderOption={(props, option: any) => {
                    return (
                      <li {...props} key={option + '-' + uuid()}>
                        {option}
                      </li>
                    );
                  }}
                />
              </Box>
            </Card>

            <Card sx={{ p: 3, mt: 5 }}>
              <Box
                sx={{
                  mt: 3,
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                }}
              >
                {/* <InternalDocCcDepartment /> */}

                <Box sx={{ p: 1 }}>
                  <Typography variant="h6" sx={{ color: 'text.disabled', mb: 1 }}>
                    {translate('CRUD.CCDep')}
                  </Typography>
                  <Stack spacing={3}>
                    {fields.map((item, index) => {
                      return (
                        <Stack key={item.id} spacing={1.5}>
                          <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={2}
                            sx={{ width: 1 }}
                          >
                            <Grid item xs={12} md={12}>
                              <Box
                                sx={{
                                  display: 'grid',
                                  columnGap: 2,
                                  rowGap: 3,
                                  gridTemplateColumns: {
                                    xs: 'repeat(1, 1fr)',
                                    sm: 'repeat(2, 1fr)',
                                  },
                                  // display: 'flex',
                                }}
                              >
                                {/* <RHFSelect
                                  name={`orderDetails[${index}].goodsId`}
                                  label={translate('productOrder.GoodsName')}
                                  // size="small"
                                  SelectProps={{
                                    native: false,
                                    sx: { textTransform: 'capitalize' },
                                  }}
                                  fullWidth
                                  onChange={(event) => {
                                    setValue<any>(
                                      `orderDetails[${index}].goodsId`,
                                      event.target.value
                                    );
                                    changeHanddler(event.target.value);
                                  }}
                                >
                                  {DepartmentOption.filter(
                                    (res) =>
                                      res.value != window.localStorage.getItem('departmentID')
                                  ).map((option) => (
                                    <MenuItem
                                      disabled={value.includes(option.value) ? true : false}
                                      key={option.value}
                                      value={option.value}
                                      sx={{
                                        mx: 1,
                                        my: 0.5,
                                        borderRadius: 0.75,
                                        typography: 'body2',
                                        textTransform: 'capitalize',
                                      }}
                                    >
                                      {option.text}
                                    </MenuItem>
                                  ))}
                                </RHFSelect> */}

                                <RHFTextField
                                  name={`orderDetails[${index}].quantity`}
                                  label={translate('productOrder.quantity')}
                                  fullWidth
                                />
                                <RHFTextField
                                  name={`orderDetails[${index}].salePrice`}
                                  label={translate('productOrder.salePrice')}
                                  fullWidth
                                />
                                <RHFTextField
                                  name={`orderDetails[${index}].discount`}
                                  label={translate('productOrder.discount')}
                                  fullWidth
                                />
                                <RHFTextField
                                  name={`orderDetails[${index}].totalPrice`}
                                  label={translate('productOrder.totalPrice')}
                                  fullWidth
                                />
                              </Box>{' '}
                            </Grid>
                            <Button
                              size="small"
                              color="error"
                              startIcon={<Iconify icon="eva:trash-2-outline" />}
                              onClick={() => {
                                handleRemove(index);
                              }}
                            />
                          </Stack>
                          <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={2}
                            sx={{ width: 1 }}
                          >
                            <Grid item xs={12}>
                              <Typography variant="h6">
                                Formula: 10/ 10 = 1 1 * 6 = 6 this two other Text Field 6/ 100 =
                                0.06 this is two other text field 0.06 * 70 =4.2 this is two other
                                text field 4.2 / 200= 0.021 this is two other text field
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <RHFTextField
                                name={`textField1`}
                                label={`Value 1`}
                                // Add any additional props as needed
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <RHFTextField
                                name={`textField2`}
                                label={`Value 2`}
                                // Add any additional props as needed
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <RHFTextField
                                name={`textField3`}
                                label={`Value 3`}
                                // Add any additional props as needed
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <RHFTextField
                                name={`textField4`}
                                label={`Value 4`}
                                // Add any additional props as needed
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <RHFTextField
                                name={`textField5`}
                                label={`Value 5`}
                                // Add any additional props as needed
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <RHFTextField
                                name={`textField6`}
                                label={`Value 6`}
                                // Add any additional props as needed
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <RHFTextField
                                name={`textField7`}
                                label={`Value 7`}
                                // Add any additional props as needed
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <RHFTextField
                                name={`textField8`}
                                label={`Value 8`}
                                // Add any additional props as needed
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <RHFTextField
                                name={`textField9`}
                                label={`Value 9`}
                                // Add any additional props as needed
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <RHFTextField
                                name={`textField10`}
                                label={`Value 10`}
                                // Add any additional props as needed
                              />
                            </Grid>
                          </Stack>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Box>
                <Stack
                  spacing={2}
                  direction={{ xs: 'column-reverse', md: 'row' }}
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                >
                  <Button
                    size="small"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={handleAdd}
                    sx={{ flexShrink: 0 }}
                  >
                    {translate('CRUD.AddNewCC')}
                  </Button>
                </Stack>
              </Box>
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <CustomButton
                  editMode={editMode}
                  isSubmitting={isSubmitting}
                  translate={translate}
                  saveLabel={translate('CRUD.Save')}
                  updateLabel={translate('CRUD.Update')}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
                  onClick={() => {
                    clearSelectedProductOrder();

                    // navigate(PATH_DASHBOARD.productOrder.list);
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
