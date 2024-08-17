import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  FormHelperText,
  OutlinedInput,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { observer } from 'mobx-react-lite';
//import LoginStore from '../../../stores/Login/loginStore';
import { useStore } from '../../../stores/store';
import { useSnackbar } from 'notistack';
import { LoginFormValue } from '../../../@types/login';
//localization
import useLocales from 'src/hooks/useLocales';

export default observer(function LoginForm() {
  const { translate } = useLocales();
  const { LoginStore } = useStore();
  const { login } = LoginStore;

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [is2faEnable, setIs2faEnable] = useState(false);
  const [isUsingAuthenticator, setIsUsingAuthenticator] = useState(true);
  const [error, setErrors] = useState<string | undefined>();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(`${translate('User.UserNameIsRequired')}`),
    password: Yup.string().required(`${translate('User.PasswordIsRequired')}`),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm<LoginFormValue>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: LoginFormValue) => {
    try {
      await login({
        email: data.email,
        password: data.password,
        twoFactorCode: `${methods.getValues('code1')}${methods.getValues(
          'code2'
        )}${methods.getValues('code3')}${methods.getValues('code4')}${methods.getValues(
          'code5'
        )}${methods.getValues('code6')}`,
        recoveryCode: data.recoveryCode,
      });
      navigate(PATH_DASHBOARD.root);
      enqueueSnackbar(`${translate('Tostar.LoginSuccess')}`);
    } catch (error) {
      if (error.request.status === 302) {
        setIs2faEnable(true);
      } else {
        reset();
        setIs2faEnable(false);
        setError('afterSubmit', { ...error, message: error.request.responseText });
      }
    }
  };

  type ValueNames = 'code1' | 'code2' | 'code3' | 'code4' | 'code5' | 'code6';

  useEffect(() => {
    const target = document.querySelector('input.field-code');

    target?.addEventListener('paste', handlePaste);

    return () => {
      target?.removeEventListener('paste', handlePaste);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaste = (event: any) => {
    let data = event.clipboardData.getData('text');

    data = data.split('');

    [].forEach.call(document.querySelectorAll('.field-code'), (node: any, index) => {
      node.value = data[index];

      const fieldIndex = `code${index + 1}`;

      setValue(fieldIndex as ValueNames, data[index]);
    });

    event.preventDefault();
  };

  const handleChangeWithNextField = (
    event: React.ChangeEvent<HTMLInputElement>,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { maxLength, value, name } = event.target;

    const fieldIndex = name.replace('code', '');

    const fieldIntIndex = Number(fieldIndex);

    if (value.length >= maxLength) {
      if (fieldIntIndex < 6) {
        const nextfield = document.querySelector(`input[name=code${fieldIntIndex + 1}]`);

        if (nextfield !== null) {
          (nextfield as HTMLElement).focus();
        }
      }
    }
    if (error) {
      setErrors(undefined);
    }
    handleChange(event);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUsingAuthenticator(event.target.checked);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
      {!is2faEnable ? (
        <Stack spacing={3}>
          <RHFTextField name="email" label={translate('User.email')} autoFocus />
          <RHFTextField
            name="password"
            label={translate('login.Password')}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      ) : (
        <></>
      )}

      {is2faEnable ? (
        <>
          <FormControlLabel
            control={
              <Switch
                checked={isUsingAuthenticator}
                onChange={handleSwitchChange}
                name="useAuthenticator"
                color="primary"
              />
            }
            label={
              isUsingAuthenticator
                ? translate('GoogleAuth.loginGoogleAuth')
                : translate('GoogleAuth.loginRecovery')
            }
          />
          {isUsingAuthenticator ? (
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
              {['code1', 'code2', 'code3', 'code4', 'code5', 'code6'].map((name, index) => (
                <Controller
                  key={name}
                  name={`code${index + 1}` as ValueNames}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <OutlinedInput
                      {...field}
                      error={!!error}
                      autoFocus={index === 0}
                      placeholder="-"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeWithNextField(event, field.onChange)
                      }
                      inputProps={{
                        className: 'field-code',
                        maxLength: 1,
                        sx: {
                          p: 0,
                          textAlign: 'center',
                          width: { xs: 36, sm: 56 },
                          height: { xs: 36, sm: 56 },
                        },
                      }}
                    />
                  )}
                />
              ))}
            </Stack>
          ) : (
            <RHFTextField name="recoveryCode" label={translate('GoogleAuth.RecoveryCode')} />
          )}
        </>
      ) : (
        <></>
      )}

      {(!!errors.code1 || !!errors.code2 || !!errors.code3 || !!errors.code4) && (
        <FormHelperText error sx={{ px: 12 }}>
          {translate('Validation.Code')}
        </FormHelperText>
      )}

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="rememberMe" label={translate('login.RememberMe')} />
        <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
          {translate('login.ForgotPassword')}
        </Link>
      </Stack> */}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        sx={{ marginTop: 2 }}
        variant="contained"
        loading={isSubmitting}
      >
        {translate('login.Login')}
      </LoadingButton>
    </FormProvider>
  );
});
