export interface IPieChartByBranch {
  totalCategoryCount: number;
  totalValueSum: number;
  data: dataCount[];
}

export interface dataCount {
  label: string;
  value: number;
}
