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
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useStore } from '../../../../../stores/store';
import './StatisticalReport.css';
import EmptyContent from 'src/components/EmptyContent';
import { ExpenseStatisticalReportView } from 'src/@types/foamCompanyTypes/ExpenseReports';

// ----------------------------------------------------------------------

type Props = {
  filterButtonClicked: any;
  StatisticalReportDetails: ExpenseStatisticalReportView[];
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

    return (
      <Card sx={{ padding: '10px', height: 'auto', marginLeft: '10px', paddingTop: '30px' }}>
        <>
          {StatisticalReportDetails.length > 0 && filterButtonClicked === true && (
            <>
              <Paper ref={ref} sx={{ width: '100%', overflow: 'hidden', height: 'auto' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  {translate('ApplicantRequest.ReportHeader')}
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
                        <TableCell align="center">
                          {translate('InternalDocumentReport.No')}
                        </TableCell>
                        <TableCell align="center">
                          {translate('ApplicantRequest.Category')}
                        </TableCell>
                        <TableCell align="center">
                          {translate('ActionRequest.ActionRequest')}
                        </TableCell>
                        <TableCell align="center">{translate('User.user')}</TableCell>
                        <TableCell align="center">{translate('ApplicantRequest.Count')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {StatisticalReportDetails.map((item, index) => (
                        <>
                          {item.Expenses?.map((action, actionIndex) => (
                            <>
                              {action.Currency?.map((user, userIndex) => (
                                <TableRow tabIndex={-1} hover key={userIndex}>
                                  {userIndex === 0 && (
                                    <>
                                      {actionIndex === 0 && (
                                        <>
                                          <TableCell
                                            align="center"
                                            rowSpan={item.Expenses?.reduce(
                                              (sum, a) => sum + (a.ExpenseType?.length ?? 0),
                                              0
                                            )}
                                          >
                                            {index + 1}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            rowSpan={item.Expenses?.reduce(
                                              (sum, a) => sum + (a.ExpenseType?.length ?? 0),
                                              0
                                            )}
                                          >
                                            {item.Expenses}
                                          </TableCell>
                                        </>
                                      )}
                                      <TableCell
                                        align="center"
                                        rowSpan={
                                          userIndex === 0 ? action.ExpenseType?.length ?? 0 : 0
                                        }
                                      >
                                        {action.ExpenseType}
                                      </TableCell>
                                    </>
                                  )}
                                  <TableCell align="center">{user.CurrencyType}</TableCell>
                                  <TableCell align="center">{user.count}</TableCell>
                                </TableRow>
                              ))}
                            </>
                          ))}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </>
          )}
          {StatisticalReportDetails.length === 0 && filterButtonClicked === true && (
            <>
              <EmptyContent
                title={translate('ReceptionDashboard.NoRecordFound')}
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
