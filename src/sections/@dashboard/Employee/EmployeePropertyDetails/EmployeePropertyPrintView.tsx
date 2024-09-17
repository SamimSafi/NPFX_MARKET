import { forwardRef, useEffect } from 'react';
import useLocales from 'src/hooks/useLocales';
// @mui
import { Card, Paper, Stack, Typography } from '@mui/material';

import './EmployeeProperty.css';
import { ExpenseStatisticalReportView } from 'src/@types/foamCompanyTypes/ExpenseReports';
import { DateConverter } from 'src/sections/common/DateConverter';
import Scrollbar from 'src/components/Scrollbar';
import { useStore } from 'src/stores/store';
import A4Wrapper from '../../Reports/Report/A4Wrapper';
import { IProperty } from 'src/@types/foamCompanyTypes/systemTypes/PropertyType';

// ----------------------------------------------------------------------

type Props = {
  GetPropertiesByEmp: IProperty[];
};

export const EmployeePropertyPrintView = forwardRef(({ GetPropertiesByEmp }: Props, ref: any) => {
  const { commonDropdown } = useStore();
  const { translate } = useLocales();

  const { loadBranchDDL, loadExpenseTypeDropdown } = commonDropdown;

  useEffect(() => {
    loadBranchDDL();
    loadExpenseTypeDropdown();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {}, [GetPropertiesByEmp]);

  return (
    <Card sx={{ padding: '10px', height: 'auto', marginLeft: '10px', paddingTop: '30px' }}>
      <A4Wrapper>
        <Scrollbar sx={{ height: { xs: 340, sm: 'auto', lg: 550 } }}>
          {GetPropertiesByEmp ? (
            <div ref={ref}>
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
                    {translate('EmployeeProperty.EmployeePropertyDetails')}
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
                        <td style={{ border: '1px solid black', padding: '5px',fontWeight:'bold' }}>
                          {translate('Report.No')}
                        </td>
                        <td style={{ border: '1px solid black', padding: '5px',fontWeight:'bold' }}>
                          {translate('EmployeeProperty.Name')}
                        </td>
                        <td style={{ border: '1px solid black', padding: '5px',fontWeight:'bold' }}>
                          {translate('EmployeeProperty.Category')}
                        </td>
                        <td style={{ border: '1px solid black', padding: '5px',fontWeight:'bold' }}>
                          {translate('EmployeeProperty.Model')}
                        </td>
                        <td style={{ border: '1px solid black', padding: '5px',fontWeight:'bold' }}>
                          {translate('EmployeeProperty.Price')}
                        </td>
                        <td style={{ border: '1px solid black', padding: '5px',fontWeight:'bold' }}>
                          {translate('EmployeeProperty.Details')}
                        </td>
                      
                      </tr>
                    </thead>
                    <tbody>
                      {GetPropertiesByEmp.map((data, index) => (
                        <tr key={index} className="report-row">
                          <td style={{ border: '1px solid black', padding: '5px' }}>{index + 1}</td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>{data.name}</td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {data.category}
                          </td>
                        
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {data.model}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {data.price}
                          </td>
                          <td style={{ border: '1px solid black', padding: '5px' }}>
                            {data.details}
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
});

// ----------------------------------------------------------------------
