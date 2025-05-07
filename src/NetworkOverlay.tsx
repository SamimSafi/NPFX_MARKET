import { useEffect, useState } from 'react';
import { Box, Typography, Fade, Paper, Stack } from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

export default function NetworkOverlay() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showOverlay, setShowOverlay] = useState(!navigator.onLine);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true);
      setRestored(false);
      setShowOverlay(true);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setRestored(true);
      setShowOverlay(true);
      setTimeout(() => {
        setShowOverlay(false);
        setRestored(false);
      }, 2500); // Show restored message for 2.5s
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!showOverlay) return null;

  return (
    <Fade in={showOverlay}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 2000,
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: restored ? 'success.main' : 'error.main',
            color: 'white',
            textAlign: 'center',
            minWidth: 300,
            animation: `${pulse} 2s infinite`,
          }}
        >
          <Stack spacing={2} alignItems="center">
            {restored ? (
              <WifiIcon sx={{ fontSize: 48 }} />
            ) : (
              <WifiOffIcon sx={{ fontSize: 48 }} />
            )}
            <Typography variant="h5" fontWeight="bold">
              {restored
                ? 'Internet connection restored'
                : 'No internet connection'}
            </Typography>
            <Typography variant="body2">
              {restored
                ? 'You are back online. Enjoy your experience.'
                : 'You are currently offline. Please check your connection.'}
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Fade>
  );
}
