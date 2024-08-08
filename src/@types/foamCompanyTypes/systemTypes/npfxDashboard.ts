export interface IPieChartByBranch {
  totalCategoryCount: number;
  totalValueSum: number;
  data: dataCount[];
}

export interface dataCount {
  label: string;
  value: number;
}

//#region real time dashboard
export interface TotalMainAssetsCurrentBalance {
  currencyType?: string;
  value?: number;
}

export interface TodayTotalExpense {
  currencyType?: string;
  value?: number;
}

export interface TotalTodaysTrade {
  currencyType?: string;
  tradeAmount?: number;
  profitAmount?: number;
  lossAmount?: number;
}

export interface RealTimeDasboard {
  totalMainAssetsCurrentBalance?: TotalMainAssetsCurrentBalance[];
  todayTotalExpense?: TodayTotalExpense[];
  totalTodaysTrade?: TotalTodaysTrade[];
}
//#endregion

//#region Trade Tracking Chart
export interface ChartLabels {
  day?: string[];
  week?: string[];
  month?: string[];
  year?: string[];
}

export interface ChartData {
  groupName?: string;
  data?: {
    name?: string;
    data?: number[];
  }[];
}
export interface TradeTrackingChart{
  chartLabels?:ChartLabels;
  chartData?:ChartData[];
}
//#endregion

//#region  ExpenseChart
export interface ExpenseChart {
  day?: { label?: string; value?: number }[];
  week?: { label?: string; value?: number }[];
  month?: { label?: string; value?: number }[];
  year?: { label?: string; value?: number }[];
}
//#endregion

//#region DashboardOfBranchsMainAsset
export interface DashboardOfBranchsMainAsset {
  id?: string;
  currencyTypeId?: number;
  currencyType?: string;
  assetTypeId?: number;
  assetType?: string;
  code?: string;
  balanceAmount?: number;
  ownerUserId?: string;
  ownerUserName?: string;
  ownerPhotoPath?: string;
}
//#endregion
