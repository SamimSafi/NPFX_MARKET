export interface ITradeReportParam {
  branchIds?: number[];
  fromDate: Date;
  toDate: Date;
}

interface report {
  branchName?: string;
  tradeAmount?: number;
  profitAmount?: number;
  lossAmount?: number;
}
interface Transactions {
  branch: string;
  mainAssetCode: string;
  tradeAmount: number;
  profitAmount: number;
  lossAmount: number;
  date: Date;
  description: string;
  userName: string;
}

export interface TradeStatisticalReportView {
  report?: report[];
  transactions?: Transactions[];
}
