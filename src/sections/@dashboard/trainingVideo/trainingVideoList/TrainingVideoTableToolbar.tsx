import { Stack, InputAdornment, TextField } from '@mui/material';
// components
import Iconify from 'src/components/Iconify';
import useLocales from 'src/hooks/useLocales';
// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  onFilterName: (value: string) => void;
};

export default function TrainingVideoTableToolbar({ filterName, onFilterName }: Props) {
  const { translate } = useLocales();
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder={translate('TrainingVideo.Placeholder')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
