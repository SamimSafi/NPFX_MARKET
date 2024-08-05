import merge from 'lodash/merge';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, TextField, CardProps, MenuItem } from '@mui/material';
// components
import { BaseOptionChart } from '../../../components/chart';

interface DataPoint {
  name: string;
  data: number[];
}

interface YearlyData {
  year: string;
  data: DataPoint[];
}

interface NPFXYearlySalesProps extends CardProps {
  title?: string;
  subheader?: string;
  chartLabels: Record<string, string[]>;
  chartData: YearlyData[];
}

export default function NPFX_YearlySales({
  title,
  subheader,
  chartLabels,
  chartData,
  ...other
}: NPFXYearlySalesProps) {
  const [selectedYear, setSelectedYear] = useState<string>(chartData[0].year);
  const [selectedDataPoint, setSelectedDataPoint] = useState<string>(chartData[0].data[0].name);

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = event.target.value;
    const selectedYearData = chartData.find(item => item.year === year);
    if (selectedYearData) {
      setSelectedYear(year);
      setSelectedDataPoint(selectedYearData.data[0].name);
    }
  };

  const handleDataPointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDataPoint(event.target.value);
  };

  const filteredData = chartData
    .find(item => item.year === selectedYear)
    ?.data.find(dataPoint => dataPoint.name === selectedDataPoint)?.data || [];

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: chartLabels[selectedYear],
    },
  });

  const series = [
    {
      name: selectedDataPoint,
      data: filteredData,
    },
  ];

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              select
              fullWidth
              value={selectedYear}
              onChange={handleYearChange}
              sx={{
                '& fieldset': { border: '0 !important' },
                '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
                '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
                '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 },
              }}
            >
              {chartData.map((option) => (
                <MenuItem key={option.year} value={option.year}>
                  {option.year}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              value={selectedDataPoint}
              onChange={handleDataPointChange}
              sx={{
                '& fieldset': { border: '0 !important' },
                '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
                '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
                '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 },
              }}
            >
              {chartData
                .find(item => item.year === selectedYear)
                ?.data.map((dataPoint) => (
                  <MenuItem key={dataPoint.name} value={dataPoint.name}>
                    {dataPoint.name}
                  </MenuItem>
                ))}
            </TextField>
          </Box>
        }
      />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart type="line" series={series} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
