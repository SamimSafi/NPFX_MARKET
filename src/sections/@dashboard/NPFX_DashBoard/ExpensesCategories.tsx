import React, { useEffect, useState } from 'react';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Divider,
  CardHeader,
  Typography,
  CardProps,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import useResponsive from '../../../hooks/useResponsive';
import { BaseOptionChart } from '../../../components/chart';
import { ExpenseChart } from 'src/@types/foamCompanyTypes/systemTypes/npfxDashboard';
import { useStore } from 'src/stores/store';
import useLocales from 'src/hooks/useLocales';

const RootStyle = styled(Card)(({ theme }) => ({
  '& .apexcharts-legend': {
    width: 240,
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
      height: 160,
      width: '50%',
    },
  },
  '& .apexcharts-datalabels-group': {
    display: 'none',
  },
}));

interface DataPoint {
  label: string;
  value: number;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chartData?: ExpenseChart;
}

export default function ExpensesCategories({ title, subheader, chartData, ...other }: Props) {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'sm');
  const { translate } = useLocales();
  const [period, setPeriod] = useState<keyof ExpenseChart>('day');
  const selectedData = chartData ? chartData[period] : [];

  const chartLabels = selectedData!.map((i) => i.label);
  const chartSeries = selectedData!
    .map((i) => i.value)
    .filter((value): value is number => value !== undefined);


  const { npfxDashboardStore } = useStore();
  const {
    LoadTradeTrackingChart,
    LoadExpenseChart,
    LoadRealTimeDashboard,
    realTimeDashboardData,
    tradeTrackingChartData,
    expenseChartData,
  } = npfxDashboardStore;

  

  useEffect(() => {
    LoadTradeTrackingChart();
    LoadExpenseChart();
    LoadRealTimeDashboard();
  }, [
    realTimeDashboardData,
    tradeTrackingChartData,
    expenseChartData,
    LoadTradeTrackingChart,
    LoadExpenseChart,
    LoadRealTimeDashboard,
  ]);

  const chartOptions = merge(BaseOptionChart(), {
    labels: chartLabels,
    stroke: {
      colors: [theme.palette.background.paper],
    },
    fill: { opacity: 0.8 },
    legend: {
      position: 'right',
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          legend: {
            position: 'bottom',
            horizontalAlign: 'left',
          },
        },
      },
    ],
  });

  // Calculate count and sum of the selected data
  const count = selectedData!.length;
  const sum = selectedData!.reduce((acc, curr) => acc + curr.value!, 0);

  return (
    <RootStyle {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ width: 150, margin: 'auto', mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="select-period-label">{translate('Npfx.Period')}</InputLabel>
          <Select
            labelId="select-period-label"
            id="select-period"
            value={period}
            label="Period"
            onChange={(e) => setPeriod(e.target.value as keyof ExpenseChart)}
          >
            <MenuItem value="day">{translate('Npfx.Day')}</MenuItem>
            <MenuItem value="week">{translate('Npfx.Week')}</MenuItem>
            <MenuItem value="month">{translate('Npfx.Month')}</MenuItem>
            <MenuItem value="year">{translate('Npfx.Year')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ my: 5 }} dir="ltr">
        <ReactApexChart
          type="polarArea"
          series={chartSeries as number[]}
          options={chartOptions}
          height={isDesktop ? 240 : 360}
        />
      </Box>

      <Divider />

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>
            {translate('Npfx.Categories')}
          </Typography>
          <Typography sx={{ typography: 'h4' }}>{count}</Typography>
        </Box>

        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>
            {translate('Npfx.TotalAmount')}
          </Typography>
          <Typography sx={{ typography: 'h4' }}>${sum}</Typography>
        </Box>
      </Stack>
    </RootStyle>
  );
}
