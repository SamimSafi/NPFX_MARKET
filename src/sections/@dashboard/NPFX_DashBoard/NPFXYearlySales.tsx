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
  SelectChangeEvent,
} from '@mui/material';
import useResponsive from '../../../hooks/useResponsive';
import { BaseOptionChart } from '../../../components/chart';
import { ChartData, ChartLabels } from 'src/@types/foamCompanyTypes/systemTypes/npfxDashboard';
import { useStore } from 'src/stores/store';
import useLocales from 'src/hooks/useLocales';

const RootStyle = styled(Card)(({ theme }) => ({
  '& .apexcharts-legend': {
    width: '100%',
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
      height: 160,
    },
  },
  '& .apexcharts-datalabels-group': {
    display: 'none',
  },
}));

interface ExpenseChartProps extends CardProps {
  title?: string;
  subheader?: string;
  chartLabels: ChartLabels;
  chartData: ChartData[];
}

export default function ExpensesCategories({
  title,
  subheader,
  chartLabels = {},
  chartData = [],
  ...other
}: ExpenseChartProps) {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'sm');
  const { npfxDashboardStore } = useStore();
  const {
    LoadTradeTrackingChart,
    LoadExpenseChart,
    LoadRealTimeDashboard,
    realTimeDashboardData,
    tradeTrackingChartData,
    expenseChartData,
  } = npfxDashboardStore;

  const { translate } = useLocales();
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
  const [selectedPeriod, setSelectedPeriod] = useState<string>('day');
  const [selectedDataPoints, setSelectedDataPoints] = useState<string[]>(() => {
    // Initialize with both profit and loss if available
    const initialDataPoints = (chartData[0]?.data || [])
      .map((dp) => dp.name)
      .filter((name): name is string => name !== undefined);
    return initialDataPoints.length >= 2 ? initialDataPoints.slice(0, 2) : initialDataPoints;
  });

  const handlePeriodChange = (event: SelectChangeEvent<string>) => {
    const period = event.target.value;
    const selectedPeriodData = chartData.find((item) => item.groupName?.toLowerCase() === period);
    if (selectedPeriodData) {
      setSelectedPeriod(period);
      const dataPoints =
        selectedPeriodData.data
          ?.map((dp) => dp.name)
          .filter((name): name is string => name !== undefined) || [];
      setSelectedDataPoints(dataPoints.length >= 2 ? dataPoints.slice(0, 2) : dataPoints);
    }
  };

  const handleDataPointChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedDataPoints(value);
  };

  const selectedPeriodData = chartData.find(
    (item) => item.groupName?.toLowerCase() === selectedPeriod
  );

  const seriesData = selectedDataPoints.map((dataPointName) => {
    const data = selectedPeriodData?.data?.find((dp) => dp.name === dataPointName)?.data || [];
    return {
      name: dataPointName,
      data,
    };
  });

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: chartLabels[selectedPeriod as keyof ChartLabels] || [],
      labels: {
        style: {
          colors: theme.palette.text.primary,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.primary,
        },
      },
    },
    grid: {
      borderColor: theme.palette.divider,
    },
    stroke: {
      width: 3,
      curve: 'smooth',
      colors: selectedDataPoints.map((dpName) =>
        dpName === 'Loss' ? 'yellow' : theme.palette.primary.main
      ),
    },
    markers: {
      size: 5,
      colors: selectedDataPoints.map((dpName) =>
        dpName === 'Loss' ? 'yellow' : theme.palette.primary.main
      ),
      strokeColors: theme.palette.background.paper,
      strokeWidth: 2,
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true,
      },
      y: {
        formatter: (val: any) => `$${val}`,
      },
    },
    fill: { opacity: 0.8 },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
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

  // Calculate count and sum of the filtered data
  const allDataPoints = selectedDataPoints.flatMap((dataPointName) => {
    return selectedPeriodData?.data?.find((dp) => dp.name === dataPointName)?.data || [];
  });
  const count = allDataPoints.length;
  const sum = allDataPoints.reduce((acc, curr) => acc + curr, 0);

  return (
    <RootStyle {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Box sx={{ display: 'flex', gap: 1, width: 'fit-content' }}>
            <FormControl variant="outlined" size="small">
              <InputLabel id="select-period-label">Period</InputLabel>
              <Select
                labelId="select-period-label"
                id="select-period"
                value={selectedPeriod}
                onChange={handlePeriodChange}
                label={translate('Npfx.Period')}
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="day">{translate('Npfx.Day')}</MenuItem>
                <MenuItem value="week">{translate('Npfx.Week')}</MenuItem>
                <MenuItem value="month">{translate('Npfx.Month')}</MenuItem>
                <MenuItem value="year">{translate('Npfx.Year')}</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small">
              <InputLabel id="select-data-points-label">{translate('Npfx.DataPoints')}</InputLabel>
              <Select
                labelId="select-data-points-label"
                id="select-data-points"
                multiple
                value={selectedDataPoints}
                onChange={handleDataPointChange}
                renderValue={(selected) => selected.join(', ')}
                label={translate('Npfx.DataPoints')}
                sx={{ minWidth: 180 }}
              >
                {selectedPeriodData?.data?.map((dataPoint) => (
                  <MenuItem key={dataPoint.name} value={dataPoint.name}>
                    {dataPoint.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
      />

      <Box sx={{ width: '100%' }} dir="ltr">
        <ReactApexChart
          type="line"
          series={seriesData}
          options={chartOptions}
          height={isDesktop ? 400 : 300}
        />
      </Box>

      <Divider />
    </RootStyle>
  );
}
