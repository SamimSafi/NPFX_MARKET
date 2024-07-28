export interface IWithdrawalTracking {
  id?: number;
  currencyTypeId?: number;
  currencyType?: string;
  mainAssetId?: string;
  date?: string;
  description?: string;
  userId?: number;

  user?: string;
  branch?: string;
  amount?: string;

  userName?: string;
  branchId?: number;

  dueDate?: string;
  afterSubmit?: string;
}

export interface IWithdrawalTrackingParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
  mainAssetId?: string;
}
