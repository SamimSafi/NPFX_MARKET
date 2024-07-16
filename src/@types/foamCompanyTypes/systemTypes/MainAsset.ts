export interface IMainAsset {
  id?: number;
  currencyTypeId?: number;
  currencyType?: string;
  branchId?: number;
  depositDate?: string;
  ownerUserName?: string;
  ownerUserId?: number;
  balanceAmount?: number;
  afterSubmit?: string;
}

export interface IMainAssetParams {
  pageSize: number;
  pageIndex: number;
  name?: string;
}
