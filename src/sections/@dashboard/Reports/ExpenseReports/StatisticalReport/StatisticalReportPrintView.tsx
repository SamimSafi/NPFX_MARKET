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
import './StatisticalReport.css';
import EmptyContent from 'src/components/EmptyContent';
import { ExpenseStatisticalReportView } from 'src/@types/foamCompanyTypes/ExpenseReports';
import { DateConverter } from 'src/sections/common/DateConverter';

// ----------------------------------------------------------------------

type Props = {
  filterButtonClicked: any;
  StatisticalReportDetails: ExpenseStatisticalReportView | undefined;
};

export const StatisticalReportPrintView = forwardRef(
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

    // Loan Report Grand Total
    const calculateTotals = (): { totalDollor: number; totalAfghani: number } => {
      let totalDollor = 0;
      let totalAfghani = 0;

      StatisticalReportDetails?.report!.forEach((data) => {
        data.expenseTypes!.forEach((action) => {
          totalDollor += action.dollor! | 0;
          totalAfghani += action.afghani! | 0;
        });
      });
      // StatisticalReportDetails!.report!.map((item) =>
      //   // eslint-disable-next-line array-callback-return
      //   item.expenseTypes!.map((action) => {
      //     totalDollor += action.dollor ?? 0;
      //     totalAfghani += action.afghani ?? 0;
      //   })
      // );

      return { totalDollor, totalAfghani };
    };

    const { totalDollor, totalAfghani } = calculateTotals();

    return (
      <Card sx={{ padding: '10px', height: 'auto', marginLeft: '10px', paddingTop: '30px' }}>
        <>
          {StatisticalReportDetails && (
            <>
              <Paper ref={ref} sx={{ width: '100%', overflow: 'hidden', height: 'auto' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  {/* {translate('Expense.ExpenseReport')} */}
                  {translate('Report.ExpenseReport')}
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
                        <TableCell align="center"> {translate('Report.Branch')}</TableCell>
                        <TableCell align="center"> {translate('Report.ExpenseType')}</TableCell>
                        <TableCell align="center">{translate('Report.Dollor')}</TableCell>
                        <TableCell align="center">{translate('Report.Afghani')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {StatisticalReportDetails.report!.map((item, index) => (
                        <>
                          {item.expenseTypes?.map((action, actionIndex) => (
                            <TableRow tabIndex={-1} hover key={actionIndex}>
                              {actionIndex === 0 && (
                                <>
                                  {index === 0 && (
                                    <>
                                      <TableCell
                                        align="center"
                                        rowSpan={item.expenseTypes?.reduce(
                                          (sum, a) => sum + (a.expenseType?.length ?? 0),
                                          0
                                        )}
                                      >
                                        {index + 1}
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        rowSpan={item.expenseTypes?.reduce(
                                          (sum, a) => sum + (a.expenseType?.length ?? 0),
                                          0
                                        )}
                                      >
                                        {item.branchName}
                                      </TableCell>
                                    </>
                                  )}
                                  <TableCell
                                    align="center"
                                    rowSpan={action.expenseType?.length ?? 0}
                                  >
                                    {action.expenseType}
                                  </TableCell>
                                </>
                              )}
                              <TableCell align="center">{action.dollor}</TableCell>
                              <TableCell align="center">{action.afghani}</TableCell>
                            </TableRow>
                          ))}
                        </>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          {translate('Report.GrandTotal')}
                        </TableCell>
                        <TableCell align="center">{totalDollor}</TableCell>
                        <TableCell align="center">{totalAfghani}</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Paper>
              <Paper ref={ref} sx={{ width: '100%', overflow: 'hidden', height: 'auto' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  {translate('Report.ExpenseReport')}
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
                        <TableCell align="center"> {translate('Report.Branch')}</TableCell>
                        <TableCell align="center"> {translate('Report.MainAssetCode')}</TableCell>
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
