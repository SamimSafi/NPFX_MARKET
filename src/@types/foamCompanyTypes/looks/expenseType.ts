import { ICommonFieldType } from './commonFieldsType';

export interface IExpenseType extends ICommonFieldType {
  afterSubmit?: string;
}

export interface IExpenseTypeParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}
