import { forwardRef, useEffect } from 'react';
import useLocales from 'src/hooks/useLocales';
// @mui
import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useStore } from '../../../../../stores/store';
import './TradeStatisticalReport.css';
import EmptyContent from 'src/components/EmptyContent';
import { DateConverter } from 'src/sections/common/DateConverter';
import { TradeStatisticalReportView } from 'src/@types/foamCompanyTypes/TradeReports';

// ----------------------------------------------------------------------

type Props = {
  filterButtonClicked: any;
  StatisticalReportDetails: TradeStatisticalReportView | undefined;
};

export const TradeStatisticalReportPrintView = forwardRef(
  ({ StatisticalReportDetails, filterButtonClicked }: Props, ref: any) => {
    const { commonDropdown } = useStore();
    const { translate } = useLocales();

    const { loadBranchDDL, loadExpenseTypeDropdown } = commonDropdown;

    useEffect(() => {
      loadBranchDDL();
      loadExpenseTypeDropdown();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {}, [filterButtonClicked]);
    useEffect(() => {}, [StatisticalReportDetails]);
    const calculateTotals = (): {
      totalTradeAmount: number;
      totalProfitAmount: number;
      totalLossAmount: number;
    } => {
      let totalTradeAmount = 0;
      let totalProfitAmount = 0;
      let totalLossAmount = 0;

      StatisticalReportDetails?.report!.map((item) => {
        totalTradeAmount += item.tradeAmount! | 0;
        totalProfitAmount += item.profitAmount! | 0;
        totalLossAmount += item.lossAmount! | 0;
      });

      return { totalTradeAmount, totalProfitAmount, totalLossAmount };
    };

    const { totalTradeAmount, totalProfitAmount, totalLossAmount } = calculateTotals();

    return (
      <Card sx={{ padding: '10px', height: 'auto', marginLeft: '10px', paddingTop: '30px' }}>
        <>
          {StatisticalReportDetails && filterButtonClicked === true && (
            <>
              <Paper ref={ref} sx={{ width: '100%', overflow: 'hidden', height: 'auto' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  {/* {translate('Expense.ExpenseReport')} */}
                  Trade Report
                </Typography>
                <TableContainer
                  component={Paper}
                  sx={{
                    // maxHeight: 550,
                    '&::-webkit-scrollbar': { width: 5 },
                    '&::-webkit-scrollbar-track': { backgroundColor: '999' },
                    '&::-webkit-scrollbar-thumb': { backgroundColor: '#555', borderRadius: 2 },
                  }}
                >
                  <Table stickyHeader aria-label="simple table" size="small" className="blueTable">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">{translate('No')}</TableCell>
                        <TableCell align="center">Branch</TableCell>
                        <TableCell align="center">ExpenseType</TableCell>
                        <TableCell align="center">{translate('Dollor')}</TableCell>
                        <TableCell align="center">{translate('Afghani')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {StatisticalReportDetails.report!.map((item, index) => (
                        <TableRow tabIndex={-1} hover key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{item.branchName}</TableCell>
                          <TableCell align="center">{item.tradeAmount}</TableCell>
                          <TableCell align="center">{item.profitAmount}</TableCell>
                          <TableCell align="center">{item.lossAmount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          Grand Total
                        </TableCell>
                        <TableCell align="center">{totalTradeAmount}</TableCell>
                        <TableCell align="center">{totalProfitAmount}</TableCell>
                        <TableCell align="center">{totalLossAmount}</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Paper>
              <Paper ref={ref} sx={{ width: '100%', overflow: 'hidden', height: 'auto' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  {/* {translate('Expense.ExpenseReport')} */}
                  Trade Transaction
                </Typography>
                <TableContainer
                  component={Paper}
                  sx={{
                    // maxHeight: 550,
                    '&::-webkit-scrollbar': { width: 5 },
                    '&::-webkit-scrollbar-track': { backgroundColor: '999' },
                    '&::-webkit-scrollbar-thumb': { backgroundColor: '#555', borderRadius: 2 },
                  }}
                >
                  <Table stickyHeader aria-label="simple table" size="small" className="blueTable">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">No</TableCell>
                        <TableCell align="center">Branch</TableCell>
                        <TableCell align="center">Main Asset Code</TableCell>
                        <TableCell align="center">Profit Amount</TableCell>
                        <TableCell align="center">Loss Amount</TableCell>
                        <TableCell align="center">User Name</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {StatisticalReportDetails.transactions?.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{data.branch}</TableCell>
                          <TableCell align="center">{data.mainAssetCode}</TableCell>
                          <TableCell align="center">{data.tradeAmount}</TableCell>
                          <TableCell align="center">{data.profitAmount}</TableCell>
                          <TableCell align="center">{data.userName}</TableCell>
                          <TableCell align="center">{<DateConverter date={data.date} />}</TableCell>
                          <TableCell align="center">{data.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </>
          )}
          {!StatisticalReportDetails && filterButtonClicked === false && (
            <>
              <EmptyContent
                title={translate('Expese.NoRecordFound')}
                sx={{
                  '& span.MuiBox-root': { height: 160 },
                }}
              />
            </>
          )}
        </>
      </Card>
    );
  }
);

// ----------------------------------------------------------------------
