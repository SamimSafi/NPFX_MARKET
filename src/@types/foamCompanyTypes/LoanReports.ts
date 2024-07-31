export interface ILoanReportParam {
  branchIds?: number[];
  fromDate: Date;
  toDate: Date;
}

interface CurrencyTypeModels {
  currencyType?: string;
  loanAmount?: number;
  paidAmount?: number;
  remainAmount?: number;
}

interface LoanGivenType {
  isGiven?: boolean;
  currencyTypeModels?:CurrencyTypeModels[];
}
interface report {
  branchName?: string;
  loanGivenType?: LoanGivenType[];
}

interface Transactions {
  branch?: string;
  mainAssetCode?: Date;
  currencyType?: string;
  expenseType?: string;
  amount?: number;
  date?: Date;
  description?: string;
  userName?: string;
}
export interface LoanStatisticalReportView {
  report?: report[];
  transactions?: Transactions[];
}
