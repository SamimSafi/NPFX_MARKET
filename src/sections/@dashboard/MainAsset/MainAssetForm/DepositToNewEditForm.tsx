import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, InputAdornment } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

import useLocales from 'src/hooks/useLocales';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import { IDepositTo } from 'src/@types/foamCompanyTypes/systemTypes/MainAsset';
import LocalizDatePicker from 'src/sections/common/LocalizDatePicker';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// ----------------------------------------------------------------------

interface Props {
  asssetID: string;
}
export default observer(function DepositToNewEditForm({ asssetID }: Props) {
  const { MainAssetStore, commonDropdown } = useStore();
  const { loadBranchDDL, BranchOption, loadUserDropdown, UserOption } = commonDropdown;
  const { translate } = useLocales();
  const { deposit, editMode, selectedDepositTo } = MainAssetStore;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewMainAssetSchema = Yup.object().shape({
    parentId: Yup.string().required(`${translate('Validation.parent')}`),
    toUserId: Yup.string().required(`${translate('Validation.userId')}`),
    branchId: Yup.number().required(`${translate('Validation.branchId')}`),
    depositDate: Yup.date().required(`${translate('Validation.DariName')}`),
    depositAmmount: Yup.number().required(`${translate('Validation.Code')}`),
  });

  const defaultValues = useMemo<IDepositTo>(
    () => ({
      id: selectedDepositTo?.id,
      parentId: asssetID || selectedDepositTo?.parentId || undefined,
      toUserId: selectedDepositTo?.toUserId || undefined,
      branchId: selectedDepositTo?.branchId || undefined,
      depositDate: selectedDepositTo?.depositDate,
      depositAmmount: selectedDepositTo?.depositAmmount,
      description: selectedDepositTo?.description,
    }),
    [selectedDepositTo, asssetID]
  );

  const methods = useForm<IDepositTo>({
    resolver: yupResolver(NewMainAssetSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    control,
    watch,
  } = methods;
  const val = watch();
  const onSubmit = (data: IDepositTo) => {
    if (data.id! === undefined) {
      ///create
      deposit(data).then(() => {
        reset();
        enqueueSnackbar(`${translate('Tostar.CreateSuccess')}`);
        navigate(PATH_DASHBOARD.MainAsset.list);
      });
    } else {
      ///update
      // updateMainAsset(data).then(() => {
      //   reset();
      //   enqueueSnackbar(`${translate('Tostar.UpdateSuccess')}`);
      //   navigate(PATH_DASHBOARD.MainAsset.list);
      // });
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
    loadBranchDDL();
  }, [loadBranchDDL]);

  useEffect(() => {
    loadUserDropdown(val.branchId);
  }, [loadUserDropdown, val.branchId]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                padding: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <LocalizDatePicker
                name="depositDate"
                label={translate('MainAsset.depositDate')}
                control={control}
                showAsterisk={true}
              />
              <RHFSelect name="branchId" label={translate('MainAsset.branch')}>
                <option value="" />
                {BranchOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="toUserId" label={translate('MainAsset.ToUser')}>
                <option value="" />
                {UserOption.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField
                name="depositAmmount"
                label={translate('MainAsset.depositAmmount')}
                type={'number'}
                showAsterisk={true}
                InputProps={{
                  endAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                autoFocus
              />
              <RHFTextField
                name="description"
                label={translate('MainAsset.description')}
                showAsterisk={true}
                autoFocus
              />
            </Box>

            <Box
              sx={{
                ml: 4,
                mt: 4,
                mb: 4,
              }}
            >
              <Stack direction="row" spacing={3}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="small"
                  color="success"
                  loading={isSubmitting}
                  startIcon={<AttachMoneyIcon />}
                >
                  {translate('CRUD.Deposit')}
                </LoadingButton>

                <LoadingButton
                  variant="contained"
                  size="small"
                  onClick={() => MainAssetStore.setOpenCloseDialogDeposit()}
                  color="secondary"
                  startIcon={<CancelIcon />}
                >
                  {translate('CRUD.Cancle')}
                </LoadingButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </FormProvider>
  );
});
