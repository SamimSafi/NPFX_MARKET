export interface IAssetTracking {
  id?: number;
  currencyTypeId?: number;
  currencyName?: string;
  assetTypeId?: number;
  assetType?: string;
  expenseTypeId?: number;
  expenseType?: string;
  amount?: number;
  date?: string;
  description?: string;
  userId?: number;
  user?: string;
  afterSubmit?: string;
}

export interface IAssetTrackingParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
