export interface IMainAsset {
  id?: string;
  assetTypeId?: number;
  currencyTypeId?: number;
  currencyType?: string;
  branchId?: number;
  depositDate?: string;
  ownerUserName?: string;
  ownerUserId?: number;
  balanceAmount?: number;
  afterSubmit?: string;
}

export interface IDepositTo {
  id?: number;
  parentId?: string;
  depositDate?: string;
  toUserName?: string;
  toUserId?: number;
  branchId?: number;
  depositAmmount?: number;
  description?: string;
  afterSubmit?: string;
}

export interface IMainAssetParams {
  pageSize: number;
  pageIndex: number;
  name?: string;
}
