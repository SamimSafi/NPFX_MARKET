import { ICommonFieldType } from './commonFieldsType';

export interface ICurrencyType extends ICommonFieldType {
  afterSubmit?: string;
}

export interface ICurrencyTypeParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
