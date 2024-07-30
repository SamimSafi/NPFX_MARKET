// @mui
import { Button, Card, Typography, Stack, CardProps } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  expenseInAfg: number;
  expenseInDollor: number;
}

export default function NPFX_CurrentBalance({
  title,
  expenseInAfg,
  expenseInDollor,
  sx,
  ...other
}: Props) {
  const totalAmount = expenseInDollor - expenseInAfg;

  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Stack spacing={2}>
        {/* <Typography variant="h3">{fCurrency(totalAmount)}</Typography> */}

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Expense In Dollor
          </Typography>
          <Typography variant="body2">{fCurrency(expenseInDollor)}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Expense In AFG
          </Typography>
          <Typography variant="body2">- {fCurrency(expenseInAfg)}</Typography>
        </Stack>

        {/* <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total Amount
          </Typography>
          <Typography variant="subtitle1">{fCurrency(totalAmount)}</Typography>
        </Stack> */}

        {/* <Stack direction="row" spacing={1.5}>
          <Button fullWidth variant="contained" color="warning">
            Transfer
          </Button>

          <Button fullWidth variant="contained">
            Receive
          </Button>
        </Stack> */}
      </Stack>
    </Card>
  );
}
