export interface IExpenseReportParam {
  branchIds?: number[];
  expenseTypeIds?: number[];
  fromDate: Date;
  toDate: Date;
}

interface ExpenseTypes {
  expenseType?: string;
  dollor?: number;
  afghani?: number;
}
interface report {
  branchName?: string;
  expenseTypes?: ExpenseTypes[];
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

export interface ExpenseStatisticalReportView {
  report?: report[];
  transactions?: Transactions[];
}
