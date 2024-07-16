import { ICommonFieldType } from './commonFieldsType';

export interface ICurrencyType extends ICommonFieldType {}

export interface ICurrencyTypeParams {
  pageIndex: number;
  pageSize: number;
  searchBy?: string;
}
