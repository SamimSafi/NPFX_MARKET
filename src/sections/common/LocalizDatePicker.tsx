import { TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


interface Props {
  control: any;
  label: any;
  name: any;
  isDisablePast?: any;
  size?: any;
  views?: any;
  showAsterisk?: boolean;
}

export default function LocalizDatePicker({
  control,
  label,
  name,
  isDisablePast,
  size,
  showAsterisk,
  views,
}: Props) {


  const [open, setOpen] = useState(false);

  return (
    <>

      <LocalizationProvider dateAdapter={AdapterDateFns}>

        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              views={views}
              label={
                <Typography>
                  {label}{' '}
                  {showAsterisk && <span style={{ color: 'red', fontWeight: 'bold' }}> *</span>}
                </Typography>
              }
              value={field.value}
              disableHighlightToday={true}
              disablePast={isDisablePast != undefined || isDisablePast == true ? true : false}
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onClick={(e) => setOpen(true)}
                  fullWidth
                  size={size}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
}
