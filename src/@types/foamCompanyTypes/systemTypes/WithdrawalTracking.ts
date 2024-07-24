export interface IWithdrawalTracking {
  id?: number;
  currencyTypeId?: number;
  currencyName?: string;
  mainAssetId?: string;
  date?: string;
  description?: string;
  userId?: number;
  userName?: string;
  branchId?: number;
  branch?: string;
  withdrawalAmount?: number;
  dueDate?: string;
  afterSubmit?: string;
}

export interface IWithdrawalTrackingParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
