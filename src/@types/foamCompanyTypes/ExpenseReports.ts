export interface IExpenseReportParam {
  branchIds?: number[];
  expenseTypeIds?: number[];
  fromDate: Date;
  toDate: Date;
}

export interface ExpenseStatisticalReportView {
  BranchId?: number;
  BranchName?: string;
  Expenses?: [
    {
      ExpenseType?: string;
      Currency?: [
        {
          CurrencyType?: string;
          count?: number;
        }
      ];
    }
  ];
}
