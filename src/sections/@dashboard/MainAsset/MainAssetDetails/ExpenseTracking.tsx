// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { TableHeadCustom } from '../../../../components/table';
import { ILoanTracking } from 'src/@types/foamCompanyTypes/systemTypes/LoanTracking';
import { IExpenseTracking } from 'src/@types/foamCompanyTypes/systemTypes/ExpenseTracking';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: IExpenseTracking[];
  tableLabels: any;
}

export default function ExpenseTracking({
  title,
  subheader,
  tableLabels,
  tableData,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <LoanTracking key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        {/* eslint-disable-next-line react/self-closing-comp */}
        <Button
          size="small"
          color="inherit"
          // endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        ></Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type BankingRecentTransitionsRowProps = {
  row: IExpenseTracking;
};

function LoanTracking({ row }: BankingRecentTransitionsRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2">{row.userName}</Typography>
            {/* <Typography variant="subtitle2"> {row.description}</Typography> */}
          </Box>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2">{row.expenseType}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {row.amount}
        </Typography>
      </TableCell>

      <TableCell>{row.date}</TableCell>

      <TableCell>{row.description}</TableCell>
    </TableRow>
  );
}
