import { ICommonFieldType } from './commonFieldsType';

export interface IAssetType extends ICommonFieldType {
  afterSubmit?: string;
}

export interface IAssetTypeParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
