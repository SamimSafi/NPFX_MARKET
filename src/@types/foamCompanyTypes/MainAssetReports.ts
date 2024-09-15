export interface IMainAssetReportParam {
  mainAssetIds?: string[];
  fromDate: Date;
  toDate: Date;
}

interface report {
  mainAssetCode?: string;
  transactionModel?: TransactionModel[];
}
interface TransactionModel {
  currencyType?: string;
  debitAmount?: number;
  creditAmount?: number;
  balanceAmount?: number;
  transactionDate?: string;
  description?: string;
  userName?: string;
  isExpenceTransaction?: boolean;
  isTradeTransaction?: boolean;
  isLoanTransaction?: boolean;
  isWithdrawalTransaction?: boolean;
  isPayrollTransaction?: boolean;
  isDepositTransaction?: boolean;
}

export interface MainAssetReportView {
  report?: report[];
}
