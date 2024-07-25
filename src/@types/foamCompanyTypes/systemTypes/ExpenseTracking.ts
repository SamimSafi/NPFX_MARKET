export interface IExpenseTracking {
  id?: number;
  mainAssetId?: number;
  expenseTypeId?: number;
  branchId?: number;
  userId?: string;
  branch?: string;
  userName?: string;
  currencyType?: string;
  amount?: number;
  description?: string;
  date?: string;
  expenseType?: string;
  afterSubmit?: string;
}

export interface IExpenseTrackingParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
  mainAssetId?: string;
}
