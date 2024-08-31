import { forwardRef, Fragment, useEffect } from 'react';
import useLocales from 'src/hooks/useLocales';
// @mui
import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useStore } from '../../../../../stores/store';
import './LoanStatisticalReport.css';
import EmptyContent from 'src/components/EmptyContent';
import { DateConverter } from 'src/sections/common/DateConverter';
import { LoanStatisticalReportView } from 'src/@types/foamCompanyTypes/LoanReports';

// ----------------------------------------------------------------------

type Props = {
  filterButtonClicked: any;
  StatisticalReportDetails: LoanStatisticalReportView | undefined;
};

export const LoanStatisticalReportPrintView = forwardRef(
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

    return (
      <Card
        sx={{ padding: '10px', height: 'auto', marginLeft: '10px', paddingTop: '30px' }}
        ref={ref}
      >
        <>
          {StatisticalReportDetails && (
            <>
              <Paper ref={ref} sx={{ width: '100%', overflow: 'hidden', height: 'auto' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  {/* {translate('Expense.ExpenseReport')} */}
                  Loan Report
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
                        <TableCell align="center">{translate('Report.No')}</TableCell>
                        <TableCell align="center">{translate('Report.Branch')}</TableCell>
                        <TableCell align="center">{translate('Report.LoanType')}</TableCell>
                        <TableCell align="center">{translate('Report.CurrencyType')}</TableCell>
                        <TableCell align="center">{translate('Report.Amount')}</TableCell>
                        <TableCell align="center">{translate('Report.Paid')}</TableCell>
                        <TableCell align="center">{translate('Report.Remain')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {StatisticalReportDetails.report!.map((item, index) => (
                        <>
                          {item.loanGivenType!.map((loanType, loanIndex) =>
                            loanType.currencyTypeModels!.map((currency, currencyIndex) => (
                              <TableRow
                                tabIndex={-1}
                                hover
                                key={`${index}-${loanIndex}-${currencyIndex}`}
                              >
                                {loanIndex === 0 && currencyIndex === 0 && (
                                  <>
                                    <TableCell
                                      align="center"
                                      rowSpan={item.loanGivenType!.reduce(
                                        (sum, loan) => sum + loan.currencyTypeModels!.length,
                                        0
                                      )}
                                    >
                                      {index + 1}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      rowSpan={item.loanGivenType!.reduce(
                                        (sum, loan) => sum + loan.currencyTypeModels!.length,
                                        0
                                      )}
                                    >
                                      {item.branchName}
                                    </TableCell>
                                  </>
                                )}
                                {currencyIndex === 0 && (
                                  <TableCell
                                    align="center"
                                    rowSpan={loanType.currencyTypeModels!.length}
                                  >
                                    {loanType.isGiven
                                      ? `${translate('Report.Given')}`
                                      : `${translate('Report.Taken')}`}
                                  </TableCell>
                                )}
                                <TableCell align="center">{currency.currencyType}</TableCell>
                                <TableCell align="center">{currency.loanAmount}</TableCell>
                                <TableCell align="center">{currency.paidAmount}</TableCell>
                                <TableCell align="center">{currency.remainAmount}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <Paper sx={{ width: '100%', overflow: 'hidden', height: 'auto' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  {/* {translate('Expense.ExpenseReport')} */}
                  Loan Transaction
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
                        <TableCell align="center">{translate('Report.No')}</TableCell>
                        <TableCell align="center">{translate('Report.Branch')}</TableCell>
                        <TableCell align="center">{translate('Report.MainAssetCode')}</TableCell>
                        <TableCell align="center">{translate('Report.CurrencyType')}</TableCell>
                        <TableCell align="center">{translate('Report.Amount')}</TableCell>
                        <TableCell align="center">{translate('Report.UserName')}</TableCell>
                        <TableCell align="center">{translate('Report.Date')}</TableCell>
                        <TableCell align="center">{translate('Report.Description')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {StatisticalReportDetails.transactions?.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{data.branch}</TableCell>
                          <TableCell align="center">{data.mainAssetCode}</TableCell>
                          <TableCell align="center">{data.currencyType}</TableCell>
                          <TableCell align="center">{data.amount}</TableCell>
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
          {!StatisticalReportDetails && (
            <>
              <EmptyContent
                title={translate('NoRecordFound')}
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
