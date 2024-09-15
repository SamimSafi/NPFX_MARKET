import { forwardRef, Fragment, useEffect } from 'react';
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
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useStore } from '../../../../../stores/store';
import './LoanStatisticalReport.css';
import EmptyContent from 'src/components/EmptyContent';
import { DateConverter } from 'src/sections/common/DateConverter';
import { LoanStatisticalReportView } from 'src/@types/foamCompanyTypes/LoanReports';
import Scrollbar from 'src/components/Scrollbar';
import A4Wrapper from '../../Report/A4Wrapper';

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
                      Loan Report
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
                            {translate('Report.LoanType')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.CurrencyType')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.Amount')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.Paid')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.Remain')}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {StatisticalReportDetails.report!.map((item, index) => (
                          <>
                            {item.loanGivenType!.map((loanType, loanIndex) =>
                              loanType.currencyTypeModels!.map((currency, currencyIndex) => (
                                <tr
                                  key={`${index}-${loanIndex}-${currencyIndex}`}
                                  className="report-row"
                                >
                                  {loanIndex === 0 && currencyIndex === 0 && (
                                    <>
                                      <td
                                        rowSpan={item.loanGivenType!.reduce(
                                          (sum, loan) => sum + loan.currencyTypeModels!.length,
                                          0
                                        )}
                                        style={{ border: '1px solid black', padding: '5px' }}
                                      >
                                        {index + 1}
                                      </td>
                                      <td
                                        rowSpan={item.loanGivenType!.reduce(
                                          (sum, loan) => sum + loan.currencyTypeModels!.length,
                                          0
                                        )}
                                        style={{ border: '1px solid black', padding: '5px' }}
                                      >
                                        {item.branchName}
                                      </td>
                                    </>
                                  )}
                                  {currencyIndex === 0 && (
                                    <td
                                      rowSpan={loanType.currencyTypeModels!.length}
                                      style={{ border: '1px solid black', padding: '5px' }}
                                    >
                                      {loanType.isGiven
                                        ? `${translate('Report.Given')}`
                                        : `${translate('Report.Taken')}`}
                                    </td>
                                  )}
                                  <td style={{ border: '1px solid black', padding: '5px' }}>
                                    {currency.currencyType}
                                  </td>
                                  <td style={{ border: '1px solid black', padding: '5px' }}>
                                    {currency.loanAmount}
                                  </td>
                                  <td style={{ border: '1px solid black', padding: '5px' }}>
                                    {currency.paidAmount}
                                  </td>
                                  <td style={{ border: '1px solid black', padding: '5px' }}>
                                    {currency.remainAmount}
                                  </td>
                                </tr>
                              ))
                            )}
                          </>
                        ))}
                      </tbody>
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
                      Loan Transaction
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
