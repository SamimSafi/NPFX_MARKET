export interface IMainAsset {
  id?: number;
  currencyTypeId?: number;
  date?: string;
  user?: string;
  userId?: number;
  balanceAmount?: number;
  parentId?: number;
  currencyName?: string;
  afterSubmit?: string;
}

export interface IMainAssetParams {
  pageSize: number;
  pageIndex: number;
  name?: string;
}
