// @mui
import { styled } from '@mui/material/styles';
import { Box, InputAdornment, Stack, TextField, Typography } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import useTable from 'src/hooks/useTable';
import useLocales from 'src/hooks/useLocales';
import { Controller } from 'react-hook-form';

// ----------------------------------------------------------------------

const BoxStyle = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  color: theme.palette.text.disabled,
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

// ----------------------------------------------------------------------

export default function SettingExchangeRate() {
  const { exchangeRate, onChangeExchangeRate } = useSettings();
  const { translate } = useLocales();
  const handleNumberClick = (number: number) => {
    onChangeExchangeRate(number);
  };
  return (
    <BoxStyle>
      {/* <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          bgcolor: 'background.default',
          display: 'flex',
        }}
      >
        <TextField
          inputProps={{ min: 0, style: { textAlign: 'center' } }}
          onChange={(e) => {handleNumberClick(Number(e.target.value))}}
          value={exchangeRate}
          // disabled // Disable the TextField
        />

      </Stack> */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border={1}
        borderRadius={1}
        borderColor="grey.400"
        width="100%"
        height="100%"
        sx={{ gridColumn: 'span 2', textAlign: 'center' }}
      >
        <TextField
          label={translate('GeneralFields.OneDollor')}
          type="text" // Changed to text to control input better
          onChange={(e) => {
            let { value } = e.target;
            // Restrict input to only digits and max 3 digits
            if (/^\d{0,3}$/.test(value)) {
              if (value === '') {
                value = '0';
              }
              const rate = parseFloat(value);
              handleNumberClick(rate);
            }
          }}
          value={exchangeRate}
          margin="normal"
          sx={{
            width: '130px',
          }}
          InputProps={{
            endAdornment: <InputAdornment position="start">؋</InputAdornment>,
            sx: { textAlign: 'center' },
          }}
          inputProps={{
            maxLength: 3, // Max length to restrict input
            style: { textAlign: 'center' },
          }}
        />
      </Box>
    </BoxStyle>
  );
}
