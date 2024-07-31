import React, { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
  Grid,
  IconButton,
  TextField,
  Alert,
} from '@mui/material';
import QRCode from 'qrcode.react';
import { useStore } from 'src/stores/store';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useForm, Controller } from 'react-hook-form';
import devLogo from 'src/assets/devLogo.png'; // Adjust the path as needed
import styled from '@emotion/styled';
import useLocales from 'src/hooks/useLocales';

interface FormValues {
  code: string;
}

const Enable2fa: React.FC = () => {
  const { LoginStore } = useStore();
  const { translate } = useLocales();
  const {
    generate2faQrCode,
    googleAuthData,
    enableTwoFactorAuthentication,
    recoveryCodes,
    disable2fa,
  } = LoginStore;
  const [loading, setLoading] = useState<boolean>(false);
  const [qrCodeGenerated, setQrCodeGenerated] = useState<boolean>(false);
  const [codesCopied, setCodesCopied] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<FormValues>();

  const handleGenerateQrCode = async () => {
    setLoading(true);
    setQrCodeGenerated(true);
    try {
      await generate2faQrCode();
      setDisabled(false);
    } catch (error) {
      console.error('Error fetching auth data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    try {
      await disable2fa().then(() => {
        setDisabled(true);
      });
    } catch (error) {
      console.error('Error fetching auth data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndGetRecoveryCodes = async (data: FormValues) => {
    setLoading(true);
    try {
      await enableTwoFactorAuthentication(data.code);
      setCodesCopied(false);
    } catch (error) {
      console.error('Error enabling 2FA:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => setCodesCopied(true),
      (err) => console.error('Failed to copy text: ', err)
    );
  };

  const handleCopyAllCodes = () => {
    if (recoveryCodes?.recoveryCodes.length) {
      const allCodes = recoveryCodes.recoveryCodes.join('\n');
      copyToClipboard(allCodes);
    }
  };
  const qrSize = 256;
  const logoSize = 40;
  // const logoPosition = (qrSize - logoSize) / 2;
  const QRCodeWrapper = styled.div`
    position: relative;
    width: 256px; // Same as qrSize
    height: 256px; // Same as qrSize
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const LogoWrapper = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px; // Same as logoSize
    height: 40px; // Same as logoSize
    border-radius: 50%; // Adjust the radius as needed
    border: 2px solid #70adeb;
    overflow: hidden;
    background: white; // Optional: Adds a white background behind the logo
  `;
  return (
    <Box textAlign="center" padding="10px">
      <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '100%' }}>
        <Typography variant="h5" gutterBottom>
          {translate('GoogleAuth.EnableTwoFactor')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {translate('GoogleAuth.note')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateQrCode}
          disabled={loading}
        >
          {translate('GoogleAuth.Enable2fa')}
        </Button>

        <Button
          sx={{ ml: 2 }}
          variant="contained"
          color="error"
          onClick={handleDisable2FA}
          disabled={loading}
        >
          {translate('GoogleAuth.Disable2fa')}
        </Button>
        {loading && <CircularProgress style={{ marginTop: '20px' }} />}
        {qrCodeGenerated && googleAuthData && (
          <Grid container spacing={2} style={{ marginTop: '20px', width: '100%' }}>
            <Grid item xs={12} sm={12} md={6}>
              <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h6">{translate('GoogleAuth.SharedKey')}</Typography>
                <Typography variant="body1">{googleAuthData.sharedKey}</Typography>

                <Box
                  sx={{
                    backgroundColor: '#70adeb',
                    padding: '20px',
                    borderRadius: '12px',
                    textAlign: 'center',
                    margin: '0 auto',
                    maxWidth: '300px',
                  }}
                >
                  {/* <QRCode
                    value={googleAuthData.authenticatorUri}
                    size={qrSize}
                    imageSettings={{
                      src: devLogo,
                      x: logoPosition,
                      y: logoPosition,
                      height: logoSize,
                      width: logoSize,
                      excavate: true,
                      
                    }}
                  /> */}
                  <QRCodeWrapper>
                    <QRCode value={googleAuthData.authenticatorUri} size={qrSize} />
                    <LogoWrapper>
                      <img src={devLogo} alt="Logo" style={{ width: logoSize, height: logoSize }} />
                    </LogoWrapper>
                  </QRCodeWrapper>
                  <Typography variant="h6" style={{ marginTop: '20px' }}>
                    {translate('GoogleAuth.scan')}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h6"> {translate('GoogleAuth.enterSixDigit')}</Typography>
                <form onSubmit={handleSubmit(handleVerifyAndGetRecoveryCodes)}>
                  <Controller
                    name="code"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="6-Digit Code"
                        variant="outlined"
                        type="text"
                        fullWidth
                        margin="normal"
                        required
                      />
                    )}
                  />
                  <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {translate('GoogleAuth.verify')}
                  </Button>
                </form>
                {recoveryCodes && (
                  <Box marginTop="10px" position="relative">
                    <IconButton
                      onClick={handleCopyAllCodes}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        color: codesCopied ? 'green' : 'inherit',
                      }}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                    <Typography variant="h6"> {translate('GoogleAuth.RecoveryCodes')}</Typography>
                    <Grid
                      container
                      spacing={2}
                      sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
                    >
                      {recoveryCodes.recoveryCodes.length > 0 ? (
                        recoveryCodes.recoveryCodes.map((code, index) => (
                          <Grid item xs={6} key={index}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              padding="10px"
                            >
                              <Typography variant="body1">{code}</Typography>
                            </Box>
                          </Grid>
                        ))
                      ) : (
                        <Typography
                          sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                          }}
                          variant="body1"
                        >
                          {translate('GoogleAuth.NoCode')}
                        </Typography>
                      )}
                    </Grid>
                    {recoveryCodes?.errorMessage && (
                      <Typography variant="body1" color="error" style={{ marginTop: '20px' }}>
                        Error: {recoveryCodes.errorMessage}
                      </Typography>
                    )}
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
        {disabled ? (
          <Grid item xs={12} sm={12} md={12} sx={{ mt: 2 }}>
            <Alert variant="filled" color="success">
              2FA Disabled Successfully!
            </Alert>
          </Grid>
        ) : (
          <></>
        )}
      </Paper>
    </Box>
  );
};

export default Enable2fa;
