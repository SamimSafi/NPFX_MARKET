import { forwardRef, useEffect } from 'react';
import useLocales from 'src/hooks/useLocales';
// @mui
import {
  Card,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useStore } from '../../../../../stores/store';
import './MainAssetStatisticalReport.css';
import EmptyContent from 'src/components/EmptyContent';
import { DateConverter } from 'src/sections/common/DateConverter';
import Scrollbar from 'src/components/Scrollbar';
import A4Wrapper from '../../Report/A4Wrapper';

// ----------------------------------------------------------------------

type Props = {
  filterButtonClicked: any;
  StatisticalReportDetails: any; // Adjust type as needed
};

export const MainAssetStatisticalReportPrintView = forwardRef(
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

    // Group transactions by mainAssetCode
    const groupedTransactions = (StatisticalReportDetails?.report ?? []).reduce((acc: any, item: any) => {
      (item.transactionModel ?? []).forEach((transaction: any) => {
        if (!acc[item.mainAssetCode]) {
          acc[item.mainAssetCode] = [];
        }
        acc[item.mainAssetCode].push(transaction);
      });
      return acc;
    }, {});

    return (
      <Card sx={{ padding: '10px', height: 'auto', marginLeft: '10px', paddingTop: '30px' }}>
        <A4Wrapper>
          <Scrollbar sx={{ height: { xs: 340, sm: 'auto', lg: 550 } }}>
            {StatisticalReportDetails ? (
              <div ref={ref}>
                {/* Report Table */}
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
                      {translate('Report.MainAssetReport')}
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
                            {translate('Report.MainAssetCode')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.CurrencyType')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.debitAmount')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.creditAmount')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.balanceAmount')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.transactionDate')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.UserName')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.Description')}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(groupedTransactions).map((assetCode, index) => {
                          const transactions = groupedTransactions[assetCode];
                          return transactions.map((transaction:any, transactionIndex:any) => (
                            <tr key={`${index}-${transactionIndex}`} className="report-row">
                              
                              {transactionIndex === 0 && (
                                <td  rowSpan={transactions.length} style={{ border: '1px solid black', padding: '5px' }}>
                                {index + 1}
                              </td>
                              )}
                              {transactionIndex === 0 && (
                                <td
                                  rowSpan={transactions.length}
                                  style={{ border: '1px solid black', padding: '5px', backgroundColor: '#f5f5f5' }}
                                >
                                  {assetCode}
                                </td>
                              )}
                             
                              <td style={{ border: '1px solid black', padding: '5px' }}>
                                {transaction.currencyType}
                              </td>
                              <td style={{ border: '1px solid black', padding: '5px' }}>
                                {transaction.debitAmount}
                              </td>
                              <td style={{ border: '1px solid black', padding: '5px' }}>
                                {transaction.creditAmount}
                              </td>
                              <td style={{ border: '1px solid black', padding: '5px' }}>
                                {transaction.balanceAmount}
                              </td>
                              <td style={{ border: '1px solid black', padding: '5px' }}>
                                {<DateConverter date={transaction.transactionDate} />}
                              </td>
                              <td style={{ border: '1px solid black', padding: '5px' }}>
                                {transaction.userName}
                              </td>
                              <td style={{ border: '1px solid black', padding: '5px' }}>
                                {transaction.description}
                              </td>
                            </tr>
                          ));
                        })}
                      </tbody>
                    </table>
                  </Stack>
                </Paper>
              </div>
            ) : (
              ""
            )}
          </Scrollbar>
        </A4Wrapper>
      </Card>
    );
  }
);
