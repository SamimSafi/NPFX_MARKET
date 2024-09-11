import { forwardRef, useEffect } from 'react';
import useLocales from 'src/hooks/useLocales';
// @mui
import {
  Card,
  Paper,
  Stack,
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
import Scrollbar from 'src/components/Scrollbar';
import A4Wrapper from '../../Report/A4Wrapper';

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
        <A4Wrapper>
          <Scrollbar sx={{ height: { xs: 340, sm: 'auto', lg: 550 } }}>
            {StatisticalReportDetails ? (
              <div ref={ref}>
                {/* First Report */}
                <Paper
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    height: 'auto',
                    backgroundColor: 'white',
                    padding: '10px',
                    color: 'black',
                  }}
                >
                  <Stack>
                    <Typography variant="h6" align="center" gutterBottom sx={{ color: 'black' }}>
                      {translate('Report.ExpenseReport')}
                    </Typography>
                    <table
                      className="tg"
                      style={{
                        width: '100%',
                        color: 'black',
                        borderCollapse: 'collapse', // Eliminates gaps between borders
                      }}
                    >
                      <thead>
                        <tr>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('No')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.Branch')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.ExpenseType')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.Dollor')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.Afghani')}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {StatisticalReportDetails.report!.map((item, index) => (
                          <>
                            {item.expenseTypes?.map((action, actionIndex) => (
                              <tr key={actionIndex} className="report-row">
                                {actionIndex === 0 && (
                                  <>
                                    {index === 0 && (
                                      <>
                                        <td
                                          rowSpan={item.expenseTypes?.reduce(
                                            (sum, a) => sum + (a.expenseType?.length ?? 0),
                                            0
                                          )}
                                          style={{ border: '1px solid black', padding: '5px' }}
                                        >
                                          {index + 1}
                                        </td>
                                        <td
                                          rowSpan={item.expenseTypes?.reduce(
                                            (sum, a) => sum + (a.expenseType?.length ?? 0),
                                            0
                                          )}
                                          style={{ border: '1px solid black', padding: '5px' }}
                                        >
                                          {item.branchName}
                                        </td>
                                      </>
                                    )}
                                    <td
                                      rowSpan={action.expenseType?.length ?? 0}
                                      style={{ border: '1px solid black', padding: '5px' }}
                                    >
                                      {action.expenseType}
                                    </td>
                                  </>
                                )}
                                <td style={{ border: '1px solid black', padding: '5px' }}>
                                  {action.dollor}
                                </td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>
                                  {action.afghani}
                                </td>
                              </tr>
                            ))}
                          </>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3} style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.GrandTotal')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {totalDollor}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {totalAfghani}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </Stack>
                </Paper>

                {/* Second Report */}
                <Paper
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    height: 'auto',
                    backgroundColor: 'white',
                    padding: '10px',
                    mt: 2,
                    color: 'black',
                  }}
                >
                  <Stack>
                    <Typography variant="h6" align="center" gutterBottom sx={{ color: 'black' }}>
                      {translate('Report.ExpenseReport')}
                    </Typography>
                    <table
                      className="tg"
                      style={{
                        width: '100%',
                        color: 'black',
                        borderCollapse: 'collapse',
                      }}
                    >
                      <thead>
                        <tr>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.No')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.Branch')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.MainAssetCode')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.CurrencyType')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.Amount')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.UserName')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.Date')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.Description')}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {StatisticalReportDetails.transactions?.map((data, index) => (
                          <tr key={index} className="report-row">
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {index + 1}
                            </td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {data.branch}
                            </td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {data.mainAssetCode}
                            </td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {data.currencyType}
                            </td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {data.amount}
                            </td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {data.userName}
                            </td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {<DateConverter date={data.date} />}
                            </td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {data.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Stack>
                </Paper>
              </div>
            ) : (
              ''
            )}
          </Scrollbar>
        </A4Wrapper>
      </Card>
    );
  }
);

// ----------------------------------------------------------------------
