import { Box, Card, Grid, Stack } from '@mui/material';
import RHFTextField from '../../../../components/hook-form/RHFTextField';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import useLocales from '../../../../hooks/useLocales';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
interface Props {
  id: number;
}

export default observer(function DocumentLinkTypeDelete({ id }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { LanguageStore } = useStore();
  const validationSchema = Yup.object().shape({
    remarks: Yup.string().required('Please Enter Remarks').label('Remarks'),
  });
  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (remark: string) => {
    LanguageStore.deleteLanguage(id, remark)
      .then(() => {
        enqueueSnackbar(`${translate('Tostar.DeleteSuccess')}`);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(`${translate('Tostar.DeleteFailed')}`, {
          variant: 'error',
        });
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Grid container spacing={4}>
          <Grid item xs={10} md={10}>
            <Box
              sx={{
                ml: 4,
                mt: 4,
                mb: 4,
              }}
            >
              <Stack spacing={2}>
                <RHFTextField name="remarks" label={translate('CRUD.Remarks')} size="small" autoFocus />
              </Stack>
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
                  color="error"
                  loading={isSubmitting}
                  startIcon={<DeleteIcon />}
                >
                     {translate('CRUD.Delete')}
                </LoadingButton>

                <LoadingButton
                  variant="contained"
                  size="small"
                  onClick={() => LanguageStore.setOpenCloseDialog()}
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
