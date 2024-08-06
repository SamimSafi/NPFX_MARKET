// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import {
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  Box,
  Avatar,
  Divider,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';
import { PATH_DASHBOARD } from 'src/routes/paths';
import cssStyles from 'src/utils/cssStyles';
// @types
import { userDetail } from 'src/@types/createUser';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useNavigate } from 'react-router';
import Label from 'src/components/Label';
import useLocales from '../../../../hooks/useLocales';
import { baseUrl } from 'src/api/baseUrl';
import { IEmployeeDetails } from 'src/@types/foamCompanyTypes/Employee';
import { DateConverter } from 'src/sections/common/DateConverter';
import App from 'src/App';
import path from 'path';
import { PATH_AFTER_LOGIN } from 'src/config';
import {
  AccountCircle,
  Cake,
  Email,
  LocationOn,
  PermIdentity,
  Phone,
  Event,
  CheckCircle,
} from '@mui/icons-material';
import { BaseOptionChart } from 'src/components/chart';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import Scrollbar from 'src/components/Scrollbar';
import { TableHeadCustom, TableMoreMenu } from 'src/components/table';
import _mock from 'src/_mock';

import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
import { fCurrency, fShortenNumber } from 'src/utils/formatNumber';
import { IconifyIcon } from '@iconify/react';
import { CheckInIllustration } from 'src/assets';
import InsertChartIcon from '@mui/icons-material/InsertChart';
type Props = {
  row: IEmployeeDetails;
  clearEmployee: () => void;
};
const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 0.2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));
const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));
export default function EmployeeDetailTableRow({ row, clearEmployee }: Props) {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const language = window.localStorage.getItem('i18nextLng');
  const [value, setValue] = useState('1');
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';
  const {
    attendaceId,
    attendanceId,
    bloodGroup,
    tazkiraNo,
    dateOfBirth,
    branch,
    district,
    emergencyPhoneNumber,
    employeeHealthState,
    englishFatherName,
    englishFirstName,
    englishGrandFatherName,
    englishSurName,
    gender,
    id,
    isCurrent,
    joinDate,
    leaveDate,
    leaveRemark,
    officialEmail,
    pashtoFatherName,
    pashtoFirstName,
    pashtoGrandFatherName,
    pashtoSurName,
    permenantAddress,
    personalEmail,
    phoneNumber,
    photoPath,
    provence,
    rfidNumber,
    temporaryAddress,
  } = row;
  let Url = baseUrl;
  const fullName = 'Engineer Mohammad Edris Nikzad';
  const firstLetter = fullName.charAt(0);

  // table functions
  const TAX_RATE = 0.07;

  function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty: number, unit: number) {
    return qty * unit;
  }

  function createRow(desc: string, qty: number, unit: number) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
  }

  interface Row {
    desc: string;
    qty: number;
    unit: number;
    price: number;
  }

  function subtotal(items: readonly Row[]) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const rows = [
    createRow('2024', 1000, 2000),
    createRow('2025', 12000, 5000),
    createRow('2026', 1244, 3266),
  ];

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  // end table functions

  // chart
  interface ChartData {
    name: string;
    type: 'column' | 'area' | 'line'; // Define the possible types for 'type'
    fill: 'solid' | 'gradient'; // Define the possible types for 'fill'
    data: number[];
  }

  const chartData: ChartData[] = [
    {
      name: 'Team A',
      type: 'column',
      fill: 'solid',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
    },
    {
      name: 'Team B',
      type: 'area',
      fill: 'gradient',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
    },
    {
      name: 'Team C',
      type: 'line',
      fill: 'solid',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
    },
  ];

  const chartLabels: string[] = [
    '01/01/2003',
    '02/01/2003',
    '03/01/2003',
    '04/01/2003',
    '05/01/2003',
    '06/01/2003',
    '07/01/2003',
    '08/01/2003',
    '09/01/2003',
    '10/01/2003',
    '11/01/2003',
  ];
  // endchart
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  // table Data

  const tableData = [
    {
      id: _mock.id(2),
      name: _mock.name.fullName(2),
      avatar: _mock.image.avatar(8),
      type: 'Income',
      message: 'Receive money from',
      category: 'Annette Black',
      date: 1627556358365,
      status: 'in_progress',
      amount: 811.45,
    },
    {
      id: _mock.id(3),
      name: _mock.name.fullName(3),
      avatar: _mock.image.avatar(9),
      type: 'Expenses',
      message: 'Payment for',
      category: 'Courtney Henry',
      date: 1627556329038,
      status: 'completed',
      amount: 436.03,
    },
    {
      id: _mock.id(4),
      name: _mock.name.fullName(4),
      avatar: _mock.image.avatar(12),
      type: 'Receive',
      message: 'Payment for',
      category: 'Theresa Webb',
      date: 1627556339677,
      status: 'failed',
      amount: 82.26,
    },
    {
      id: _mock.id(5),
      name: null,
      avatar: null,
      type: 'Expenses',
      message: 'Payment for',
      category: 'Beauty & Health',
      date: 1627547330510,
      status: 'completed',
      amount: 480.73,
    },
    {
      id: _mock.id(6),
      name: null,
      avatar: null,
      type: 'Expenses',
      message: 'Payment for',
      category: 'Books',
      date: 1627556347676,
      status: 'in_progress',
      amount: 11.45,
    },
  ];

  // end of tabel Data
  return (
    <>
      <Grid item xs={6} md={6}>
        <Stack direction="row" spacing={1.5} sx={{ mt: 1, ml: 0, mb: 2 }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            onClick={() => {
              navigate(PATH_DASHBOARD.Employee.list);
              clearEmployee();
            }}
          >
            {translate('CRUD.BackToList')}
          </Button>
        </Stack>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {/* profile */}
          <Card sx={{ py: 2, px: 2 }}>
            <Card sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  alt="{englishFirstName}"
                  // src={Url + photoPath}
                  sx={{
                    width: 90,
                    height: 90,
                    zIndex: 11,
                    left: 0,
                    right: 0,
                    bottom: -32,
                    mx: 'auto',
                    position: 'absolute',
                  }}
                />
                <OverlayStyle />
                <Image src={require('src/assets/images/dam.jpg')} alt="" ratio="16/9" />
              </Box>

              <Typography variant="subtitle1" sx={{ mt: 6 }}>
                Engineer Mohammad Edris Nikzad
                {/* {language === 'en'
                  ? englishFirstName + ' ' + englishSurName
                  : pashtoFirstName + ' ' + pashtoSurName} */}
              </Typography>

              <Stack alignItems="center">
                <Typography variant="body2" sx={{ color: 'text.secondary', my: 2.5 }}>
                  Full Stack Developer
                  {/* {bloodGroup} */}
                </Typography>
              </Stack>
            </Card>
          </Card>

          <Card sx={{ borderRadius: '15px', boxShadow: 3, overflow: 'hidden', mt: 2 }}>
            <Box
              sx={{
                backgroundColor: 'primary.main',
                p: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ width: 40, height: 40, mr: 1.5 }}>{firstLetter}</Avatar>
              <Typography variant="h6" sx={{ color: 'dark.main', fontWeight: 'bold' }}>
                {translate('Employee.EmployeeGeneralInfo')}
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Stack>
                <Divider sx={{ my: 0.5 }} />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Cake sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: 'text.secondary' }}
                    >
                      {translate('Employee.dateOfBirth')}
                    </Typography>
                    <Typography variant="body2">
                      date of Birth
                      {/* <DateConverter date={dateOfBirth} /> */}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 0.5 }} />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Email sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: 'text.secondary' }}
                    >
                      {translate('Employee.personalEmail')}
                    </Typography>
                    <Typography variant="body2">
                      ahmad@gmail.com
                      {/* {personalEmail} */}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 0.5 }} />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Email sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: 'text.secondary' }}
                    >
                      {translate('Employee.officialEmail')}
                    </Typography>
                    <Typography variant="body2">
                      mew@mew.com
                      {/* {officialEmail} */}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 0.5 }} />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Phone sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: 'text.secondary' }}
                    >
                      {translate('Employee.PhoneNumber')}
                    </Typography>
                    <Typography variant="body2" dir={language === 'en' ? 'ltr' : 'rtl'}>
                      0781719750
                      {/* {phoneNumber} */}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 0.5 }} />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PermIdentity sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: 'text.secondary' }}
                    >
                      {translate('Employee.cnic')}
                    </Typography>
                    <Typography variant="body2">
                      tazkiraNo
                      {/* {cnic} */}
                    </Typography>
                  </Box>
                </Stack>
                <Divider sx={{ my: 0.5 }} />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOn sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: 'text.secondary' }}
                    >
                      Province
                    </Typography>
                    <Typography variant="body2">
                      Kabul
                      {/* <DateConverter date={dateOfBirth} /> */}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 0.5 }} />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccountCircle sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: 'text.secondary' }}
                    >
                      {translate('Employee.gender')}
                    </Typography>
                    <Typography variant="body2">
                      Male
                      {/* {personalEmail} */}
                    </Typography>
                  </Box>
                </Stack>
                <Divider sx={{ my: 0.5 }} />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Event sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: 'text.secondary' }}
                    >
                      {translate('Employee.joinDate')}
                    </Typography>
                    <Typography variant="body2">
                      2024-05-05
                      {/* {officialEmail} */}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 0.5 }} />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOn sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: 'text.secondary' }}
                    >
                      {/* {translate('Employee.PhoneNumber')} */}
                      Branch
                    </Typography>
                    <Typography variant="body2" dir={language === 'en' ? 'ltr' : 'rtl'}>
                      Shahr-e-Naw
                      {/* {phoneNumber} */}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 0.5 }} />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CheckCircle sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 'bold', color: 'text.secondary' }}
                    >
                      {/* {translate('Employee.cnic')} */}
                      IsCurrent Employee
                    </Typography>
                    <Typography variant="body2">
                      True
                      {/* {cnic} */}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Card>
        </Grid>
        {/* end profile */}

        <Grid item xs={12} md={8}>
          {/* General Information */}
          <Card
            sx={{
              borderRadius: '15px',
              boxShadow: 3,
              overflow: 'hidden',
              marginTop: '10px',
              padding: '10px',
            }}
          >
            <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
          </Card>
          {/* End of General Information */}

          {/* Activity Chart    */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item md={4} xs={12}>
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  pl: 3,
                }}
              >
                <div>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Total Asset
                  </Typography>
                  <Typography variant="h4">
                    25000$
                    {/* {row !== undefined ? fShortenNumber(row![0].count) : 0} */}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    2021-2024
                    {/* {row !== undefined ? row![0].day : today} */}
                  </Typography>
                </div>
                <InsertChartIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Card>
            </Grid>
            <Grid item md={4} xs={12}>
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  pl: 3,
                }}
              >
                <div>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Total Benefit
                  </Typography>
                  <Typography variant="h4">
                    35000$
                    {/* {row !== undefined ? fShortenNumber(row![0].count) : 0} */}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    2021-2024
                    {/* {row !== undefined ? row![0].day : today} */}
                  </Typography>
                </div>

                <InsertChartIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Card>
            </Grid>
            <Grid item md={4} xs={12}>
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  pl: 3,
                }}
              >
                <div>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Total Defect
                  </Typography>
                  <Typography variant="h4">
                    2500$
                    {/* {row !== undefined ? fShortenNumber(row![0].count) : 0} */}
                  </Typography>

                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    2021-2024
                    {/* {row !== undefined ? row![0].day : today} */}
                  </Typography>
                </div>

                <InsertChartIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Card>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            sx={{
              borderRadius: '15px',
              boxShadow: 3,
              overflow: 'hidden',
              marginTop: '10px',
              padding: '10px',
            }}
          >
            <Grid item md={12} xs={12}>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 720 }}>
                  <Table>
                    <TableHeadCustom
                      headLabel={[
                        { id: 'Date', label: 'Date' },
                        { id: 'Asset', label: 'Asset' },
                        { id: 'Benefit', label: 'Benefit' },
                        { id: 'Defect', label: 'Defect' },

                        { id: 'Result', label: 'Result' },
                      ]}
                    />

                    <TableBody>
                      {/* {tableData.map((row) => ( */}
                      <TableRow>
                        <TableCell>2021</TableCell>

                        <TableCell>{fCurrency(10000)}</TableCell>

                        <TableCell>{fCurrency(12000)}</TableCell>

                        <TableCell>{fCurrency(0)}</TableCell>
                        <TableCell>
                          <Label variant={isLight ? 'ghost' : 'filled'} color={'success'}>
                            Excellent
                          </Label>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>2022</TableCell>

                        <TableCell>{fCurrency(5000)}</TableCell>

                        <TableCell>{fCurrency(250)}</TableCell>

                        <TableCell>{fCurrency(0)}</TableCell>
                        <TableCell>
                          <Label variant={isLight ? 'ghost' : 'filled'} color={'warning'}>
                            good
                          </Label>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>2023</TableCell>

                        <TableCell>{fCurrency(5000)}</TableCell>

                        <TableCell>{fCurrency(0)}</TableCell>

                        <TableCell>{fCurrency(200)}</TableCell>
                        <TableCell>
                          <Label variant={isLight ? 'ghost' : 'filled'} color={'error'}>
                            bad
                          </Label>
                        </TableCell>
                      </TableRow>
                      {/* ))} */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Grid>
          </Grid>
          {/* end of activity chart */}
        </Grid>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}
        {/* sx={{ mt: 2, mr: 2, ml: 2, mb: 2 }} */}

        <Grid item xs={12} md={12}></Grid>
      </Grid>
    </>
  );
}
interface smallCardProps {
  nameLabel: string;
  name: string;
  appLabel: string;
  application: string;
  descLabel: string;
  description: string;
  permLabel: string;
  totalpermissions: any;
}

function RoleCard({
  name,
  nameLabel,
  application,
  appLabel,
  description,
  descLabel,
  totalpermissions,
  permLabel,
}: smallCardProps) {
  return (
    <Stack sx={{ p: 1 }}>
      {/* <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} /> */}
      {/* <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {application}
          </Typography>
         
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {description}
          </Typography>
      </Box> */}
      {/* <Typography variant="subtitle2" noWrap>
          {totalpermissions}
        </Typography> */}
      <Paper
        sx={{
          p: 1,
          width: 1,
          backgroundColor: '#a9d39e',
        }}
      >
        <Typography variant="body2" sx={{ color: 'black' }}>
          <Typography variant="body2" component="span" sx={{ color: 'black', fontWeight: 'bold' }}>
            {nameLabel} &nbsp;
          </Typography>
          {`${name}`}
        </Typography>

        <Typography variant="body2" sx={{ color: 'black' }}>
          <Typography variant="body2" component="span" sx={{ color: 'black', fontWeight: 'bold' }}>
            {appLabel} &nbsp;
          </Typography>
          {`${application}`}
        </Typography>

        <Typography variant="body2" sx={{ color: 'black' }}>
          <Typography variant="body2" component="span" sx={{ color: 'black', fontWeight: 'bold' }}>
            {descLabel} &nbsp;
          </Typography>
          {description}
        </Typography>
        <Typography variant="body2" gutterBottom sx={{ color: 'black' }}>
          <Typography variant="body2" component="span" sx={{ color: 'black', fontWeight: 'bold' }}>
            {permLabel} &nbsp;
          </Typography>
          {totalpermissions}
        </Typography>
      </Paper>
    </Stack>
  );
}
type AvatarIconProps = {
  icon: IconifyIcon | string;
};

function AvatarIcon({ icon }: AvatarIconProps) {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Iconify icon={icon} width={24} height={24} />
    </Avatar>
  );
}
function renderAvatar(category: string, avatar: string | null) {
  if (category === 'Books') {
    return <AvatarIcon icon={'eva:book-fill'} />;
  }
  if (category === 'Beauty & Health') {
    return <AvatarIcon icon={'eva:heart-fill'} />;
  }
  return avatar ? (
    <Avatar
      alt={category}
      src={avatar}
      sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }}
    />
  ) : null;
}
