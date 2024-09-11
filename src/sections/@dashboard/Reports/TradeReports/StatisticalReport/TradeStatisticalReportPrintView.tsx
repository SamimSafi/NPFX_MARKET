import { forwardRef, useEffect } from 'react';
import useLocales from 'src/hooks/useLocales';
// @mui
import { Card, Paper, Stack, Typography } from '@mui/material';

import { useStore } from '../../../../../stores/store';
import './TradeStatisticalReport.css';
import EmptyContent from 'src/components/EmptyContent';
import { DateConverter } from 'src/sections/common/DateConverter';
import { TradeStatisticalReportView } from 'src/@types/foamCompanyTypes/TradeReports';
import Scrollbar from 'src/components/Scrollbar';
import A4Wrapper from '../../Report/A4Wrapper';

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

      StatisticalReportDetails?.report!.forEach((item) => {
        totalTradeAmount += item.tradeAmount! | 0;
        totalProfitAmount += item.profitAmount! | 0;
        totalLossAmount += item.lossAmount! | 0;
      });

      return { totalTradeAmount, totalProfitAmount, totalLossAmount };
    };

    const { totalTradeAmount, totalProfitAmount, totalLossAmount } = calculateTotals();

    return (
      <Card sx={{ padding: '10px', height: 'auto', marginLeft: '10px', paddingTop: '30px' }}>
        <A4Wrapper>
          <Scrollbar sx={{ height: { xs: 340, sm: 'auto', lg: 550 } }}>
            {StatisticalReportDetails ? (
              <div ref={ref}>
                {/* گزارش تجارت */}
                <Paper
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    height: 'auto',
                    backgroundColor: 'white',
                    padding: '10px',
                    color: 'black', // تنظیم رنگ متن
                  }}
                >
                  <Stack>
                    <Typography variant="h6" align="center" gutterBottom sx={{ color: 'black' }}>
                      {translate('Trade Report')}
                    </Typography>
                    <table
                      className="tg"
                      style={{
                        width: '100%',
                        color: 'black',
                        borderCollapse: 'collapse', // برای حذف فاصله بین حاشیه‌ها
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
                            {translate('Report.Amount')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.ProfitAmount')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.LossAmount')}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {StatisticalReportDetails.report!.map((item, index) => (
                          <tr key={index} className="report-row">
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {index + 1}
                            </td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {item.branchName}
                            </td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {item.tradeAmount}
                            </td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {item.profitAmount}
                            </td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {item.lossAmount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={2} style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.GrandTotal')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {totalTradeAmount}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {totalProfitAmount}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {totalLossAmount}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </Stack>
                </Paper>

                {/* تراکنش‌های تجارت */}
                <Paper
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    height: 'auto',
                    backgroundColor: 'white',
                    padding: '10px',
                    mt: 2,
                    color: 'black', // تنظیم رنگ متن
                  }}
                >
                  <Stack>
                    <Typography variant="h6" align="center" gutterBottom sx={{ color: 'black' }}>
                      {translate('Report.TradeTransaction')}
                    </Typography>
                    <table
                      className="tg"
                      style={{
                        width: '100%',
                        color: 'black',
                        borderCollapse: 'collapse', // برای حذف فاصله بین حاشیه‌ها
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
                            {translate('Report.ProfitAmount')}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {translate('Report.LossAmount')}
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
                              {data.tradeAmount}
                            </td>
                            <td style={{ border: '1px solid black', padding: '5px' }}>
                              {data.profitAmount}
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
