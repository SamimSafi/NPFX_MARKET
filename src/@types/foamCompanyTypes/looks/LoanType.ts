import { ICommonFieldType } from './commonFieldsType';

export interface ILoanType extends ICommonFieldType {
  afterSubmit?: string;
}

export interface ILoanTypeParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
}
