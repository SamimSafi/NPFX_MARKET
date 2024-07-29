import React, { useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  TextField,
} from '@mui/material';
import QRCode from 'qrcode.react';
import { useStore } from 'src/stores/store';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useForm, Controller } from 'react-hook-form';

interface FormValues {
  code: string;
}

const Enable2fa: React.FC = () => {
  const { LoginStore } = useStore();
  const { generate2faQrCode, googleAuthData, enableTwoFactorAuthentication, recoveryCodes } =
    LoginStore;
  const [loading, setLoading] = useState<boolean>(false);
  const [qrCodeGenerated, setQrCodeGenerated] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<FormValues>();

  const handleGenerateQrCode = async () => {
    setLoading(true);
    setQrCodeGenerated(true);
    try {
      await generate2faQrCode();
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
    } catch (error) {
      console.error('Error enabling 2FA:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => console.log('Text copied to clipboard!'),
      (err) => console.error('Failed to copy text: ', err)
    );
  };

  const handleCopyAllCodes = () => {
    if (recoveryCodes?.recoveryCodes.length) {
      const allCodes = recoveryCodes.recoveryCodes.join('\n');
      copyToClipboard(allCodes);
    }
  };

  return (
    <Box textAlign="center" padding="20px">
      <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '600px' }}>
        <Typography variant="h5" gutterBottom>
          Enable Two-Factor Authentication
        </Typography>
        <Typography variant="body1" gutterBottom>
          Click the button below to generate your Google Authenticator QR code.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateQrCode}
          disabled={loading}
        >
          Generate QR Code
        </Button>
        {loading && <CircularProgress style={{ marginTop: '20px' }} />}
        {qrCodeGenerated && googleAuthData && (
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h6">Google Auth Shared Key</Typography>
                <Typography variant="body1">{googleAuthData.sharedKey}</Typography>
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                  Scan this QR code with Google Authenticator
                </Typography>
                <QRCode value={googleAuthData.authenticatorUri} size={256} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h6">Enter 6-Digit Code</Typography>
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
                    Verify
                  </Button>
                </form>
                {recoveryCodes && (
                  <Box marginTop="20px">
                    <Typography variant="h6">Recovery Codes</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCopyAllCodes}
                      disabled={recoveryCodes.recoveryCodes.length === 0}
                      style={{ marginBottom: '10px' }}
                    >
                      Copy All Codes
                    </Button>
                    <Grid container spacing={2}>
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
                        <Typography variant="body1">No recovery codes available.</Typography>
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
      </Paper>
    </Box>
  );
};

export default Enable2fa;
