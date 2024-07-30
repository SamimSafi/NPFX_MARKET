import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Card, Typography, Stack, Divider, CardProps,CardHeader } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { BaseOptionChart } from '../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 300;

const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important' as 'relative',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader:string;
  CurrentBalance: number;
  chartData: {
    label: string;
    expense: number;
    CurrentBalance: number;
    
  }[];
  chartColors: string[][];
}
export default function NPFXCurrentBalanceAndExpense({
  title,
  subheader,
  CurrentBalance,
  chartColors,
  chartData,
  ...other
}: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'sm');

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.expense);

  const chartOptions = merge(BaseOptionChart(), {
    labels: chartLabels,
    legend: { floating: true, horizontalAlign: 'center' },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: chartColors.map((colors) => [
          { offset: 0, color: colors[0] },
          { offset: 50, color: colors[1] },
        ]),
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '55%' },
        dataLabels: {
          expense: { offsetY: 5 },
          CurrentBalance: {
            formatter: () => fNumber(CurrentBalance),
          },
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        divider={
          <Divider
            orientation={isDesktop ? 'vertical' : 'horizontal'}
            flexItem
            sx={{ borderStyle: 'dashed' }}
          />
        }
      >
        {chartData.map((item, index) => (
          
          <Stack
            key={item.label}
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={3}
            sx={{ width: 1 }}
          >
            
            {/* <ReactApexChart
              type="radialBar"
              series={[item.percent]}
              options={index === 1 ? chartOptionsCheckOut : chartOptionsCheckIn}
              {...CHART_SIZE}
            /> */}
            <ChartWrapperStyle dir="ltr">
              <ReactApexChart
                type="radialBar"
                series={chartSeries}
                options={chartOptions}
                height={250}
              />
            </ChartWrapperStyle>

            <div>
              <Typography variant="h4" sx={{ mb: 0.5 }}>
                {fNumber(item.CurrentBalance)}
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.72 }}>
                Current Ballance
              </Typography>
              <Typography variant="h4" sx={{ mb: 0.5 }}>
                {fNumber(item.expense)}
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.72 }}>
                Expense
              </Typography>
            </div>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
