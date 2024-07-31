import { Box, Card, Grid, Stack } from '@mui/material';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from 'src/stores/store';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import useLocales from 'src/hooks/useLocales';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

interface Props {
  id: number;
}

export default observer(function TrainingVideoDelete({ id }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { TrainingVideoStore } = useStore();
  const validationSchema = Yup.object().shape({
    remark: Yup.string()
      .required(`${translate('Validation.Remark')}`)
      .label('Remarks'),
  });
  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (remark: string) => {
    TrainingVideoStore.deleteTrainingVideo(id, remark)
      .then(() => {
        enqueueSnackbar('Delete  success!');
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
                mt: 2,
                mb: 2,
              }}
            >
              <Stack spacing={2}>
                <RHFTextField
                  name="remark"
                  label={translate('CRUD.Remarks')}
                  size="small"
                  autoFocus
                />
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
                  color="error"
                  size="small"
                  loading={isSubmitting}
                  startIcon={<DeleteIcon />}
                >
                  {translate('CRUD.Delete')}
                </LoadingButton>

                <LoadingButton
                  variant="contained"
                  size="small"
                  onClick={() => TrainingVideoStore.setOpenCloseDialog()}
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
