import merge from 'lodash/merge';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, TextField, CardProps, MenuItem } from '@mui/material';
// components
import { BaseOptionChart } from '../../../components/chart';

interface Category {
  name: string;
  data: number[];
}

interface Branch {
  name: string;
  categories: Category[];
}

interface YearlyData {
  year: string;
  branches: Branch[];
}

interface NPFXYearlySalesProps extends CardProps {
  title?: string;
  subheader?: string;
  chartLabels: string[];
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
  const [selectedBranch, setSelectedBranch] = useState<string>(chartData[0].branches[0].name);
  const [selectedCategory, setSelectedCategory] = useState<string>(chartData[0].branches[0].categories[0].name);

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = event.target.value;
    const selectedYearData = chartData.find(item => item.year === year);
    if (selectedYearData) {
      const branch = selectedYearData.branches[0].name;
      const category = selectedYearData.branches[0].categories[0].name;

      setSelectedYear(year);
      setSelectedBranch(branch);
      setSelectedCategory(category);
    }
  };

  const handleBranchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const branch = event.target.value;
    const selectedBranchData = chartData
      .find(item => item.year === selectedYear)
      ?.branches.find(b => b.name === branch);
    if (selectedBranchData) {
      const category = selectedBranchData.categories[0].name;
      setSelectedBranch(branch);
      setSelectedCategory(category);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  const filteredData = chartData
    .find(item => item.year === selectedYear)
    ?.branches.find(branch => branch.name === selectedBranch)
    ?.categories.find(category => category.name === selectedCategory)?.data || [];

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: chartLabels,
    },
  });

  const series = [
    {
      name: selectedCategory,
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
              value={selectedBranch}
              onChange={handleBranchChange}
              sx={{
                '& fieldset': { border: '0 !important' },
                '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
                '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
                '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 },
              }}
            >
              {chartData.find(item => item.year === selectedYear)?.branches.map((branch) => (
                <MenuItem key={branch.name} value={branch.name}>
                  {branch.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              value={selectedCategory}
              onChange={handleCategoryChange}
              sx={{
                '& fieldset': { border: '0 !important' },
                '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
                '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
                '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 },
              }}
            >
              {chartData
                .find(item => item.year === selectedYear)
                ?.branches.find(branch => branch.name === selectedBranch)
                ?.categories.map((category) => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
            </TextField>
          </Box>
        }
      />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart type="area" series={series} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
